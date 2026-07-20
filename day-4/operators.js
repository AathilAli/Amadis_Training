// ==========================================
// JavaScript Operators
// ==========================================

let a = 20;
let b = 6;

// ==========================================
// Arithmetic Operators
// ==========================================

console.log("===== Arithmetic Operators =====");
console.log("Addition (+):", a + b);
console.log("Subtraction (-):", a - b);
console.log("Multiplication (*):", a * b);
console.log("Division (/):", a / b);
console.log("Modulus (%):", a % b);
console.log("Exponent (**):", a ** 2);

// ==========================================
// Assignment Operators
// ==========================================

console.log("\n===== Assignment Operators =====");

let x = 10;
console.log("Initial Value:", x);

x += 5;
console.log("x += 5 :", x);

x -= 3;
console.log("x -= 3 :", x);

x *= 2;
console.log("x *= 2 :", x);

x /= 4;
console.log("x /= 4 :", x);

x %= 3;
console.log("x %= 3 :", x);

// ==========================================
// Comparison Operators
// ==========================================

console.log("\n===== Comparison Operators =====");

let c = "20";

console.log("a == c :", a == c);
console.log("a === c :", a === c);
console.log("a != c :", a != c);
console.log("a !== c :", a !== c);
console.log("a > b :", a > b);
console.log("a < b :", a < b);
console.log("a >= b :", a >= b);
console.log("a <= b :", a <= b);

// ==========================================
// Logical Operators
// ==========================================

console.log("\n===== Logical Operators =====");

console.log("a > 10 && b < 10 :", a > 10 && b < 10);
console.log("a < 10 || b < 10 :", a < 10 || b < 10);
console.log("!(a > 10) :", !(a > 10));

// ==========================================
// Increment / Decrement
// ==========================================

console.log("\n===== Increment / Decrement =====");

let y = 5;

console.log("Initial:", y);

y++;
console.log("After y++ :", y);

y--;
console.log("After y-- :", y);

console.log("\n===== Pre/Post Increment =====");

let z = 5;

console.log("z++ :", z++);
console.log("After z++ :", z);

console.log("++z :", ++z);

// ==========================================
// String Operator
// ==========================================

console.log("\n===== String Operator =====");

let firstName = "Aathil";
let lastName = "Ali";

console.log(firstName + " " + lastName);

// ==========================================
// Ternary Operator
// ==========================================

console.log("\n===== Ternary Operator =====");

let age = 20;

let result = age >= 18 ? "Adult" : "Minor";

console.log(result);

