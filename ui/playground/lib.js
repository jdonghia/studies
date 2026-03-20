import App from "./app.js";

var vDOM;

document.body.append(App());

export function useState(value) {
  function setState(newValue) {
    value = newValue;

    updateDOM();
  }

  return [value, setState];
}

export function createElement(type, props, ...children) {
  vDOM = { type, props, children };

  return element;
}

function convertVDOM(vDOM) {
  var convertedVDOM = vDOM.map(function create(element) {
    return createElement(element);
  });

  return convertedVDOM;
}

function createVDOM() {}

function updateDOM() {
  vDOM.forEach(function ([key, value]) {
    element[key] = value;
  });

  var element = document.createElement(type);

  var props = Object.entries(props);

  props.forEach(function ([key, value]) {
    element[key] = value;
  });

  children.forEach(function insert(el) {
    element.append(el);
  });

  var previousVDOM = { ...vDOM };

  var currentVDOM = document;

  findDiff(previousVDOM, currentVDOM);
}

function findDiff(previous, current) {
  for (let i = 0; i < current.length; i++) {
    if (JSON.stringify(previous[i]) != JSON.stringiy) {
    }
  }
}

render();
