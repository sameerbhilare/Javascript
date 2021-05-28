// polyfill
if (!Object.create) {   
    // if Object.create is not supported, create Object.create function
    Object.create = function (o) {
        // validation
        if (arguments.length > 1) {
            throw new Error('Object.create implementation'
                + ' only accepts the first parameter.');
        }
        
        // main code of Object.create
        // What Object.create is supposed to do is -
        // You give it an object, and that becomes the prototype of a new empty object.
        function F() {}     // creates an empty function
        F.prototype = o;    // sets its prototype to passed in objecy
        return new F();     // returns an object of this function
    };
}

var person = {
    firstname: 'Default',
    lastname: 'Default',
    greet: function() {
        return 'Hi ' + this.firstname;   // 'this' points to person object
    }
}

/*
    Object.create creates an empty object with its prototype pointing at whatever you passed into Object.create.
    This is pure prototypal inheritance.
    You simply make objects and then create new objects from them pointing to other objects as their prototype.
    
    So members (properties/methods) of Object.create() are SHARED among all the objects created from that object(e.g.person)
    
    If you want to define a new object, you create a new object that becomes the basis for all others.
    And then you simply override, hide properties and methods on those created objects by setting the values of those properties and methods on the new objects themselves.
*/
var john = Object.create(person);
console.log(john); // at this point 'john' will not have its own properties.
// override the properties present in 'person' object
john.firstname = 'John';
john.lastname = 'Doe';
console.log(john);