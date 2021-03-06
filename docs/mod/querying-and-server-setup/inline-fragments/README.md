# Inline fragments and interfaces

## Interfaces

The GraphQL type system supports interfaces, an abstract type that include a certain set of fields that a type must include to implement the interface. This is best explained by an example.

Suppose we are writing a GraphQL application to display information on characters in the Harry Potter universe. We might have different GraphQL types to account for the different types of beings in our universe - let's say `Muggles` and `Wizards`. However, when we query for a character, we might simply want to look up a `Character` by ID or name instead of having to be specific about their magical ability. In this case, we would define an interface:

```js
interface Character {
  id: ID!
  name: String!
}
```

Then, we can use our newly created interface to define our `Muggle` and `Wizard` types:

```js
type Muggle implements Character {
  id: ID!
  name: String!
}

type Wizard implements Character {
  id: ID!
  name: String!
  house: [House]!
}
```

As you can see, each type has all of the fields specified by `Character`, but the `Wizard` type adds its own field - `house` - to its definition. Now we can return a generic `Character` when we query for an individual from the frontend, by we're going to run into some trouble w/ this custom field. We can solve this w/ an inline fragment.

## Implementing Inline Fragments

Let's imagine we are writing this query to find a character by ID. It would look something like:

```js
query FindCharacter {
  character(id: 117) {
    name
    house
  }
}
```

Running this query would result in an error:

```
"Cannot query field \"house\" on type \"Character\". Did you mean to use an inline fragment on \"Wizard\"?",
```

Since the `character` field returns a generic character, GraphQL may be querying either for a `Muggle` or a `Wizard` depending on the argument. The problem is the `house` field - we are only allowed to query for fields listed on the `Character` type.

So, how do we access the house information when we query for a wizard? We can solve this problem w/ an inline fragment:

```js
query FindCharacter {
  character(id: 117) {
    name
    // this allow us to only get house information if this character is a Wizard
    ... on Wizard {
      house
    }
  }
}
```

Now, since we have specified that we should only return the `house` field for `Wizard` types, we can run our query and retrieve the expected data.
