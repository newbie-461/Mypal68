/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef GPU_BUFFER_H_
#define GPU_BUFFER_H_

#include "mozilla/dom/Nullable.h"
#include "mozilla/dom/TypedArray.h"
#include "ObjectModel.h"

namespace mozilla {
namespace webgpu {

class Device;

class Buffer final : public ObjectBase, public ChildOf<Device> {
 public:
  GPU_DECL_CYCLE_COLLECTION(Buffer)
  GPU_DECL_JS_WRAP(Buffer)

 private:
  explicit Buffer(Device* parent);
  virtual ~Buffer();

 public:
};

}  // namespace webgpu
}  // namespace mozilla

#endif  // GPU_BUFFER_H_
