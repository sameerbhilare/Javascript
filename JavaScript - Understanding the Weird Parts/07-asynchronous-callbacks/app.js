/*
    Javascript is synchronous. 
    What happens is the browser asynchronously puts things into the event queue, but the code that is running inside JavaScritp Engine is still running line by line. 
    And then when the execution stack is empty, then it processes the events. 
    It waits for them and sees an event. And if an event causes a function to be created and executed, then it will appear on the execution stack and run like normal.
    
    The JavaScript engine won't look at the event queue until the stack is empty. 
    So that means long-running functions can actually interrupt events being handled. 
    
    This is how JavaScript synchronously is dealing with the fact that asynchronous events are happening.
    Any events that happen outside of the JavaScript engine get placed into the event queue, and if the execution stack is empty, if JavaScript isn't working on anything else currently, it'll process those events in the order they happened.
*/

/*
    In below example, it takes 3 seconds to load the page in browser.
    Even if you click on the page before 3 seconds, the click event will not be processed immediately
    because the execution context stack is not empty (still running the waitThreeSeconds() function).
    The click event will be placed in the vent queue and will be handled only after the execution stack becomes empty.
    TRY IT!
*/

// long running function
function waitThreeSeconds() {
    var ms = 3000 + new Date().getTime();
    while (new Date() < ms){}
    console.log('finished function');
}

function clickHandler() {
    console.log('click event!');   
}

// listen for the click event
document.addEventListener('click', clickHandler);


waitThreeSeconds();
console.log('finished execution');