/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * The origin of this IDL file is
 * https://www.w3.org/TR/credential-management-1/
 */

[Exposed=Window, SecureContext, Pref="security.webauth.webauthn"]
interface Credential {
  readonly attribute USVString id;
  readonly attribute DOMString type;
};

[Exposed=Window, SecureContext, Pref="security.webauth.webauthn"]
interface CredentialsContainer {
  [Throws]
  Promise<Credential?> get(optional CredentialRequestOptions options = {});
  [Throws]
  Promise<Credential?> create(optional CredentialCreationOptions options = {});
  [Throws]
  Promise<Credential> store(Credential credential);
  [Throws]
  Promise<void> preventSilentAccess();
};

dictionary CredentialRequestOptions {
  // FIXME: bug 1493860: should this "= {}" be here?
  PublicKeyCredentialRequestOptions publicKey = {};
  AbortSignal signal;
};

dictionary CredentialCreationOptions {
  // FIXME: bug 1493860: should this "= {}" be here?
  PublicKeyCredentialCreationOptions publicKey = {};
  AbortSignal signal;
};
