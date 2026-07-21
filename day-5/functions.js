function add(a, b) {
    console.log(a + b)
}
add(1, 2);

const sub =(a, b) => a + b;
sub(1,2);

function multiply(a,b){
    return a*b;
}
console.log(multiply(3,4));

function outer(name,callback){
    console.log("hello"+name);
}
function greet(){
    console.log("ji");
}
outer("aathil",greet);

function Student(name, age) {
    this.name = name;
    this.age = age;
}
let s1 = new Student("Aathil", 20);
let s2 = new Student("Ali", 21);

console.log(s1);
console.log(s2);

