import { createElement, useState } from "./lib.js";

export default function App() {
  var [name, setName] = useState("");

  function handleOnChange(event) {
    setName(event.target.value);
  }

  return createElement(
    "div",
    {},
    `Hello, ${name}`,
    createElement("input", {
      oninput: handleOnChange,
    }),
  );
}

