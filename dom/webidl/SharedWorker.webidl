/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

[Exposed=Window]
interface SharedWorker : EventTarget {
    [Throws]
    constructor(USVString scriptURL,
                optional (DOMString or WorkerOptions) options = {});

    readonly attribute MessagePort port;
};

SharedWorker includes AbstractWorker;
