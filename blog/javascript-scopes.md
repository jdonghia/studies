# Javascript Scopes

Javascript is a two-pass language, that has two phases: The **compilation** and the **runtime** phase. The compilation phase runs before the runtime phase. Contrary to the common belief, Javascript is not a interpreted language.

```javascript
console.log("me first");

function foo() {
  console.log(foo);
  const foo = "bar";
}

foo();

// TDZ Error, me first not logged
```

If Javascript was a interpreted language, the example will print "me first" and then throw some error after the foo function call, but actually it throws an TDZ error even before printing "me first". That happens because the compilation phase makes some verifications before runtime, like checking syntax errors or illegal expressions.

## Compile Pass

The compile pass take advantage of the lexically scoped Javascript nature, to map scopes and its identifiers before the program execution, because they are static and cannot "physically" move from the place they're were created.

_The mapping also helps with some optimizations like memory allocation_.

## Scopes and identifiers

Scopes are related to functions, every function has its own scope. Identifiers are placed into their correspondent scope.

```javascript
// global scope (red bucket)

var baz = "baz"; // formal declaration of baz: red marble

function foo() {
  // formal declaration of foo: red marble
  // foo scope (green bucket)
  console.log("bar");

  function bar() {
    // formal declaration of bar: green marble
    // bar scope (blue bucket)
    var baz = "bar"; // formal declaration of baz: blue marble / shadowing
    console.log(baz);
  }
}

// formal declaration of apple: red marble
var apple = function sauce() {
  // formal declaration of sauce: yellow marble
  // sauce scope (yellow bucket)
  console.log("apple");
};
```

