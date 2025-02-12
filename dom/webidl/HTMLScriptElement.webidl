/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * The origin of this IDL file is
 * http://www.whatwg.org/specs/web-apps/current-work/#the-script-element
 * http://www.whatwg.org/specs/web-apps/current-work/#other-elements,-attributes-and-apis
 */

[Exposed=Window]
interface HTMLScriptElement : HTMLElement {
  [HTMLConstructor] constructor();

  [CEReactions, SetterNeedsSubjectPrincipal=NonSystem, SetterThrows]
  attribute DOMString src;
  [CEReactions, SetterThrows]
  attribute DOMString type;
  [CEReactions, SetterThrows, Pref="dom.moduleScripts.enabled"]
  attribute boolean noModule;
  [CEReactions, SetterThrows]
  attribute DOMString charset;
  [CEReactions, SetterThrows]
  attribute boolean async;
  [CEReactions, SetterThrows]
  attribute boolean defer;
  [CEReactions, SetterThrows]
  attribute DOMString? crossOrigin;
  [CEReactions, SetterThrows]
  attribute DOMString referrerPolicy;
  [CEReactions, Throws]
  attribute DOMString text;
};

// http://www.whatwg.org/specs/web-apps/current-work/#other-elements,-attributes-and-apis
partial interface HTMLScriptElement {
  [CEReactions, SetterThrows]
  attribute DOMString event;
  [CEReactions, SetterThrows]
  attribute DOMString htmlFor;
};

// https://w3c.github.io/webappsec/specs/subresourceintegrity/#htmlscriptelement-1
partial interface HTMLScriptElement {
  [CEReactions, SetterThrows]
  attribute DOMString integrity;
};
