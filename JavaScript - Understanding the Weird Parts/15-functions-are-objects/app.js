// function
function greet() {
    console.log('hi');   
}

// adding property to a function,bczin JS, functions are objects.
greet.language = 'english';

console.log(greet.language); // => english
console.log(greet);          // this prints function 
console.log(greet.name);     // this prints the function name - greet
