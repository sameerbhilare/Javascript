console.log('Problem: With var and closure');
// problem
function buildFunctions() {
 
    var arr = [];
    
    // change 'var' to 'let'. You will see correct result
    // because var is function scoped and hence stored (single) in memory
    // let is block scoped and hence stored in segments inside memory.
    for (var i = 0; i < 3; i++) { 
        
        // array of functions
        arr.push(
            function() {
                console.log(i);   
            }
        )
        
    }
    
    return arr;
}

var fs = buildFunctions();

fs[0]();    // => 3     ****************************************************
fs[1]();    // => 3
fs[2]();    // => 3



console.log('Solution using var and IIFE');

// Solution using 'var'
function buildFunctions2() {
 
    var arr = [];
    
    for (var i = 0; i < 3; i++) {
        /*
            Solution with var is to provide seperate execution context. 
            In order to preserve the value of i for this function we need a separate execution context for each of the functions that we're pushing into the array.
            So basically we need a parent scope that holds the current value of i as the loop goes.
            And the only way to get an execution context is to execute a function.
            So here we have to use IIFE.
            
            So every time the loop runs, it's going to execute this IIFE function, 
            passing 0, then it's going to execute a new one, 
            passing 1, then it's gonna execute a new one, passing 2, 
            and each of those executions creates their own execution contexts, 
            and j will be stored in each of those three execution contexts.
            
            And even though those execution contexts will go away after this line is run,
            we know thanks to closures, all those three 'j's for those three different execution contexts 
            will be hanging out.
        */
        arr.push(
            (function(j) {
                return function() {
                    // here 'j' will be searched in the parent execution context memory.
                    console.log(j);   
                }
            }(i))
        )
        
    }
    
    return arr;
}

var fs2 = buildFunctions2();

fs2[0]();    // => 0
fs2[1]();    // => 1
fs2[2]();    // => 2





console.log('Solution using let (ES6)');
// Solution using let (ES6)
function buildFunctions3() {
 
    var arr = [];
    
    /*
        Just change 'var' to 'let' for variable i. 
        You will see correct result because 'var' is function scoped and hence stored (single) in memory
        and 'let' is block scoped and hence stored in segments inside memory.
    */
    for (let i = 0; i < 3; i++) { 
        
        // array of functions
        arr.push(
            function() {
                console.log(i);   
            }
        )
        
    }
    
    return arr;
}

var fs3 = buildFunctions3();

fs3[0]();    // => 0
fs3[1]();    // => 1
fs3[2]();    // => 2

