"use strict";

var tags = {},
    nodes = 0,
    class_list = {};

function scanTAGS(elem) {
    var element = elem;
    if (tags[elem.tagName] === undefined) {
        tags[element.tagName] = 1;
    } else {
        tags[element.tagName] += 1;
    }
}

function scanCLASSES(elem, isClass) {
    if (class_list[elem.classList[isClass]] === undefined) {
        class_list[elem.classList[isClass]] = 1;
    } else {
        class_list[elem.classList[isClass]] = ++class_list[elem.classList[isClass]];
    }
}


function scanDOM(document) {

    if (document.hasChildNodes()) {
        for (var i = 0; i < document.childNodes.length; ++i) {
            var child = document.childNodes[i];
            if (child.nodeType === child.ELEMENT_NODE) {
                scanTAGS(child);
                if (child.className) {
                    for (var i = 0; i < child.classList.length; ++i) {
                        scanCLASSES(child, i);
                    }
                }
            } else
            if (child.nodeType === child.TEXT_NODE) {
                scanNODES(child);
            }
        }

        scanDOM(child);

    } else {
        Object.keys(tags).forEach((val) => {
            console.log('Тэгов' + val + ':' + tags[val]);
        });
        Object.keys(class_list).forEach((val) => {
            console.log('Элементов с классом ' + val + ':' + class_list[val]);
        });
        console.log('Текстовых узлов: ' + nodes);
    }
}

function scanNODES() {
    ++nodes;
}

scanDOM(document.querySelector('*'));