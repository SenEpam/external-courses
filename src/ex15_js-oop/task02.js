'use strict';


class electricalDevice {

    constructor(name, power, enabled) {
        this.name = name;
        this.power = power;
        this.enabled = enabled;
    }

    set On(enabled){
        this.enabled = true;
    }
    
        set Off(enabled){
        this.enabled = false;
    }
}


    var device1 = new electricalDevice("Компьютер", 550, false);
    var device2 = new electricalDevice("Холодильник", 400,false);
    var device3 = new electricalDevice("Телевизор", 200,false);

    var Room = [device1, device2, device3];

    Room.forEach(function(item, i, newYearGift) {
        console.log(item);
    });


    Room.totalPower = function() {
        var totalPowerOfDevices = 0; 
        Room.forEach(function(item, i, Room) { 
           if (item.enabled==true) totalPowerOfDevices += item.power; 
        }); 
        return totalPowerOfDevices; 
    }; 

    console.log(Room.totalPower());
    Room[0].On=true;
    Room[1].On=true;
    console.log(Room.totalPower());      


    Room.findByName = function(name) {

        for (var i = 0; i < Room.length; ++i) {
            if (Room[i].name == name) return true;
        }
        return false;
    }

    console.log("");
    console.log(Room.findByName("Холодильник"));
    console.log(Room.findByName("Ноутбук"));