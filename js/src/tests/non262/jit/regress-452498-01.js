// |reftest| random -- bogus perf test (bug 540512)
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

//-----------------------------------------------------------------------------
var BUGNUMBER = 452498;
var summary = 'TM: upvar2: jit heavyweight functions';
var actual = '';
var expect = '';

printBugNumber(BUGNUMBER);
printStatus (summary);

function complex(aReal, aImag) {
  this.r = aReal;
  this.i = aImag;
  this.square = function() {
    return new complex(this.r * this.r - this.i * this.i,
                       2 * this.r * this.i);
  }
  this.dist = function() {
    return Math.sqrt(this.r * this.r + this.i * this.i);
  }
  this.add = function(aComplex) {
    return new complex(this.r + aComplex.r, this.i + aComplex.i);
  }
}

function mandelbrotValueOO (aC, aIterMax) {
  let Z = new complex(0.0, 0.0);
  for (var iter = 0; iter < aIterMax; iter++) {
    Z = Z.square().add(aC);
    if (Z.r * Z.r + Z.i * Z.i > 256) { break; }
  }
  return iter;
}

function f(trace) {
  var start = Date.now();
  const width = 60;
  const height = 60;
  const max_iters = 50;
  var output = [];
  for (let img_x = 0; img_x < width; img_x++) {
    for (let img_y = 0; img_y < height; img_y++) {
      let C = new complex(-2 + (img_x / width) * 3,
                          -1.5 + (img_y / height) * 3);
      var res = mandelbrotValueOO(C, max_iters);
      if (output.length > 0 && output[output.length -1][0] == res) {
        output[output.length-1][1]++;
      } else {
        output.push([res, 1]);
      }
    }
  }
  const reference = "[[2, 6], [3, 17], [4, 6], [5, 1], [50, 1], [5, 1], [4, 6], [3, 17], [2, 10], [3, 17], [4, 6], [5, 1], [6, 1], [50, 1], [6, 1], [5, 1], [4, 6], [3, 17], [2, 8], [3, 17], [4, 6], [5, 2], [6, 1], [50, 1], [6, 1], [5, 2], [4, 6], [3, 17], [2, 6], [3, 17], [4, 6], [5, 2], [6, 1], [7, 1], [50, 1], [7, 1], [6, 1], [5, 2], [4, 6], [3, 17], [2, 4], [3, 17], [4, 7], [5, 2], [6, 1], [8, 1], [50, 1], [8, 1], [6, 1], [5, 2], [4, 7], [3, 17], [2, 2], [3, 17], [4, 7], [5, 3], [6, 1], [9, 1], [50, 1], [9, 1], [6, 1], [5, 3], [4, 7], [3, 17], [2, 1], [3, 16], [4, 7], [5, 3], [6, 2], [8, 1], [50, 1], [8, 1], [6, 2], [5, 3], [4, 7], [3, 32], [4, 7], [5, 4], [6, 1], [7, 1], [8, 1], [50, 1], [8, 1], [7, 1], [6, 1], [5, 4], [4, 7], [3, 31], [4, 7], [5, 3], [6, 2], [7, 1], [8, 1], [50, 1], [8, 1], [7, 1], [6, 2], [5, 3], [4, 7], [3, 30], [4, 7], [5, 4], [6, 2], [7, 1], [8, 1], [50, 1], [8, 1], [7, 1], [6, 2], [5, 4], [4, 7], [3, 28], [4, 7], [5, 4], [6, 2], [7, 1], [8, 1], [10, 1], [50, 1], [10, 1], [8, 1], [7, 1], [6, 2], [5, 4], [4, 7], [3, 26], [4, 7], [5, 4], [6, 2], [7, 1], [8, 1], [9, 1], [11, 1], [50, 1], [11, 1], [9, 1], [8, 1], [7, 1], [6, 2], [5, 4], [4, 7], [3, 25], [4, 6], [5, 3], [6, 3], [7, 1], [8, 1], [18, 1], [13, 1], [15, 1], [50, 1], [15, 1], [13, 1], [18, 1], [8, 1], [7, 1], [6, 3], [5, 3], [4, 6], [3, 24], [4, 7], [5, 2], [6, 2], [7, 3], [8, 1], [10, 1], [14, 1], [50, 3], [14, 1], [10, 1], [8, 1], [7, 3], [6, 2], [5, 2], [4, 7], [3, 23], [4, 6], [5, 3], [7, 1], [8, 1], [9, 1], [8, 2], [10, 1], [11, 1], [15, 1], [50, 3], [15, 1], [11, 1], [10, 1], [8, 2], [9, 1], [8, 1], [7, 1], [5, 3], [4, 6], [3, 22], [4, 7], [5, 2], [6, 1], [7, 1], [14, 1], [16, 1], [11, 1], [10, 1], [12, 1], [20, 1], [23, 1], [46, 1], [50, 1], [46, 1], [23, 1], [20, 1], [12, 1], [10, 1], [11, 1], [16, 1], [14, 1], [7, 1], [6, 1], [5, 2], [4, 7], [3, 20], [4, 7], [5, 3], [6, 1], [7, 1], [8, 1], [10, 1], [17, 1], [16, 1], [20, 1], [50, 7], [20, 1], [16, 1], [17, 1], [10, 1], [8, 1], [7, 1], [6, 1], [5, 3], [4, 7], [3, 19], [4, 7], [5, 3], [6, 2], [7, 1], [10, 1], [21, 1], [50, 11], [21, 1], [10, 1], [7, 1], [6, 2], [5, 3], [4, 7], [3, 18], [4, 7], [5, 4], [6, 1], [7, 1], [8, 1], [9, 1], [13, 1], [25, 1], [50, 9], [25, 1], [13, 1], [9, 1], [8, 1], [7, 1], [6, 1], [5, 4], [4, 7], [3, 17], [4, 7], [5, 4], [6, 1], [7, 1], [8, 1], [14, 2], [50, 11], [14, 2], [8, 1], [7, 1], [6, 1], [5, 4], [4, 7], [3, 16], [4, 7], [5, 4], [6, 2], [7, 1], [8, 1], [11, 1], [36, 1], [50, 11], [36, 1], [11, 1], [8, 1], [7, 1], [6, 2], [5, 4], [4, 7], [3, 15], [4, 7], [5, 4], [6, 2], [7, 1], [8, 1], [9, 1], [14, 1], [50, 11], [14, 1], [9, 1], [8, 1], [7, 1], [6, 2], [5, 4], [4, 7], [3, 14], [4, 7], [5, 4], [6, 3], [7, 1], [8, 1], [9, 1], [12, 1], [26, 1], [50, 9], [26, 1], [12, 1], [9, 1], [8, 1], [7, 1], [6, 3], [5, 4], [4, 7], [3, 13], [4, 7], [5, 4], [6, 2], [7, 2], [8, 1], [9, 1], [10, 1], [15, 1], [50, 9], [15, 1], [10, 1], [9, 1], [8, 1], [7, 2], [6, 2], [5, 4], [4, 7], [3, 12], [4, 7], [5, 4], [6, 3], [7, 1], [8, 2], [9, 1], [10, 1], [12, 1], [16, 1], [50, 7], [16, 1], [12, 1], [10, 1], [9, 1], [8, 2], [7, 1], [6, 3], [5, 4], [4, 7], [3, 11], [4, 6], [5, 4], [6, 3], [7, 1], [8, 2], [9, 1], [11, 1], [12, 1], [14, 1], [17, 1], [23, 1], [34, 1], [50, 3], [34, 1], [23, 1], [17, 1], [14, 1], [12, 1], [11, 1], [9, 1], [8, 2], [7, 1], [6, 3], [5, 4], [4, 6], [3, 10], [4, 7], [5, 3], [6, 2], [7, 2], [8, 1], [9, 1], [22, 1], [12, 1], [50, 1], [25, 1], [50, 11], [25, 1], [50, 1], [12, 1], [22, 1], [9, 1], [8, 1], [7, 2], [6, 2], [5, 3], [4, 7], [3, 9], [4, 6], [5, 4], [6, 1], [7, 1], [8, 2], [9, 1], [14, 1], [50, 1], [21, 1], [50, 15], [21, 1], [50, 1], [14, 1], [9, 1], [8, 2], [7, 1], [6, 1], [5, 4], [4, 6], [3, 8], [4, 7], [5, 3], [6, 2], [9, 1], [14, 1], [13, 1], [11, 1], [13, 1], [26, 1], [50, 17], [26, 1], [13, 1], [11, 1], [13, 1], [14, 1], [9, 1], [6, 2], [5, 3], [4, 7], [3, 7], [4, 6], [5, 4], [6, 1], [7, 1], [9, 1], [49, 1], [43, 1], [50, 23], [43, 1], [49, 1], [9, 1], [7, 1], [6, 1], [5, 4], [4, 6], [3, 7], [4, 5], [5, 4], [6, 2], [7, 1], [9, 1], [13, 1], [50, 25], [13, 1], [9, 1], [7, 1], [6, 2], [5, 4], [4, 5], [3, 6], [4, 6], [5, 3], [6, 2], [7, 2], [9, 1], [11, 1], [17, 1], [50, 23], [17, 1], [11, 1], [9, 1], [7, 2], [6, 2], [5, 3], [4, 6], [3, 5], [4, 5], [5, 3], [6, 3], [7, 1], [8, 1], [9, 1], [50, 1], [26, 1], [50, 23], [26, 1], [50, 1], [9, 1], [8, 1], [7, 1], [6, 3], [5, 3], [4, 5], [3, 5], [4, 4], [5, 3], [6, 3], [7, 1], [8, 2], [10, 1], [21, 1], [50, 25], [21, 1], [10, 1], [8, 2], [7, 1], [6, 3], [5, 3], [4, 4], [3, 5], [4, 4], [5, 2], [6, 3], [7, 1], [12, 1], [9, 1], [10, 1], [11, 1], [50, 27], [11, 1], [10, 1], [9, 1], [12, 1], [7, 1], [6, 3], [5, 2], [4, 4], [3, 5], [4, 3], [5, 2], [6, 2], [7, 2], [9, 1], [42, 1], [15, 1], [23, 1], [14, 1], [50, 27], [14, 1], [23, 1], [15, 1], [42, 1], [9, 1], [7, 2], [6, 2], [5, 2], [4, 3], [3, 5], [4, 3], [5, 1], [6, 1], [20, 1], [9, 1], [8, 1], [9, 1], [10, 1], [16, 1], [50, 33], [16, 1], [10, 1], [9, 1], [8, 1], [9, 1], [20, 1], [6, 1], [5, 1], [4, 3], [3, 5], [4, 3], [5, 1], [6, 1], [9, 1], [13, 1], [12, 1], [11, 1], [38, 1], [25, 1], [50, 33], [25, 1], [38, 1], [11, 1], [12, 1], [13, 1], [9, 1], [6, 1], [5, 1], [4, 3], [3, 5], [4, 3], [5, 2], [6, 1], [7, 1], [10, 1], [24, 1], [25, 1], [50, 35], [25, 1], [24, 1], [10, 1], [7, 1], [6, 1], [5, 2], [4, 3], [3, 5], [4, 4], [5, 1], [6, 1], [7, 1], [11, 2], [13, 1], [19, 1], [50, 33], [19, 1], [13, 1], [11, 2], [7, 1], [6, 1], [5, 1], [4, 4], [3, 5], [4, 4], [5, 2], [6, 1], [50, 1], [8, 2], [17, 1], [19, 1], [35, 1], [14, 1], [24, 1], [50, 25], [24, 1], [14, 1], [35, 1], [19, 1], [17, 1], [8, 2], [50, 1], [6, 1], [5, 2], [4, 4], [3, 5], [4, 5], [5, 2], [6, 2], [7, 1], [8, 1], [9, 2], [11, 1], [38, 1], [50, 25], [38, 1], [11, 1], [9, 2], [8, 1], [7, 1], [6, 2], [5, 2], [4, 5], [3, 6], [4, 4], [5, 3], [6, 2], [7, 2], [8, 1], [9, 1], [15, 1], [50, 25], [15, 1], [9, 1], [8, 1], [7, 2], [6, 2], [5, 3], [4, 4], [3, 7], [4, 5], [5, 3], [6, 3], [7, 1], [9, 1], [42, 1], [21, 1], [50, 23], [21, 1], [42, 1], [9, 1], [7, 1], [6, 3], [5, 3], [4, 5], [3, 8], [4, 5], [5, 3], [6, 2], [7, 1], [8, 1], [9, 1], [13, 1], [50, 23], [13, 1], [9, 1], [8, 1], [7, 1], [6, 2], [5, 3], [4, 5], [3, 9], [4, 6], [5, 3], [6, 2], [7, 1], [9, 1], [14, 1], [50, 23], [14, 1], [9, 1], [7, 1], [6, 2], [5, 3], [4, 6], [3, 10], [4, 6], [5, 3], [6, 1], [7, 1], [9, 1], [16, 1], [50, 2], [35, 1], [50, 8], [13, 1], [50, 8], [35, 1], [50, 2], [16, 1], [9, 1], [7, 1], [6, 1], [5, 3], [4, 6], [3, 12], [4, 6], [5, 2], [6, 1], [19, 1], [16, 1], [17, 1], [25, 1], [21, 1], [13, 1], [18, 1], [50, 6], [11, 1], [9, 1], [11, 1], [50, 6], [18, 1], [13, 1], [21, 1], [25, 1], [17, 1], [16, 1], [19, 1], [6, 1], [5, 2], [4, 6], [3, 14], [4, 5], [5, 3], [6, 1], [8, 1], [16, 1], [10, 1], [8, 2], [11, 1], [50, 1], [16, 1], [15, 1], [32, 1], [29, 1], [9, 1], [8, 1], [7, 1], [8, 1], [9, 1], [29, 1], [32, 1], [15, 1], [16, 1], [50, 1], [11, 1], [8, 2], [10, 1], [16, 1], [8, 1], [6, 1], [5, 3], [4, 5], [3, 15], [4, 6], [5, 3], [6, 4], [7, 1], [20, 1], [19, 1], [9, 3], [7, 3], [6, 1], [7, 3], [9, 3], [19, 1], [20, 1], [7, 1], [6, 4], [5, 3], [4, 6], [3, 16], [4, 7], [5, 4], [6, 3], [7, 1], [6, 13], [7, 1], [6, 3], [5, 4], [4, 7], [3, 18], [4, 7], [5, 27], [4, 7], [3, 20], [4, 9], [5, 21], [4, 9], [3, 23], [4, 12], [5, 11], [4, 12], [3, 26], [4, 33], [3, 29], [4, 29], [3, 33], [4, 25], [3, 38], [4, 19], [3, 20], [2, 1], [3, 26], [4, 7], [3, 26], [2, 2], [3, 57], [2, 1]]";
  reportCompare(reference, JSON.stringify(output).replace(/,/g, ", "), summary + ': correctness jit=' + trace);
  return (Date.now() - start);
}


var timenonjit = f(false);
var timejit = f(true);

expect = true;
actual = timejit < timenonjit;

print('time nonjit: ' + timenonjit + ', time    jit: ' + timejit);

reportCompare(expect, actual, summary);
