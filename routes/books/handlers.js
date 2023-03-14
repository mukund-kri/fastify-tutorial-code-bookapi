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

    // Update the book with sequelize
    const result = await db.Book.update(request.body, { where: { isbn: isbn } })

    // If the book is not found, return a 404 error
    if (result[0] === 0) {
        reply.code(404).send({ message: 'Book not found' })
        return
    }

    // Return the updated book
    const updatedBook = await db.Book.findOne({ where: { isbn: isbn } })
    return updatedBook
}

// Delete a book
export async function deleteBook(request, reply) {
    const isbn = request.params.isbn

    // Delete the book with sequelize
    const result = await db.Book.destroy({ where: { isbn: isbn } })

    // If the book is not found, return a 404 error
    if (result === 0) {
        reply.code(404).send({ message: 'Book not found' })
        return
    }

    // Return a success message
    return { message: 'Book deleted' }
}

