const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID } = graphql;
const mongoose = require("mongoose");

const User = mongoose.model("user");
const UserType = require("./user_type");

const Post = mongoose.model("post");
const PostType = require("./post_type");

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        users: {
            /* This is the type we defined in the last step, wrapped in a
            GraphQLList to specify that the data will be returned as an array */
            type: new GraphQLList(UserType),
            /* We must specify a resolve function to tell GraphQL how to access
            the data. Even if there are many fields present on a given user, only
            the fields we specified on the User type will be returned. */
            resolve() { // (1)
                // This is just a mongoose method
                return User.find({});
            }
        },
        user: {
            /* We are now querying for a single User, so we don't need to wrap
            the type in GraphQLList */
            type: UserType,
            /* We must define a type for the arguments which will be passed in to
            the query. GraphQLNonNull specifies that the argument must be included */
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            /* The args argument represents the *actual arguments passed into the
            query */
            resolve(parentValue, args) {
                return User.findById(args.id);
            }
            /*
            ---------------------------------or---------------------------------
            user: {
                type: UserType,
                args: { id: { type: new GraphQLNonNull(GraphQLID) } },
                resolve(parentValue, { id }) {
                    return User.findById(id)
                }
            }
            */
        },
        posts: {
            // we want all our returned posts in an Array so we use the GraphQLList type
            type: new GraphQLList(PostType),
            resolve() {
                return Post.find({});
            }
        },
        post: {
            // here we just want to return a single post
            type: PostType,
            // we need an id for this query so we'll use GraphQLNonNull
            args: { id: { type: new GraphQLNonNull(GraphQLID) } },
            resolve(parentValue, args) {
                return Post.findById(args.id)
            }
        }
    }
})

module.exports = RootQuery;

/*----------------------------------------------------------------------------*/

/*

Root queries are how GraphQL can access data in our database, entry points into
our data.

A root query is an entry point into the data which exists in the backend. For
each root type we specify, we will need to include a resolver function which tells
GraphQL how to access the data on the server. This is where we can start to think
about GraphQL as a layer between many backend services - different fields for a
single type may resolve to many different locations. For now, however, we're
going to keep things simple and resolve to our MongoDB server.

(1) We can pass in two arguments to the resolve function:

    1. `parentValue`: The previous object. This is not typically used in root queries.

    2. `args`: An object holding the arguments passed into the query from the frontend.

We don't need to worry about `parentValue` for now, but we will need to pass in
an argument for a user's `id`. Since we know we will need an `id` argument to be
passed in we can make use of GraphQL's `GraphQLNonNull` type - which is basically
just a marker enforcing that values can't be null or an error will be raised.

*/