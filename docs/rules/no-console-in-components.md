# Disallow console.log in React components (no-console-in-components)

This rule prevents the use of `console.log` within React components. It is generally better to use a dedicated logging library or to remove these statements before deploying to production.

## Rule Details

This rule aims to keep the browser console clean in production by flagging `console.log` statements inside functional and class components.

### Examples of **incorrect** code for this rule:

```jsx
function MyComponent() {
  console.log('Rendering MyComponent');
  return <div>Hello</div>;
}

class MyClassComponent extends React.Component {
  render() {
    console.log('Rendering MyClassComponent');
    return <div>Hello</div>;
  }
}
```

### Examples of **correct** code for this rule:

```jsx
// Console logs outside of components are allowed
console.log('App initialized');

function MyComponent() {
  return <div>Hello</div>;
}
```

## When Not To Use It

If you rely heavily on `console.log` for debugging and don't have an automated process to remove them, you might want to disable this rule.
