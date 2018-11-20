"use strict";

function pseudoMap(arr, callback) {
    var result = [];
    for (var i = 0; i < arr.length; i++) {
        result.push(callback(arr[i], i, arr));
    }
    return result;
}
module.exports = pseudoMap;