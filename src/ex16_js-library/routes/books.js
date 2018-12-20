const router = require('express').Router();

const BOOKS = [
    { id: 1, title: 'Отцы и дети', src: 2, author: 'Тургенев И.В.', description: 'Классическая литература', keywords: ['Отцы и дети', 'Тургенев', 'классика'], rating: 2, price: 0, created_at: new Date(1960, 0, 1), image: 'bookElements/bookElem1.png' },
    { id: 2, title: 'Фауст', src: 6, author: 'Гете И.В.', description: 'Классичская литератуара', keywords: ['Фауст', 'Гете', 'классика'], rating: 4, price: 350, created_at: new Date(1880, 1, 5), image: 'bookElements/bookElem2.png' },
    { id: 3, title: 'Земля обетованная', src: 9, author: 'Ремарк Е.М.', description: 'Классическая литература', keywords: ['Земля обетованная', 'Ремарк', 'классика'], rating: 6, price: 280, created_at: new Date(1970, 0, 1), image: 'bookElements/bookElem3.png' },
    { id: 4, title: 'Илиада', src: 4, author: 'Гомер', description: 'Классическая литература', keywords: ['Илиада', 'Гомер', 'классика'], rating: 5, price: 280, created_at: new Date(1788, 4, 5), image: 'bookElements/bookElem4.png' },
    { id: 5, title: 'Триумфальная арка', src: 1, author: 'Ремарк Е.М.', description: 'Классическая литература', keywords: ['Триумфальная арка', 'Ремарк', 'классика'], rating: 5, price: 380, created_at: new Date(1965, 0, 1), image: 'bookElements/bookElem5.png' },
    { id: 6, title: 'Так говорил Заратустра', src: 7, author: 'Ницше Ф.', description: 'Классическая литература', keywords: ['Так говорил Заратустра', 'Ницще', 'классика'], rating: 3, price: 480, created_at: new Date(1883, 3, 4), image: 'bookElements/bookElem6.png' },
    { id: 7, title: 'Гордость и предубеждение', src: 3, author: 'Джейн Остин', description: 'Классическая литература', keywords: ['Гордость и предубеждение', 'Джейн Остин,классика'], rating: 5, price: 0, created_at: new Date(1813, 4, 5), image: 'bookElements/bookElem7.png' },
    { id: 8, title: 'Поющие в терновике', src: 7, author: 'Маккалоу К.', description: 'Классическая литература', keywords: ['Поющие в терновике', 'Маккалоу', 'классика'], rating: 5.5, price: 289, created_at: new Date(1977, 4, 5), image: 'bookElements/bookElem8.png' },
    { id: 9, title: 'Хорошие плохие книги', src: 8, author: 'Джордж Оруэлл', description: 'Классическая литература', keywords: ['Хорошие плохие книги', 'Джордж Оруэлл', 'классика'], rating: 4.8, price: 0, created_at: new Date(2016, 4, 9), image: 'bookElements/bookElem9.png' },
    { id: 10, title: 'Время и книги', src: 4, author: 'Сомерсет Моэм', description: 'Классическая литература', keywords: ['Время и книги', 'Сомерсет Моэм', 'классика'], rating: 5.8, price: 0, created_at: new Date(2013, 4, 9), image: 'bookElements/bookElem10.png' }
];


var sum = 0;

for (i = 0; i < BOOKS.length; ++i) {
    sum += BOOKS[i].rating;
}

middleSum = sum / (BOOKS.length);

const MOST_POPULAR_FILTER = 'most-popular';
const MOST_RECENT_FILTER = 'most-recent';
const FREE_BOOKS_FILTER = 'free-books';
const nowDate = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

router.get('/', (req, res) => {

    const { query } = req;

    const { filter, match } = query;

    if (filter) {
        switch (filter) {
            case MOST_POPULAR_FILTER:
                {
                    return res.json({
                        payload: BOOKS.filter(book => book.rating > middleSum)
                    });
                }
            case MOST_RECENT_FILTER:
                {
                    return res.json({
                        payload: BOOKS.filter(book => book.created_at > new Date() - nowDate)
                    });
                }
            case FREE_BOOKS_FILTER:
                {
                    return res.json({
                        payload: BOOKS.filter(book => book.price === 0)
                    });
                }
        }
    }

    if (match) {
        return res.json({
            payload: BOOKS.filter(
                book => book.title.toLowerCase().includes(match) || book.author.toLowerCase().includes(match) || book.keywords.find(function(keyword) {
                    return keyword.toLowerCase() === match
                }))
        })
    }

    res.json({ payload: BOOKS });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    res.json({ payload: BOOKS.find((book) => book.id === +id) });
});

router.post('/add', (req, res) => {
    const book = req.body;
    book.id = BOOKS[BOOKS.length - 1].id + 1;
    book.image = 'bookElements/NewAddBook.png';
    book.price = +req.body.price;
    book.created_at = new Date(req.body.created_at);
    console.log(book);
    BOOKS.push(book);
    res.json({ payload: BOOKS });
});

router.delete('/:id', function(req, res) {
    const id = +req.params.id;
    const bookIndex = BOOKS.findIndex(book => book.id === id);
    BOOKS.splice(bookIndex, 1);
    res.json({ payload: BOOKS });
});

router.put("/:id", function(req, res) {
    const { title, src, author, rating, price, created_at } = req.body;
    const { id } = req.params;
    var book = BOOKS.find(book => book.id === +id);
    book.title = title;
    book.src = src;
    book.author = author;
    book.rating = rating;
    book.price = price;
    book.created_at = new Date(created_at);
    res.json({ payload: book });
});


module.exports = router;