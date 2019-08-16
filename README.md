# React Hooks Examples

A few simple examples showing the difference between hooks-based functional
components and class components.

### [`01-Counter.js`](https://github.com/helloitsjoe/react-hooks-examples/blob/master/src/01-Counter.js)

A simple counter, also has a naive hooks implementation to show approximately
how `useState` works

### [`02-Clock.js`](https://github.com/helloitsjoe/react-hooks-examples/blob/master/src/02-Clock.js)

An example using `useEffect` with `setInterval`, showing how
`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` can all be
wrapped into a single `useEffect`

### [`03-Vacation.js`](https://github.com/helloitsjoe/react-hooks-examples/blob/master/src/03-Vacation.js)

A data fetching example with a custom hook `useFetch`, with 2 implementations -
one using `useState`, and one with `useReducer`. Also shows one method for
avoiding setting state on an umounted component.

---

### See the examples at [https://helloitsjoe.github.io/react-hooks-examples](https://helloitsjoe.github.io/react-hooks-examples)

To edit these examples, `npm start` will run a development server with hot
reloading.
