import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./_db";

// types
import { typeDefs } from "./schema";

const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    game(_, args) {
      //*1
      return db.games.find((game) => game.id === args.id);
    },
    authors() {
      return db.authors;
    },
    author(_, args) {
      //*1
      return db.authors.find((author) => author.id === args.id);
    },
    reviews() {
      return db.reviews;
    },
    review(_, args) {
      //*1
      return db.reviews.find((review) => review.id === args.id);
    },
  },
  Game: {
    //*2
    reviews(parent) {
      return db.reviews.filter((r) => r.game_id === parent.id);
    },
  },
  Author: {
    //*2
    reviews(parent) {
      return db.reviews.filter((r) => r.author_id === parent.id);
    },
  },
  Review: {
    //*3
    author(parent) {
      return db.authors.find((a) => a.id === parent.author_id);
    },
    game(parent) {
      return db.games.find((g) => g.id === parent.game_id);
    },
  },
  Mutation: {
    addGame(_, args) {
      //5*
      let game = {
        ...args.game,
        id: Math.floor(Math.random() * 10000).toString(),
      };
      db.games.push(game);

      return game;
    },
    deleteGame(_, args) {
      //4*
      db.games = db.games.filter((g) => g.id !== args.id);

      return db.games;
    },
    updateGame(_, args) {
      //6*
      db.games = db.games.map((g) => {
        if (g.id === args.id) {
          return { ...g, ...args.edits };
        }

        return g;
      });

      return db.games.find((g) => g.id === args.id);
    },
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`Server ready at: ${url}`);

/*
In Apollo sandBox ={
 //*1
  (( Operation ))
  query RevirwQuery ($id: ID!){
    game(id: $id){
      title,
      platform,
      id
    }
  }

  (( Variables ))
  {
    "id": "2",
  }

}
*/
/*
In Apollo sandBox ={
 //*2
  (( Operation ))
  query gameQuery ($id: ID!){
    game(id: $id){
      title,
      reviews {
        rating,
        content,
      }
    }
  }

  (( Variables ))
  {
    "id": "2",
  }

}
*/
/*
In Apollo sandBox ={
 //*3
  (( Operation ))
  query reviewQuery ($id: ID!){
    review(id: $id){
      rating,
      game {
        title,
        platform,
        reviews {
          reting
        }
      }
      author {
        name,
        verified,
      }
    }
  }

  (( Variables ))
  {
    "id": "2",
  }

}
*/
/*
In Apollo sandBox ={
 //*4
  (( Operation ))
  mutation DeletMutation ($id: ID!){
    deletGame(id: $id){
      game {
        title,
        platform
      }
    }
  }

  (( Variables ))
  {
    "id": "2",
  }

}
*/
/*
In Apollo sandBox ={
 //*5
  (( Operation ))
  mutation addMutation ($game: AddGameInput!){
    addGame(game: $game){
      id,
      title,
      platform
    }
  }

  (( Variables ))
  "game": {
    "title": "a new game",
    "platform": ["Switch"]
  }

}
*/
/*
In Apollo sandBox ={
 //*6
  (( Operation ))
  mutation EditMutation ($edits: EditGameInput!, $id: ID){
    updateGame(edits: $edits, id: $id){
      title,
      platform
    }
  }

  (( Variables ))
  {
    "edits": {
      "title": "edit game",
      "platform": ["Switch"]
    },
    "id": "2"
  }
}
*/
