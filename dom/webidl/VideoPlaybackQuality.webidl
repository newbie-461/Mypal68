/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * The origin of this IDL file is
 * http://dvcs.w3.org/hg/html-media/raw-file/default/media-source/media-source.html
 *
 * Copyright © 2012 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C
 * liability, trademark and document use rules apply.
 */

[Pref="media.mediasource.enabled",
 Exposed=Window]
interface VideoPlaybackQuality {
  readonly attribute DOMHighResTimeStamp creationTime;
  readonly attribute unsigned long totalVideoFrames;
  readonly attribute unsigned long droppedVideoFrames;
  readonly attribute unsigned long corruptedVideoFrames;
// At Risk: readonly attribute double totalFrameDelay;
};

