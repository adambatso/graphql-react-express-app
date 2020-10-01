const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const graphqlHTTP  = require('express-graphql');
const schema = require('./graphql/bookSchemas');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use('*', cors());
app.use('/graphql', cors(), graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true,
  }));

mongoose.connect('mongodb://localhost/node-graphql', { promiseLibrary: require('bluebird'), useNewUrlParser: true })
  .then(() =>  console.log('connection successful'))
  .catch((err) => console.error(err));
app.get('/', (req, res) => {
    res.json('check this hot express app');
})

app.listen('4000', () => {
    console.log("Server is listening on port 4000");
});