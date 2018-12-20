"use strict";

var books = [];


function ShowLibrary() {
    return fetch('/api/books')
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            }

            throw new Error('ERROR!');
        })
        .then(data => {
            SaveBooks(data.payload);
            CreateAndShowBooks(data.payload);
        });
}

ShowLibrary();


function DeleteBook(id) {
    return fetch(`/api/books/${id}`, { method: 'delete' })
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            }

            throw new Error('ERROR!');
        })
        .then(data => CreateAndShowBooks(data.payload));
}

const catalog = document.getElementById('catalog');


function CreateAndShowBooks(books) {
    while (catalog.firstChild) {
        catalog.removeChild(catalog.firstChild);
    }
    for (var i = 0; i < books.length; ++i) {
        CreateAndShowBook(books[i])
    }
}

function SaveBooks(receivedBooks) {
    books = receivedBooks;
}

const fontSz = "18px";
const paddding = "0 15px";

function CreateAndShowBook(book) {
    const bookDiv = document.createElement('div');
    bookDiv.dataset.id = book.id;
    const bookImg = document.createElement('div');
    bookImg.className = "cell";
    const image = document.createElement('img');
    image.className = "cell_inside";
    const titleP = document.createElement('div');
    titleP.style.fontSize = fontSz;
    titleP.style.padding = paddding;
    titleP.style.fontStyle = "italic";
    const authorP = document.createElement('div');
    authorP.style.fontSize = fontSz;
    authorP.style.padding = paddding;
    const priceP = document.createElement('div');
    priceP.style.fontSize = fontSz;
    priceP.style.padding = paddding;
    const ratingP = ShowRating(book.rating);
    ratingP.style.fontSize = fontSz;
    ratingP.style.padding = paddding;

    image.src = book.image;
    titleP.textContent = book.title;
    authorP.textContent = `Author: ${book.author}`;
    if (book.price !== 0) { priceP.textContent = `$ ${book.price}`; } else {
        priceP.textContent = `Free for You`;
    }
    // console.log(priceP.value);

    bookDiv.append(image);
    bookDiv.append(titleP);
    bookDiv.append(authorP);
    bookDiv.append(priceP);
    bookDiv.append(ratingP);

    catalog.append(bookDiv);

}

function ShowRating(number) {
    const stars = document.createElement('p');
    stars.setAttribute('class', 'stars');
    for (var i = 1; i <= 6; ++i) {
        const star = document.createElement('i');
        if (number >= i) {
            star.setAttribute('class', 'fa fa-star');
        } else if (number < i && number > i - 1) {
            star.setAttribute('class', 'fa fa-star-half-o');
        } else {
            star.setAttribute('class', 'fa fa-star-o');
        }
        star.setAttribute('aria-hidden', 'true');
        star.dataset.rating = i;
        stars.append(star);
    }
    return stars;
}



function AddBookToLibrary() {
    var form = new FormData(document.getElementById("changeForm"));
    var data = Array.from(form.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
    }), {});
    return fetch(`/api/books/add`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            }

            throw new Error('ERROR!');
        })
        .then(data => {
            CreateAndShowBooks(data.payload);
        });
}


const deleteButton = document.getElementById("deleteButton");
const catalogClick = document.getElementById('catalog');
// const catalogClickDiv = document.getElementsByTagName()
catalogClick.addEventListener("click", ShowInfo);
const headline2 = document.getElementById('headline2');
const inputsAtChangeForm = document.getElementById('inputs');
const inputAtChangeForm = inputsAtChangeForm.getElementsByTagName('input');


function ShowInfo(elem) {

    var parentItem = elem.target.closest('div');
    var book = books.find(function(books) {
        return books.id === +parentItem.dataset.id
    });
    buttonNewBookAdd.onclick = function() {
        ChangeBook(book)
    };
    deleteButton.onclick = function() {
        DeleteBook(parentItem.dataset.id)
    };
    headline2.textContent = `about ${book.title}`;
    inputAtChangeForm[0].value = book.title;
    inputAtChangeForm[1].value = book.author;
    inputAtChangeForm[2].value = book.price;

}

function ShowSearchBook(match) {
    return fetch(`/api/books?match=${match}`)
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            }

            throw new Error('ERROR!');
        })
        .then(data => CreateAndShowBooks(data.payload));
}

function ChangeBook(thisBook) {
    var bookId = thisBook.id;
    var bookModel = books.find(book => book.id === +bookId);
    var form = new FormData(document.getElementById("changeForm"));

    var data = Array.from(form.entries()).reduce((memo, pair) => ({
        ...memo,
        [pair[0]]: pair[1],
    }), {});
    var rating = thisBook.rating;
    data = {...data, rating };
    console.log(data);
    return fetch(`/api/books/${bookId}`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            }

            throw new Error('ERROR!');
        })
        .then(data => {
            Object.assign(bookModel, data.payload);
            CreateAndShowBooks(books);
        });
}

function SearchBook() {
    var form = new FormData(document.getElementById("searchField"));
    ShowSearchBook((form.get('search').toLowerCase()));
}


function ChangeRating(event) {
    event.stopPropagation();
    var star = event.target.closest('.stars > i');
    if (star) {
        var rating = star.dataset.rating;
        var book = event.target.closest('[data-id]');
        var bookId = book.dataset.id;

        var bookModel = books.find(book => book.id === +bookId);
        var updatedBook = {...bookModel, rating };
        return fetch(`/api/books/${bookId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedBook)
            })
            .then(responce => {
                if (responce.ok) {
                    return responce.json();
                }

                throw new Error('ERROR!');
            })
            .then(data => {
                Object.assign(bookModel, updatedBook);
                CreateAndShowBooks(books);
            });
    }
}

catalog.addEventListener('click', ChangeRating);

document.getElementById("mostPopular").onclick = () => { PopularBooksFilter(); };

document.getElementById("mostRecent").onclick = () => { RecentBooksFilter() };

document.getElementById("freeBooks").onclick = () => { FreeBooksFilter() };

document.getElementById("buttonNewBookAdd").onclick = () => { AddBookToLibrary() };

document.getElementById("searchButton").onclick = () => { SearchBook() };

document.getElementById("allBooks").onclick = () => { ShowLibrary(); };