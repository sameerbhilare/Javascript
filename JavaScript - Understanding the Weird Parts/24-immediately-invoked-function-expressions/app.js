// function statement
function greet(name) {
    console.log('Hello ' + name);   
}
greet('John');

// using a function expression
var greetFunc = function(name) {
    console.log('Hello ' + name);
};
greetFunc('John');

// using an Immediately Invoked Function Expression (IIFE)
// bcz This invokes the function immediately after creating it.
var greeting = function(name) {
    
    return 'Hello ' + name;
    
}('John');

console.log(greeting);


var firstname = 'John';
// IIFE - for function expression
/*
    This is similar to typing 3; or "test string"; standalone, without storing the value to a variable
    We only use parenthesis '(' and ')' with expressions e.g. (3+4)*2
    You never put a statement inside parentheses, like 'if ()'.
    It always is an expression, something that returns a value.
    
    So since the JavaScript engine knows that anything inside a parentheses must be an expression, 
    it assumes that this below function that you've written is a function expression.
    So using parentheses is to trick syntax parser from throwing errors.
    
    This turns out to be a wonderful tool in your arsenal, as a JavaScript developer.
    And you'll see this form, this style in almost every major framework and library that's out there today.
*/
(function(name) {
    
    var greeting = 'Inside IIFE: Hello';
    console.log(greeting + ' ' + name);
    
}(firstname)); // way 1 of invoking IIFE. (BEFORE closing of outermost parenthesis)


(function(name) {
    
    var greeting = 'Inside IIFE: Hello';
    console.log(greeting + ' ' + name);
    
})(firstname); // way 2 of invoking IIFE. (AFTER closing of outermost parenthesis)


// both ways of invoking are right.
















