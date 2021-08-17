const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

  
  const resolvers = {
    Query: {
      info: () => `This is the API of a Hackernews Clone`,
      feed: () => async (parent, args, context) =>{
        return context.prisma.link.findMany()
      },
    },
    Mutation: {
      post: (parent, args, context, info ) => {
          const newLink = context.prisma.link.create({
            data:{
              url: args.url,
              description: args.description,
            },
          })
          return newLink
      },
      // updateLink: (parent, args, context ) => {
      //   const link = links.find((link)=> link.id === args.id);
      //   link.url = args.url ? args.url : link.url
      //   if(args.description) {
      //     link.description = args.description;
      //   }
      //   return link
      // },
      // deleteLink: (parent, args) => {
      //   const index = links.findIndex((link)=> link.id === args.id);
      //   const link = links[index];
      //   links.splice(index,1);
      //   return link
      // }
    }
  }
  
const prisma = new PrismaClient();

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
      path.join(__dirname, 'schema.graphql'),
      'utf8'
    ),
    resolvers,
    context: {
      prisma,
    }
})

server
    .listen()
    .then(({url}) =>
        console.log(`Server is running on ${url}`)
    );