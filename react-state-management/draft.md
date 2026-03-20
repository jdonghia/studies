- entity relationship diagram normalizes/flats nested data 
- Can this state use effect be represented by event driven approach ?
- useEffect must have async operations: Reactive x Event Driven. with useReducer

- useReducer e uma boa ferramenta para criar hooks, porem esses hooks sem store nao vao permitir persistencia de dados

- Xstate 'e mais pesado do que o zustand

Plannin ahead, software modelling. Do it before code. 

Event driven state machine 

Promises are also events


User stories first
Given when then

State first architecture (switch over state first)


Transition = Reducer

Events not handled by the state machine will return the same state

Actions = side effects 

Do = transition/event actions 

Entry, Exit actions (on state)

If transitions have the same action to the state, that’s a candidate for entry action. Also for exit actions 




Given state
When event 
Then change


Event first arch is like switching over action type

Compound states


actor to fetch data. Promises are going to resolve but the data will be ignored















Switch over state instead of event type to prevent undesired behaviors like triggering event multiple times

State first architecture with finite states

Each state act differently to different events


Transition = reducer

State.can to control the ui
Inspect to debug

Entry exit and transition actions

Entry if multiple transitions have the same action to the state

Same to exit

Raise instead of name of actions

State have same transitions ? Use compound

Instead of dot walking on state matches in compound states, use hasTag 