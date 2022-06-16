require('dotenv').config();

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const port = process.env.SERVER_PORT || 4000;

app.use('/graphql', graphqlHTTP({
  
}));

app.listen(port, () => {
  console.log(`
  🚀  Server is running!
  🔉  Listening on port ${port}
  `);
});
