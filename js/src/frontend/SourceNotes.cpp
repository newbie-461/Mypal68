/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "frontend/SourceNotes.h"

const js::SrcNote::Spec js::SrcNote::specs_[] = {
#define DEFINE_SRC_NOTE_SPEC(sym, name, arity) {name, arity},
    FOR_EACH_SRC_NOTE_TYPE(DEFINE_SRC_NOTE_SPEC)
#undef DEFINE_SRC_NOTE_SPEC
};
