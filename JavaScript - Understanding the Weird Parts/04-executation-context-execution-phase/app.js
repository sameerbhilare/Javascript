// global function. can be accessed as 'b' or window.b
function b() {
    console.log('Called b!');
}

// using variable and function 
b();

console.log(a); // undefined

// global variable. can be accessed as 'a' or window.a
var a = 'Hello World!';

console.log(a);// 'Hello World!'