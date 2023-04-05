/*********  DATA ORIENTED DESIGN  *********/

// Random names
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];

// Variables
const max = 10;
let genTotal = 10;
let a = 1;
let customers = 10;

let allCustomers = document.getElementById('customer-list'); 

// 4 Customer arrays
let fname = []; 
let lname = [];
let custID = [];
let eneCons = [];

// DOD - Generate 4 arrays with random customers
for(let i = 0; i < genTotal; i++) {
    fname.push(fnames[Math.floor(Math.random()*max)]);
    lname.push(lnames[Math.floor(Math.random()*max)]);
    custID.push(a++);
    eneCons.push(Math.floor(Math.random() * 20000 + 5000))
}

console.log(fname, lname, custID, eneCons)

// Display customers on site
function render() {
    str = "<table>";

    for(i = 0; i < customers; i++) {
        str+="<tr><td>"+fname[i]+"</td>";
        str+="<td>"+lname[i]+"</td>";
        str+="<td>"+custID[i]+"</td>";
        str+="<td>"+eneCons[i]+"</td></tr>";
    }
    str += "</table>";
    allCustomers.innerHTML=str;
}

render();













