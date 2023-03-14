// Define the schema for the books listing

// JSON Schema for an individual book
export const BookSchema = {
    type: 'object',
    required: ['isbn', 'title', 'author'],
    additionalProperties: false,
    properties: {
        isbn: { type: 'string', minLength: 10, maxLength: 14 },
        title: { type: 'string', minLength: 3, },
        author: { type: 'string', minLength: 3 }
    }
}

// JSON Schema for the array of books
export const BooksSchema = {
    type: 'array',
    items: BookSchema
}

// Common JSON Schema for url with the isbn parameter. Used in GET, PUT and DELETE
export const IsbnSchema = {
    type: 'object',
    properties: {
        isbn: { type: 'string', minLength: 10, maxLength: 14 }
    }
}

// Validation schema for the books listing
export const allBooksSchema = {
    schema: {
        response: {
            200: BooksSchema
        }
    }
}

// Validation schema for the book details, get by isbn
export const bookByIsbnSchema = {
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
export const addBookSchema = {
    schema: {
        body: BookSchema,  // incoming data
        response: {
            '200': BookSchema  // outgoing data on success
        }
    }
}

// Validation for updating a book.
export const updateBookSchema = {
    schema: {
        params: IsbnSchema,
        body: BookSchema,
        response: {
            '200': BookSchema
        }
    }
}

// Validation for deleting a book
export const deleteBookSchema = {
    schema: {
        params: IsbnSchema,
        response: {
            '200': { type: 'object', properties: { message: { type: 'string' } } }
        }
    }
}