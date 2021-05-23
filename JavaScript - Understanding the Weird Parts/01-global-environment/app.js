/*
    Without even a single line of code, JavaScript execuation context create 2 things - 
    1. Global object (window in case of browser)
    2. 'this' variable.
    And at the global level those two things are equal so window object = this
*/

// global variable. can be accessed as 'a' or window.a
var a = 'Hello World';

// global function. can be accessed as 'b' or window.b
function b() {
    
}