const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author.js')
const Book = require('./models/book.js')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message)
  })

// let authors = [
//   {
//     name: 'Robert Martin',
//     // id: 'afa51ab0-344d-11e9-a414-719c6709cf3e',
//     born: 1952
//   },
//   {
//     name: 'Martin Fowler',
//     // id: 'afa5b6f0-344d-11e9-a414-719c6709cf3e',
//     born: 1963
//   },
//   {
//     name: 'Fyodor Dostoevsky',
//     // id: 'afa5b6f1-344d-11e9-a414-719c6709cf3e',
//     born: 1821
//   },
//   {
//     name: 'Joshua Kerievsky' // birthyear not known
//     // id: 'afa5b6f2-344d-11e9-a414-719c6709cf3e'
//   },
//   {
//     name: 'Sandi Metz' // birthyear not known
//     // id: 'afa5b6f3-344d-11e9-a414-719c6709cf3e'
//   }
// ]
//
// let books = [
//   {
//     title: 'Clean Code',
//     published: 2008,
//     author: 'Robert Martin',
//     // id: 'afa5b6f4-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring']
//   },
//   {
//     title: 'Agile software development',
//     published: 2002,
//     author: 'Robert Martin',
//     // id: 'afa5b6f5-344d-11e9-a414-719c6709cf3e',
//     genres: ['agile', 'patterns', 'design']
//   },
//   {
//     title: 'Refactoring, edition 2',
//     published: 2018,
//     author: 'Martin Fowler',
//     // id: 'afa5de00-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring']
//   },
//   {
//     title: 'Refactoring to patterns',
//     published: 2008,
//     author: 'Joshua Kerievsky',
//     // id: 'afa5de01-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'patterns']
//   },
//   {
//     title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//     published: 2012,
//     author: 'Sandi Metz',
//     // id: 'afa5de02-344d-11e9-a414-719c6709cf3e',
//     genres: ['refactoring', 'design']
//   },
//   {
//     title: 'Crime and punishment',
//     published: 1866,
//     author: 'Fyodor Dostoevsky',
//     // id: 'afa5de03-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'crime']
//   },
//   {
//     title: 'The Demon ',
//     published: 1872,
//     author: 'Fyodor Dostoevsky',
//     // id: 'afa5de04-344d-11e9-a414-719c6709cf3e',
//     genres: ['classic', 'revolution']
//   }
// ]

const typeDefs = `
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!,
    authorCount: Int!,
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!
    editAuthor(
      name: String!
      born: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        return await Book.find({ author: author._id })
      }

      if (args.genre) {
        return await Book.find({ genres: { $elemMatch: { $eq: args.genre } } })
      }

      return await Book.find({})
    },
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async root =>
      await Book.find({ author: root._id }).countDocuments()
  },
  Book: {
    author: async root => await Author.findOne({ _id: root.author })
  },
  Mutation: {
    addBook: async (root, args) => {
      if (args.title.length < 5) {
        throw new GraphQLError('Title needs to have 5 or more characters', {
          extensions: { code: 'BAD_USER_INPUT', argumentName: args.title }
        })
      }

      if (!args.genres.length > 0) {
        throw new GraphQLError('Need to provide at least one genre', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.genres }
        })
      }

      const author = await Author.findOne({ name: args.author })
      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.author }
        })
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        genres: args.genres,
        author: author
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error }
        })
      }

      return book
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })

      if (!author) {
        throw new GraphQLError('Author not found', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.author }
        })
      }

      author.born = args.born
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: { code: 'BAD_USER_INPUT', invalidArgs: args.name, error }
        })
      }
      return author
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

startStandaloneServer(server, {
  listen: { port: 4000 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
