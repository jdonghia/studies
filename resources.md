# Node

```bash
## clears cache

npx npkill -s size
```

# Prettier

- Plugins to imports and sorting tailwind

```javascript
// on prettierrc.

{
  "plugins": ["prettier-plugin-tailwindcss","prettier-plugin-organize-imports"],
}
```

## Difference between ?? and ||

## Clean syntax conditional to reduce integer by 1

```javascript
let integer = 12;

if (true) integer--;
```

## Spread operator iterating

```javascript
import Component from "./component";

// not good if some props cannot be passed

function Foo() {
  const items = [
    { label: "item1", id: 0 },
    { label: "item2", id: 1 },
    { label: "item3", id: 2 },
  ];

  return (
    <>
      {/* dont do this */}
      {items.map((item) => (
        <Component {...item} />
      ))}

      {/* spread the props */}
      {items.map((item) => (
        <Component label={item.label} key={item.id} />
      ))}
    </>
  );
}
```
