# Lexical Scope

## Javascript Engine

- How Throws syntax/illegal expressions error before running?

- _Javascript is a lexically scoped language_

- Scopes are static and predictable

- Two-Pass language:

1. Compile pass
2. Runtime pass

### Compile pass

#### Scope Manager and Compiler

- Code optimization (does not allocate memory yet)
- Maps scopes and its identifiers

- Buckets / Marbles Metaphor
  - _Hey Scope Manager, i have a formal declaration of foo, have your heard about it?_ **No, i haven't. But here's your marble**
  - Shadowing identifiers (makes outer identifier unaccessible)

- Functions declarations have their identifier (marble) placed on the outer scope (bucket)

##### Hoisting

- Conceptually explain the behavior of Compilation process.
- Unnoficial term

###### var

- _hoisted_
- initialized to undefined

##### const, let

- _hoisted_
- keep unitialized on the TDZ
- any access before target assignment will throw TDZ error

##### Function declarations

- _hoisted_
- they have their definition initialized
- provides flexibility

### Runtime pass

#### Virtual Machine and Scope Manager

- Target position: RHS (Right-hand side)
- Source position: LHS (Left-hand side)

- _Hey, Scope Manager. I have a target reference for the foo identifier. Have you heard of it?_
  - **Yeah, here's your marble**

##### Lexical behavior

- Function's can access data from the outer scope where they were declared

- _Hey, Scope Manager. I have a source reference for the foo identifier. Have you heard of it?_
  - **No, up one level til global**

- Referenced data enclosed on the function's closure
- Also non-referenced enclosed data may stick around

- non-strict creates "auto global" variable after Reference Error

- console, document = "auto globals"

## Identifiers

## Variables

- let does not replace var. different semantic meanings
- let is not initialized because of const
- const as placeholders

### Function Expressions

- They are readonly on their own scope
- IIFEs are function expressions

### Units of Scope

#### Function scoped

E.g: var variables

```javascript
function print() {
  if (true) {
    var foo = "bar";
  }
  console.log(foo);
}

print(); // prints bar
```

#### Block scoped

E.g: let, const variables

```javascript
{
  console.log(foo); // TDZ Error
  let foo = "bar";
  console.log(foo); // prints bar
}

console.log(foo); // Reference Error
```

#### Hybrid scoped

- Exists because of backwards compatibility

E.g: function declarations

```javascript
print();

{
  print();

  function print() {
    console.log("Hello, World!");
  }
}
```

### Techniques

- Block scope for temporary variables
- Put variables on the top of block scoping
- IIFEs x block scoping


