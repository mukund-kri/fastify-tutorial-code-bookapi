import books from './db.js'
import {
    allBooksSchema,
    bookByIsbnSchema,
    addBookSchema,
    updateBookSchema,
    deleteBookSchema,
} from './schema.js'

import { getBooks, getBookByISBN, addBook, updateBook, deleteBook } from './handlers.js'


// Declare the routes
export default async function (fastify, opts) {
    // Books listing
    fastify.route({
        method: 'GET',
        url: '/',
        schema: allBooksSchema,
        handler: getBooks
    })

    // Book details, get by isbn
    fastify.route({
        method: 'GET',
        url: '/:isbn',
        schema: bookByIsbnSchema,
        handler: getBookByISBN
    })

    // Add a new book
    fastify.route({
        method: 'POST',
        url: '/',
        schema: addBookSchema,
        handler: addBook
    })

    // Update a book
    fastify.route({
        method: 'PUT',
        url: '/:isbn',
        schema: updateBookSchema,
        handler: updateBook
    })

    // Delete a book
    fastify.route({
        method: 'DELETE',
        url: '/:isbn',
        schema: deleteBookSchema,
        handler: deleteBook
    })

}