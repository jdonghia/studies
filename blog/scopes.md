# Scopes

- It is awesome to learn how scopes actually work in Javascript. Once you understand it, you start to see the code with a different perspective.

- Contrary to the common belief, Javascript is not a interpreted language, it's a two-pass language. If it was a interpreted language, like Bash, how would thrown a Error before its execution?

- If the program has a syntax error, the code won't run at all.

```javascript
function bar() {
  return "foo";
}

// some syntax error
vars foo;


bar();
```

- This happens because of the compilation phase. Before code execution, the engine tries to optimize it by mapping the scopes and its identifiers. Probably the syntax error happens because of the Abstraction Syntax Tree or something.




- It throws Errors before code execution (thrown by the compile pass)

- It has the compile pass and the runtime pass.

- The compile pass is responsable to map the scopes and its identifiers on the program.

- Because scopes are static and act lexically, the mapping is made to optimize the code.

- Scopes are mostly related to functions or units of scope.

- Metaphorically, each function has its bucket (scope) and the marbles that are place in it (identifiers).

- Function declarations

```javascript
// red bucket (global scope)

var baz; // red marble

function foo() {
  // red marble
  // blue bucket (foo scope)

  var bar; // blue marble

  function another() {
    // blue marble
    // green bucket (another scope)

    var sauce; // green marble
  }
}
```

- Scopes are places and identifiers are initialized

- Hoisting (functions and vars)
- TDZ const, let (remain unitialized)

- Target reference (LHS)
- Source Reference (RHS)

- Function expressions

```javascript
// var foo (global scope)
var foo = function bar() {
  // bar (own scope)
  var baz; // (bar scope)

  bar(); // can only be call inside himself
};
```

- Units of Scope (function and block)
- Shadowing (cannot reference the outer identifier)

- IFEEs

```javascript
(function IFEE() {})(); // can only be called once or inside himself
```

- Block Scoping x IFEEs

