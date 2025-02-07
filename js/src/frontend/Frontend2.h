/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef frontend_Frontend2_h
#define frontend_Frontend2_h

#include "mozilla/Utf8.h"  // mozilla::Utf8Unit

#include <stddef.h>  // size_t
#include <stdint.h>  // uint8_t

#include "js/CompileOptions.h"  // JS::ReadOnlyCompileOptions
#include "js/RootingAPI.h"      // JS::Handle
#include "js/SourceText.h"      // JS::SourceText
#include "js/UniquePtr.h"       // js::UniquePtr
#include "vm/JSScript.h"        // JSScript

struct JSContext;

struct SmooshResult;

namespace js {

class ScriptSourceObject;

namespace frontend {

struct CompilationInfo;
struct CompilationGCOutput;
struct CompilationState;

// This is declarated as a class mostly to solve dependency around `friend`
// declarations in the simple way.
class Smoosh {
 public:
  static bool compileGlobalScript(JSContext* cx,
                                  CompilationInfo& compilationInfo,
                                  JS::SourceText<mozilla::Utf8Unit>& srcBuf,
                                  CompilationGCOutput& gcOutput,
                                  bool* unimplemented);

  static bool compileGlobalScriptToStencil(
      JSContext* cx, CompilationInfo& compilationInfo,
      JS::SourceText<mozilla::Utf8Unit>& srcBuf, bool* unimplemented);

  static UniquePtr<CompilationInfo> compileGlobalScriptToStencil(
      JSContext* cx, const JS::ReadOnlyCompileOptions& options,
      JS::SourceText<mozilla::Utf8Unit>& srcBuf, bool* unimplemented);
};

// Initialize SmooshMonkey globals, such as the logging system.
void InitSmoosh();

// Use the SmooshMonkey frontend to parse and free the generated AST. Returns
// true if no error were detected while parsing.
MOZ_MUST_USE bool SmooshParseScript(JSContext* cx, const uint8_t* bytes,
                                    size_t length);
MOZ_MUST_USE bool SmooshParseModule(JSContext* cx, const uint8_t* bytes,
                                    size_t length);

}  // namespace frontend

}  // namespace js

#endif /* frontend_Frontend2_h */
