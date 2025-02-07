// |reftest| skip-if(Android) -- bug - nsIDOMWindow.crypto throws NS_ERROR_NOT_IMPLEMENTED on Android
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */


/**
 *  File Name:          forin-002.js
 *  ECMA Section:
 *  Description:        The forin-001 statement
 *
 *  Verify that the property name is assigned to the property on the left
 *  hand side of the for...in expression.
 *
 *  Author:             christine@netscape.com
 *  Date:               28 August 1998
 */
var SECTION = "forin-002";
var VERSION = "ECMA_2";
var TITLE   = "The for...in  statement";

startTest();
writeHeaderToLog( SECTION + " "+ TITLE);

function MyObject( value ) {
  this.value = value;
  this.valueOf = new Function ( "return this.value" );
  this.toString = new Function ( "return this.value + \"\"" );
  this.toNumber = new Function ( "return this.value + 0" );
  this.toBoolean = new Function ( "return Boolean( this.value )" );
}

ForIn_1(this);
ForIn_2(this);

ForIn_1(new MyObject(true));
ForIn_2(new MyObject(new Boolean(true)));

ForIn_2(3);

test();

/**
 *  For ... In in a With Block
 *
 */
function ForIn_1( object) {
  with ( object ) {
    for ( property in object ) {
      new TestCase(
	SECTION,
	"with loop in a for...in loop.  ("+object+")["+property +"] == "+
	"eval ( " + property +" )",
	true,
	object[property] == eval(property) );
    }
  }
}

/**
 *  With block in a For...In loop
 *
 */
function ForIn_2(object) {
  for ( property in object ) {
    with ( object ) {
      new TestCase(
	SECTION,
	"with loop in a for...in loop.  ("+object+")["+property +"] == "+
	"eval ( " + property +" )",
	true,
	object[property] == eval(property) );
    }
  }
}
