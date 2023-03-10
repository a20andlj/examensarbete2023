
// Object literal
// const customer1 = {
//     name: {
//         first: "Bob",
//         last: "Smith",
//     },
//     age: 32,
//     bio() {
//         console.log(`${this.name.first} ${this.name.last} is ${this.age} years old.`);
//     },
//     introduceSelf() {
//         console.log(`Hi! I´m ${this.name[0]}`)
//     },
// };
// const myDataName = "height";
// const myDataValue = "1.75m";
// customer1[myDataName] = myDataValue;


// customer1.age = 45;
// customer1['name']['last'] = 'Cratchit';
// customer1['eyes'] = 'brown';
// customer1.farewell = function () {
//     console.log("Goodbyg everybody!");
// }

// function Person(name) {
//     this.name = name;
//     this.introduceSelf = function () {
//         console.log(`Hi! I´m ${this.name}`)
//     }
// }

// const andreas = new Person('Andreas');
// andreas.name;
// andreas.introduceSelf();

// const moa =  new Person('Moa');
// moa.name;
// moa.introduceSelf();

// PROTOTYPES
// const myObject = {
//     city: 'Madrid',
//     greet() {
//         console.log(`Greetings from ${this.city}`);
//     },
// };

// myObject.greet();

// const myDate = new Date(1995, 11, 17);
// console.log(myDate.getFullYear())

// myDate.getFullYear = function () {
//     console.log('Something else!');
// }

// myDate.getFullYear();

// const personPrototype = {
//     greet() {
//         console.log(`Hello my name is ${this.name} and im ${this.age}!`);
//     },
// };

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }

// Object.assign(Person.prototype, personPrototype);

// const ruben = new Person('Ruben', 24);
// ruben.greet();

// const benjamin = new Person('Benjamin', 54);
// benjamin.greet();

// console.log(Object.hasOwn(ruben, 'greet'));
// console.log(Object.hasOwn(ruben, 'age'));
// console.log(Object.hasOwn(ruben, 'name'));

// CLASSES
// class Person {
//     name;

//     constructor(name) {
//         this.name = name;
//     }

//     introduceSelf() {
//         console.log(`Hi im ${this.name}`);
//     }
// }

// const giles = new Person('Giles');
// giles.introduceSelf();

// class Professor extends Person {
//     teches;

//     constructor(name, teaches) {
//         super(name);
//         this.teaches = teaches;
//     }

//     introduceSelf() {
//         console.log(`My name is ${this.name}, and I will be your ${this.teaches} professor.`);

//     }

//     grade(paper) {
//         const grade = Math.floor(Math.random() * (5 - 1) +1);
//         console.log(grade);
//     }
// }

// const walsh = new Professor('Walsh', 'Psychology');
// walsh.introduceSelf();
// walsh.grade('my paper');

// class Student extends Person {
//     #year;

//     constructor(name, year) {
//         super(name);
//         this.#year = year;
//     }

//     introduceSelf() {
//         console.log(`Hi! My name is ${this.name}, and Im in year ${this.#year}.`);

//     }

//     canStudyArchery() {
//         return this.#year > 1;
//     }

// }

// const summers = new Student('Summers', 2);
// summers.introduceSelf();
// summers.canStudyArchery();

//JSON


