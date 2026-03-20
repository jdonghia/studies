// state hook

var data = { name: "John" };

var elements;

function updateData(label, value) {
  data[label] = value;
  updateDOM();
}

// function useState(value) {
//   function setState() {
//     updateDOM();
//   }
//
//   return [value, setState];
// }

function App() {
  return [
    "div",
    {},
    ["input", { oninput: updateData }],
    [
      "div",
      {},
      `Hello, ${data.name}`,
      ["div", {}, "Hi, there", ["div", {}, "Uno"]],
    ],
  ];
}

function createVDOM() {
  return [App()];
}

function handle(event) {
  updateData("name", event.target.value);
}

function convertVDOM(vdom) {
  return vdom.map(function (node) {
    return createElement(node);
  });
}

function findDiff(previous, current) {
  for (let i = 0; i < current.length; i++) {
    if (JSON.stringify(previous[i]) != JSON.stringify(current[i])) {
      // elements[i][1] = 
      

    }
  }
}

function updateDOM() {
  if (!elements) {
    var vDOM = createVDOM();
    var elements = convertVDOM(vDOM);

    document.body.append(...elements);
    return;
  }

  var vDOM = createVDOM();
  findDiff(elements, vDOM);
}

function createElement(node) {
  if (typeof node == "string") {
    var element = document.createElement("div");
    element.textContent = node;
    return element;
  }

  var element = document.createElement(node[0]);

  var props = Object.entries(node[1]);

  if (props.length > 0) {
    props.forEach(function ([key, value]) {
      element[key] = value;
    });
  }

  if (node.length > 2) {
    var tempNode = [...node].slice(2, 4);

    var children = [];
    tempNode.forEach(function (node) {
      children.push(createElement(node));
    });

    element.replaceChildren(...children);
  }

  return element;
}

updateDOM();

// setInterval(updateDOM, 15)
