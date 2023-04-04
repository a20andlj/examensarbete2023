// Variables
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];
let randNum;
const max = 10;
let genTotal = 10;
let a = 1;
const custList = [];
const arrName = [];
let allCustomers = document.getElementById('customer-list');

// Customer Class
class Customer {
    fname;
    lname;
    custID;
    eneCons;
    
    constructor() { //fyra arrayer i DOD
        this.fname = fnames[Math.floor(Math.random()*max)],
        this.lname = lnames[Math.floor(Math.random()*max)],
        this.custID = a++,
        this.eneCons = Math.floor(Math.random() * 20000 + 5000)
    }

    introduceSelf() {
        console.log(`Hi! I am ${this.fname} ${this.lname} - I'm customer number ${this.custID}`);
    }
}

// Generate random customers (push t 4 arrayer DOD)
for(let i = 0; i < genTotal; i++) {
    const customer = new Customer;
    custList.push(customer);
}


console.log(custList);


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











