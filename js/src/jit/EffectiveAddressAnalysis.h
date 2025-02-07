/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef jit_EffectiveAddressAnalysis_h
#define jit_EffectiveAddressAnalysis_h

#include "mozilla/Attributes.h"

namespace js {
namespace jit {

class MIRGenerator;
class MIRGraph;

class EffectiveAddressAnalysis {
  MIRGenerator* mir_;
  MIRGraph& graph_;

  template <typename AsmJSMemoryAccess>
  void analyzeAsmJSHeapAccess(AsmJSMemoryAccess* ins);

 public:
  EffectiveAddressAnalysis(MIRGenerator* mir, MIRGraph& graph)
      : mir_(mir), graph_(graph) {}

  MOZ_MUST_USE bool analyze();
};

} /* namespace jit */
} /* namespace js */

#endif /* jit_EffectiveAddressAnalysis_h */
