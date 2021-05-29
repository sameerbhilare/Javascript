/*
    We want to create a new execution context for our entire framework/library.
    So all of our variables declared are safe. And we're only exposing on the global object what we want.
*/
// passing global window object and jQuery object
(function(global, $) {
    
    // so that we dont have always use 'new' in application
    var Greetr = function(firstName, lastName, language) {
        return new Greetr.init(firstName, lastName, language);
    };
    
    // supportedLangs, greetings, formatGreetings are not exposed outside, but available on inside this function
    // and also inside inner functions (e.g. Greetr.init) due to "closure"
    var supportedLangs = ['en', 'es'];
    
    var greetings = {
        'en': 'Hello',
        'es': 'Hola'
    };
    
    var formalGreetings = {
        'en': 'Greetings',
        'es': 'Saludos'
    };
    
    var logMessages = {
        en: 'Logged in',
        es: 'Inició sesión'
    };
    
    
    // anything inside Greetr.prototype will be exposed outside.
    // bcz Greetr.prototype is the prototype of the objects created by Greetr.init
    Greetr.prototype = {
        // here is where I'll put any methods that I want to use inside my object that's returned from Greetr.
        // But in order to do that, the object created by Greetr.init needs to point to Greetr.prototype as its prototype.
        
        fullName: function() {
            return this.firstName + ' ' + this.lastName;
        },
        
        validate: function() {
            if (supportedLangs.indexOf(this.language) === -1) {
                throw 'Invalid Language';
            }
        },
        
        // informal greeting method
        greeting: function() {
            return greetings[this.language] + ' ' + this.firstName + '!';
        },
        
        // formal greeting method
        formalGreeting: function() {
            return formalGreetings[this.language] + ', ' + this.fullName();
        },
        
        // chainable method
        greet: function(formal) {
            var msg;
            
            // if undefined or null it will be coerced to 'false'
            if (formal) {
                msg = this.formalGreeting();  
            }
            else {
                msg = this.greeting();  
            }

            // Internet Explorer actually doesn't have a console variable unless its console is open.
            if (console) {
                console.log(msg);
            }

            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        log: function() {
            // Internet Explorer actually doesn't have a console variable unless its console is open.
            if (console) {
                console.log(logMessages[this.laguage]+': '+this.fullName());
            }
            
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        },
        
        setLang: function(lang) {
            this.language = lang;
            this.validate();
            
            // 'this' refers to the calling object at execution time
            // makes the method chainable
            return this;
        }
    };
    
    Greetr.init = function(firstName, lastName, language) {
        
        // so that we dont have to other where 'this' points to later in the code
        // self/this points to empty object created by the 'new' operator above. 
        // so whatever added to 'self.' will be directly available for that object.
        var self = this;
        
        // setting default values
        self.firstName =  firstName || 'Guest'; 
        self.lastName =  lastName || ''; 
        self.language = language || 'en';
    };
    
    // we want Greetr.prototype to be the prototype of all objects created by Greetr.init
    // so that any objects created with Greetr.init function should actually point Greetr.prototype for its prototype chain.
    Greetr.init.prototype = Greetr.prototype;
    
    // exposing Greetr function to the outside world. 
    // In order to do so, we need to attach it to the global object so that it is accessible outside or anywhere.
    // Also adding alias(G$) for quick access.
    global.Greetr = global.G$ = Greetr;
    
}(window, jQuery)); // passing window object and jQuery object while invoking it














