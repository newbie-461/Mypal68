/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef jit_MIRBuilderShared_h
#define jit_MIRBuilderShared_h

#include "jit/MIRGraph.h"
#include "js/Vector.h"

// Data structures and helper functions used by both IonBuilder and WarpBuilder.
// TODO(no-TI): remove this file.

namespace js {
namespace jit {

// Helper class to manage call state.
class MOZ_STACK_CLASS CallInfo {
  MDefinition* callee_ = nullptr;
  MDefinition* thisArg_ = nullptr;
  MDefinition* newTargetArg_ = nullptr;
  MDefinitionVector args_;
  // If non-empty, this corresponds to the stack prior any implicit inlining
  // such as before JSOp::FunApply.
  MDefinitionVector priorArgs_;

  bool constructing_;

  // True if the caller does not use the return value.
  bool ignoresReturnValue_;

  bool inlined_ = false;
  bool setter_ = false;
  bool apply_;

 public:
  // For some argument formats (normal calls, FunCall, FunApplyArgs in an
  // inlined function) we can shuffle around definitions in the CallInfo
  // and use a normal MCall. For others, we need to use a specialized call.
  enum class ArgFormat {
    Standard,
    Array,
    FunApplyArgs,
  };

 private:
  ArgFormat argFormat_ = ArgFormat::Standard;

 public:
  CallInfo(TempAllocator& alloc, jsbytecode* pc, bool constructing,
           bool ignoresReturnValue)
      : args_(alloc),
        priorArgs_(alloc),
        constructing_(constructing),
        ignoresReturnValue_(ignoresReturnValue),
        apply_(JSOp(*pc) == JSOp::FunApply) {}

  MOZ_MUST_USE bool init(CallInfo& callInfo) {
    MOZ_ASSERT(constructing_ == callInfo.constructing());

    callee_ = callInfo.callee();
    thisArg_ = callInfo.thisArg();
    ignoresReturnValue_ = callInfo.ignoresReturnValue();

    if (constructing()) {
      newTargetArg_ = callInfo.getNewTarget();
    }

    if (!args_.appendAll(callInfo.argv())) {
      return false;
    }

    return true;
  }

  MOZ_MUST_USE bool init(MBasicBlock* current, uint32_t argc) {
    MOZ_ASSERT(args_.empty());

    // Get the arguments in the right order
    if (!args_.reserve(argc)) {
      return false;
    }

    if (constructing()) {
      setNewTarget(current->pop());
    }

    for (int32_t i = argc; i > 0; i--) {
      args_.infallibleAppend(current->peek(-i));
    }
    current->popn(argc);

    // Get |this| and |callee|
    setThis(current->pop());
    setCallee(current->pop());

    return true;
  }

  void initForSpreadCall(MBasicBlock* current) {
    MOZ_ASSERT(args_.empty());

    if (constructing()) {
      setNewTarget(current->pop());
    }

    // Spread calls have one argument, an Array object containing the args.
    static_assert(decltype(args_)::InlineLength >= 1,
                  "Appending one argument should be infallible");
    MOZ_ALWAYS_TRUE(args_.append(current->pop()));

    // Get |this| and |callee|
    setThis(current->pop());
    setCallee(current->pop());

    argFormat_ = ArgFormat::Array;
  }

  void initForGetterCall(MDefinition* callee, MDefinition* thisVal) {
    MOZ_ASSERT(args_.empty());
    setCallee(callee);
    setThis(thisVal);
  }
  void initForSetterCall(MDefinition* callee, MDefinition* thisVal,
                         MDefinition* rhs) {
    MOZ_ASSERT(args_.empty());
    markAsSetter();
    setCallee(callee);
    setThis(thisVal);
    static_assert(decltype(args_)::InlineLength >= 1,
                  "Appending one argument should be infallible");
    MOZ_ALWAYS_TRUE(args_.append(rhs));
  }

  // Before doing any pop to the stack, capture whatever flows into the
  // instruction, such that we can restore it later.
  MOZ_MUST_USE bool savePriorCallStack(MBasicBlock* current, size_t peekDepth);

  void popPriorCallStack(MBasicBlock* current) {
    if (priorArgs_.empty()) {
      popCallStack(current);
    } else {
      current->popn(priorArgs_.length());
    }
  }

