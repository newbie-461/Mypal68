/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "WindowIdentifier.h"

#include "mozilla/dom/ContentChild.h"
#include "nsPIDOMWindow.h"

namespace mozilla {
namespace hal {

WindowIdentifier::WindowIdentifier() : mWindow(nullptr), mIsEmpty(true) {}

WindowIdentifier::WindowIdentifier(nsPIDOMWindowInner* window)
    : mWindow(window), mIsEmpty(false) {
  mID.AppendElement(GetWindowID());
}

WindowIdentifier::WindowIdentifier(const nsTArray<uint64_t>& id,
                                   nsPIDOMWindowInner* window)
    : mID(id), mWindow(window), mIsEmpty(false) {
  mID.AppendElement(GetWindowID());
}

WindowIdentifier::WindowIdentifier(const WindowIdentifier& other)
    : mID(other.mID), mWindow(other.mWindow), mIsEmpty(other.mIsEmpty) {}

const nsTArray<uint64_t>& WindowIdentifier::AsArray() const {
  MOZ_ASSERT(!mIsEmpty);
  return mID;
}

bool WindowIdentifier::HasTraveledThroughIPC() const {
  MOZ_ASSERT(!mIsEmpty);
  return mID.Length() >= 2;
}

void WindowIdentifier::AppendProcessID() {
  MOZ_ASSERT(!mIsEmpty);
  mID.AppendElement(dom::ContentChild::GetSingleton()->GetID());
}

uint64_t WindowIdentifier::GetWindowID() const {
  MOZ_ASSERT(!mIsEmpty);
  return mWindow ? mWindow->WindowID() : UINT64_MAX;
}

nsPIDOMWindowInner* WindowIdentifier::GetWindow() const {
  MOZ_ASSERT(!mIsEmpty);
  return mWindow;
}

}  // namespace hal
}  // namespace mozilla
