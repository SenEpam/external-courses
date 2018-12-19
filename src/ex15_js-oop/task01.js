"use strict";

class Candy {

    constructor(nameCandy, weight) {
        this.nameCandy = nameCandy;
        this.weight = weight;
    }

    get name() {
        return this.nameCandy;
    }

    set newWeight(weight) {
        this.weight = weight;
    }
}


var candy1 = new Candy("Конфета 1", 3);
var candy2 = new Candy("Конфета 2", 8);
var candy3 = new Candy("Конфета 3", 5);


class Gift {
    constructor(sweets) {
        this.sweets = sweets;
    }
    totalWeight() {
        var weight = 0;
        this.sweets.forEach(function(item) {
            weight += item.weight;
        });
        return weight;
    }
    sorting() {
        this.sweets.sort(function(a, b) {
            return a.weight - b.weight;
        });
        return this.sweets
    }
    findByName(name) {
        return this.sweets.some(function(item) {
            return item.name === name;
        });
    };
}


var newYearGift = new Gift([candy1, candy2, candy3]);

console.log("");
console.log(newYearGift.totalWeight());
console.log("");
console.log(newYearGift.findByName("Конфета 2"));
console.log(newYearGift.findByName("Конфета 5"));