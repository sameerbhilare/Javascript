var person = new Object();

// accessing properties on the object using compute access operator '[' ']'
person["firstname"] = "Tony";
person["lastname"] = "Alicea";

var firstNameProperty = "firstname";

console.log(person);
console.log(person[firstNameProperty]);



// member access operator '.'
console.log(person.firstname);
console.log(person.lastname);

// object inside object
person.address = new Object();
person.address.street = "111 Main St.";
person.address.city = "New York";
person.address.state = "NY";

console.log(person.address.street);
console.log(person.address.city);
// using compute access operator '[' ']'
console.log(person["address"]["state"]);

