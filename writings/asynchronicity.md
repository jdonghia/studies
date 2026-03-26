# Asynchronocity on Javascript

Asynchronicity is one of the most powerful pattern on Javascript. 

## Synchronous Execution

Javascript is a Single-Thread programming language, it executes code sequentially, instructio by instruction. This also means that the Thread Of Execution can be "blocked" by a heavy process instruction, being unable to go to the next one til finishes its execution.

```javascript
function callDatabase() {
  // heavy process
}

callDatabase(); // blocks thread for 3000ms

console.log("Hello, world!"); // cannot be achieved
```

On the example above, The Thread will be "blocked" inside the callDatabase function's Execution Context, preventing from achieving the "Hello, world!" logging.

But heavy operations are very common in Web Applications, specially when handling Network Request or calling a Database. So how to handle it without blocking the Thread?

## Asynchronicity

### Web Browser Features

The Javascript Engine usually runs on a Web Browser (or in a Node.js environment) that is mostly written in C++. The Browser runs Javascript providing some APIs to call its features. Those features can be called using Facade functions like setTimeout for Timers. Some Web APIs uses the Facade Design Pattern to "hide" the complex estructure behind the function, pretending that the function is Javascript builtin functionality.

### Callbacks

The setTimeout sends a background task to the Web Browser, setting up a new Timer.

```javascript
function printHello() {
  console.log("Hello, world!");
}

setTimeout(printHello, 1000);

console.log("me first!");
```

```
Delay | Callback | Completed?|
-----------------------------
1000
```

After time completion, the callback function (printHello) will be pushed to the Call Stack to be executed.

The Thread of Execution will no be blocked waiting for the setTimeout to be finished, and the Synchronous code can continue to be executed.

### Asynchronous Rules

Check this example:

```javascript
function printHello() {
  console.log("hello");
}

setTimeout(printHello, 0);

console.log("me first?");
```

Surprinsingly, the "me first?" logging will be printed first than "hello", even with a 0ms delay. This must happens because it predicts the order of execution.

Check the following situation:

```javascript
function printHello() {
  console.log("hello");
}

setTimeout(printHello, Math.random());

// hello here?
console.log("foo");
// hello here?
console.log("bar");
// hello here?
```

Operations that we don't know how much time it will take, like sending a Network Request, or setting a random delay with Math.random(), can cause a series of unexpected behaviors if we don't follow strict rules of Asynchronicity.

In this example, without these rules, the order of execution will be unpredictable and printHello could be triggered anytime in and everytime we intialize the setTimeout task in the program execution.

Overall:

**Callback functions provided by Asynchronous operations can only run after all the Synchronous Execution has being finished.**

After the completion of an Asynchronous task, instead of being called right after, the callback function (printHello) will be pushed into a Queue, called Callback Quee (or Task Queue). The component called Event Loop is responsible to push printHello into the Call Stack, so it can be executed. But it will only push it if there's no more Synchronous code (logs of foo and bar) to be executed and the Call Stack is already empty.

The Event Loop will constantly make this check as long as the application is running.

[Event Loop and Callback Queue Representation, pushing the callback function to the Call Stack]()

## Promises

Before Promises, Callbacks were the standard approach for handling Asynchronous operations. Callbacks had a lot of different problems that im going to cover later, like:

- Nested callbacks leading to Callback Hell
- Lack of Memory Tracking. Callbacks are triggered without having impact on Javascript Memory
- Inflexible

Promises were introduced in ES6, bringing within a lot of different features and possibilties:

- Now we can track Asynchronous operations. Asynchronous operations immediately returns a Promise object stored on Javascript Memory
- Flexibe operations

```javascript
function displayData(data) {
  console.log(data);
}

function executor(resolve, reject) {
  var delay = 1000;

  setTimeout(function resolveData() {
    var data = { id: 1, name: "Alicia" };

    resolve(data);
  }, delay);
}

var promise = new Promise(executor);

promise.then(displayData);
```

A Promise will receive a callback function as an argument (also called executor) to the constructor, so it can be executed immediately when new Promise is invoked, also returning a new Promise object.

The callback function will resolve or reject the Promise.

The Promise object has two essential hidden properties: value and `[[onFulfillment]]`, which is essentially an Array of callbacks. It also has two essential public methods: .then and .catch.

.then is a method that receive a callback function. By calling it, the callback function will be pushed to the `[[onFulfillment]]` array.

