/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef GPU_ShaderModule_H_
#define GPU_ShaderModule_H_

#include "nsWrapperCache.h"
#include "ObjectModel.h"

namespace mozilla {
namespace webgpu {

class Device;

class ShaderModule final : public ObjectBase, public ChildOf<Device> {
 public:
  GPU_DECL_CYCLE_COLLECTION(ShaderModule)
  GPU_DECL_JS_WRAP(ShaderModule)

 private:
  ShaderModule() = delete;
  virtual ~ShaderModule();
};

}  // namespace webgpu
}  // namespace mozilla

#endif  // GPU_ShaderModule_H_
