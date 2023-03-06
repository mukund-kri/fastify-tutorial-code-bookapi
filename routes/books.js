
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

// Define the schema for the books listing

// JSON Schema for an individual book
const BookSchema = {
    type: 'object',
    required: ['isbn', 'title', 'author'],
    properties: {
        isbn: { type: 'string', minLength: 10, maxLength: 14 },
        title: { type: 'string', minLength: 3, },
        author: { type: 'string', minLength: 3 }
    }
}

// JSON Schema for the array of books
const BooksSchema = {
    type: 'array',
    items: BookSchema
}

// Common JSON Schema for url with the isbn parameter. Used in GET, PUT and DELETE
const IsbnSchema = {
    type: 'object',
    properties: {
        isbn: { type: 'string', minLength: 10, maxLength: 14 }
    }
}

// Validation schema for the books listing
const allBooksSchema = {
    schema: {
        response: {
            200: BooksSchema
        }
    }
}

// Validation schema for the book details, get by isbn
const bookByIsbnSchema = {
    schema: {
        params: IsbnSchema,
        response: {
            '2xx': BookSchema
        }
    }
}

// Validation for adding a new book. 
// This is more complex. The incoming data must be a valid book object,
// and the same book is then returned.
const addBookSchema = {
    schema: {
        body: BookSchema,  // incoming data
        response: {
            '200': BookSchema  // outgoing data on success
        }
    }
}

// Validation for updating a book.
const updateBookSchema = {
    schema: {
        params: IsbnSchema,
        body: BookSchema,
        response: {
            '200': BookSchema
        }
    }
}

// Validation for deleting a book
const deleteBookSchema = {
    schema: {
        params: IsbnSchema,
        response: {
            '200': { type: 'object', properties: { message: { type: 'string' } } }
        }
    }
}

export default async function (fastify, opts) {
    // Books listing
    fastify.get(`${BOOKS_ROOT}`, allBooksSchema, async function (request, reply) {
        return books
    })

    // Book details, get by isbn
    fastify.get(`${BOOKS_ROOT}/:isbn`, bookByIsbnSchema, async function (request, reply) {
        const isbn = request.params.isbn
        const book = books.find(book => book.isbn == isbn)

        // If the book is not found, return a 404 error
        if (book === undefined) {
            reply.code(404).send({ message: 'Book not found' })
            return
        }
        return book
    })

    // Add a new book
    fastify.post(`${BOOKS_ROOT}`, addBookSchema, async function (request, reply) {
        const book = request.body
        books.push(book)
        return book
    })

    // Update a book
    fastify.put(`${BOOKS_ROOT}/:isbn`, async function (request, reply) {
        const isbn = request.params.isbn

        // First check if the book exists, if not return a 404 error
        const book = books.find(book => book.isbn == isbn)
        console.log(book)
        if (!book) {
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
    })

    // Delete a book
    fastify.delete(`${BOOKS_ROOT}/:isbn`, async function (request, reply) {
        const isbn = request.params.isbn

        // Check if the book exists, if not return a 404 error
        const book = books.find(book => book.isbn == isbn)
        console.log(book)
        if (book === undefined) {
            reply.code(404).send({ message: 'Book not found' })
            return
        }

        // if the book exists, delete it
        books = books.filter(book => book.isbn != isbn)
        return { message: 'Book deleted' }
    })

}