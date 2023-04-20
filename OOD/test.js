/* TEST ZONE */
let buckets = hashes;

let bucketOneTotal = 0;
let bucketOneValues = 0;
let bucketOne = 0;
let bucketOneAvg = 0;

let bucketTwoTotal = 0;
let bucketTwoValues = 0;
let bucketTwo = 0;
let bucketTwoAvg = 0;

let bucketThreeTotal = 0;
let bucketThreeValues = 0;
let bucketThree = 0;
let bucketThreeAvg = 0;

let bucketFourTotal = 0;
let bucketFourValues = 0;
let bucketFour = 0;
let bucketFourAvg = 0;

let bucketFiveTotal = 0;
let bucketFiveValues = 0;
let bucketFive = 0;
let bucketFiveAvg = 0;

function calcAvgFirstCluster() {
    for (let i = 0; i < buckets[0].length; i++) {
        bucketOne = buckets[0][i];
        let bucketOneEnecons = bucketOne.eneCons;
        bucketOneTotal += bucketOneEnecons;
    }
    bucketOneAvg = bucketOneTotal / buckets[0].length;
}

function calcAvgSecondCluster() {
    for (let i = 0; i < buckets[1].length; i++) {
        bucketTwo = buckets[1][i];
        let bucketTwoEnecons = bucketTwo.eneCons;
        bucketTwoTotal += bucketTwoEnecons;
    }
    bucketTwoAvg = bucketTwoTotal / buckets[1].length;
}

function calcAvgThirdCluster() {
    for (let i = 0; i < buckets[2].length; i++) {
        bucketThree = buckets[2][i];

        let bucketThreeEnecons = bucketThree.eneCons;
        bucketThreeTotal += bucketThreeEnecons;
    }
    bucketThreeAvg = bucketThreeTotal / buckets[2].length;
}

function calcAvgFourthCluster() {
    for (let i = 0; i < buckets[3].length; i++) {
        bucketFour = buckets[3][i];
        let bucketFourEnecons = bucketFour.eneCons;
        bucketFourTotal += bucketFourEnecons;
    }
    bucketFourAvg = bucketFourTotal / buckets[3].length;
}

function calcAvgFifthCluster() {
    for (let i = 0; i < buckets[4].length; i++) {
        bucketFive = buckets[4][i];
        let bucketFiveEnecons = bucketFive.eneCons;
        bucketFiveTotal += bucketFiveEnecons;
    }
    bucketFiveAvg = bucketFiveTotal / buckets[4].length;
}

calcAvgFirstCluster();
console.log("Bucket 1 avg: " + bucketOneAvg);
calcAvgSecondCluster();
console.log("Bucket 2 avg: " + bucketTwoAvg);
calcAvgThirdCluster();
console.log("Bucket 3 avg: " + bucketThreeAvg);
calcAvgFourthCluster();
console.log("Bucket 4 avg: " + bucketFourAvg);
calcAvgFifthCluster();
console.log("Bucket 5 avg: " + bucketFiveAvg);


// CLUSTERING



/* TEST ZONE */

// Calculate average values in the buckets




// let bucketOneTotal = 0;
// let bucketOneValues = 0;
// let bucketOne = 0;
// let bucketOneAvg = 0;

// let bucketTwoTotal = 0;
// let bucketTwoValues = 0;
// let bucketTwo = 0;
// let bucketTwoAvg = 0;

// let bucketThreeTotal = 0;
// let bucketThreeValues = 0;
// let bucketThree = 0;
// let bucketThreeAvg = 0;

// let bucketFourTotal = 0;
// let bucketFourValues = 0;
// let bucketFour = 0;
// let bucketFourAvg = 0;

// let bucketFiveTotal = 0;
// let bucketFiveValues = 0;
// let bucketFive = 0;
// let bucketFiveAvg = 0;

// function calcAvgFirstCluster() {
//     for (let i = 0; i < buckets[0].length; i++) {
//         bucketOne = buckets[0][i];
//         let bucketOneEnecons = bucketOne.eneCons;
//         bucketOneTotal += bucketOneEnecons;
//     }
//     bucketOneAvg = bucketOneTotal / buckets[0].length;
    
// }

// function calcAvgSecondCluster() {
//     for (let i = 0; i < buckets[1].length; i++) {
//         bucketTwo = buckets[1][i];
//         let bucketTwoEnecons = bucketTwo.eneCons;
//         bucketTwoTotal += bucketTwoEnecons;
//     }
//     bucketTwoAvg = bucketTwoTotal / buckets[1].length;
// }

// function calcAvgThirdCluster() {
//     for (let i = 0; i < buckets[2].length; i++) {
//         bucketThree = buckets[2][i];

//         let bucketThreeEnecons = bucketThree.eneCons;
//         bucketThreeTotal += bucketThreeEnecons;
//     }
//     bucketThreeAvg = bucketThreeTotal / buckets[2].length;
// }

// function calcAvgFourthCluster() {
//     for (let i = 0; i < buckets[3].length; i++) {
//         bucketFour = buckets[3][i];
//         let bucketFourEnecons = bucketFour.eneCons;
//         bucketFourTotal += bucketFourEnecons;
//     }
//     bucketFourAvg = bucketFourTotal / buckets[3].length;
// }

// function calcAvgFifthCluster() {
//     for (let i = 0; i < buckets[4].length; i++) {
//         bucketFive = buckets[4][i];
//         let bucketFiveEnecons = bucketFive.eneCons;
//         bucketFiveTotal += bucketFiveEnecons;
//     }
//     bucketFiveAvg = bucketFiveTotal / buckets[4].length;
// }

// calcAvgFirstCluster();
// console.log("Bucket 1 avg: " + bucketOneAvg);
// calcAvgSecondCluster();
// console.log("Bucket 2 avg: " + bucketTwoAvg);
// calcAvgThirdCluster();
// console.log("Bucket 3 avg: " + bucketThreeAvg);
// calcAvgFourthCluster();
// console.log("Bucket 4 avg: " + bucketFourAvg);
// calcAvgFifthCluster();
// console.log("Bucket 5 avg: " + bucketFiveAvg);