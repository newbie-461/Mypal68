/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * The origin of this IDL file is
 * http://dev.w3.org/2011/webrtc/editor/getusermedia.html
 *
 * Copyright © 2012 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C
 * liability, trademark and document use rules apply.
 */

[Func="Navigator::HasUserMediaSupport",
 Exposed=Window]
interface MediaDevices : EventTarget {
  [Pref="media.ondevicechange.enabled"]
  attribute EventHandler ondevicechange;
  MediaTrackSupportedConstraints getSupportedConstraints();

  [Throws, NeedsCallerType]
  Promise<sequence<MediaDeviceInfo>> enumerateDevices();

  [Throws, NeedsCallerType]
  Promise<MediaStream> getUserMedia(optional MediaStreamConstraints constraints = {});

  [SecureContext, Throws, NeedsCallerType]
  Promise<MediaStream> getDisplayMedia(optional DisplayMediaStreamConstraints constraints = {});
};
