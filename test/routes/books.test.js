// Tests for the full REST API for the books resource

import { test } from 'tap';
import { build } from '../helper.js';

test('GET /books', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/books'
    });

    let booksOnServer = JSON.parse(res.payload);

    t.same(booksOnServer.length, 2);
    t.same(booksOnServer[0].isbn, '978-0544003415');
});

test('GET /books/isbn', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/books/978-0544003415'
    });

    let book = JSON.parse(res.payload);

    t.same(book.isbn, '978-0544003415');
    t.same(book.title, 'The Lord of the Rings');
    t.same(book.author, 'J.R.R. Tolkien');

});

test('GET /books/isbn - not found', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        url: '/books/nonsense'
    });

    t.same(res.statusCode, 404);
});

const newBook = {
    isbn: '978-0261102219',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien'
};

test('POST /books', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        method: 'POST',
        url: '/books',
        payload: newBook
    });

    let book = JSON.parse(res.payload);
    t.same(book, newBook);

    const resp2 = await app.inject({
        url: '/books'
    });

    const books = JSON.parse(resp2.payload);
    t.same(books.length, 3);
});

test('PUT /books/isbn', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        method: 'PUT',
        url: '/books/978-0261102219',
        payload: {
            title: 'The Hobbit, or There and Back Again',
            author: 'J.R.R. Tolkien'
        }
    });

    t.same(res.statusCode, 200);
    console.log(res.payload);
    console.log("The payload")
    let book = JSON.parse(res.payload);
    t.same(book.isbn, '978-0261102219');
    t.same(book.title, 'The Hobbit, or There and Back Again');


    book = await app.inject({
        url: '/books/978-0261102219'
    });

    const book2 = JSON.parse(res.payload);
    t.same(book2.isbn, '978-0261102219');
    t.same(book2.title, 'The Hobbit, or There and Back Again');

});

// calling put on a non-existent book should return a 404
test('PUT /books/isbn - not found', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        method: 'PUT',
        url: '/books/nonsense',
        payload: {},
    });

    t.same(res.statusCode, 404);
});

// Delete a book
test('DELETE /books/isbn', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        method: 'DELETE',
        url: '/books/978-0261102219'
    });

    t.same(res.statusCode, 200);

    const resp2 = await app.inject({
        url: '/books'
    });

    const books = JSON.parse(resp2.payload);
    t.same(books.length, 1);
});

// calling delete on a non-existent book should return a 404
test('DELETE /books/isbn - not found', async (t) => {
    const app = await build(t);

    const res = await app.inject({
        method: 'DELETE',
        url: '/books/nonsense'
    });

    t.same(res.statusCode, 404);
});
