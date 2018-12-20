"use strict";

const form = document.getElementById('formId');

const btn = document.getElementById("buttonAdd");

const headline2Text = document.getElementById("headline2");

const inputsAtChangeForm2 = document.getElementById('inputs');
const inputAtChangeForm2 = inputsAtChangeForm2.getElementsByTagName('input');

const closeX = document.getElementsByClassName("close")[0];

const inputSearch = document.getElementById("searchText");
const btnSearch = document.getElementById("searchButton");

const catalogBooks = document.getElementById("catalog");

const delBtn = document.getElementById("deleteButton");

const addBtn = document.getElementById("buttonNewBookAdd");

headline2

addBtn.onclick = function() {
    form.style.display = "none";
    inputSearch.style.visibility = "visible";
    btnSearch.style.visibility = "visible";
}

delBtn.onclick = function() {
    form.style.display = "none";
    inputSearch.style.visibility = "visible";
    btnSearch.style.visibility = "visible";
}


catalogBooks.onclick = function() {
    form.style.display = "block";
    inputSearch.style.visibility = "hidden";
    btnSearch.style.visibility = "hidden";
    delBtn.style.visibility = "visible";
    if (delBtn.style.visibility === "visible") {
        addBtn.textContent = "Change";
    } else { addBtn.textContent = "Add" };
}


btn.onclick = function() {
    form.style.display = "block";
    inputSearch.style.visibility = "hidden";
    btnSearch.style.visibility = "hidden";
    delBtn.style.visibility = "hidden";
    headline2Text.innerHTML = "Add a book";
    for (var i = 0; i < inputAtChangeForm2.length; ++i) inputAtChangeForm2[i].value = "";
    addBtn.textContent = "Add";
}

closeX.onclick = function() {
    form.style.display = "none";
    inputSearch.style.visibility = "visible";
    btnSearch.style.visibility = "visible";
}

window.onclick = function(event) {
    if (event.target == form) {
        form.style.display = "none";
        inputSearch.style.visibility = "visible";
        btnSearch.style.visibility = "visible";
    }
}