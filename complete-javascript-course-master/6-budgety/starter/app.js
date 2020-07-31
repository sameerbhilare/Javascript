/*
* In Javascript, we create modules (Module Pattern) using IIFE (Immediately Invokable Function Expression).
* Using IIFE, we can have private variable, private functions, public functions.
* Whatever declared in the return inside an IIFE is public, everything else within IIFE is private
*/


// budget controler module
var budgetController = (function() {
    
    // Function constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    };
    
    // inheritance
    Expense.prototype.calculatePercentage = function(totalIncome) {
        
        if (totalIncome > 0) {
            this.percentage = Math.round((this.value / totalIncome) * 100);    
        } else {
            this.percentage = -1;
        }
    };
    
    // Function constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    
    // private function
    var calculateTotal = function(type) {
        
        var sum = 0;
        data.allItems[type].forEach(function(current) {
            sum += current.value;        
        });
        
        data.totals[type] = sum;
    }
    
    // data structure
    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: 0
    };
    
    // public - accessible from outside
    return {
      
        addItem: function(type, desc, val) {
            
            var newItem, ID;
            
            // generate ID
            if( data.allItems[type].length > 0 ) {
                // new ID = previous ID + 1
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            
            // create Income or Expense object
            if(type === 'exp') {
                newItem = new Expense(ID, desc, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, desc, val);
            }
            
            // add to the data structure. Since type will be 'exp' or 'inc', data.allItems[type] will work !!
            data.allItems[type].push(newItem);
            
            return newItem;
        },
        
        deleteItem: function(type, id) {
            
            var idArr, index;
            
            // gets array of Ids from array of objects o type Expense/Income
            idArr = data.allItems[type].map( function(current) {
                return current.id;
            });
            
            // get the index of the item to be deleted
            index = idArr.indexOf(id);
            
            // delete 1 item at given index
            data.allItems[type].splice(index, 1);
        },
        
        calculateBudget: function() {
            
            // calculate totals for exp and inc
            calculateTotal('exp');
            calculateTotal('inc');
            
            // update totals
            data.budget = data.totals.inc - data.totals.exp;
            
            // update percentage
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }           
        },
        
        calculatePercentages: function() {
            
            data.allItems.exp.forEach(function(curr) {
                curr.calculatePercentage(data.totals.inc);
            });
        },
        
        getPercentages: function() {
          
            // map basically gets array of Expense objects and returns array of percentages only.
            var percentages = data.allItems.exp.map(function(curr) {
                return curr.percentage;
            });
            
            return percentages;
        },
        
        getBudget: function() {
            
            return {
                totalIncome: data.totals.inc,
                totalExpense: data.totals.exp,
                budget: data.budget,
                percentage: data.percentage
            };
            
        },
        
        // for testing only
        testing: function() {
            console.log(data);
        }
    };
    
})();


// UI Controller Module
var UIController = (function() {
    
    // central place of all used DOM strings, 
    // so that in case of any changes, we will have to update it at one place only.
    // private - not accessible from outside
    var DOMStrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputAddBtn: '.add__btn',
        incomeContainer: '.income__list',
        expenseContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expenseLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expItemPercentageLabel:'.item__percentage',
        monthLabel: '.budget__title--month'
    };
    
    var formatNumber = function(num, type) {
        
        var numArr, int, dec, sign;
        /*
        2345.22222 => +2,345.22
        2000 => +2,000.00
        20567 => +20,567.00
        */
        // e.g. num = 20567.236
        num = num.toFixed(2); // num = "20567.24"
        numArr = num.split('.');
        int = numArr[0]; // "20567"
        dec = numArr[1]; // "24"
        
        if(int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3); // 20,567    
        }
        
        // in case the nuber is already negative (e.g. budget)
        if(num >= 0)  {
            sign = type === 'inc' ? '+ ' : '- ';
        } else {
            sign = '';
        }
        
        return sign + int + '.' + dec;
    };
    
    /*****************************************************/
    // This is quite powerful. NodeList does not have built in forEach function.
    // Here we are implementing our own version of forEach function for NodeList.
    // to make it reusable we are using callback function.

    var nodeListForEach = function(nodeList, callback) {
        for(var i = 0; i < nodeList.length; i++) {
            callback(nodeList[i], i);
        }
    };
    
    // public - accessible from outside
    return {
        
        getInputs: function() {
            return {
                type: document.querySelector(DOMStrings.inputType).value, // either 'exp' or 'inc'
                description: document.querySelector(DOMStrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),
            };
        },
        
        addListItem: function(obj, type) {
            
            var htmlTemplate, newHtml, element;
            
            // create html template
            if(type === 'exp') {
                
                element = DOMStrings.expenseContainer;
                
                htmlTemplate = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
                                
            } else if(type === 'inc') {
                
                element = DOMStrings.incomeContainer;
                
                htmlTemplate = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // replace palceholders with actual value
            newHtml = htmlTemplate.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', formatNumber(obj.value, type));
            
            // insert the html at given position into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
            
        },
        
        deleteListItem: function(selectorID) {
            
            // in Javascript we cannot directly remove an element, but we can remove a child
            // hence in otder to remove an element, we need to traverse to it's parent and call removeChild.
            // strange, but this is how it works :)
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);
            
        },
        
        clearFields: function() {
            
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMStrings.inputDescription + "," + DOMStrings.inputValue);
            
            // convert list into array so that we can iterate over it
            fieldsArr = Array.prototype.slice.call(fields);
            
            // set each field to empty.
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            });
            
            // set focus back to description input field.
            fieldsArr[0].focus();            
            
        },
        
        displayBudget: function(obj) {
             
            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, obj.budget >= 0 ? 'inc' : 'exp');
            document.querySelector(DOMStrings.incomeLabel).textContent = formatNumber(obj.totalIncome, 'inc');
            document.querySelector(DOMStrings.expenseLabel).textContent = formatNumber(obj.totalExpense, 'exp');
                        
            if (obj.percentage > 0) {
                document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            } else {
                document.querySelector(DOMStrings.percentageLabel).textContent = '---';
            }
        },
        
        displayPercentages: function(percentages) {
            
            var percentageNodeList = document.querySelectorAll(DOMStrings.expItemPercentageLabel);
            
            nodeListForEach(percentageNodeList, function(current, index) {
                if (percentages[index] > 0) {
                    current.textContent = percentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
            
        },
        
        displayMonth: function() {
          
            var now, year, month, months;
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 
                      'September', 'October', 'November', 'December'];
            
            now = new Date();
            month = now.getMonth();
            year = now.getFullYear();
            console.log(month, year);
            document.querySelector(DOMStrings.monthLabel).textContent = months[month] + ' ' + year;                        
        },
        
        changeTypeEventHandler: function() {
            
            var elements = document.querySelectorAll(
                DOMStrings.inputType + ',' +
                DOMStrings.inputDescription + ',' +
                DOMStrings.inputValue
            );
            
            nodeListForEach(elements, function(curr) {
                curr.classList.toggle('red-focus');
            });
            
            document.querySelector(DOMStrings.inputAddBtn).classList.toggle('red');
        },
        
        getDOMStrings: function() {
            return DOMStrings;
        }
    };
    
})();


