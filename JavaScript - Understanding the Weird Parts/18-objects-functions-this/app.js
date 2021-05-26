function a() {
    console.log('a',this);  // global 'this' (window in case of browser)
    this.newvariable = 'hello'; // attaching 'newvariable' to global 'this' object.
}

var b = function() {
    console.log('b',this);   
}

a();

console.log(newvariable); // not good! // we can use it here, prints 'hello'

b();


/*
    An object is collection of name value pairs. 
    And if the value is a primitive, it's called a property. 
    And if the value a function, it's called a method.
*/
var c = {
    name: 'The c object', // property
    log: function() { // method
        var self = this; // call by reference. 'self' points to 'this' variable memory location which is 'c' object
        
        self.name = 'Updated c object'; // 'self' points to 'c' object
        console.log('log self', self); // 'self' points to 'c' object
        console.log('log this', this);  // here 'this' points to object 'c'
        
        var setname = function(newname) {
            self.name = newname;    // 'self' points to 'c' object
            
            // here 'this' points to global object 'window'
            /*
                Many people think 'this' here should point to the object. ('c' here) 
                but 'this' here points to global object.
                So people think it as a bug in JS, but this is how JS works!
                
                To tackle this problem, one of the common patterns people use is using another variable to point to 'this'. e.g. see 'self' variable (inside log method) and its use.
                People use either 'self' or 'that' as a variable name in such cases.
                
                We learned that no programming language is perfect.
                They all have their quirks, and JavaScript certainly isn't an exception.
                But there are patterns we can use to get around any problems the programming language might have.
                
                This pattern you'll see very often if you're working in any real-world JavaScript scenarios.
                However, the 'let' keyword, which will be an alternative to the var keyword, 
                is meant to clear some of these problems up.
                
            */
            console.log('setname', this);  
        }
        setname('Updated again! The c object');
        console.log('log self',self);  // 'self' points to 'c' object      
    }
}

c.log();







