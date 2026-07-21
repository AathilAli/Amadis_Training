let students= {
    name:"aathil",age:21,skill:"html"
}
console.log(students["name"]);

console.log(Object.keys(students));
console.log(Object.values(students));

let student = {
    name: "Aathil",
    age: 20,
    city: "Chennai"
};

for (let keys in student) {
    console.log(keys);
}
a=[23,3,45,5]
for (let char in a){
    console.log(a[char])
}
console.log(student.hasOwnProperty("name"));

let arr = [1, 2, 3];

console.log(arr);
let arr1=[...arr];
console.log(arr1);
arr[1]=22;
console.log(arr);
let ab=[1,2,3]
let bc=ab
bc[2]=11;
console.log(ab,bc);
abc=[5,4,3,2,1,11]
console.log(abc.sort());
console.log(abc.sort((a,b)=>a-b));
console.log(abc.sort((a,b)=>b-a));
