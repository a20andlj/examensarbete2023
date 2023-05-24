/*********  DATA ORIENTED DESIGN  *********/

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
    Math.randSeed+=Math.floor(ran*1000000); // original 37237
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
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria',
'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson',
'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];

// Variables
const max = 10;             // To use all names in the array
let genTotal = 1000000;       // How many customers to generate
let a = 1;                  // CustID

// Steering the random generation of customers
Math.setSeed(genTotal);

// Get HTML elements
var allCustomers = document.getElementById('customer-list');
const startCluster = document.getElementById('start-cluster');

// Event listeners
startCluster.addEventListener("click", startClustering);

// Arrays for the customers
var fname = [];
var lname = [];
var custID = [];
var eneCons = [];

// DOD - Generate random customers to 4 arrays
function generateCustomers() {
    for(let i = 0; i < genTotal; i++) {
        fname.push(fnames[Math.floor(Math.random()*max)]);
        lname.push(lnames[Math.floor(Math.random()*max)]);
        custID.push(a++);
        eneCons.push(Math.floor(Math.random() * 30000))    //Max customer energyconsumtion
    }
}



// Display customers on website
function render() {
     str = "<table>";
     str += "<th>" + "Förnamn" + "</th>";
     str += "<th>" + "Efternamn" + "</th>";
     str += "<th>" + "Kund-ID" + "</th>";
     str += "<th>" + "Elförbruk/år" + "</th>";

     for(i = 0; i < genTotal; i++) {
         str+="<tr><td>"+fname[i]+"</td>";
         str+="<td>"+lname[i]+"</td>";
         str+="<td>"+custID[i]+"</td>";
         str+="<td>"+eneCons[i]+"</td></tr>";

     }
     str += "</table>";
     allCustomers.innerHTML=str;
}



/****** CLUSTERING THE DATAORIENTED CUSTOMERS ENERGYCONSUMPTION ******/
// All 5 buckets and there bordervalues 0-5900 6000-11900 12000-17900 18000-23900 24000-29999

var bucketCenter = 3000; // <== CHANGE HERE
var clusterTotal = 6000; // <== CHANGE HERE
var treshold = 4000; // <== CHANGE HERE

var hashesCustID = [];
var hashesEneCons = [];
var custIDBuckets = [];
var eneConsBuckets = [];

// Clustering function --- DOD Application
function clustering() {

    // Clear buckets for the next iteration
    hashesCustID = [];
    hashesEneCons = [];
    custIDBuckets = [];
    eneConsBuckets = [];
   

    // Sort the customers in 5 hashes and give them index
    for (let i = 0; i < eneCons.length; i++) {
        var hashindex = Math.floor(eneCons[i]/6000);
        if (typeof hashesCustID[hashindex] === 'undefined') {
            hashesCustID[hashindex] = [];
            hashesEneCons[hashindex] = [];
        }
        hashesCustID[hashindex].push(custID[i]);
        hashesEneCons[hashindex].push(eneCons[i]);
    }

    eneConsBuckets = hashesEneCons;
    custIDBuckets = hashesCustID;
    var eneConsval = 0;

    for(var i=1; i<(eneConsBuckets.length-1); i++) {
        var midpoint = (i*clusterTotal)+bucketCenter;
        var total=0;
        var cnt=0;
        for (var j=i-1; j<=(i+1); j++) {
            for(eneConsval of eneConsBuckets[j]){
                if(Math.abs(eneConsval-midpoint)<treshold){
                    cnt++;
                    total+=eneConsval;
                }
            }
        
            var avg=total/cnt;
            for(var k=0; k<eneConsBuckets[j].length; k++){
                var eneConsval=eneConsBuckets[j][k];
                if(Math.abs(eneConsval-avg)<treshold){
                    var dist=eneConsval-avg;
                    dist=dist/treshold;
                    if(dist>=0){
                        dist=1-dist;
                    }else{
                        dist=-(1+dist);
                    }
                    eneConsBuckets[j][k]-=dist;
                }
            }
        }
    }
    // Move back the updated data to the eneCons array.
    for (var i = 0; i < eneConsBuckets.length; i++) {
        for (var j = 0; j < eneConsBuckets[i].length; j++) {
            index = custIDBuckets[i][j];
            eneCons[index] = eneConsBuckets[i][j];
        }
        
    }
}


// ********* MEASURING the clustering **********
var timeTaken;
var timeDataorientedClustering = [];
const measurePoints = 10;
const clusterIteration = 100;

function startClustering() {
    console.log("Started clustering DOD");
    for (var j=0; j < measurePoints; j++) {
        eneCons =[];

        generateCustomers();

        var start = Date.now();

        // How many times the clusteralgoritm should iterate
        for(var i=0; i<clusterIteration; i++) {
            clustering();
        }

        timeTaken = Date.now() - start;
        // console.log("Total time taken DOD-clustering: " + timeTaken + " milliseconds");
        timeDataorientedClustering.push(timeTaken);

        // Checking the clusters
        console.log(eneConsBuckets)
        console.log(timeDataorientedClustering);
        
    }
    
    render();

    console.log("Finished clustering DOD, Iterations = " + clusterIteration + ", Total customers: " + genTotal)    
}

