require('dotenv').config();

const mongoose = require('mongoose');

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const cookieParser = require('cookie-parser');

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
app.use(cookieParser());
app.use(auth);
app.use(cors);

app.use('/graphql', graphqlHTTP((req, res) => ({
  schema,
  graphiql: process.env.APP_ENV === 'production' ? false : true,
  context: { req, res }
})));

app.listen(port, () => {
  console.log(`
  🚀  Server is running!
  🔉  Listening a GraphQL API server at http://localhost:${port}/graphql
  `);
});
