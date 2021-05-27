var person = {
    firstname: 'Default',
    lastname: 'Default',
    getFullName: function() {
        return this.firstname + ' ' + this.lastname;  
    }
}

var john = {
    firstname: 'John',
    lastname: 'Doe'
}

// don't do this EVER! for demo purposes only!!!
john.__proto__ = person;

// JavaScript object has the ability to look at its own properties and methods. 
// loop over every member in the 'john' object
for (var prop in john) {
    
    // only members of 'john', not from prototype chain
    if (john.hasOwnProperty(prop)) {
        console.log(prop + ': ' + john[prop]); // print name and value for each member (property/function)
    }
}



var jane = {
    address: '111 Main St.',
    getFormalFullName: function() {
        return this.lastname + ', ' + this.firstname;   
    }
}

var jim = {
    getFirstName: function() {
        return firstname;   
    }
}

// Using 'extend' underscore.js function to compose objects.
// It takes all the properties and methods of 'jane' and 'jim' 
// and adds them DIRECTLY(not via proto) to 'john' object (using reflection). 
// See source code of extend method in underscore.js
_.extend(john, jane, jim);

console.log(john);








