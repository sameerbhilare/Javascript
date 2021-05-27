function sayHiLater() {
 
    var greeting = 'Hi!';
    
    // the callback function is a function expression
    setTimeout(function() {
        
        // here 'greeting' is available due to closure 
        // even though this callback functionruns 3 seconds later sayHiLater() function finishes execution.
        console.log(greeting);
        
    }, 3000); // 3 seconds delay
    
}

sayHiLater();

// jQuery uses function expressions and first-class functions!
//$("button").click(function() {
//    
//});

function tellMeWhenDone(callback) {
 
    var a = 1000; // some work
    var b = 2000; // some work
    
    callback(); // the 'callback', it runs the function I give it!
    
}

tellMeWhenDone(function() {
   
    console.log('I am done!');
    
});

tellMeWhenDone(function() {
   
    console.log('All done...');
    
});





