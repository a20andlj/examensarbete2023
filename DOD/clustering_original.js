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

// All 5 buckets and there bordervalues 0-5900 6000-11900 12000-17900 18000-23900 24000-29999
let bucketCenter = 3000; // <== CHANGE HERE
let clusterTotal = 6000; // <== CHANGE HERE
let energyCons;
let treshold = 4500; // <== CHANGE HERE


// The clustering
function clustering() {
    for(let i=1; i<(buckets.length-1); i++) { 
        // console.log("-------------");
        // console.log(buckets[i]);

        var midpoint=(i*clusterTotal)+bucketCenter;
        var total=0;
        var cnt=0;
        for (let j=i-1; j<=(i+1); j++) {
                for(customer of buckets[j]){
                    // if(j>0&&j<buckets.length)
                    if(Math.abs(customer.eneCons-midpoint)<treshold){
                            cnt++;
                            total+=customer.eneCons;
                    }    
                }
                var avg=total/cnt;
                for(customer of buckets[j]){
                    // if(j>0&&j<buckets.length)
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


// How many times the clusteralgoritm should iterate
const clusterIteration = 10000;
for(i=0; i<clusterIteration; i++) {
    clustering();
}

// Checking the clusters
console.log(buckets)