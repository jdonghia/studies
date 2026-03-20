## What is Asynchronicity on Javascript and how it allows the creation of Non-Blocking applications?

**R**: Asynchronicity is a pattern that allows the Javascript Single-Thread to keep executing instructions without being blocked. Javascript relies on the Web Browser (or Node.js) to handle these operations.

---

## What's the difference between Asynchronicity and Parallelism?

**R**: Parallelism is related to multi-threading, while Asynchronicity comes as a solution for Concurrency Management, considering the Javascript's Single-thread nature. Asynchronicity allows multiple operations to be processed within the same timeframe, handling these operations by putting their callback functions (which carries responses) on a Queue to be executed in order.

---

## What is Callback Hell?

**R**: Callback Hell describes the deficiences of trust and reasonability from the Callback pattern. There's a misconception to think that Callback Hell is related to an identation problem (Pyramid of Doom).

- **Truthiness**: When we send a callback function, we're giving the full control of how it will be executed to someone else.

- **Reasonablitiy**: Because we don't have the full control on how and when the callback will be executed, we can't properly handle its execution in a sequential and logical way.

---

## How did Javascript handled Network Requests operations before Asynchronicity?

R: Network requests were handled by Synchronous AJAX, blocking the Thread of Execution and freezing the whole Web Page.

---

## Why were Promises implemented?

R: Promises combine Callbacks, Thunks and strict rules (Promise Trust) to solve Callbacks Inversion of Control issue and provide more reasonability, by abstracting the time complexity management.

## Why Thunks are so important and how does it relates to Promises?

Thunks are function wrappers that rely on closure to hold some value that can be accessed at any given time, like a token. Thunks handle Callbacks time complexity by using closures + conditional race conditions. When a Thunk is created/assigned, it does not require any additional parameters. There are two types of thunks:

- **Eager/Active Thunks**: When initialized, it immediately executes the callback function to hold the value.
- **Lazy/Passive Thunks**: It will only execute the callback function when it is first called.

## What main issue of Callbacks do Promises solve?

Promises solve the Inversion of Control issue by managing the Callbacks and applying strict rules known as **Promise Trust**:

- Immutable once resolved.
- Either Success or error.
- Can only resolve once.
- Exceptions become error.

A Promise "subscribes" to the Callback event and gets notified by the resolve or reject methods, which receive the response.

## What is Promise chaining ?

Promises can be chained one after another, sequentially, to manage data and flow control. They provide more reasonability than Thunks. The failure of use Chaining can lead to anti-patterns like Promise Hell (nesting .then methods one inside another).

## How does Javascript access functionalities like setting a Timer or making a Network Request?

R: Javascript does not have a built-in functionality that sets a Timer or makes a Network Request, instead, we send those operations to the Web Browser by using facade functions like setTimeout or AJAX.


## Why are Generators so important?


R: Generators solve the problem of non-reasoning non-sequential code that Promises don't resolve. They are a special type of Iterators that relies on closure to save the "state" of a function execution. Functions are run to completion in Javascript and cannot be cancelled until they finish. By using the yield keyword, we can suspend the function execution and run it again where it stopped when the promise resolves.

The combination of Generators and Promises (Async Generators), allows the continuation of the function execution.

The Async Await pattern is built on top of Generators.

---

## 3. Describe from end to end how an Asynchronous Operation is processed and executed. 

Callbacks:

- The Callback will be handled by the Web Browser.
- Javascript will keep executing Synchronous Code.
- When the Callback finishes, the Web Browser will put the callback function into the Callback Queue.
- After Synchronous code has finished, the Event Loop will check the Callback Queue to put the callback function into the Call Stack.
- The callback function will be triggered automatically.

Promises:

- A Promise is created to manage the Callback execution.
- The Promise constructor (executor method) will execute the Callback.
- Thread is not blocked; Javascript will keep executing synchronous code.
- If the Callback finished the execution, the subscribed Promise will be updated, resolved or canceled.
- Any callback functions placed in the onFullfilment array, by using the .then method, will be sent to the Microtask Queue.
- The Event Loop will check if the Call Stack is empty, to automatically place these functions into the Call Stack (once global is popped off).

The Microtask Queue has priority over the Callback Queue. As long as the Microtask Queue is being filled up by Promise chaining, it will run everything until it finishes. This is known as Starving the Callback Queue.

---

## What is the Event Loop?

**R**: The Event Loop is the core component that allows Asynchronicity Concurrency Management and lives on the Javascript Runtime. As long as the application is running, the Event Loop will be the manager for pushing callback functions from the Macrotask Queue and the Callback Queue to the Call Stack.

Event Loop and Queues are not part of the Javascript Engine, they are part of the Web Browser runtime (or Node.js).


