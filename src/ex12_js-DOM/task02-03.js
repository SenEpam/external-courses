"use strict";

var elem = document.querySelector('.classDiv');


var deleteTextNodes = function(elem) {
    var child = Array.from(elem.childNodes);
    for (var i = 0; i < child.length; ++i) {
        child[i].nodeType === 3 ? elem.removeChild(child[i]) : deleteTextNodes(child[i]);
    }
};

deleteTextNodes(elem);