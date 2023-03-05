export default {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 5 },
    description: { type: 'string', minLength: 10 },
    author: { type: 'string', minLength: 5 },
    genre: { type: 'string', minimum: 4 },
    count: { type: 'integer', minimum: 0 },
    price: { type: 'integer', minimum: 0 },
  },
  required: ['title', 'description', 'author', 'genre', 'count', 'price'],
} as const
