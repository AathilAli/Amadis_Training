let arr = [1, 2, 3, 4, 5];
arr.push(6);//add element to the  last
console.log(arr);
let result = arr.pop();//remove first element
console.log(result);
console.log(arr);
console.log(arr.unshift());//add first element 
console.log(arr.shift());//remove first element
console.log(arr.splice(1, 2)); //array.splice(start, deleteCount, item1, item2, ...)  remove
console.log(arr.splice(1, 0, 20));//add element
let arr = [10, 20, 30, 40, 50];

let newArr = arr.slice(1, 4);

console.log(newArr);
let fruits = ["Apple","Banana"];

console.log(fruits.includes("Apple"));
// true
let arr = [10,20,30];

console.log(arr.indexOf(20));
// 1
let arr = [10,20,10];

console.log(arr.lastIndexOf(10));
// 2
let numbers = [5,10,15,20];

let result = numbers.find(num => num > 10);

console.log(result);
// 15
let numbers = [5,10,15];

let index = numbers.findIndex(num => num > 10);

console.log(index);
// 2

let arr = [1,3,5,8];

console.log(arr.some(num => num % 2 === 0));
// true

let arr = [2,4,6];

console.log(arr.every(num => num % 2 === 0));
// true
let arr = [1,2,3];

arr.reverse();

console.log(arr);
// [3,2,1]
let a = [1,2];

let b = [3,4];

let c = a.concat(b);

console.log(c);
// [1,2,3,4]

let a = [1,2];

let b = [3,4];

let c = [...a,...b];

console.log(c);
// [1,2,3,4]

let arr = ["Java","Script"];

console.log(arr.join(" "));
// Java Script
let arr = [1,2,3];

console.log(arr.toString());
// "1,2,3"


