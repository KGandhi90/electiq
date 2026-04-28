import js from '@eslint/js'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'

export default [
  js.configs.recommended,
  {
    plugins: {
      react:           reactPlugin,
      'react-hooks':   reactHooks,
      'jsx-a11y':      jsxA11y,
    },
    languageOptions: {
      globals: {
        window:    'readonly',
        document:  'readonly',
        navigator: 'readonly',
        console:   'readonly',
        setTimeout:'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
        Promise:   'readonly',
        URL:       'readonly',
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'react-hooks/rules-of-hooks':  'error',
      'react-hooks/exhaustive-deps': 'warn',
      'jsx-a11y/alt-text':           'error',
      'jsx-a11y/aria-role':          'error',
      'no-unused-vars':              'warn',
      'no-console':                  'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },
]
