import { render } from "./lib.js";

var newValue;

export function useState(value) {
  if (!newValue) {
    newValue = value;
  }

  function setState(value) {
    newValue = value;
    render();
  }

  return [newValue, setState];
}
