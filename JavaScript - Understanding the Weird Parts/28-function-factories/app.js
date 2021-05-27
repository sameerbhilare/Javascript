/*
    There are lots of ways in which closures are useful in JavaScript.
    We can use closures to our advantage for making patterns that would be otherwise impossible. 
    e.g. Function Factories.
*/
function makeGreeting(language) {
 
    return function(firstname, lastname) {
     
        if (language === 'en') {
            console.log('Hello ' + firstname + ' ' + lastname);   
        }

        if (language === 'es') {
            console.log('Hola ' + firstname + ' ' + lastname);   
        }
        
    }
    
}

/*
    It's important to remember that even though it's the same function (makeGreeting),
    every time I execute it, it creates a new execution context.
    It's a new memory space, no matter how many times I call it.
    
    The key is realizing that every time you call a function, it gets its own execution context, 
    and any functions created inside of it will point to that execution context memory.
*/

// seperate execution context for new call.
// So, greetEnglish is a function object whose closure points to language being English.
var greetEnglish = makeGreeting('en');

// seperate execution context for new call.
// And greetSpanish is a function object whose closure points to a different execution context 
// for the same function where language is Spanish.
var greetSpanish = makeGreeting('es');


greetEnglish('John', 'Doe');
greetSpanish('John', 'Doe');