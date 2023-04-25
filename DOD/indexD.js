/*********  DATA ORIENTED DESIGN  *********/

// Random names
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];

// Variables
const max = 10;
let genTotal = 10000;
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
    eneCons.push(Math.floor(Math.random() * 30000))
}

// console.log(fname, lname, custID, eneCons);

// Display customers on site
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
var custIDBuckets = 0;
var eneConsBuckets = 0;

// The clustering - DOD application
function clustering() {
    for (let i = 0; i < eneCons.length; i++) {
        var hashindex = Math.floor(eneCons[i]/6000);
        if (typeof hashesCustID[hashindex] === 'undefined') {
            hashesCustID[hashindex] = [];
            hashesEneCons[hashindex] = [];
        }
        hashesCustID[hashindex].push(custID[i]);
        hashesEneCons[hashindex].push(eneCons[i]);
    }
        
    custIDBuckets = hashesCustID;
    eneConsBuckets = hashesEneCons;

    for(let i=1; i<(eneConsBuckets.length-1); i++) { 
        var midpoint=(i*clusterTotal)+bucketCenter;
        var total=0;
        var cnt=0;
        for (let j=i-1; j<=(i+1); j++) {
            for (eneCons of eneConsBuckets[j]){
                // if(j>0&&j<buckets.length)
                if(Math.abs(eneCons-midpoint)<treshold){
                    cnt++;
                    total+=eneCons;
                }    
            }
            var avg=total/cnt;
            for(eneCons of eneConsBuckets[j]){
                // if(j>0&&j<buckets.length)
                if(Math.abs(eneCons-avg)<treshold){
                    var dist=eneCons-avg;
                    dist=dist/treshold;
                    if(dist>=0){
                        dist=1-dist;
                    }else{
                        dist=-(1+dist);
                    }
                    eneCons-=dist;
                }    
            }
        }
    }

    // Move back the updated data to the eneCons array.
    for (let i = 0; i < eneConsBuckets.length; i++) {
        for (let j = 0; j < custIDBuckets[i]; j++) {
            index = hashesCustID[i][j];
            eneCons[index]=hashesEneCons[i][j];
        }
    }
}

// Measuring the clustering
let timeTaken;
let timeDataorientedClustering = [];
 
for (j=0; j < 500; j++) {
    let start = Date.now();
    

    // How many times the clusteralgoritm should iterate
    const clusterIteration = 1000;
    for(i=0; i<clusterIteration; i++) {
        clustering();
    }

    timeTaken = Date.now() - start;
    // console.log("Total time taken DOD-clustering: " + timeTaken + " milliseconds");
    timeDataorientedClustering.push(timeTaken);

    // Checking the clusters
    // console.log(buckets);
}

console.log(timeDataorientedClustering);
