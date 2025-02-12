/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * The origin of this IDL file is
 * http://www.w3.org/TR/SVG2/
 *
 * Copyright © 2012 W3C® (MIT, ERCIM, Keio), All Rights Reserved. W3C
 * liability, trademark and document use rules apply.
 */

[Exposed=Window]
interface SVGFEMorphologyElement : SVGElement {

  // Morphology Operators
  const unsigned short SVG_MORPHOLOGY_OPERATOR_UNKNOWN = 0;
  const unsigned short SVG_MORPHOLOGY_OPERATOR_ERODE = 1;
  const unsigned short SVG_MORPHOLOGY_OPERATOR_DILATE = 2;

  [Constant]
  readonly attribute SVGAnimatedString in1;
  [Constant]
  readonly attribute SVGAnimatedEnumeration operator;
  [Constant]
  readonly attribute SVGAnimatedNumber radiusX;
  [Constant]
  readonly attribute SVGAnimatedNumber radiusY;
};

SVGFEMorphologyElement includes SVGFilterPrimitiveStandardAttributes;
