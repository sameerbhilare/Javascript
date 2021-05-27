function greet(whattosay) {

   return function(name) {
       console.log(whattosay + ' ' + name);
   }

}

greet('Hi')('Sameer');

var sayHi = greet('Hi');
sayHi('Sameer');
