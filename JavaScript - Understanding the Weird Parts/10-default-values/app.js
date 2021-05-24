/*

    undefined || "Hello";   // "Hello"
    null || "Hello";        // "Hello"
    false || "Hello";       // "Hello"
    0 || "Hello";           // "Hello"
    true || "Hello";        // true
    1 || "Hello";           // 1

*/


function greet(name) {
    // this one line OR expression sets a default value, if not passed.
    name = name || 'Guest';     // undefined || "Guest";   // => "Guest"
    console.log('Hello ' + name);    
}

greet('Sameer');  // name is 'Sameer'
greet();        // name is undefined