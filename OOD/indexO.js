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
        this.eneCons = Math.floor(Math.random() * 30000); // <== CHANGE HERE
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
    str += "<th>" + "Förnamn" + "</th>";
    str += "<th>" + "Efternamn" + "</th>";
    str += "<th>" + "Kund-ID" + "</th>";
    str += "<th>" + "Elförbruk/år" + "</th>";

    for(i = 0; i < custList.length; i++) {
        str+="<tr><td>"+custList[i].fname+"</td>";
        str+="<td>"+custList[i].lname+"</td>"; //lname[i]
        str+="<td>"+custList[i].custID+"</td>";
        str+="<td>"+custList[i].eneCons+"</td></tr>";
    }
    str += "</table>";
    allCustomers.innerHTML = str;
}

render();


/****** CLUSTERING THE CUSTOMERS ENERGYCONSUMPTION ******/
var hashes = [];

// STEP 1: Look through every object and put in hash-list
for (customer of custList) {
    var hashindex = Math.floor(customer.eneCons/6000); // <== CHANGE HERE
    if (typeof hashes[hashindex] === 'undefined') {
        hashes[hashindex] = [];
    }
    hashes[hashindex].push(customer);
}

let buckets = hashes;


// ****** K-means Clustering *****
// STEP 2: 

// All 5 buckets and there bordervalues 0-5900 6000-11900 12000-17900 18000-23900 24000-29999
let bucketCenter = 3000; // <== CHANGE HERE
let clusterTotal = 6000; // <== CHANGE HERE
let treshold = 4500; // <== CHANGE HERE

// Clustering --- OOD Application
function clustering() {
    for(let i=1; i<(buckets.length-1); i++) { 
        var midpoint=(i*clusterTotal)+bucketCenter;
        var total=0;
        var cnt=0;
        for (let j=i-1; j<=(i+1); j++) {
            for(customer of buckets[j]){
                if(Math.abs(customer.eneCons-midpoint)<treshold){
                    cnt++;
                    total+=customer.eneCons;
                }    
            }
            var avg=total/cnt;
            for(customer of buckets[j]){
                if(Math.abs(customer.eneCons-avg)<treshold){
                    var dist=customer.eneCons-avg;
                    dist=dist/treshold;
                    if(dist>=0){
                        dist=1-dist;
                    }else{
                        dist=-(1+dist);
                    }
                    customer.eneCons-=dist;
                }    
            }
        }
    }
}



// ********** MEASURING the clustering *********
let timeTaken;
let timeObjectClustering = [];

const measurePoints = 100;
for (j=0; j < measurePoints; j++) {
    let start = Date.now();

    // How many times the clusteralgoritm should iterate
    const clusterIteration = 1000;
    for(i=0; i<clusterIteration; i++) {
        clustering();
    }

    timeTaken = Date.now() - start;
    // console.log("Total time taken OOD-clustering: " + timeTaken + " milliseconds");
    timeObjectClustering.push(timeTaken);
    
}

// Checking the clusters
// console.log(buckets);

console.log(timeObjectClustering);