// Main controller Module which interacts with both Budget Controller Module and UI Controller Module
var controller = (function(budgetCtrl, UICtrl) {
    
    // private - not accessible from outside
    var setupEventListners = function() {
        
        var DOM = UICtrl.getDOMStrings();
        
        document.querySelector(DOM.inputAddBtn).addEventListener('click', ctrlAddItem);
    
        document.addEventListener('keypress', function(event) {

            if(event.keyCode === 13 || event.which === 13) {
                // event handling for ENTER key only.
                ctrlAddItem();
            }

        });
        
        // Event Delegation
        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        
        // css changs based on type selection
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeTypeEventHandler);
    };
    
    
    var updateBudget = function() {
        
        // 1. Calculate the budget.
        budgetCtrl.calculateBudget();
        
        // 2. Return the budget
        var budget = budgetCtrl.getBudget();
        
        // 3. Display the budget on the UI.
        UICtrl.displayBudget(budget);
    };
    
    var updatePercentages = function() {
        
        // 1. Calculate percentages.
        budgetCtrl.calculatePercentages();
        
        // 2. Read percentages from budget controller
        var percentages = budgetCtrl.getPercentages();
        
        // 3. Update the UI with new percentages.
        UICtrl.displayPercentages(percentages);
    };
    
    // private - not accessible from outside
    var ctrlAddItem = function() {
        
        var input, newItem;
        
        // 1. Get the field input value.
        input = UICtrl.getInputs();
        
        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            
            // 2. Add the item to the budget controller.
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI.
            UICtrl.addListItem(newItem, input.type);

            // 4. clear input fields.
            UICtrl.clearFields();

            // 5. Calculate the budget & Display on the UI.
            updateBudget();
            
            // 6. Calculate percentages and update UI
            updatePercentages();
        }
        
    };
    
    // private function
    var ctrlDeleteItem = function(event) {
        
        var itemId, splits, type, ID;
        
        // DOM traversing (using parentNode)
        itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemId) {
            
            // e.g. inc-1
            splits = itemId.split('-');
            type = splits[0]; // e.g. inc
            ID = parseInt(splits[1]);   // e.g. 1
            
            // 1. Delete the item from the data structure
            budgetCtrl.deleteItem(type, ID);
            
            // 2. Delete the item from the UI
            UICtrl.deleteListItem(itemId);
            
            // 3. Update and show new budget
            updateBudget();
            
            // 4. Calculate percentages and update UI
            updatePercentages();
        }
        
    };
    
    // public - accessible from outside
    return {
        
      init: function() {
          
          setupEventListners();
          
          UICtrl.displayMonth();
          
          UICtrl.displayBudget({
              totalIncome: 0,
              totalExpense: 0,
              budget: 0,
              percentage: -1
          });
          
          console.log('Application has started.');
      }  
    };
    
})(budgetController, UIController);


// initiate the application
controller.init();
















