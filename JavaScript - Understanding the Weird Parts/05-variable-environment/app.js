/*
    Variable environment is where the variables live that you've created and how they relate to each other in memory.
    Every execution context has its own variable environment.
*/
function b() {
	var myVar;
    console.log(myVar); // undefined
}

function a() {
	var myVar = 2;
    console.log(myVar); // 2
	b();
}

var myVar = 1;
console.log(myVar); // 1
a();
console.log(myVar); // 1
