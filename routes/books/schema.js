// All the schemas related to the book API go here

// Define the Book schema. This is going to be reused in all the routes
export const bookSchema = {
    type: 'object',
    properties: {
        isbn: { type: 'string', pattern: '^[0-9]{13}$' },
        title: { type: 'string', minLength: 5, maxLength: 255 },
        author: { type: 'string', nullable: true },
    },
    required: ["isbn", "title"],
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
            isbn: { type: 'string', pattern: '^[0-9]{13}$' },
        },
    },
    response: {
        200: {
            description: 'Successful response', 
            ...bookSchema,
        },

    },
}

// POST /books
export const addBookSchema = {
    description: 'Add a new book',
    tags: ['books'],
    body: bookSchema,
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