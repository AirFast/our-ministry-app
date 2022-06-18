require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

const schema = require('./graphql/schema');

mongoose.connect(
  process.env.APP_DB_URL,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
      return res.status(200).json({});
  }
  next();
});

const port = process.env.APP_SERVER_PORT || 4000;

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.APP_ENV !== 'production' ? true : false
}));

app.listen(port, () => {
  console.log(`
  🚀  Server is running!
  🔉  Listening a GraphQL API server at http://localhost:${port}/graphql
  `);
});
