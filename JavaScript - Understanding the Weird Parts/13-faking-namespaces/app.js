// imagine these two variables coming from two different files. The file placed last will win.
var greet = 'Hello!';
var greet = 'Hola!'; 

console.log(greet);

// we can avoid above situation by 'faking namespace'
// containing the variables and properties inside main container.
// here the properties/variables greetings, basic are contained inside main container 'english'
// so our variables will be unique across multiple .js files and won't collide with variables from other .js files
// faking namespaces is common across frameworks and libraries.
var english = { 
    greetings: { 
        basic: 'Hello!' 
    } 
};

var spanish = {};

spanish.greet = 'Hola!';

console.log(english);