  MOZ_MUST_USE bool pushPriorCallStack(MBasicBlock* current) {
    if (priorArgs_.empty()) {
      return pushCallStack(current);
    }
    for (MDefinition* def : priorArgs_) {
      current->push(def);
    }
    return true;
  }

  void popCallStack(MBasicBlock* current) { current->popn(numFormals()); }

  MOZ_MUST_USE bool pushCallStack(MBasicBlock* current) {
    // Ensure sufficient space in the slots: needed for inlining from FunApply.
    if (apply_) {
      uint32_t depth = current->stackDepth() + numFormals();
      if (depth > current->nslots()) {
        if (!current->increaseSlots(depth - current->nslots())) {
          return false;
        }
      }
    }

    current->push(callee());
    current->push(thisArg());

    for (uint32_t i = 0; i < argc(); i++) {
      current->push(getArg(i));
    }

    if (constructing()) {
      current->push(getNewTarget());
    }

    return true;
  }

  uint32_t argc() const { return args_.length(); }
  uint32_t numFormals() const { return argc() + 2 + constructing(); }

  MOZ_MUST_USE bool setArgs(const MDefinitionVector& args) {
    MOZ_ASSERT(args_.empty());
    return args_.appendAll(args);
  }
  MOZ_MUST_USE bool replaceArgs(const MDefinitionVector& args) {
    args_.clear();
    return setArgs(args);
  }

  MDefinitionVector& argv() { return args_; }

  const MDefinitionVector& argv() const { return args_; }

  MDefinition* getArg(uint32_t i) const {
    MOZ_ASSERT(i < argc());
    return args_[i];
  }

  MDefinition* getArgWithDefault(uint32_t i, MDefinition* defaultValue) const {
    if (i < argc()) {
      return args_[i];
    }

    return defaultValue;
  }

  void setArg(uint32_t i, MDefinition* def) {
    MOZ_ASSERT(i < argc());
    args_[i] = def;
  }

  void removeArg(uint32_t i) { args_.erase(&args_[i]); }

  MDefinition* thisArg() const {
    MOZ_ASSERT(thisArg_);
    return thisArg_;
  }

  void setThis(MDefinition* thisArg) { thisArg_ = thisArg; }

  bool constructing() const { return constructing_; }

  bool ignoresReturnValue() const { return ignoresReturnValue_; }

  void setNewTarget(MDefinition* newTarget) {
    MOZ_ASSERT(constructing());
    newTargetArg_ = newTarget;
  }
  MDefinition* getNewTarget() const {
    MOZ_ASSERT(newTargetArg_);
    return newTargetArg_;
  }

  bool isSetter() const { return setter_; }
  void markAsSetter() { setter_ = true; }

  bool isInlined() const { return inlined_; }
  void markAsInlined() { inlined_ = true; }

  MDefinition* callee() const {
    MOZ_ASSERT(callee_);
    return callee_;
  }

  void setCallee(MDefinition* callee) { callee_ = callee; }

  template <typename Fun>
  void forEachCallOperand(Fun& f) {
    f(callee_);
    f(thisArg_);
    if (newTargetArg_) {
      f(newTargetArg_);
    }
    for (uint32_t i = 0; i < argc(); i++) {
      f(getArg(i));
    }
  }

  void setImplicitlyUsedUnchecked() {
    auto setFlag = [](MDefinition* def) { def->setImplicitlyUsedUnchecked(); };
    forEachCallOperand(setFlag);
  }

  ArgFormat argFormat() const { return argFormat_; }
  void setArgFormat(ArgFormat argFormat) { argFormat_ = argFormat; }

  MDefinition* arrayArg() const {
    MOZ_ASSERT(argFormat_ == ArgFormat::Array);
    MOZ_ASSERT_IF(!apply_, argc() == 1 + uint32_t(constructing_));
    MOZ_ASSERT_IF(apply_, argc() == 2 && !constructing_);
    return getArg(argc() - 1 - constructing_);
  }
};

class AutoAccumulateReturns {
  MIRGraph& graph_;
  MIRGraphReturns* prev_;

 public:
  AutoAccumulateReturns(MIRGraph& graph, MIRGraphReturns& returns)
      : graph_(graph) {
    prev_ = graph_.returnAccumulator();
    graph_.setReturnAccumulator(&returns);
  }
  ~AutoAccumulateReturns() { graph_.setReturnAccumulator(prev_); }
};

}  // namespace jit
}  // namespace js

#endif /* jit_MIRBuilderShared_h */
