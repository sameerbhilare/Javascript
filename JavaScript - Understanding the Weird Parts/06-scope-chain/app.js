/*
1. Variable environment is where the variables live that you've created and how they relate to each other in memory.
2. Every execution context has its own variable environment.
3. However when we request a variable or when we do something with the variable, JavaScript does more then just look in the variable environment of the currently executing context.
4. Every execution context has a reference to its outer (lexical) environment.
5. JavaScript does something special, it cares about the lexical environment when it comes to the outer (lexical)            environment reference that every execution context gets. 
   And when you ask for a variable while running a line of code inside any particular execution context, and if it can't find that variable, it will look at the outer (lexical) environment reference and go look for variables there somewhere down below it in the execution stack. 
   And that outer (lexical) environment reference where that points is going to depend on where the function sits lexically.
*/


/*******************************************************************************
// Example 1 - Functions a, b and variable myVar are lexically at global level.*/ 
/*
Function b() lexically sits on top of the global environment. 
It's sitting right there at the same level as that last line where var myVar = 1.
*/
function b() {
    // Every execution context has a reference to its outer environment.
    // here b's execution context has reference of global execution context.
    console.log('myVar',myVar); // 1 (from outer environement reference which is global execution context) ******
}

function a() {    
    var myVar = 2;
	b();
}

var myVar = 1;
a();


/*******************************************************************************
// Example 2 - Functions a2 and variable myVar2 are lexically at global level.
               But funtion b2 is lexically inside a2 level. 
               So b2's outer environement reference is a2.'*/ 
function a2() {
    
    function b2() {
        console.log('myVar2',myVar2); // 2 (from outer environement reference which is a2's execution context) ******
    }
    
    var myVar2 = 2;
	b2();
}

var myVar2 = 1;
a2();
//b2(); // this will not work. Uncaught ReferenceError: b2 is not defined
