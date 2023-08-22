export const typeDefs = `#graphql
    type Game {
        id: ID!
        title: string!
        platform: [string!]!
        reviews: [Review!]
    }
    type Review {
        id: ID!
        reting : Int!
        content: String!
        game: Game!
        author: Author!
    }
    type Author {
        id: ID!
        name: String!
        verified: Boolean!
        reviews: [Review!]
    }
    type Query {
        reviews: [Review]
        review(id: ID!): Review
        games: [Game]
        game(id: ID!): Game
        authors: [Author]
        author(id: ID!): Author
    }
    type Mutation {
        addGame(game: AddGameInput!): Game
        deleteGame(id: ID!): [Game]
        updateGame(id: ID!, edits: EditGameInput): Game
    }
    input AddGameInput {
        title: String!,
        platform: [String!]!
    }
    input EditGameInput {
        title: String,
        platform: [String!]
    }
`;

// you can use any type of this scaile types
// int, float, string, boolean, ID

// there's 3 type of data you have to defaine: [
//      Game Obj, Review Obj, Author Obj
// ]

// ! = it have not to be NULL
