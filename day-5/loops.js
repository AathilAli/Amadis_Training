console.log("******loops******");
a = [1,2,3]
for (let i = 0; i < a.length; i++) {
    console.log(a[i]);
}
for(let char of a){
    console.log(char)
}

b="Aathil Ali"
for (let i = 0; i < a.length; i++) {
    console.log(b[i]);
}
let student = {
    name:"Aathil",
    "age":21    
};
console.log(student.age);

//while loop

let i=1;
while(i<5){
    console.log(i);
    i++;
}

//do while loop

 i = 6;

do {
    console.log(i);
    i++;
} while (i <= 5);


let arr=[1,2,3,4]
arr.forEach(function(value){
    console.log(value);
});

arr.forEach(value =>console.log(value));
let result=arr.map(value => value*2)
console.log(result);

for (let key in student) {

    console.log(key, student[key]);
}

const array=[5,1,3,2,6]
//used to transform for //double,triple,binary
const output=array.map((value => value*2));
console.log(output);

const fil = [1, 2, 3, 4];
//filter odd value
const output1 = fil.filter((x) => x % 2 == 0)
console.log(output1);

//filter
const arr2 = [5, 1, 3, 2, 4];
//sum or max
function sum(arr) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
        sum += arr[i]
    }
    return sum;
}
console.log(sum(arr2));

const output3 = arr.reduce((accumulator, current)=>{
   return accumulator+=current

})
console.log(output3);

