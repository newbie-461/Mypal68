// |reftest| error:SyntaxError
// This file was procedurally generated from the following sources:
// - src/assignment-target-type/primaryexpression-regularexpressionliteral.case
// - src/assignment-target-type/invalid/parenthesized.template
/*---
description: PrimaryExpression RegularExpressionLiteral; Return invalid. (ParenthesizedExpression)
esid: sec-grouping-operator-static-semantics-assignmenttargettype
flags: [generated]
negative:
  phase: parse
  type: SyntaxError
info: |
    ParenthesizedExpression: (Expression)

    Return AssignmentTargetType of Expression.
---*/

$DONOTEVALUATE();

function _() {
  (/1/) = 1;
}
