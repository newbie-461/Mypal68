/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

//-----------------------------------------------------------------------------
var BUGNUMBER = 452498;
var summary = 'TM: upvar2 regression tests';
var actual = '';
var expect = '';


//-----------------------------------------------------------------------------
test();
//-----------------------------------------------------------------------------

function test()
{
  printBugNumber(BUGNUMBER);
  printStatus (summary);

// ------- Comment #112 From Jesse Ruderman

  expect = 'ReferenceError: can\'t access lexical declaration \'q\' before initialization';

  try
  {
    q = new Function("(function() { q(3); })(); const q = undefined;"); q();
  }
  catch(ex)
  {
    actual = ex + '';
  }

  reportCompare(expect, actual, summary);
}
