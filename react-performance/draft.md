- Not doing stuff is faster than doing stuff
- Memoization / cache: memory x render speed
- Functions as props also cause re-render


- put state on the bottom of the tree and the minimum higher necessary


- Maintanability of a child prop to be passed to the parent as a ref. higher needed

- Rendering Behavior

What does cause rendering?

- state changed
- props changed
- parent changed
- context changed

- browser paints every 16.6ms 

- measuring and observing, process will be slowed than usual
- React dev tools warns production/dev build
- React Compiler


- React developer tools profiler with highlight

1. Render Phase
- React Fiber helps the render phase

2. Commit Phase
3. Clean Up Phase

useCallback for function definition
useMemo for returned values calculations
Reac.memo



- first try with state hierarchy. pushing down state on tree



- The Big one who's causing render problems
- and the little ones that gradually slows everything down



