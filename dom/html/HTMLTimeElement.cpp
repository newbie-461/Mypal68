/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

#include "HTMLTimeElement.h"
#include "mozilla/dom/HTMLTimeElementBinding.h"
#include "nsGenericHTMLElement.h"
#include "nsVariant.h"
#include "nsGkAtoms.h"

NS_IMPL_NS_NEW_HTML_ELEMENT(Time)

namespace mozilla {
namespace dom {

HTMLTimeElement::HTMLTimeElement(
    already_AddRefed<mozilla::dom::NodeInfo>&& aNodeInfo)
    : nsGenericHTMLElement(std::move(aNodeInfo)) {}

HTMLTimeElement::~HTMLTimeElement() = default;

NS_IMPL_ELEMENT_CLONE(HTMLTimeElement)

JSObject* HTMLTimeElement::WrapNode(JSContext* cx,
                                    JS::Handle<JSObject*> aGivenProto) {
  return HTMLTimeElement_Binding::Wrap(cx, this, aGivenProto);
}

}  // namespace dom
}  // namespace mozilla
