"use strict";

function electricalDevice(name, power, enabled) {
    this.name = name;
    this.power = power;
    this.enabled = enabled;
}
electricalDevice.prototype.getName = function() {
    return this.name;
}
electricalDevice.prototype.setName = function(newName) {
    this.name = newName;
}
electricalDevice.prototype.getStatus = function() {
    return this.enabled
};

function device1(name, power, enabled) {
    electricalDevice.apply(this, arguments)
}
device1.prototype = Object.create(electricalDevice.prototype)
device1.prototype.constructor = device1;

function device2(name, power, enabled) {
    electricalDevice.apply(this, arguments)
}
device2.prototype = Object.create(electricalDevice.prototype)

device2.prototype.constructor = device2;

function device3(name, power, enabled) {
    electricalDevice.apply(this, arguments)
}
device3.prototype = Object.create(electricalDevice.prototype)

device3.prototype.constructor = device3;

var dev1 = new device1("Компьютер", 550, false);
var dev2 = new device2("Холодильник", 400, false);
var dev3 = new device3("Телевизор", 200, false);

function Room(...electricalDevices) {
    this.electricalDevice = electricalDevices
}
Room.prototype.AllPower = function() {
    return (this.electricalDevice.reduce((res, item) => {
        return res + item.power
    }, 0))
}
Room.prototype.SearchByName = function(value) {
    return this.electricalDevice.filter(function(item) {
        return item.name.includes(value)
    })
}


var myRoom = new Room(dev1, dev2, dev3);

console.log(myRoom.SearchByName("Телевизор"));
console.log(myRoom.SearchByName("Компьютер"));
console.log(myRoom.SearchByName("Холодильник"));

console.log("Потребляемая мощность: " + myRoom.AllPower() + "Вт");