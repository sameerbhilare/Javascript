
/****************************
 * Function constructor
 */

/*
var Person = function(name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    
    // if the calculateAge function is written inside function constructor, it will be
    // part of each object created from Person. This will be really inefficient as all those objects
    // will have "copies" of this function. And this will be awful if we have multiple functions 
    // each with thousands lines of codes. 
    // (TIP - you can view this by logging the created object e.g. console.log(john); )
    // Solution is - INHERITANCE (i.e. using prototype).
    
    //this.calculateAge = function() {
    //console.log(2020 - this.yearOfBirth);
    //}
    
}


// function inheritance 
Person.prototype.calculateAge = function() {
    console.log(2020 - this.yearOfBirth);
}

// property inheritance 
Person.prototype.lastName = 'Smith';

var john = new Person('John', 1990, 'teacher');
var jane = new Person('Jane', 1980, 'designer');

console.log(john);
console.log(jane);

john.calculateAge();
jane.calculateAge();

console.log(john.lastName);
console.log(jane.lastName);

jane.lastName = 'Bhilare';
console.log(jane.lastName);
console.log(john);
console.log(jane);

*/

/****************************
 * Object.create
 */
/*
var personProto = {
    calculateAge: function() {
        console.log(2020 - this.yearOfBirth);
    }
};

var john = Object.create(personProto);
john.name = 'John';
john.yearOfBirth = 1990;
john.job = 'teacher';

console.log(john);

var jane = Object.create(personProto, {
    name: {value: 'Jane'},
    yearOfBirth: {value: 1980},
    job: {value: 'designer'},
    test: {value: 'test'}
})

console.log(jane);
*/


/****************************
 * Functions as Arguments to other functions
 */
/*
var years = [1990, 1980, 2010, 2000, 2005];

// generic function
function arrayCalc(arr, fn) {
    var outArr = [];
    for(var i = 0; i < arr.length; i++) {
        outArr.push(fn(arr[i]));
    }
    return outArr;
}

function calcAge(ele) {
    return 2020 - ele;
}

function isFullAge(ele) {
    return ele >= 18 ? true : false;
}

console.log(years);

var ages = arrayCalc(years, calcAge);
console.log(ages);

var fullAgeArr = arrayCalc(ages, isFullAge);
console.log(fullAgeArr);
*/


/****************************
 * IIFE - for better data privacy
 */
/*
function game() {
    var score = Math.random() * 10;
    console.log(score >= 5);
}

game();


(function () {
    var score = Math.random() * 10;
    console.log(score >= 5);
})();

(function (goodluck) {
    var score = Math.random() * 10;
    console.log(score >= 5);
})(3);

*/


/****************************
 * Closures
 */
/*
function interviewQuestion(job) {
    return function(name) {
        if (job === 'designer') {
            console.log(name + ', can you please explain what UX design is?');
        } else if (job === 'teacher') {
            console.log('What subject do you teach, ' + name + '?');
        } else{
           console.log('Hello ' + name + ', what do you do?');
        }
    }
}

var teacherQuestion = interviewQuestion('teacher');
var designerQuestion = interviewQuestion('designer');


teacherQuestion('John');
designerQuestion('John');
designerQuestion('jane');
designerQuestion('Mark');
designerQuestion('Mike');

interviewQuestion('teacher')('Mark');
*/


/////////////////////////////
// Lecture: Bind, call and apply
/*
var john = {
    name: 'John',
    age: 26,
    job: 'teacher',
    presentation: function(style, timeOfDay) {
        if (style === 'formal') {
            console.log('Good ' + timeOfDay + ', Ladies and gentlemen! I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old.');
        } else if (style === 'friendly') {
            console.log('Hey! What\'s up? I\'m ' +  this.name + ', I\'m a ' + this.job + ' and I\'m ' + this.age + ' years old. Have a nice ' + timeOfDay + '.');
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};


john.presentation('formal','morning');

// method borrowing
emily.presentation = john.presentation;
emily.presentation('formal','morning');

// using call
john.presentation.call(emily, 'friendly', 'afternoon');

// using apply
john.presentation.apply(emily, ['friendly', 'night']);

// using bind
var emilyFormalMorning = john.presentation.bind(emily, 'formal','morning');
emilyFormalMorning();

// using bind - with some/all preset arguments
var emilyFriendly = john.presentation.bind(emily, 'friendly');
emilyFriendly('evening');

*/



