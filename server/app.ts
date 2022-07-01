require('dotenv').config();

import express, { RequestHandler } from 'express';
import { OptionsData, graphqlHTTP } from 'express-graphql';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { auth } from './middleware/auth';
import { cors } from './middleware/cors';
import { schema } from './graphql/schema';

// DB connection
mongoose.connect(
  process.env.APP_DB_URL!,
  () => (
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  )
);

const app = express();

// Middleware
app.use(cookieParser());
app.use(auth);
app.use(cors);

app.use('/graphql', graphqlHTTP((req, res): OptionsData => ({
  schema,
  graphiql: process.env.APP_ENV === 'production' ? false : true,
  context: { req, res }
})));

const port = process.env.APP_SERVER_PORT || 4000;
app.listen(port, () => {
  console.log(`
  🚀  Server is running!
  🔉  Listening a GraphQL API server at http://localhost:${port}/graphql
  `);
});
