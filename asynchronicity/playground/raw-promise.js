function fakeAjax(cb, url) {
  var fake_responses = {
    file1: "The first text",
    file2: "The middle text",
    file3: "The last text",
  };
  var randomDelay = (Math.round(Math.random() * 1e4) % 8000) + 1000;

  console.log("Requesting: " + url);

  setTimeout(function () {
    cb(fake_responses[url]);
  }, randomDelay);
}

function MyPromise(executor) {
  var value;
  var status = "PENDING";
  var fulfilledReactions = [];
  var chain;

  executor(resolve);
  handleCallbacks();

  return {
    then,
    resolve,
  };

  function then(cb) {
    chain = MyPromise(function executor(resolve) {});

    fulfilledReactions.push(cb);

    if (value) handleCallbacks(chain);

    return chain;
  }

  function resolve(response) {
    status = "FULFILLED";
    value = response;

    handleCallbacks();
  }

  function handleCallbacks() {
    if (fulfilledReactions.length > 0) {
      fulfilledReactions.forEach(function call(callback) {
        const output = callback(value);

        if (typeof output === "object" && typeof output.then === "function") {
          output.then(function (value) {
            chain.resolve(value);
          });
          return;
        }

        chain.resolve(output);
      });
    }
  }
}

function run(generator) {
  var gen = generator();

  var { value: prom } = gen.next();

  prom
    .then(function (response) {
      return gen.next(response).value;
    })
    .then(function (response) {
      return gen.next(response).value;
    })
    .then(function (response) {
      return gen.next(response).value;
    });
}

run(function* () {
  var file1 = MyPromise(function executor(resolve) {
    fakeAjax(resolve, "file1");
  });

  var file2 = MyPromise(function executor(resolve) {
    fakeAjax(resolve, "file2");
  });

  var file3 = MyPromise(function executor(resolve) {
    fakeAjax(resolve, "file3");
  });

  console.log(yield file1);
  console.log(yield file2);
  console.log(yield file3);
});

// var prom = MyPromise(function executor(resolve) {
//   fakeAjax(resolve, "file1");
// });
//
// prom
//   .then(function (response) {
//     return MyPromise(function executor(resolve) {
//       resolve(response);
//     });
//   })
//   .then(function (response) {
//     console.log("hello", response);
//   });