When the promise is resolved, the callback functions on the `[[onFulfillment]]` will be pushed to the Microtask Queue. The value returned from the resolver will be assigned to the Promise object value property and passed as an argument to the callback function, which has priority over Callback Queue. Existing callback functions on the Microtask Queue will be placed first on the Call Stack over the Callback Queue

The same behavior happens with the catch. method, but it is going to handle the promise rejections by pushing the callback function to the `[[onRejection]]` array.

We can handle Network Requests with Promises by using the fetch method. The fetch method is two-pronged Facade function.

Is two-pronged because it calls the Network Request Feature on the Web Browser to get data from the internet, and also immediately returns a Promise object.

```javascript
function displayData(data) {
  console.log(data);
}

var res = fetch("https://foo.com/bar");

res.then(displayData);
```

This example will work as the same as the example above, but in this case we don't know exactly when the fetch method will going to be finished .As explained above, the Event Loop will be responsible to automatically trigger the displayData function, when pushed to the Call Stack.

[Representation of Promise]()

### Callbacks x Promises

Before Promises, the solution to handle Asynchronous Operations was using callbacks like setTimeout and xmlHttpRequest for Network Requests.

But these solutions had some problems. The most common one was the Callback Hell.

```javascript
// Simulating Network Request
function fetchData(callback) {
  setTimeout(function () {
    const data = { id: 1, name: "Alicia" };
    callback(data);
  }, 1000);
}

var response;

var returnedData = fetchData(function getData(data) {
  response = data;
  return data; // returns to setTimeout, cannot evaluate returnedData
});

response; // undefined, to early!
returnedData; // undefined
```

Data only lives inside the callback function and cannot be assigned to a variable that runs synchronously, also it cannot return to evaluate a variable.

```javascript
// Simulating Network Request
function fetchData(callback) {
  setTimeout(function getData() {
    const data = { id: 1, name: "Alicia" };
    callback(data);
  }, 1000);
}

var response;

var returnedData = fetchData(function getData(data) {
  response = data;
  return data; // returns to setTimeout, cannot evaluate returnedData
});

response; // undefined, to early!
returnedData; // undefined

setTimeout(function printData() {
  console.log(response);
}, 2000);
```

If we decide to run a independent Timer that prints the assigned data to response, it will correctly print the data, because the previous Timer has already run. But in this case we defining exactly the time it will take to get the data, and for Network Requests, that's not the case. There is many reasons why you shouldn't avoid this.

Imagine we need that data to make another Request, and so on.

```javascript
// Simulating Network Request
setTimeout(function getUsers() {
  var users = [
    { id: 1, name: "Alicia" },
    { id: 2, name: "Verso" },
    { id: 3, name: "Clea" },
  ];

  console.log("1. Got users:", users);

  var userId = users[0].id;

  setTimeout(function getUserDetails() {
    var userDetails = [
      { id: 1, name: "Alicia", gender: "female", age: 16 },
      { id: 2, name: "Verso", gender: "male", age: 67 },
      { id: 3, name: "Clea", gender: "female", age: 20 },
    ];

    var selectedUser = userDetails.find(function (user) {
      return userId === user.id;
    });

    console.log("2. Got details for:", selectedUser.name);

    setTimeout(function getUserPosts() {
      var posts = [
        { id: 101, userId: 1, title: "Alicia's First Post" },
        { id: 102, userId: 2, title: "Verso's Thoughts" },
        { id: 103, userId: 1, title: "Alicia's Vacation" },
      ];

      var userPosts = posts.filter(function (post) {
        return post.userId === selectedUser.id;
      });

      console.log("3. Got posts for " + selectedUser.name + ":", userPosts);
      var firstPostId = userPosts[0].id;

      setTimeout(function getPostComments() {
        var comments = [
          { id: 501, postId: 101, text: "Great post!" },
          { id: 502, postId: 102, text: "Interesting." },
          { id: 503, postId: 101, text: "Thanks for sharing." },
        ];

        var postComments = comments.filter(function (comment) {
          return comment.postId === firstPostId;
        });

        console.log(
          "4. Got comments for post " + firstPostId + ":",
          postComments,
        );
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
```

The data must live on the callback function, because the next request depends on the previous one to be already finished. The callback functions will be nested, causing the Callback Hell.

With Promises we can use Promise Chain

