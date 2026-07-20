// ============================================
// VARIABLES IN JAVASCRIPT
// var, let, const
// ============================================

// ============================================
// var
// ============================================

console.log("===== var =====");

var name = "Ali";
console.log(name);

var age = 20;
console.log(age);

// Reassign
age = 25;
console.log("After Reassign:", age);

// Redeclare
var age = 30;
console.log("After Redeclare:", age);


// ============================================
// var Scope
// ============================================

console.log("\n===== var Scope =====");

if (true) {
    var x = 100;
}

console.log("Outside Block:", x);


// ============================================
// let
// ============================================

console.log("\n===== let =====");

let city = "Chennai";
console.log(city);

// Reassign
city = "Madurai";
console.log("After Reassign:", city);

// Redeclaring let causes an error
// Uncomment to test

/*
let city = "Coimbatore";
console.log(city);
*/


// ============================================
// let Scope
// ============================================

console.log("\n===== let Scope =====");

if (true) {
    let score = 95;
    console.log("Inside Block:", score);
}

// Uncomment to test

/*
console.log(score);
*/


// ============================================
// const
// ============================================

console.log("\n===== const =====");

const PI = 3.14;
console.log(PI);

// Uncomment to test

/*
PI = 3.14159;
*/


// ============================================
// const Object
// ============================================

console.log("\n===== const Object =====");

const student = {
    name: "Aathil",
    age: 22
};

console.log(student);

// Modify Property
student.age = 23;

console.log(student);

// Uncomment to test

/*
student = {};
*/


// ============================================
// Comparison
// ============================================

console.log("\n===== Comparison =====");

var a = 10;
var a = 20;
console.log("var:", a);

let b = 10;
b = 20;
console.log("let:", b);

const c = 10;
console.log("const:", c);


// ============================================
// Hoisting
// ============================================

console.log("\n===== Hoisting =====");

// var
console.log(varVariable);

var varVariable = 100;


// Uncomment to test

/*
console.log(letVariable);

let letVariable = 100;
*/


// Uncomment to test

/*
console.log(constVariable);

const constVariable = 100;
*/


// ============================================
// Function Scope
// ============================================

console.log("\n===== Function Scope =====");

function demo() {

    var p = 10;
    let q = 20;
    const r = 30;

    console.log(p);
    console.log(q);
    console.log(r);
}

demo();


// Uncomment to test

/*
console.log(p);
console.log(q);
console.log(r);
*/


// ============================================
// Block Scope
// ============================================

console.log("\n===== Block Scope =====");

{
    var num1 = 1;
    let num2 = 2;
    const num3 = 3;

    console.log(num1);
    console.log(num2);
    console.log(num3);
}

console.log(num1);

// Uncomment to test

/*
console.log(num2);
console.log(num3);
*/


// ============================================
// Best Practice
// ============================================

console.log("\n===== Best Practice =====");

const company = "OpenAI";
const country = "India";

let counter = 0;

counter++;
counter++;

console.log(company);
console.log(country);
console.log(counter);


// ============================================
// Summary
// ============================================

console.log("\n========== SUMMARY ==========");

console.log("var");
console.log("- Can Reassign");
console.log("- Can Redeclare");
console.log("- Function Scoped");

console.log("");

console.log("let");
console.log("- Can Reassign");
console.log("- Cannot Redeclare");
console.log("- Block Scoped");

console.log("");

console.log("const");
console.log("- Cannot Reassign");
console.log("- Cannot Redeclare");
console.log("- Block Scoped");
console.log("- Must Initialize");