/*
    We want to create a new execution context for our entire framework/library.
    So all of our variables declared are safe. And we're only exposing on the global object what we want.
*/
// passing global window object and jQuery object
(function(global, $) {
    
}(window, jQuery)); // passing window object and jQuery object while invoking it