```javascript
// A helper to make the code cleaner
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Step 1: Get All Users
function getUsers() {
  console.log("1. Requesting users...");
  return delay(1000).then(() => {
    return [
      { id: 1, name: "Alicia" },
      { id: 2, name: "Verso" },
      { id: 3, name: "Clea" },
    ];
  });
}

// Step 2: Get Details (Requires userID)
function getUserDetails(userId) {
  console.log(`2. Requesting details for user ${userId}...`);
  return delay(1000).then(() => {
    const allDetails = [
      { id: 1, name: "Alicia", gender: "female", age: 16 },
      { id: 2, name: "Verso", gender: "male", age: 67 },
      { id: 3, name: "Clea", gender: "female", age: 20 },
    ];
    // Find specific user
    return allDetails.find((u) => u.id === userId);
  });
}

// Step 3: Get Posts (Requires userID)
function getPosts(userId) {
  console.log(`3. Requesting posts for user ${userId}...`);
  return delay(1000).then(() => {
    const allPosts = [
      { id: 101, userId: 1, title: "Alicia's First Post" },
      { id: 102, userId: 2, title: "Verso's Thoughts" },
      { id: 103, userId: 1, title: "Alicia's Vacation" },
    ];
    return allPosts.filter((p) => p.userId === userId);
  });
}

// Step 4: Get Comments (Requires postID)
function getComments(postId) {
  console.log(`4. Requesting comments for post ${postId}...`);
  return delay(1000).then(() => {
    const allComments = [
      { id: 501, postId: 101, text: "Great post!" },
      { id: 502, postId: 102, text: "Interesting." },
      { id: 503, postId: 101, text: "Thanks for sharing." },
    ];
    return allComments.filter((c) => c.postId === postId);
  });
}

getUsers()
  .then((users) => {
    console.log("   -> Received Users:", users);

    // Pick the first user (Alicia) and return the next Promise
    const firstUser = users[0];
    return getUserDetails(firstUser.id);
  })
  .then((userDetails) => {
    console.log("   -> Received Details:", userDetails);

    // Return the next Promise to get posts
    return getPosts(userDetails.id);
  })
  .then((posts) => {
    console.log("   -> Received Posts:", posts);

    // Pick the first post and return the next Promise
    const firstPost = posts[0];
    return getComments(firstPost.id);
  })
  .then((comments) => {
    console.log("   -> Received Comments:", comments);
    console.log("--- End of Chain ---");
  })
  .catch((error) => {
    // This single catch block handles errors for ANY step above!
    console.error("Something went wrong:", error);
  });
```

Further, We going to discuss more about the async/await standard approach that came with ES7

with Promises with have also the flexibility to assign to variables and return the values

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 1. Get Users
function getUsers() {
  return delay(1000).then(() => {
    return [
      { id: 1, name: "Alicia" },
      { id: 2, name: "Verso" },
    ];
  });
}

// 2. Get Details (Requires ID)
function getUserDetails(userId) {
  return delay(1000).then(() => {
    const details = [
      { id: 1, name: "Alicia", age: 16 },
      { id: 2, name: "Verso", age: 67 },
    ];
    return details.find((u) => u.id === userId);
  });
}

// 3. Get Posts (Requires User ID)
function getPosts(userId) {
  return delay(1000).then(() => {
    return [{ id: 101, userId: 1, title: "Alicia's Post" }];
  });
}

// 4. Get Comments (Requires Post ID)
function getComments(postId) {
  return delay(1000).then(() => {
    return [{ id: 501, postId: 101, text: "Great post!" }];
  });
}

// Step 1: We can assign the function call to a variable immediately!
// This 'request' variable is NOT undefined; it holds the Promise.
var request = getUsers();

request
  .then(function (users) {
    console.log("1. Got Users:", users);
    const userId = users[0].id;

    // FLEXIBILITY: We return the Next Promise here.
    // The result of getUserDetails(1) passes to the next .then()
    return getUserDetails(userId);
  })
  .then(function (details) {
    console.log("2. Got Details:", details);

    // We return the next Promise again...
    return getPosts(details.id);
  })
  .then(function (posts) {
    console.log("3. Got Posts:", posts);

    // And return the next Promise again...
    return getComments(posts[0].id);
  })
  .then(function (comments) {
    // Finally, we have the comments here.
    console.log("4. Got Comments:", comments);

    // We can even return a final calculated value!
    return "Process Complete with " + comments.length + " comments.";
  })
  .then(function (finalMessage) {
    console.log(finalMessage);
  });
