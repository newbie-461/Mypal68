/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#ifndef mozilla_dom_indexeddb_fileinfofwd_h__
#define mozilla_dom_indexeddb_fileinfofwd_h__

namespace mozilla::dom::indexedDB {

class FileManager;
template <typename FileManager>
class FileInfoT;

using FileInfo = FileInfoT<indexedDB::FileManager>;

}  // namespace mozilla::dom::indexedDB

#endif  // mozilla_dom_indexeddb_fileinfofwd_h__
