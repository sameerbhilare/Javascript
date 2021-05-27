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
john.__proto__ = person; // john inherits person
console.log(john.getFullName());    // inside getFullName(), 'this' points to 'john', without writing any extra code
console.log(john.firstname); // first looks for 'firstname' property inside 'john', if not found, then only checks inside 'person' object

var jane = {
    firstname: 'Jane'   
}

// don't do this EVER! for demo purposes only!!!
jane.__proto__ = person;

// inside getFullName(), 'this' points to 'jane'. 
// With 'this.lastname', it searches for property 'lastname' inside 'jane'
// It doesn't find there, so goes down to prototype chain, so to the 'person' object 
// and searches for property 'lastname' inside 'person' and there it finds it.
console.log(jane.getFullName()); 




person.getFormalFullName = function() {
    return this.lastname + ', ' + this.firstname;   
}

console.log(john.getFormalFullName());
console.log(jane.getFormalFullName());