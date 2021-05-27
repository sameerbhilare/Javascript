// IIFE
(function(global, name) {
    
    // code inside IIFE is safe and won't collide with outside objects.
    // This pattern is used by many libraries.
    // if we want to access global object inside IIFE, we can pass as it an argument to this IIFE e.g. 'global'
    //    or you can directly access 'window' in case of browser
    
    var greeting = 'Hello';
    global.greeting = 'Hello';
    console.log(greeting + ' ' + name);
    
    console.log(window);
    
}(window, 'John')); // IIFE

console.log(greeting);






















