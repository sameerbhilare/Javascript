/*
    Variable environment is where the variables live that you've created and how they relate to each other in memory.
    Every execution context has its own variable environment.
*/
function b() {
	var myVar;
    console.log(myVar); // undefined (from b's execution context)
}

function a() {
	var myVar = 2;
    console.log(myVar); // 2 (from a's execution context)
	b();
}

var myVar = 1;
console.log(myVar); // 1 (from global execution context)
a();
console.log(myVar); // 1 (from global execution context)
