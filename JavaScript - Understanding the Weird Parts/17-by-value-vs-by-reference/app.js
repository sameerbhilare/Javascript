// by value (primitives)
var a = 3;
var b;

b = a;
a = 2;

console.log(a); // => 2
console.log(b); // => 3



// by reference (all objects (including functions))
var c = { greeting: 'hi' };
var d;

d = c;  // c already exists in memory. So just point to same/existing address.
c.greeting = 'hello'; // mutate

console.log(c); // => { greeting: 'hello' }
console.log(d); // => { greeting: 'hello' }

// by reference (even as parameters)
function changeGreeting(obj) {
    obj.greeting = 'Hola'; // mutate   
}

changeGreeting(d);
console.log(c); // => { greeting: 'Hola' }
console.log(d); // => { greeting: 'Hola' }

// IMP ************************************************************************
// equals operator sets up new memory space (new address) if doesn't already exist in memory
c = { greeting: 'howdy' }; // { greeting: 'howdy' };dosn't already exist in memory. So create new address.
console.log(c); // => { greeting: 'howdy' }
console.log(d); // => { greeting: 'Hola' }