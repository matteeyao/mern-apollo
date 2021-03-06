# GraphQL Types

## Object & scalar types

In GraphQL, there are two different kinds of types.

1. `Scalar` types represent concrete units of data. The GraphQL spec has five predefined scalars: as `String`, `Int`, `Float`, `Boolean`, and `ID`.

2. `Object` types have fields that express the properties of that type and are composable. Examples of object types are a `User` or `Post`, and all the the resources your project may have.

In every GraphQL schema, you can define your own scalar and object types. An often cited example for a custom scalar would be a `Date` type where the implementation needs to define how that type is validated, serialized, and deserialized.
