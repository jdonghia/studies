import { createElement } from "./lib.js";
import { useState } from "./useState.js";

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
