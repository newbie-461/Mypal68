/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "js/friend/XrayJitInfo.h"

#include "jit/CacheIR.h"  // js::jit::GetXrayJitInfo

using JS::XrayJitInfo;

static XrayJitInfo* gXrayJitInfo = nullptr;

void JS::SetXrayJitInfo(XrayJitInfo* info) { gXrayJitInfo = info; }

XrayJitInfo* js::jit::GetXrayJitInfo() { return gXrayJitInfo; }
