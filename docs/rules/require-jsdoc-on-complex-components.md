# Enforce JSDoc documentation on complex React components (require-jsdoc-on-complex-components)

This rule ensures that large and complex React components are properly documented using JSDoc. This is crucial for maintaining readability and helping developers understand complex logic within components.

## Rule Details

This rule flags any React component (identified by a PascalCase name) that exceeds a certain number of lines and does not have an accompanying JSDoc comment.

### Examples of **incorrect** code for this rule:

```jsx
// A large component without documentation
function VeryComplexComponent({ data }) {
  // ... 50+ lines of complex logic ...
  return <div>{/* ... */}</div>;
}
```

### Examples of **correct** code for this rule:

```jsx
/**
 * Handles complex data visualization and user interactions.
 * @param {Object} props - The component props.
 */
function VeryComplexComponent({ data }) {
  // ... 50+ lines of complex logic ...
  return <div>{/* ... */}</div>;
}

// Small components don't require documentation
function SimpleComponent() {
  return <div>Simple</div>;
}
```

## Options

This rule has an object option:

* `"lineLimit"`: The number of lines a component can have before requiring JSDoc. Defaults to `50`.

```json
"react/require-jsdoc-on-complex-components": ["error", { "lineLimit": 30 }]
```
