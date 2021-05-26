function getPerson() {
 
    // avoid this
    return 
    {
        firstname: 'Tony'
    }
    
    // use this
    /*
    return {
        firstname: 'Tony'
    }
    */
    
}

console.log(getPerson()); // => undefined. 
/*
    This is because of automatic semicolon insertion on the line of return.
    When syntax parser sees 'return' and carraige return (new line) it automatically adds ';'.
    To avoid this, put '{' on the same line as 'return'
    
*/