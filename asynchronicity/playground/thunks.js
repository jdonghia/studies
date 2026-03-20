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

function eagerThunk(fn, ...args) {
  var result = fn(...args);
  return function () {
    return result;
  };
}

function lazyThunk(fn, ...args) {
  return function () {
    return fn(...args);
  };
}

function add(x, y) {
  return x + y;
}

var test = lazyThunk(add, 1, 2);
var test2 = lazyThunk(add, 20, 22);
console.log(test());
console.log(test2());