```

One of the huge difference between Promises and Callbacks is that Promises provides us the Promise object, which can allow us to keep track better of the identifier that is holding the promise.

### Promises Under The Hood

To understand Promises more further, we need to take a pick on Closures.

Closures are one of the most essential behaviors of Javascript. It allows us to persist data from a function's lexical scope, in coloquiall terms, the function will remember its previous call, even if the Execution Context has already finished.

```javascript
function outer() {
  var count = 0;
  function increment() {
    count++;
    return count;
  }

  return increment;
}

const persistentIncrement = outer();

persistentIncrement(); // 1

persistentIncrement(); // 2
```

In this example, the function cannot found reference of count++ on its Local Memory. The outer Execution Context has already finished by the time it was called. So before giving up, persistentIncrement will look a its backpack, which contain the persisted count variable.

## Iterators

Iterators relies on closure to allow a function to return each element of a collection of data

```javascript
function iterator(arr) {
  var count = 0;

  function nextElement() {
    return arr[count++];
  }

  return;
}

var iterate = iterator(["foo", "bar", "apple", "sauce"]);

iterate(); // foo
iterate(); // bar
iterate(); // apple
iterate(); // sauce
```

Iterators are everywhere. First it seems like "why we don't use a forEach"?

iterators allow us to call manually each next element without going through all the elements, so its a better flow control between elements

Iterators are also used on dynamic builtin forloops

```javascript
var arr = ["foo", "bar", "apple", "sauce"];

// raw iterator implementation with closures
function outer(arr) {
  var index = 0;

  function next() {
    var element = arr[index];
    index++;

    var done = false;

    if (index > arr.length) done = true;

    return {
      value: element,
      done: done,
    };
  }

  return {
    next: next,
  };
}

arr[Symbol.iterator] = function () {
  var iterator = outer(this);

  return iterator;
};

console.log(...arr);

for (elements of arr) {
  console.log(elements);
}
```

Builtin features like spread operator and dynamic for loops will use the override Iterator. 

Iterators relies on passing a argument that will be iterated over, but we cant have control of what we want to pass

## Generators

Generators are Type of Iterators that allows us to control flow of iteration even more by applying rules for each 

```javascript
*function generator() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
}
```

.next() method will iterate over the next element returned by the yield. But instead of only returning the value, the yield is going to "suspend" the function execution, and when the next() is called again, the function will continue to be executed right after it stopped


Javascript is a Single-thread language, it executes code line-by-line, and can only read the next instruction after the previous one has already finished.

If a heavy instruction is being processed, the Javascript thread will be blocked, not being able to move with the code execution.

```javascript
function blocksThreadFor5000ms() {
    // ...
}

blocksThreadFor5000ms(); // thread blocked
console.log("let me print!");
```

A heavy operation could be a Network Request, for example. Previously on Javascript, if a network request was made, the whole application would freeze waiting for the request to be finished.

To prevent this from happening, Asynchronicity was implemented as an solution for the Single-thread nature of Javascript.

Javascript usually runs on a Web Browser, so the solution was to sent these operations to the Web Browser features. Javascript and the Web Browser are two different runtimes. Instead of relying on Javascript Single-thread nature to handle the Network Request, we let the Browser to handle the operation, allowing the Synchronous execution to keep running.

Before Promises, the solution was to use Callbacks. We would use AJAX to handle Network Requests.

```javascript
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
let xhr = new XMLHttpRequest();
xhr.open("GET", "https://foo.bar");
xhr.onload = function () {
  if (xhr.status == 200) {
    console.log(xhr.responseText);
  } else {
    console.log(`Error: ${xhr.status}`);
  }
};
xhr.send(); // asynchronous operation, the thread can keep going
console.log("let me print!");
```

---

## Topics to study:

- single-thread, multple threads with service workers
- setTimeout order (callback queue)
- Non-blocking with asynchronicity
- Problems with callbacks
- .then functionality, the callback function and the microtask queue
- onFulfilled array and updated value
- Empty call Stack
- Event Loop
- old synchronous request freezing
- thunks (lazy x eager) passive and active thunks
- Benefit of Promises
- Callback hell deficiency
- starving the callback queue
- non blocking applications

---

## References




# How Asynchronicity works on Javascript 

Honestly, not so long ago, i had any idea on how Asynchronicity works under the hood. 
