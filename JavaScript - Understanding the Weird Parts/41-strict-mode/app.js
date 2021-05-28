function logNewPerson() {
    "use strict";
    
    var person2;
    persom2 = {};  // mis-typed variable. NOT Allowed, bcz this function runs in strict mode.
    console.log(persom2);
}

var person;
persom = {}; // mis-typed variable. Allowed, bcz it's at global level and there is no strict mode on here.
console.log(persom);
logNewPerson();