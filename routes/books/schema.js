// All the schemas related to the book API go here

// Define the Book schema. This is going to be reused in all the routes
export const bookSchema = {
    type: 'object',
    properties: {
        isbn: { type: 'string' },
        title: { type: 'string' },
        author: { type: 'string', nullable: true },
    },
}

// GET /books
export const allBooksSchema = {
    description: 'Get all books',
    tags: ['books'],
    response: {
        200: {
            description: 'Successful response',
            type: 'array',
            items: bookSchema,
        },
    },
}

// GET /books/:isbn
export const bookByIsbnSchema = {
    description: 'Get a book by ISBN',
    tags: ['books'],
    params: {
        type: 'object',
        properties: {
            isbn: { type: 'string', pattern: '^[0-9]{10}$' },
        },
    },
    response: {
        200: {
            description: 'Successful response',
            ...bookSchema,
        },
        400: {
            error: 'Bad Request',
            message: 'Invalid ISBN. Your ISBN should be a 10 digit number',
        },
    },
}

// POST /books
export const addBookSchema = {
    description: 'Add a new book',
    tags: ['books'],
    body: {
        type: 'object',
        properties: {
            isbn: { type: 'string' },
            title: { type: 'string' },
        },
        required: ['isbn', 'title'],
    },
    response: {
        201: {
            description: 'Successful response',
            ...bookSchema,
        },
    },
}

// PUT /books/:isbn
export const updateBookSchema = {
    description: 'Update a book',
    tags: ['books'],
    params: {
        type: 'object',
        properties: {
            isbn: { type: 'string', nullable: true },
            author: { type: 'string', nullable: true },
        },
    },
    body: {
        type: 'object',
        properties: {
            title: { type: 'string' },
        },
        required: ['title'],
    },
    response: {
        200: {
            description: 'Successful response',
            ...bookSchema,
        },
    },
}

// DELETE /books/:isbn
export const deleteBookSchema = {
    description: 'Delete a book',
    tags: ['books'],
    params: {
        type: 'object',
        properties: {
            isbn: { type: 'string' },
        },
    },
    response: {
        204: {
            // description: 'Successful response',
        },
    },
}