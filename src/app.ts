import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as logger from 'morgan';
import * as expressGraphql from 'express-graphql';
import * as mongoose from 'mongoose';
import graphQlSchema from './graphql/schema';
import graphQlResolvers from './graphql/resolvers';
import configs from './config';
import isAuth from './middleware/is-auth';


// Port on which incoming requests will arrive
const port = 5000
// Create the application
const app = express();
// Load the configs
const config = configs[app.get('env')];

app.use(logger('dev'));
app.use(bodyParser.json());


app.use(isAuth);
app.use('/graphql', expressGraphql({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
}));

mongoose.connect(
    `mongodb+srv://${
        config.MONGO_USER
    }:${
        config.MONGO_PASSWORD
    }@cluster0-lninh.gcp.mongodb.net/${
        config.MONGO_DB
    }?retryWrites=true&w=majority`,
    { useNewUrlParser: true }
).then().catch(err => {
    console.log(err);
})

// Run the web app and store the returned variable for later export
let server = app.listen(port, () => console.log(`Listening on ${port}`));
// Export the server for unit testing
export default server;
