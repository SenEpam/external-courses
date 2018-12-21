function PopularBooksFilter() {
    return fetch(`/api/books?filter=most-popular`)
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            }

            throw new Error('ERROR!');
        })
        .then(data => CreateAndShowBooks(data.payload));
}

function RecentBooksFilter() {
    return fetch(`/api/books?filter=most-recent`)
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            }

            throw new Error('ERROR!');
        })
        .then(data => CreateAndShowBooks(data.payload));
}

function FreeBooksFilter() {
    return fetch(`/api/books?filter=free-books`)
        .then(responce => {
            if (responce.ok) {
                return responce.json();
            }

            throw new Error('ERROR!');
        })
        .then(data => CreateAndShowBooks(data.payload));
}