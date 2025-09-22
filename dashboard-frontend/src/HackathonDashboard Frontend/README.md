# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```


  const weekData = [
    { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
    { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
    { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
    { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
    { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
    { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
  ];  const weekData = [
    { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
    { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
    { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
    { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
    { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
    { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
  ];  const weekData = [
    { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
    { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
    { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
    { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
    { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
    { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
  ];  const weekData = [
    { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
    { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
    { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
    { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
    { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
    { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
  ];  const weekData = [
    { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
    { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
    { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
    { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
    { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
    { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
  ];  const weekData = [
    { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
    { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
    { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
    { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
    { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
    { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
  ];  const weekData = [
    { day: "Today", value: 285, max: 400, confidence: "92%", icon: "☀️" },
    { day: "Tomorrow", value: 310, max: 400, confidence: "88%", icon: "⛅" },
    { day: "Thursday", value: 256, max: 400, confidence: "75%", icon: "🌧️" },
    { day: "Friday", value: 342, max: 400, confidence: "85%", icon: "☀️" },
    { day: "Saturday", value: 398, max: 400, confidence: "90%", icon: "☀️" },
    { day: "Sunday", value: 365, max: 400, confidence: "87%", icon: "⛅" },
  ];v