/*

    With built in function constructors (Number, String), it looks like you're creating primitives, but you're not. You're actually creating objects that contain primitives and give them extra abilities.
    
    There are cases where the JavaScript engine wraps up the primitive in its object for you, just so you can use properties and methods you might want to.
    E.g. 
    > “sameer”.length();
    Here the primitive string “sameer” is wrapped into String object and makes String.prototype methods (e.g. length()) available to use.
    
    This is somewhat useful, especially if you're building extra features in libraries or frameworks to tack on to these primitive values. So you can add your custom properties/methods to built in function constructors like Number, String.
    
    With this, we've just enhanced the JavaScript programming language just like that.
    And many libraries and frameworks use this technique to add features to add concepts and ideas and utilities.
*/

// adding custom method to String.prototype (which will be shared by all string objects)
String.prototype.isLengthGreaterThan = function(limit) {
    return this.length > limit;    // 'this' will point to that string object
}

console.log("John".isLengthGreaterThan(3));


// adding custom method to Number.prototype (which will be shared by all string objects)
Number.prototype.isPositive = function() {
    return this > 0;   
}

// JS converts string primitive to object automatically but won't convert a number to an object automatically.
//3.isPositive(); // won't work !

// however this will work
var a = new Number(3); // Number object
console.log(a.isPositive());    // true