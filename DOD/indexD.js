/*********  DATA ORIENTED DESIGN  *********/

// Random names
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];

// Variables
const max = 10;
let genTotal = 10000;
let a = 1;

// Get HTML elements
let allCustomers = document.getElementById('customer-list'); 
const startCluster = document.getElementById('start-cluster');
// const stopCluster = document.getElementById('stop-cluster');

// Event listeners
startCluster.addEventListener("click", startClustering);
// stopCluster.addEventListener("click", stopClustering);

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
    eneCons.push(Math.floor(Math.random() * 30000))
}

// console.log(fname, lname, custID, eneCons);

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

render();


/****** CLUSTERING THE DATAORIENTED CUSTOMERS ENERGYCONSUMPTION ******/

// ****** K-means Clustering *****

// All 5 buckets and there bordervalues 0-5900 6000-11900 12000-17900 18000-23900 24000-29999
let bucketCenter = 3000; // <== CHANGE HERE
let clusterTotal = 6000; // <== CHANGE HERE
let treshold = 4500; // <== CHANGE HERE

var hashesCustID = [];
var hashesEneCons = [];
var custIDBuckets;
var eneConsBuckets;

// var loopcnt=0;



// Clustering --- DOD Application
function clustering() {
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

    for(let i=1; i<(eneConsBuckets.length-1); i++) { 
        var midpoint = (i*clusterTotal)+bucketCenter;
        var total=0;
        var cnt=0;
        for (let j=i-1; j<=(i+1); j++) {
            for (eneConsval of eneConsBuckets[j]){
                if(Math.abs(eneCons-midpoint)<treshold){
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
                    // loopcnt++;               
                    // if(loopcnt<100) 
                    console.log(eneConsBuckets[j][k],dist);
                    eneConsBuckets[j][k]-=dist;
                    // if(loopcnt<100) 
                    console.log(eneConsBuckets[j][k],dist);
                }
            }
        }        
    }
    // Move back the updated data to the eneCons array.
    for (let i = 0; i < eneConsBuckets.length; i++) {
        for (let j = 0; j < eneConsBuckets[i].length; j++) {
            index = custIDBuckets[i][j];
            eneCons[index] = eneConsBuckets[i][j];
        }
    }
}


// ********* MEASURING the clustering **********
let timeTaken;
let timeDataorientedClustering = [];
const measurePoints = 1; 


function startClustering() {
    console.log("Started the clustering");
    for (j=0; j < measurePoints; j++) {
        let start = Date.now();
        
        // How many times the clusteralgoritm should iterate
        const clusterIteration = 1;
        for(i=0; i<clusterIteration; i++) {
            clustering();
        }

        timeTaken = Date.now() - start;
        // console.log("Total time taken DOD-clustering: " + timeTaken + " milliseconds");
        timeDataorientedClustering.push(timeTaken);
    }
    // Checking the clusters
    console.log(eneCons)
    console.log(timeDataorientedClustering);
}

