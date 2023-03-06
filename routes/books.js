
const BOOKS_ROOT = '/books'

// Simulate the books database
let books = [
    {
        "isbn": "978-0544003415",
        "title": "The Lord of the Rings",
        "author": "J.R.R. Tolkien"
    },
    {
        "isbn": "978-0261102219",
        "title": "The Hobbit",
        "author": "J.R.R. Tolkien"
    },

]

export default async function (fastify, opts) {
    // Books listing
    fastify.get(`${BOOKS_ROOT}`, async function (request, reply) {
        return books
    })


    // Book details, get by isbn
    fastify.get(`${BOOKS_ROOT}/:isbn`, async function (request, reply) {
        const isbn = request.params.isbn
        const book = books.find(book => book.isbn == isbn)
        return book
    })

    // Add a new book
    fastify.post(`${BOOKS_ROOT}`, async function (request, reply) {
        const book = request.body
        books.push(book)
        return book
    })

    // Update a book
    fastify.put(`${BOOKS_ROOT}/:isbn`, async function (request, reply) {
        const isbn = request.params.isbn
        const updatedBook = {
            isbn,
            ...request.body
        }
        books = books.map(book => book.isbn == isbn ? book : updatedBook)
        return updatedBook
    })

    // Delete a book
    fastify.delete(`${BOOKS_ROOT}/:isbn`, async function (request, reply) {
        const isbn = request.params.isbn
        books = books.filter(book => book.isbn != isbn)
        return { message: 'Book deleted' }
    })

}