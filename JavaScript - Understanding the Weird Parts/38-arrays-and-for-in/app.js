// adding custom property to Array.prototype
Array.prototype.myCustomProperty = 'Cool !';

var arr = ["John", "Jane", "Jim"];

// array indexes are actually property names on the name-value pair.
for (var prop in arr) {
    // this will also print the custom property. this is bcz arraysare objects in JS so it will loop over all properties
    console.log(prop + ': ' + arr[prop]);   
}


// IMP - In the case of arrays don't use for..in, use instead the standard for loop.
for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}