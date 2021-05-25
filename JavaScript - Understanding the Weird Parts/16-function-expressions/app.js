greet();    // this works because of 'Hoisting'

// function statement
function greet() {
    console.log('hi');   
}

anonymousGreet(); // this will not work because the 'variable' anonymousGreet is undefined at this point

// function expression
// function expressions are NOT hoisted because we are assigning it to a 'variable'.
// and variables are hoisted with default initial values ('undefined')
var anonymousGreet = function() {
    console.log('hi');   
}

anonymousGreet(); // this line works



/*
    This concept of first class functions, where you can pass functions around, 
    give functions to other functions, use them like you do variables, 
    introduces an entirely new class of programming called functional programming.
*/
function log(a) {
   a();    
}

// passing function using function expression as an argument
log(function() {
    console.log('hi');   
});


