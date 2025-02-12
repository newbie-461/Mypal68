/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef __nsconsolemessage_h__
#define __nsconsolemessage_h__

#include "mozilla/Attributes.h"

#include "nsIConsoleMessage.h"
#include "nsString.h"

class nsConsoleMessage final : public nsIConsoleMessage {
 public:
  nsConsoleMessage();
  explicit nsConsoleMessage(const char16_t* aMessage);

  NS_DECL_THREADSAFE_ISUPPORTS
  NS_DECL_NSICONSOLEMESSAGE

 private:
  ~nsConsoleMessage() = default;

  int64_t mTimeStamp;
  nsString mMessage;
};

#endif /* __nsconsolemessage_h__ */
