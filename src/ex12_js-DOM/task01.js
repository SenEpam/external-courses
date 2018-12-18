"use strict";

var addDiv = document.getElementById('add');
var deleteDiv = document.getElementById('delete');

addDiv.addEventListener('click', MoveDiv);
deleteDiv.addEventListener('click', DeleteDivFunc);

function prepend(container, newElement) {
    container.insertBefore(newElement, container.firstChild);
    return newElement;
}


function CreateRandDiv(container, tag) {
    var element = document.createElement(tag);
    element.style.position = 'absolute';
    element.style.width = randomNum(50, 150) + 'px';
    element.style.height = randomNum(50, 150) + 'px';
    element.style.left = randomNum(0, 1000) + randomNum(0, 10) - 50 + 'px';
    element.style.top = randomNum(0, 1000) + randomNum(0, 10) - 50 + 'px';
    element.style.backgroundColor = 'rgb(' + randomNum(0, 255) + ', ' + randomNum(0, 255) + ', ' + randomNum(0, 255) + ')';
    prepend(container, element);
    return element;
}

function MoveDiv() {
    var element = CreateRandDiv(document.body, 'div');
    element.onmousedown = ev => {
        var shiftX = ev.pageX - element.getBoundingClientRect().left;
        var shiftY = ev.pageY - element.getBoundingClientRect().top;

        element.ondragstart = () => false;

        document.onmousemove = ev => {
            element.style.left = ev.pageX - shiftX + 'px';
            element.style.top = ev.pageY - shiftY + 'px';
        }

        element.onmouseup = () => {
            document.onmousemove = null;
            element.onmouseup = null;
        }
    };
}


function randomNum(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}