// Function Construstor
function Person(firstname, lastname) {
 
    // In case of "new Person('John', 'Doe');", 'this' points to the empty object that was created because of 'new'
    // In case of "Person('John', 'Doe');", 'this' points to global object (window);
    console.log(this);  
    
    // adding properties to the empty object that was created due to 'new' operator
    this.firstname = firstname;
    this.lastname = lastname;
    console.log('This function is invoked.');
    
    // DO NOT RETURN ANYTHING FROM A 'FUNCTION CONSTRUCTOR'
}

/*
    With 'new', immediately a new empty object is created. 
    Then it invokes the function mentioned in front of new keyword.
    With new, the 'this' variable inside that function points to this newly created empty object ({}).
    And as long as the function that I used the new operator on, doesn't return a value, 
    the JavaScript engine will return that object that was created by the new operator (instead of returning undefined).
*/
var john = new Person('John', 'Doe');
console.log(john);

var jane = new Person('Jane', 'Doe');
console.log(jane);


var p1 = Person('John', 'Doe');
console.log(p1);