// Collect all the handlers for the books route here

// Imports
import books from '../../db/db_array.js'

// GET /books
export async function getBooks(request, reply) {
    return books
}

// GET /books/:isbn
export async function getBookByISBN(request, reply) {
    const { isbn } = request.params
    const book = books.find(book => book.isbn === isbn)
    if (!book) {
        reply.code(404).send({ error: 'Book not found' })
        return
    }
    return book
}

// POST /books
export async function addBook(request, reply) {
    const { isbn, title, author } = request.body
    const book = { isbn, title, author }
    books.push(book)
    reply.code(201).send(book)
}

// PUT /books/:isbn
export async function updateBook(request, reply) {
    const { isbn } = request.params
    const { title, author } = request.body
    const book = books.find(book => book.isbn === isbn)
    if (!book) {
        reply.code(404).send({ error: 'Book not found' })
        return
    }

    // if title or author is provided, update the book
    if (title) book.title = title
    if (author) book.author = author
    reply.send(book)
}

// DELETE /books/:isbn
export async function deleteBook(request, reply) {
    const { isbn } = request.params
    const book = books.find(book => book.isbn === isbn)
    if (!book) {
        reply.code(404).send({ error: 'Book not found' })
        return
    }
    books.splice(books.indexOf(book), 1)
    reply.send(book)
}