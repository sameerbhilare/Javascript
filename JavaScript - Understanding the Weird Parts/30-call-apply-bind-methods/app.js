var person = {
    firstname: 'John',
    lastname: 'Doe',
    getFullName: function() {
        
        var fullname = this.firstname + ' ' + this.lastname;
        return fullname;
        
    }
}

var logName = function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());       // ************************ 'this'
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}

// logName(); // this fails. Uncaught TypeError: this.getFullName is not a function. 
// This is because 'this' inside logName points to global object & there is no getFullName at global level.

// bind method. 
/*
    The bind method returns a new function. So, it actually makes a copy of this logName function.
    We can pass to it whatever object we want to be the 'this' variable when the main function(here logname) runs.    
    
    With this, we are affecting the JavaScript engine as far as what it decides when it creates the execution context for this new copy of this (logName) function.
    
*/
var logPersonName = logName.bind(person);
logPersonName('en');


// call method. 
/*
    Unlike bind, which creates a copy of the function, call actually executes it.
    call method allows us to call the method normally.
    e.g. logName.call()  is exactly same as logName()
    
    Also we can pass an argument to it and then the 'this' variable inside that main function points to this argument.
    e.g. logName.call(person, 'en', 'es'); 
         // here the 'this' variable inside 'logName' will point to 'person' object.
    
    We can also pass parameters which the main function accepts in the 2nd argument onwards.
    e.g. logName.call(person, 'en', 'es');
        // here the 'this' variable inside 'logName' will point to 'person' object.
        // arguments to logName: 'en', 'es'
*/
logName.call(person, 'en', 'es');


// apply method.
/*
    apply() is exactly same as call() with only one difference. 
    The difference is apply() takes arguments as an array.
    e.g. logName.apply(person, ['en', 'es']);
*/
logName.apply(person, ['en', 'es']);




// ==================================================================================================================
// call, bind apply with Function expression and IIFE
(function(lang1, lang2) {

    console.log('Logged: ' + this.getFullName());   // 'this' ****************
    console.log('Arguments: ' + lang1 + ' ' + lang2);
    console.log('-----------');
    
}).apply(person, ['es', 'en']); // apply



// ==================================================================================================================
// function borrowing
// Note - person2 does not have getFullName function, unlike person1 object above.
var person2 = {
    firstname: 'Jane',
    lastname: 'Doe'
}

/*
    Note - person2 does not have getFullName function, unlike person1 object above.
    Here we are borrowing getFullName function of person1 by passing person2 obj to the apply() method. :)
    
    So you can grab methods from other objects and use them as long as you have similar property names so that the function which you are borrowing works. 
    Also if the function which you are borrowing does not use any properties of the parent object, then you can simply borrow it.
*/
console.log(person.getFullName.apply(person2));



// ==================================================================================================================
// function currying
/*
    This in particular has to do with the bind() 
    Because that's creating a copy of the function, and it actually does something rather interesting if you pass parameters to the bind.
    
    With call and apply, passing parameters just passes the parameters. 
    But with bind, you're creating a new copy of the function.
    So what happens if you pass parameters to it?
    Giving parameters to bind, sets the permanent values of the parameters when the copy is made.
    So with this line -
        var multipleByTwo = multiply.bind(this, 2); 
    simply means this -
        function multiply(b) {
            var a = 2;
            return a*b;   
        }
*/
function multiply(a, b) {
    return a*b;   
}

// creates a copy of multiply() function and set first parameter 'a' to 2 permanently.
var multipleByTwo = multiply.bind(this, 2); // 2 => a, 'this' does not matter here as it is not used inside multiply() function.
console.log(multipleByTwo(4));  // 4 ==> b

// creates a copy of multiply() function and set first parameter 'a' to 3 permanently.
var multipleByThree = multiply.bind(this, 3);
console.log(multipleByThree(4)); // 4 ==> b


// creates a copy of multiply() function and permanently sets a=2, b=2
var multipleByTwoByTwo = multiply.bind(this, 2, 2); // a=2, b=2, will always return 2 * 2 => 4
console.log(multipleByTwoByTwo(5));  // 5 ==> extra parameter. DOES NOT MAP to anthing.
