function buildFunctions() {
 
    var arr = [];
    console.log(i);
    
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

fs[0]();    // => 3     ****************************************************8
fs[1]();    // => 3
fs[2]();    // => 3


// Solution using 'var'
function buildFunctions2() {
 
    var arr = [];
    
    for (var i = 0; i < 3; i++) {
        // solution with var is to provide seperate execution context. hence need to use IIFE
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

fs2[0]();
fs2[1]();
fs2[2]();