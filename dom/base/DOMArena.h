/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
#ifndef DOM_Arena_h___
#define DOM_Arena_h___
#include "nsISupportsImpl.h"
#include "mozmemory.h"

#define NS_DECL_DOMARENA_DESTROY void Destroy(void);

#define NS_IMPL_DOMARENA_DESTROY(class)                              \
  void class ::Destroy(void) {                                       \
    if (StaticPrefs::dom_arena_allocator_enabled_AtStartup()) {      \
      RefPtr<nsNodeInfoManager> nim = OwnerDoc()->NodeInfoManager(); \
      RefPtr<DOMArena> arena =                                       \
          HasFlag(NODE_KEEPS_DOMARENA)                               \
              ? nsContentUtils::TakeEntryFromDOMArenaTable(this)     \
              : nullptr;                                             \
      this->~class();                                                \
      MOZ_ASSERT(nim, "nsNodeInfoManager needs to be initialized");  \
      nim->Free(this);                                               \
    } else {                                                         \
      delete this;                                                   \
    }                                                                \
  }

namespace mozilla {
namespace dom {

class DOMArena {
 public:
  friend class DocGroup;
  DOMArena() { mArenaId = moz_create_arena(); }

  NS_INLINE_DECL_REFCOUNTING(DOMArena)

  void* Allocate(size_t aSize) {
    void* ret = moz_arena_malloc(mArenaId, aSize);
    if (!ret) {
      MOZ_CRASH("run out of memory");
    }
    return ret;
  }

 private:
  ~DOMArena() { moz_dispose_arena(mArenaId); }
  arena_id_t mArenaId;
};
}  // namespace dom
}  // namespace mozilla
#endif
