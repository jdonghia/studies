# UI Engineering

I mostly work with React and Next apps, and i never deeply dived into how the framework works under the hood. I knew about the existence of
things like Virtual DOM, Diffing Algorithm, React Fiber, and so on. But honestly if someone asked me to explain it, i wouldn't be able to do
it.

It's been some months since i started filling my knowledge gaps of programming, and Frontend Masters is helping me a lot with that. One of
the main content creators, Will Sentance, lectured a awesome workshop of UI Engineering, explaining this subjects deeply.

It's not a whole implementation of the React algorithm or any modern framework, but it's a general explanation of how its the usage of this
algorithms.

## UI Principles

The core principles of UI Engineering:

1. Display Content
2. Let the user interact with it

To drawn pixels on a Web Browser screen, we use HTML. HTML is a declarative language that is parsed by the Web Browser, that will start up
the DOM, that lives on the C++ Browser Runtime. Usually, when we navigate to a url "www.google.com", the browser reads the .html file.

Overall:

1. HTML will be read by the Web Browser
2. Tags or "Commands" of HTML are read by the browser, in order of declaration
3. The content will be parsed, creating the DOM on C++ runtime.
4. The Layout and Render Engine will take action to paint the content on the screen every 16ms (or 60 FPS).

The DOM is possibly a struct on C++ runtime. HTML is a one time thing,

In the browser Dev Tools, on the Elements section, you're actually not seing the HTML, but the DOM that lives on the browser.

# UI Engineering

- Virtual DOM
- Reconciliation
- Diff Algorithm
- One way data binding
- Virtual DOM transformed into real elements, unattached.
- Declarative UI
- UI Components
- State Hooks

## How pixels are drawn on the screen

How pixels are drawn on the screen?

The HTML is a declarative language that sends "commands" to create elements/nodes on the real DOM, is order of declaration.

These commands will be read by the Web Browser

DOM is an object (possibly a struct) that lives on the C++ Browser Runtime.

When HTML creates the elements, they'll be parsed on the DOM.

The Layout and Render Engine will be responsible to map how the pixels that are going to be positioned and create the bitmap image that will
be painted every 16ms.

HTML is a "one-time thing"

# UI Engineering

Will Sentance has an awesome content on Frontend Masters about User Interface Engineering. Surprinsingly, he explains its core principles
using a whiteboard: Pixels on the screen, HTML and DOM, Virtual DOMs on Javascript, WebCore, WebIDL and so on.

I was already familiar with his didatic and his "Hard Parts" workshop collection.

I found myself really interested to understand deeply these concepts. Frameworks like React, Vue and Angular has these principles as its
core foundation.

It's been some months since i decided to deep dive into the Javascript world. Before that, i was trying to follow the most primitive way to
learn something new: Going into the docs and trying to figure out and put the pieces together. Also the AI serves as a great tuthor to learn
something new.
