"use strict";

function pseudoSlice(arr, begin, end) {

    var result; = [], i, thisIsEnd = end, thisIsbegin = begin;

    if (begin === undefined) {
        thisIsbegin = 0;
    } else
    if (end === undefined) {
        thisIsEnd = arr.length;
    } else
    if (thisIsbegin < 0 && thisIsEnd < 0) {
        for (i = arr.length + thisIsbegin; i < arr.length + thisIsEnd; i++) {
            result.push(arr[i]);
        }
    } else {
        for (i = thisIsbegin; i < thisIsEnd; i++) {
            result.push(arr[i]);
        }
    }
    return result;
}


module.exports = pseudoSlice;