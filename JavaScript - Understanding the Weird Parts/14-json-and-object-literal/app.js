var objectLiteral = {
    firstname: 'Mary',
    isAProgrammer: true
}

// converts the object to JSON string
console.log(JSON.stringify(objectLiteral));

// converts the (JSON) string to JS object.
var jsonValue = JSON.parse('{ "firstname": "Mary", "isAProgrammer": true }');

console.log(jsonValue);
