/*********  OBJECT ORIENTED DESIGN  *********/

// ***** Steer the Math-random *****
function jsf32(a, b, c, d) {
    a |= 0; b |= 0; c |= 0; d |= 0;
    var t = a - (b << 23 | b >>> 9) | 0;
    a = b ^ (c << 16 | c >>> 16) | 0;
    b = c + (d << 11 | d >>> 21) | 0;
    b = c + d | 0;
    c = d + t | 0;
    d = a + t | 0;
    return (d >>> 0) / 4294967296;
}
  
Math.random = function() {
    var ran=jsf32(0xF1EA5EED,Math.randSeed+6871,Math.randSeed+1889,Math.randSeed+56781);
    Math.randSeed+=Math.floor(ran*37237);
    return(ran)
}
  
Math.setSeed = function(seed){
    Math.randSeed=seed;
    for(var i=0;i<7;i++) Math.random();
}
  
var origRandom = Math.random;
Math.randSeed = Math.floor(Date.now());

// ************************************


// Random names for the customers
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];
var eneCons;

// Variables
const max = 10;         // To use all names in the array
let genTotal = 100;     // How many customers to generate
let a = 1;              // CustID
const custList = [];    // Customer list array

// Steering the random generation of customers
Math.setSeed(genTotal);

// Get HTML elements
let allCustomers = document.getElementById('customer-list');
const startCluster = document.getElementById('start-cluster');

// Event listeners
startCluster.addEventListener("click", startClustering);

// Customer Class for thd Object oriented customer list
class Customer {
    fname;
    lname;
    custID;
    eneCons;

    constructor() {
        this.fname = fnames[Math.floor(Math.random()*max)],
        this.lname = lnames[Math.floor(Math.random()*max)],
        this.custID = a++,
        this.eneCons = Math.floor(Math.random() * 30000);   //Max customer energyconsumtion
    }

    // Function just to test if the class is working
    introduceSelf() {
        console.log(`Hi! I am ${this.fname} ${this.lname} - I'm customer number ${this.custID}`);
    }
}

// Generate random customers and push them into the Customer list
var customer = [];

function generateCustomers() {
    for(let i = 0; i < genTotal; i++) {
        customer = new Customer;
        custList.push(customer);
        // console.log(customer);
    }
}

generateCustomers();

// Display customers on website
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

/****** CLUSTERING THE OBJECTORIENTED CUSTOMERS ENERGY CONSUMPTION ******/
// All 5 buckets and there bordervalues 0-5900 6000-11900 12000-17900 18000-23900 24000-29999

let bucketCenter = 3000; // <== CHANGE HERE
let clusterTotal = 6000; // <== CHANGE HERE
let treshold = 3500; // <== CHANGE HERE

var hashes = [];
var buckets =[];

// Clustering function --- OOD Application
function clustering() {
    // Clear buckets for the next iteration
    hashes = [];
    buckets = [];
    
    // Sort the customers in 5 hashes
    for (customer of custList) {
        var hashindex = Math.floor(customer.eneCons/6000); // <== CHANGE HERE
        if (typeof hashes[hashindex] === 'undefined') {
            hashes[hashindex] = [];
        }
        hashes[hashindex].push(customer);
    }
    
    buckets = hashes;

    for(let i=1; i<(buckets.length-1); i++) { 
        var midpoint = (i*clusterTotal)+bucketCenter;
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
const measurePoints = 1;
const clusterIteration = 7000;


function startClustering() {
    console.log("Started clustering OOD");
    for (j=0; j < measurePoints; j++) {
        let start = Date.now();

        // How many times the clusteralgoritm should iterate
        for(i=0; i<clusterIteration; i++) {
            clustering();
        }

        timeTaken = Date.now() - start;
        // console.log("Total time taken OOD-clustering: " + timeTaken + " milliseconds");
        timeObjectClustering.push(timeTaken);
        
        // Checking the clusters
        console.log(buckets[4]);
        console.log(timeObjectClustering);
    }

    console.log("Finished clustering OOD, Iterations = " + clusterIteration + ", Total customers: " + genTotal)
}


