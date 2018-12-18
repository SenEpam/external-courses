"use strict";

function calc() {

    this.res = 0;

    this.add = function(num) {
        if (+num) this.res += +num;
        return add;
    }
    this.subtract = function(num) {
        if (+num) this.res -= +num;
        return subtract;
    }
    this.divide = function(num) {
        if (+num && num !== 0) this.res /= +num;
        return divide;
    }
    this.multiply = function(num) {
        if (+num) this.res *= +num;
        return multiply;
    }

    this.reset = function() {
        this.res = 0;
        return this.res;
    }

    this.getResult = function() {
        return this.res;
    }

    this.setState = function(num) {
        return this.res = num;
    }

    this.fetchData = function(callback) {
        callback.call(this, 500)
    }

    return this;
}


// var Calculator = calc();


// console.log(Calculator.getResult());

// Calculator.add("4")(1);
// console.log(Calculator.getResult());

// Calculator.subtract('5')(4);
// console.log(Calculator.getResult());

// Calculator.multiply("100");
// console.log(Calculator.getResult());

// Calculator.divide(2);
// console.log(Calculator.getResult());

// Calculator.setState(2);
// console.log(Calculator.getResult(0));

// Calculator.add()(1)(1)(1);
// console.log(Calculator.getResult());

// Calculator.subtract()(2)()();
// console.log(Calculator.getResult());


module.exports = calc();