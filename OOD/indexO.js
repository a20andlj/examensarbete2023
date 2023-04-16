/*********  OBJECT ORIENTED DESIGN  *********/

//Random names
const fnames = ['Karl', 'Erik', 'Lars', 'Anders', 'Per', 'Maria', 'Elisabeth', 'Anna', 'Kristina', 'Margareta'];
const lnames = ['Andersson', 'Johansson', 'Karlsson', 'Nilsson', 'Eriksson', 'Larsson', 'Olsson', 'Persson', 'Svensson', 'Gustafsson'];

// Variables and arrays
const max = 10; //To use all names in the array
let genTotal = 100; //How many customers to generate
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
        this.eneCons = Math.floor(Math.random() * 100);
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
    allCustomers.innerHTML=str;
}

render();


/****** CLUSTERING THE CUSTOMERS ENERGYCONSUMPTION ******/
var hashes = [];

// STEP 1: Look through every object and put in hash-list
for (customer of custList) {
    var hashindex = Math.floor(customer.eneCons/10);
    if (typeof hashes[hashindex] === 'undefined') {
        hashes[hashindex] = [];
    }
    hashes[hashindex].push(customer);
}

// console.log(hashes);
const buckets =  hashes;

// console.log(buckets[0])

let bucketTotal = 0;
let bucketAvg = 0;


function calcAvg() {
    let i;
    let j;
    for (let i = 0; i < buckets.length; i++) {  
        console.log(buckets[i]);
        
        for(let j = 0; j < buckets[i].length; j++) {
            console.log(buckets[i][j].eneCons);
            

        }
        
    }
    buckets[i][j].forEach(eneCons => {
        bucketTotal += buckets[i][j];
    });
    console.log(bucketTotal);
}


calcAvg();

// console.log("avg in bucket 0-10 is: " + bucketAvg)






// let array = [1,5,10,12,15];

// let total = 0;
// for (let i = 0; i < array.length; i++) {
//     total += array[i];
// }
// let avg = total / array.length;

// console.log(avg);






// STEP 2: Clustring 



// for(i=0; i<customer.length; i++) {
//     for (j=i-1; j<i +1; j++) {
//         if (eneCons-bucketcenter < 3) {
//             eneCons+=(eneCons+average)*0.1;
//         }
//     }
    // for (j=i-1; j<i +1; j++) {
    //     if (eneCons-bucketcenter < 3) {
    //         eneCons+=(eneCons-average)*0.1;
    //     }
    // }
// }
//  console.log(customer.eneCons);


// Gå igenom och jämka - ta reda på medlet för det här klustret - alla som är inom 
// vi är inte intresserade av specifik förbrukning av bara vilka vilka förbrukar lika mycket som andra inom ett särsklilt avstånd

/*
1 1 | 6,4 6,4 

9,1 9,1 11,8 11,8 11,8  = ca 10 medel

15 |  17 19 19

Bestämt mängden kluster - enklare räkna på om 
klusterstorlek är 5 exempelvis

*/

/*
procedure tagNeighbors(Entity E, QueryRadius) 
    RangedCells = CalculateCellsInRange(E, QueryRadius)
    
    for each cell in RangedCells
        for idx = Initial[cell], idx < Initial[cell] + Used[cell], idx += 1 do
            if SqDistance(HashTable[idx], E) < QueryRadius2 then 
                TagNeighbor(HashTable[idx])
            end if 
        end for
    end for 
end procedure
*/


// for(i=0;i<buckets.length;i++){
//     for(j=i-1;j<i+1;j++){
//         if (consumption-bucketcenter < 5)
//             //addera samman deras consumption
//             //räkna upp en räknare för de som är inom talet
//             //när klar
//     }
//     for(j=i-1;j<i+1;j++){
//         consumption+=(consumption-average)*0.1;
//     }
// }


//repetera flera gånger

//if consumption-bucketcenter < 5 


