var a;
console.log(a); // it will print 'undefined'

// Never set yourself a variable equal to undefined. It is meant to be set by JavaScript in creation phase.
// It's better to let ‘undefined’ mean that I, the programmer, never set this value. That will really help you when debugging code.
// a = undefined;

if (a === undefined) {
    console.log('a is undefined');
} else {
    console.log('a is defined');
}

console.log(b); // this will throw error - "Uncaught ReferenceError: b is not defined"

// undefined and 'not defined' are NOT same.
// 'undefined' is actually a special value that JavaScript has within it internally that means that the variable hasn't been set.
// The error "Uncaught ReferenceError: b is not defined" simply means the variable is not present in the memory space which was created in the creation phase.