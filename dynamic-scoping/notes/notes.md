# Dynamic Scope

- this = dynamic scope on Javascript

- works on runtime
- Not-predictable (depends on the callsite)

## Binding Precedence

1. new constructor
2. It is invoked with call, bind or apply?
3. Invoked by a object?
4. Points to global/window

### Ways to binding

### new binding

```javascript
function Workshop() {
  this.teacher = "Kyle";

  console.log(this.teacher);
}

var obj = new Workshop();

obj.teacher;
```

### Implicit binding

```javascript
var workshop = {
  teacher: "Kyle",
  ask() {
    console.log(this.teacher);
  },
};

workshop.ask();
```

### Dynamic Binding

```javascript
var foo = {
  value: "foo",
  print: print,
};

var bar = {
  value: "bar",
  print: print,
};

foo.print();
bar.print();

function print() {
  console.log(this.value);
}
```

### Hard binding

```javascript
function print() {
  console.log(this.value);
}

var foo = {
  value: "foo",
};

print.bind(foo)();
```

### Explicit binding

```javascript
function print() {
  console.log(this.value);
}

var foo = {
  value: "foo",
};

print.call(foo); // explicit args
print.apply(foo); // accept array of args
```

### Default binding

```javascript
function print() {
  console.log(this.value);
}

var foo = {
  value: "foo",
};

print(); // points to global/window
```

- **OBS**: strict mode prevents this to point to global

## Arrow Functions

- does not define this, super, arguments, new.target
- will resolve lexically
