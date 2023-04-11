/*********  DATA ORIENTED DESIGN  *********/

// Random names
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];

// Variables
const max = 10;
let genTotal = 100;
let a = 1;


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

// console.log(fname, lname, custID, eneCons);

// Display customers on site
function render() {
    str = "<table>";

    for(i = 0; i < genTotal; i++) {
        str+="<tr><td>"+fname[i]+"</td>";
        str+="<td>"+lname[i]+"</td>";
        str+="<td>"+custID[i]+"</td>";
        str+="<td>"+eneCons[i]+"</td></tr>";
    }
    str += "</table>";
    allCustomers.innerHTML=str;
}

render();


/****** CLUSTERING THE CUSTOMERS ******/
var hashes = [];

// Look through every array and put in hash-list
for (let i = 0; i < fname.length; i++) {
    var hashindex = Math.floor(eneCons[i]/1000);
    if (typeof hashes[hashindex] === 'undefined') {
        hashes[hashindex] = [];
    }
    hashes[hashindex].push(fname[i]);
}

for (let i = 0; i < lname.length; i++) {
    var hashindex = Math.floor(eneCons[i]/1000);
    if (typeof hashes[hashindex] === 'undefined') {
        hashes[hashindex] = [];
    }
    hashes[hashindex].push(lname[i]);
}

for (let i = 0; i < custID.length; i++) {
    var hashindex = Math.floor(eneCons[i]/1000);
    if (typeof hashes[hashindex] === 'undefined') {
        hashes[hashindex] = [];
    }
    hashes[hashindex].push(custID[i]);
}

for (let i = 0; i < eneCons.length; i++) {
    var hashindex = Math.floor(eneCons[i]/1000);
    if (typeof hashes[hashindex] === 'undefined') {
        hashes[hashindex] = [];
    }
    hashes[hashindex].push(eneCons[i]);
}

console.log(hashes);



// Vi vill hitta vilka enercons som ligger nära varandra. 
// OBS! Undvika den naiva approachen där vi jämför alla mot alla
// Första steget i klustring - vilka grejer ligger nära varandra
// For-loop som går igenom - skapar en lista om vi gör endimensionellt -så ska vi göra hinkar för consumtionen
// Vi gör lådor med 1000 i varje - 0-1000 lägger vi i en låda 1000-2000 i en låda...
// För var o en av dom lådorna sparar vi ner vilka objekt som passar in där
// Om jag vill hämta alla som ligger fr 0-1000 så behövar jag bara hämta dom som ligger i den listan
// De jämför jag om dom ligger nära varandra - 85% av klustringen är gjorde.
// Ett problem - vad händer om den ligger på 982??  Då ligger den lite när 1000 så man måste kolla i två hinkar för de kan ligga nära en gräns.
// STEG1: Samma ihop o lägg i hinkar 
// STEG2: kolla i hinkarna o kolla avstånd till de närliggande hinkarna
// Själva algoritmen är samma för DOD o OOD _ men för DOD då lägger vi inte objektet i hinken - vi lägger - istället för att hinken är en tom lista
// så är hinken arrayen - puschar in energikonsumtioner o namn i DOD. Varje hink är ett antal arrayer.
// bucket.push görs istället - o varje hink har ett gränsvärde
// Randsom seed fixar 