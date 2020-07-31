
function tipCalculator(bill) {
    
    var tip;
    if (bill < 50) {
        tip = bill * 0.2;
        
    } else if (bill >= 50 && bill <= 200) {
        tip = bill * 0.15;
        
    } else {
        tip = bill * 0.10;
    }
    
    return tip;
} 

var bills = [124, 48, 268];
var tips = [tipCalculator(bills[0]),
           tipCalculator(bills[1]),
           tipCalculator(bills[2])]

console.log(tips);


