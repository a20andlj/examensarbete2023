/*********  OBJECT ORIENTED DESIGN  *********/

//Random names
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];

// Variables and arrays
const max = 10; //To use all names in the array
let genTotal = 10000; //How many customers to generate
let a = 1; // CustID
const custList = []; 
let allCustomers = document.getElementById('customer-list');

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
        console.log(`Hi! I am ${this.fname} ${this.lname} - I'm customer number ${this.custID}`);
    }
}

// Generate random customers and push them i Customer list
for(let i = 0; i < genTotal; i++) {
    const customer = new Customer;
    custList.push(customer);
    // console.log(customer);
}

// console.log(custList);

// Print the custList on the site
function render() {
    str = "<table>";

    for(i = 0; i < custList.length; i++) {
        str+="<tr><td>"+custList[i].fname+"</td>";
        str+="<td>"+custList[i].lname+"</td>"; //lname[i]
        str+="<td>"+custList[i].custID+"</td>";
        str+="<td>"+custList[i].eneCons+"</td></tr>";
    }
    str += "</table>";
    allCustomers.innerHTML=str;
}

render();



/****** CLUSTERING THE CUSTOMERS ******/
var hashes = [];

// Look through every object and put in hash-list
for (customer of custList) {
    var hashindex = Math.floor(customer.eneCons/5000);
    if (typeof hashes[hashindex] === 'undefined') {
        hashes[hashindex] = [];
    }
    hashes[hashindex].push(customer);
}

console.log(hashes);

