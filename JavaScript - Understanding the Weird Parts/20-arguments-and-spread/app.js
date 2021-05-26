function greet(firstname, lastname, language) {
 
    language = language || 'en'; // setting default parameter
    
    if (arguments.length === 0) {   // 'arguments' variable
        console.log('Missing parameters!');
        console.log('-------------');
        return;
    }
    
    console.log(firstname);
    console.log(lastname);
    console.log(language);
    console.log(arguments); // 'arguments' variable
    console.log('arg 0: ' + arguments[0]);
    console.log('-------------');
    
}

greet();
greet('John');
greet('John', 'Doe');
greet('John', 'Doe', 'es');

// in ES6 I can do:  function greet(firstname, ...other)
// and 'other' will be an array that contains the rest of the arguments
