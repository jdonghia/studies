import App from "./app.js";

var vDOM;

render();

export function createElement(type, props, ...children) {
  return { type, props, children };
}

export function render() {
  // if (!vDOM) {
    vDOM = App();

    var convertedVDOM = convertNode(vDOM);

    document.body.replaceChildren(convertedVDOM);
  // }

  // var previousVDOM = { ...vDOM };

  // var currentVDOM = App();

  // findDiff(previousVDOM, currentVDOM);
}

function findDiff(previous, current) {
  current.children.forEach(function (el, index) {
    if (JSON.stringify(el) != JSON.stringify(previous.children[index])) {
      previous.children[index] = el;
    }
  });
}

function convertNode(node) {
  if (typeof node == "string") {
    var element = document.createElement("div");
    element.textContent = node;
    return element;
  }

  var element = document.createElement(node.type);

  var props = Object.entries(node.props);

  if (props.length > 0) {
    props.forEach(function ([key, value]) {
      element[key] = value;
    });
  }

  var children = [];
  node.children.forEach(function (el) {
    children.push(convertNode(el));
  });

  element.replaceChildren(...children);

  return element;
}

// setInterval(updateDOM, 15)
