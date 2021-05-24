/*

    Boolean(undefined);     // false
    Boolean(null);          // false
    Boolean("");            // false
    Boolean(0);             // false
    Boolean(1);             // true
    Boolean("abcd");        // true
*/

var a;

a = 0;

// a === 0 is MUST when 0 is valid value as per your code logic because Boolean(0) return false.
// if 0 is NOT a valid value as per your code logic, then just if (a) is sufficient.
if (a || a === 0) {     
  console.log('Something is there.');  
}