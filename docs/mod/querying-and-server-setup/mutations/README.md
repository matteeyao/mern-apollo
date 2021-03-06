# Mutations Introduction

When developers discuss GraphQL, they usually do so in terms of data fetching. So far, we have only learned how to read information from the database. Since it's pretty likely that you'll also want to create, update, and destroy records, you'll need to learn how to write mutations.

The syntax for a mutation is straightforward:

```js
mutation {
  mutationName(key1: "val1", key2: "val2", ...) {
    // These arguments specify the information to be returned from the backend
    key1,
    key2,
    association {
        id,
        name,
        ...
    }
  }
}
```

When we write queries, we can just use a pair of curly braces - we don't necessarily need to specify the query type. However, when using mutations, as you can see on the first line of the snippet above, we must define that we are using a mutation so that GraphQL knows what we are trying to do. Though just like queries, we can name our mutations anything we like.
