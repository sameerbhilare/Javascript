// this function takes an array and a function which performs some action on the given array
function mapForEach(arr, fn) {
    
    var newArr = [];
    for (var i=0; i < arr.length; i++) {
        // process the array item 'arr[i]' via some other function 'fn'
        newArr.push(
            fn(arr[i])   
        )
    };
    
    return newArr;
}

var arr1 = [1,2,3];
console.log(arr1);

// multiply each item in the array by 2
var arr2 = mapForEach(arr1, function(item) {
   return item * 2; 
});
console.log(arr2);

console.log('==========================');



// check for each item in the array if it is greater than 2
// reusing the same mapForEach function to do entirely different work.
/*
    This is a classic example of functional programming 
    Where I'm using first class functions to my advantage to segment my code in even cleaner and tighter ways.
    And this lets me build really clean and in some ways beautiful looking code.
*/
var arr3 = mapForEach(arr1, function(item) {
   return item > 2; 
});
console.log('2 > each array elements?', arr3);

console.log('==========================');



// generic limit check - better way compared to above (which just checks for '2'), 
// so that we dont have to create seperate functions each time for different limiter values.
var checkPastLimit = function(limiter, item) {
    return item > limiter;   
}
// bind() creates copy of checkPastLimit function and presets 'limiter' variable to 1.
// check for each item in the array if it is greater than 2
var arr4 = mapForEach(arr1, checkPastLimit.bind(this, 2)); // 'this' does't matter as not used inside checkPastLimit
console.log('2 > each array elements?', arr4);


console.log('==========================');



// Simplified generic limit check - even better way compared to above (where we had to call bind() everytime), 
var checkPastLimitSimplified = function(limiter) {
    
    return function(limit, item) {
        return item > limit;   
    }.bind(this, limiter); // using bind () to create copy of this anonymous function with a preset value for 'limit' var
};

var arr5 = mapForEach(arr1, checkPastLimitSimplified(1));   // no need to call bind() while calling
console.log('1 > each array elements?', arr5);

console.log('==========================');



// using underscore.js
// '_' is exposed on global object in underscore.js file
var arr6 = _.map(arr1, function(item) { return item * 3 });
console.log('using underscore.js', arr6);

var arr7 = _.filter([2,3,4,5,6,7], function(item) { return item % 2 === 0; });
console.log('using underscore.js', arr7);































