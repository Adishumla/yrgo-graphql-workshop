<img src="/assets/graphqlAnimation.gif" width="100%">

# 01 - GraphQL

In a nutshell, [GraphQL](https://graphql.org/) (Graph Query Language) is a syntax that describes how to ask for data, and is generally used to load data from a server to a client.

- :books: Documentation
  - [Apollo](https://www.apollographql.com/docs/)
  - [Apollo Server](https://www.apollographql.com/docs/apollo-server)
  - [Apollo Client](https://www.apollographql.com/docs/react)
  - [MongoDB](https://www.mongodb.com/docs/)
- :link: Links
  - [Github GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)
- :movie_camera: Videos
  - [GraphQL explained in 100 seconds](https://www.youtube.com/watch?v=eIQh02xuVw4)

## Exercises

1. To familiarize us with querying data with GraphQL head over to [Github GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer) and see if you can query their API to see when you created your Github account! Your response should look something like this:

```json
      "login": "NilsNathorst",
      "createdAt": "2018-04-04T10:28:30Z",
      "name": "Nils Nathorst-Windahl"
```

## GraphQL supplies some built-in scalar types

```
Int: A signed 32‐bit integer.
Float: A signed double-precision floating-point value.
String: A UTF‐8 character sequence.
Boolean: true or false.
ID: The ID scalar type represents a unique identifier, often used to refetch an object or as the key for a cache. The ID type is serialized in the same way as a String; however, defining it as an ID signifies that it is not intended to be human‐readable.
```

If you have experience from any typed language the concept of types might be familiar to you.

<br/>

## 2. Let's start small.

Have a look [here](https://www.apollographql.com/docs/apollo-server/data/resolvers/) for some documentation for what you're about to do.

Inside `index.js` in the root folder create two variables called `resolvers` and `typeDefs`. The `typeDefs` variable defines types and queries available to your API. `resolvers` are the callbacks for your queries. All queries defined in `typeDefs` needs to be defined in `resolvers`.

> Don't forget to import `ApolloServer` and `gql` from `apollo-server`

Create a type called `Person` which has the key `name` of type `String`. Then create the type `Query` which has a query called `me` that returns the type `Person`.

For the resolvers create a key called `Query` which is an object that takes in keys called the same as your queries, in our case `me`.

`me` should look like this

```js
me: () => {
      return {
        name: "Mattias",
      };
    },
```

Now, create a variable called `server` that will initialise a new instance of the `ApolloServer` class. You need to pass a config object as an argument to `ApolloServer`. Pass in `typeDefs` and `resolvers` as an object.

```js
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
```

Then to start the webserver we need to call the `listen()` function on our `server` variable, like so.

```js
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
```

Now we should be good to go! Go to your console, cd to the server folder and run `npm run dev`.

Did the console give you an url back? If so, go to the url and try to query for your name using the query you have setup.

## 3. Alright, now it's time to create the API for Bibl.io!

Start by creating a folder called `typedefinitions` inside the already supplied `graphql` folder. Inside here we want to create a file called `typeDefs.graphql`. This is where we will setup the [GraphQL](https://graphql.org/learn/schema/#object-types-and-fields) types and fields on those types.

We start with defining two types called `Book` and `Author`

```gql
type Book {
  _id: ID!
  title: String!
  author: Author!
}

type Author {
  _id: ID!
  name: String!
  books: [Book]
}
```

Here we have defined a `Book` type that contains the fields `_id` of type `ID`, `title` of type `String!` and `author` of the type `Author`. Appending an `!` at the end of your type makes the field [non-nullable](https://graphql.org/learn/schema/#lists-and-non-null). As you see we can use types we define ourselves as the type for a field. This means that the `author` field on `Book` is expected to resolve to an `Author` object. How to make that happen we will get to in a bit.

Wrapping the type in `[]` like `[Book]` means that the field is of the type `Array` of `Books`.

Now that we have our types in place we need to create our [Query](https://graphql.org/learn/queries/) type. This is how we define what we can fetch from the API, the data that is expected to return and any arguments that might be required.

For our API we need four queries.

- `authors`
- `books`
- `author`
- `book`

`authors` and `books` should return an array of their respective types. Let's start with only these two. Once you have defined them head over to the resolvers folder and open the file `bookResolver.js`. You can find snippets for the queries inside. Your job will be to define the `bookResolver` variable and give it a key called `Query`, luckily you've already learnt this!

> Don't forget to export the object as a named export.

Then do the same for `authorResolver.js`, you got this!

Now go to the `index.js` file inside the root folder and replace `typeDefs` and `resolvers` inside `new ApolloServer({...})` with `schema`.

> Don't forget to import `schema` from "./graphql/schema.js"

You also want to enable the `Playground` plugin, magic!

```js
const server = new ApolloServer({
  ...
  plugins: [Playground()]
})
```

When you're done, try to restart the server. If everything goes well, try to query both the books and authors at the same time. You can ask for the title of the books and the name of the authors.

## 4. Even more queries!

`author` and `book` accepts an `_id` argument of type `ID!` and returns a single object of their respective types.

Time to define our resolvers! The resolver functions get four [arguments](https://www.apollographql.com/docs/apollo-server/data/resolvers#resolver-arguments) from Apollo. For our API we only really care about the second one called `args`. It is an object so we can [deconstruct](https://dmitripavlutin.com/javascript-object-destructuring/) it and grab the keys we want. The code for the callbacks is also defined in the files, like the queries we did before.

Now try to query for a single author and book in the playground. Did it work?

## 5. What about adding data?

When we want the data from the server we execute a query. But when we want to update the data on the server we use a [mutation](https://www.apollographql.com/docs/tutorial/mutation-resolvers/).

First thing is to define a type called `Mutation` inside `typeDefs.graphql`. It will look a lot like our `Query` type. Here we need to specify what arguments our mutation want. To add an author, the `addAuthor` mutation should accept an argument called `name` of type `String!`.

We also need to set a response type. In another situation you could do something else, but we will define a reponse type called `MutationReponse` which should look like this.

```js
type MutationReponse {
  success: Boolean!
  message: String
}
```

This should be the return type for your mutations.

Now go to your resolver file and add a key called `Mutation` to your `authorResolver`. The next step is the same as before, create the correct mutation key and copy over the logic from below.

Restart the server!

Try running this in your playground

```js
mutation($name: String!) {
  addAuthor(name: $name) {
    message
    success
  }
}
```

> You can set variables on the bottom left.

Did you get a succesfull response? If so the new author should be added. Try querying for authors to see the updated data.

Now add the rest of the missing mutations

- `addBook` - title: String!, authorId: ID!
- `removeBook` - \_id: ID!
- `removeAuthor` - \_id: ID!

Restart the server and try out your fresh mutations, you code ninja you!
