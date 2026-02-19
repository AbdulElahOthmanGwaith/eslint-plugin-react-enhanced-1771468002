# Enforce generic type arguments on React hooks (prefer-typed-hooks)

This rule encourages the use of explicit generic type arguments when calling React hooks like `useState`, `useRef`, and `useContext` in TypeScript files. This ensures better type safety and clarity.

## Rule Details

This rule only applies to `.ts` and `.tsx` files. It flags hook calls that do not provide generic type parameters.

### Examples of **incorrect** code for this rule:

```tsx
const [user, setUser] = useState(null); // Missing type parameter
const inputRef = useRef(null); // Missing type parameter
const theme = useContext(ThemeContext); // Missing type parameter
```

### Examples of **correct** code for this rule:

```tsx
interface User { name: string }
const [user, setUser] = useState<User | null>(null); // Correct
const inputRef = useRef<HTMLInputElement>(null); // Correct
const theme = useContext<Theme>(ThemeContext); // Correct
```

## Options

This rule has an object option:

* `"hooks"`: An array of hook names to enforce. Defaults to `['useState', 'useRef', 'useContext']`.

```json
"react/prefer-typed-hooks": ["error", { "hooks": ["useState", "useRef"] }]
```
