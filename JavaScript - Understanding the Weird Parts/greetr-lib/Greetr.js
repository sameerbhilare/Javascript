/*
    We want to create a new execution context for our entire framework/library.
    So all of our variables declared are safe. And we're only exposing on the global object what we want.
*/
// passing global window object and jQuery object
(function(global, $) {
    
    // so that we dont have always use 'new' in application
    var Greeter = function(firstName, lastName, language) {
        return new Greeter.init(firstName, lastName, language);
    };
    
    Greeter.prototype = {
        // here is where I'll put any methods that I want to use inside my object that's returned from Greetr.
        // But in order to do that, the object created by Greeter.init needs to point to Greeter.prototype as its prototype.
    };
    
    Greeter.init = function(firstName, lastName, language) {
        
        // so that we dont have to other where 'this' points to later in the code
        // self/this points to empty object created by the 'new' operator above.
        var self = this;
        
        // setting default values
        self.firstName =  firstName || 'Guest'; 
        self.lastName =  lastName || ''; 
        self.language = language || 'en';
    };
    
    // we want Greeter.prototype to be the prototypeof all objects created by Greeter.init
    // so that any objects created with Greeter.init function should actually point Greeter.prototype for its prototype chain.
    Greeter.init.prototype = Greeter.prototype;
    
    // exposing Greetr function to the outside world. 
    // In order to do so, we need to attach it to the global object so that it is accessible outside or anywhere.
    // Also adding alias(G$) for quick access.
    global.Greeter = global.G$ = Greeter;
    
}(window, jQuery)); // passing window object and jQuery object while invoking it














