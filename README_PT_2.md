<img src="/assets/graphqlAnimation.gif" width="100%">

# 01 - GraphQL

In a nutshell, [GraphQL](https://graphql.org/) (Graph Query Language) is a syntax that describes how to ask for data, and is generally used to load data from a server to a client.

- :books: Documentation
  - [Apollo](https://www.apollographql.com/docs/)
  - [MongoDB](https://www.mongodb.com/docs/)
- :link: Links
  - [Github GraphQL Explorer](https://docs.github.com/en/graphql/overview/explorer)
- :movie_camera: Videos
  - [GraphQL explained in 100 seconds](https://www.youtube.com/watch?v=eIQh02xuVw4)

## Exercises

### 1. Let's get some data

Firstly, let's start our application. From the root, cd in to the `/client` folder and run `npm run start`.

Now we need to add our queries to our client-side code. Create a folder in the `/client/src` folder called `graphql`. Inside create a new file `GetAuthorsQuery.js` it should look something like this:

```js
import { gql } from "@apollo/client";

export const GetAuthorsQuery = gql`
  query {
    authors {
      name
      _id
      __typename
    }
  }
`;
```

Now it's time to fetch the real data from our own GraphQL API. To do this we will use the [`useQuery`](https://www.apollographql.com/docs/react/data/queries/#executing-a-query) hook from Apollo.

> **note**: Make sure you are on Apollo Docs for v3 and not v2

In `App.js` try and fetch your data!

```js
import { useQuery } from "@apollo/client";

const { data, error, loading } = useQuery(GetAuthorsQuery);
```

You can console log `data`, `error` & `loading` to see them update when you run the query.

Replace the mocked data with the data from your API - when you are done, you should now be able to see your data in the list.

Repeat these steps to fetch your books as well!

### 2. Let's add some data

With Apollo we can interact with our database - let's see if we can add some authors and books. To do this we will use the [`useMutation`](https://www.apollographql.com/docs/tutorial/mutations/#apply-the-usemutation-hook) hook from Apollo.

Create a file called `AddAuthorMutation.js` in your `graphql` folder. Your mutation should accept a parameter called `name` which should have the type `String!`.

> **remember** that you can test running the query on `localhost:4000/graphql`

The mutation returns two variables, `success` which is either true or false and `message` that is a succes- or error-message that let's you know if the data was added properly or what went wrong.

In `App.js` replace the inline functions passed to the dialog components with a function that runs the mutation with the data the user inputs in the dialog!

Write a function that accepts an authorName as a parameter and then runs the `addAuthors` callback from the useMutation hook.

> [Example on how to do this](https://www.apollographql.com/docs/react/data/mutations/#example)

```js
const handleAddAuthor = (authorName) => {
  // code goes here
};
```

Now repeat the process but for adding books.

```js
const handleAddBook = ({ authorId, bookTitle }) => {
  // code goes here
};
```

If you've done everything correctly you should be able to add books and authors from the browser! 😎

### 3. Let's remove some data

Good job so far! Now let's add the ability to remove books and authors.

in `App.js` replace the inline functions passed to the `Tabs` component with a function that runs the useMutation callback.

If you need a refresher, head over to `typeDefs.graphql` to see how the mutations are defined.

You got this.

4. **Extra:** You might have noticed that you have to refresh the page to update the UI to reflect when the data has changed when you added or removed something. Have a look at the [`useMutation API`](https://www.apollographql.com/docs/react/data/mutations/#usemutation-api) and see if you can find a way to **refetch** your data after a mutation has run.

5. **Extra:** Add a toast to display the mutations `message` after you've added or removed something! One way to solve this would be to use the [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect) hook trigger when you run a mutation.

   > **hint:** you can import the Toast component from `/compoents`.

**Final boss:** You might have noticed that there is a description in the `<Card>` component. See if you can add a new `description` field to both your `Author` and `Book` types (this should also get saved to your database, so you will need to explore some uncharted territory). And finally render it in the card component. That's it - you've mastered GraphQL.
