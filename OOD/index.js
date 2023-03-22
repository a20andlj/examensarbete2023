// Variables
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];
let randNum;
const max = 10;
let genTotal = 1000;
let a = 1;
const custList = [];
const arrName = [];

// Customer Class
class Customer {
    fname;
    lname;
    custID;
    eneCons;
    
    constructor() {
        this.fname = fnames[Math.floor(Math.random()*max)],
        this.lname = lnames[Math.floor(Math.random()*max)],
        this.custID = a++,
        this.eneCons = Math.floor(Math.random() * 20000 + 5000)
    }

    introduceSelf() {
        console.log(`Hi! I am ${this.fname} ${this.lname} - im customer number ${this.custID}`);
    }
   
}

// Generate random customers
for(let i = 0; i < genTotal; i++) {
    const customer = new Customer;
    custList.push(customer);
}


console.log(custList[999].introduceSelf());








