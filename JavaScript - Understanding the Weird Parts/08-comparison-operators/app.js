/*
    Coercion =>
    Number('1');        // 1
    Number(true);       // 1
    Number(false);      // 0
    Number(undefined);  // NaN
    Number(null);       // 0
    
    Some weird output with double Equality (==) – 
    1 == 1;             // true
    1 == '1';           // true
    1 == true;          // true
    null == 0;          // false
    null < 1;           // true
    Number(null);       // 0
    "" == 0;            // true
    "" == false;        // true
    
    Strict Equality -
    3 === 3; // true
    3 === “3”; // false
*/

var result1 = 1 < 2 < 3;
console.log(result1); // => true
/*
    Here we expect the output to be true bcz 3 less than 2 and 2 less than 1.
    However the result is true because of coersion.
    1.  var result2 = 1 < 2 < 3;
    2.  var result2 = true < 3;
    3.  var result2 = 1 < 3;    // true is coerced to number 1. [Number(false) => 0, Number(true) => 1 ]
    4.  var result2 = true; 
*/


var result2 = 3 < 2 < 1;
console.log(result2); // => true
/*
    Here we may expect the output to be false bcz 3 less than 2 and 2 less than 1.
    However the result is true. This is because of coersion.
    1.  var result2 = 3 < 2 < 1;
    2.  var result2 = false < 1;
    3.  var result2 = 0 < 1;    // false is coerced to number 0. [Number(false) => 0, Number(true) => 1 ]
    4.  var result2 = true; 
*/

