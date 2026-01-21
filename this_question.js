const users = {
    name: "hello",
    greet1: () => {                 // arrow function
        console.log(this.name);
    },
    greet2: function() {            // function expression
        console.log(this.name);
    },
    greet3() {                      // function declaration (method shorthand)
        console.log(this.name);
    },
    nested: {
        name: "nested hello",
        greetNestedArrow: () => {
            console.log(this.name);
        },
        greetNestedFunc: function() {
            console.log(this.name);
        }
    }
};


console.log("this scope in arrow function, ",users.greet1());
console.log("this scope in expression function" ,users.greet2());
console.log("this scope in normal function" ,users.greet3());
console.log("this scope in nested arrow function" ,users.nested.greetNestedArrow());
console.log("this scope in arrow function" ,users.nested.greetNestedFunc());
