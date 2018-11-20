"use strict";

function pseudoReduce(arr, callback, initialValue) {
    var previous, i = 0;

    if (initialValue === undefined) {
        previous = arr[i];
        i++;
    } else if (initialValue !== undefined) {
        previous = initialValue;
    }

    for (i; i < arr.length; i++) {
        previous = callback(previous, arr[i], i, arr);
    }
    return previous;
}


module.exports = pseudoReduce;