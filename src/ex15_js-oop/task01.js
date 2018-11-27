'use strict'; 

class Candy { 

constructor(name, weight) { 
this.name = name; 
this.weight = weight; 
} 

} 


var candy1 = new Candy("Конфета 1", 3); 
var candy2 = new Candy("Конфета 2", 8); 
var candy3 = new Candy("Конфета 3", 5); 


var newYearGift = [candy1, candy2, candy3]; 

newYearGift.forEach(function(item, i, newYearGift) { 
console.log(item); 
}); 


function compareByWeight(candy1, candy2) { 
return candy2.weight - candy1.weight; 
} 

newYearGift.sort(compareByWeight); 

console.log(""); 
console.log(" После сортировки: "); 

newYearGift.forEach(function(item, i, newYearGift) { 
console.log(item); 
}); 


newYearGift.totalWeight = function() { 
var totalWeightOfCandies = 0; 
newYearGift.forEach(function(item, i, newYearGift) { 
totalWeightOfCandies += item.weight; 
}); 
return totalWeightOfCandies; 
}; 


newYearGift.findByName = function(name) { 

for (var i = 0; i < newYearGift.length; ++i) { 
if (newYearGift[i].name == name) return true; 
} 
return false; 
} 


console.log(""); 
console.log(newYearGift.totalWeight()); 
console.log(""); 
console.log(newYearGift.findByName("Конфета 2")); 
console.log(newYearGift.findByName("Конфета 5"));