/*
--- Let's build a fun quiz game in the console! ---

1. Build a function constructor called Question to describe a question. A question should include:
a) question itself
b) the answers from which the player can choose the correct one (choose an adequate data structure here, array, object, etc.)
c) correct answer (I would use a number for this)

2. Create a couple of questions using the constructor

3. Store them all inside an array

4. Select one random question and log it on the console, together with the possible answers (each question should have a number) (Hint: write a method for the Question objects for this task).

5. Use the 'prompt' function to ask the user for the correct answer. The user should input the number of the correct answer such as you displayed it on Task 4.

6. Check if the answer is correct and print to the console whether the answer is correct ot nor (Hint: write another method for this).

7. Suppose this code would be a plugin for other programmers to use in their code. So make sure that all your code is private and doesn't interfere with the other programmers code (Hint: we learned a special technique to do exactly that).
*/

/*
// IIFE - for better data privacy
(function() {
    
    // function constructor
    var Question = function(question, answers, correctAns) {
        this.question = question;
        this.answers = answers;
        this.correctAns = correctAns;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for(var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans) {
        if(ans === this.correctAns) {
            console.log('Correct Answer !');
        } else {
            console.log('Wrong Answer !! Please try again :)');
        }
    }


    // questions
    var q1 = new Question('Is JavaScript the coolest programming language in the world?',
                          ['Yes', 'No'],
                          0);

    var q2 = new Question('What is the name of this course\'s teacher?',
                          ['John', 'Micheal', 'Jonas'],
                          2);

    var q3 = new Question('What does best describe coding?',
                          ['Boring', 'Hard', 'Fun', 'Tediuos'],
                          2);

    var questions = [q1, q2, q3];

    // display random question
    var n = Math.floor(Math.random() * questions.length);
    questions[n].displayQuestion();

    // get user input
    var ans = parseInt(prompt('Please select correct answer?'));
    console.log('User selected: ' + ans);

    // check answer
    questions[n].checkAnswer(ans);

})();

*/

/*
--- Expert level ---

8. After you display the result, display the next random question, so that the game never ends (Hint: write a function for this and call it right after displaying the result)

9. Be careful: after Task 8, the game literally never ends. So include the option to quit the game if the user writes 'exit' instead of the answer. In this case, DON'T call the function from task 8.

10. Track the user's score to make the game more fun! So each time an answer is correct, add 1 point to the score (Hint: I'm going to use the power of closures for this, but you don't have to, just do this with the tools you feel more comfortable at this point).

11. Display the score in the console. Use yet another method for this.
*/

// IIFE - for better data privacy
(function() {
        
    // function constructor
    var Question = function(question, answers, correctAns) {
        this.question = question;
        this.answers = answers;
        this.correctAns = correctAns;
    }

    Question.prototype.displayQuestion = function() {
        console.log(this.question);
        for(var i = 0; i < this.answers.length; i++) {
            console.log(i + ': ' + this.answers[i]);
        }
    }

    Question.prototype.checkAnswer = function(ans, callback) {
        var score;
        console.log('User selected: ' + ans);
        if(ans === this.correctAns) {
            console.log('Correct Answer !');
            score = callback(true);
        } else {
            console.warn('Wrong Answer !! Please try again :)');
            score = callback(false);
        }
        
        this.displayScore(score);
    }

    Question.prototype.displayScore = function(score) {
        console.log('Your Current Score: ' + score);
        console.log('-----------------------------');
    }
    
    
    // questions
    var q1 = new Question('Is JavaScript the coolest programming language in the world?',
                          ['Yes', 'No'],
                          0);

    var q2 = new Question('What is the name of this course\'s teacher?',
                          ['John', 'Micheal', 'Jonas'],
                          2);

    var q3 = new Question('What does best describe coding?',
                          ['Boring', 'Hard', 'Fun', 'Tediuos'],
                          2);

    var questions = [q1, q2, q3];
    
    // maintaining score using closure
    function score() {
        var sc = 0;
        return function(correct) {
            if(correct) {
                sc++;
            }
            return sc;
        }
    }
    
    var keepscore = score();
    
    // keep displaying the next random question till user enters 'exit'
    function nextQuestion() {
        // display random question
        var n = Math.floor(Math.random() * questions.length);
        questions[n].displayQuestion();

        // get user input
        var ans = prompt('Please select correct answer.');
        
        if(ans !== 'exit') {
            // check answer
            questions[n].checkAnswer(parseInt(ans), keepscore);
            
            // ask next
            nextQuestion();   
        }
    }
    
    nextQuestion();
    
    

})();

