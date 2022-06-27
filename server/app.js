require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

const auth = require('./middleware/auth');
const cors = require('./middleware/cors');

const schema = require('./graphql/schema');

// DB connection
mongoose.connect(
  process.env.APP_DB_URL,
  {
      useNewUrlParser: true,
      useUnifiedTopology: true
  }
);

const port = process.env.APP_SERVER_PORT || 4000;

// Middleware
app.use(auth);
app.use(cors);

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: process.env.APP_ENV !== 'production' ? true : false,
}));

app.listen(port, () => {
  console.log(`
  🚀  Server is running!
  🔉  Listening a GraphQL API server at http://localhost:${port}/graphql
  `);
});
