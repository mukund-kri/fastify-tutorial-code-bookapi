import cdb from "./db.js"
import db from "../..//models/index.cjs"

let books = cdb;


// Books listing
export async function getBooks(request, reply) {
    // return books
    return await db.Book.findAll();
}

// Book details, get by isbn
export async function getBookByISBN(request, reply) {
    const isbn = request.params.isbn
    const book = await db.Book.findOne({ where: { isbn: isbn } })

    // If the book is not found, return a 404 error
    if (!book) {
        reply.code(404).send({ message: 'Book not found' })
        return
    }
    return book
}

// Add a new book
export async function addBook(request, reply) {
    const book = db.Book.build(request.body)
    await book.save()
    return book
}

// Update a book
export async function updateBook(request, reply) {
    const isbn = request.params.isbn

    // First check if the book exists, if not return a 404 error
    const book = books.find(book => book.isbn == isbn)

    if (book === undefined) {
        reply.code(404).send({ message: 'Book not found' })
        return
    }

    // Update the book
    const updatedBook = {
        isbn,
        ...request.body
    }
    books = books.map(book => book.isbn == isbn ? updatedBook : book)
    return updatedBook
}

// Delete a book
export async function deleteBook(request, reply) {
    const isbn = request.params.isbn

    // Check if the book exists, if not return a 404 error
    const book = books.find(book => book.isbn == isbn)
    if (book === undefined) {
        reply.code(404).send({ message: 'Book not found' })
        return
    }

    // if the book exists, delete it
    books = books.filter(book => book.isbn != isbn)
    return { message: 'Book deleted' }
}

// Path: routes/books/index.js:
export default function dontKnowWhat(request, reply) {
    let x = 1;

    console.log(x);
}