module.exports = {
  extends: [
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
  ],
  plugins: ['react', '@typescript-eslint'],
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true,
  },
  settings: {
    'import/resolver': {
      typescript: {},
    },
    'import/ignore': ['node_modules', 'blueprint-templates', 'src/@types'],
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  ignorePatterns: ['./node_modules', './dist', './blueprint-templates', 'src/@types'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  rules: {
    rules: {
      'no-console': 'off',
    },
    'brace-style': [2, '1tbs', { allowSingleLine: true }],
    'comma-style': [2, 'first', { exceptions: { ArrayExpression: true, ObjectExpression: true } }],
    curly: 2,
    eqeqeq: [2, 'allow-null'],
    'max-statements': [2, 30],
    'no-shadow-restricted-names': 2,
    'no-undef': 2,
    'no-use-before-define': 2,
    radix: 2,
    semi: 2,
    'space-infix-ops': 2,
    strict: 0,
    indent: ['error', 2],
    'linebreak-style': [0, 'unix'],
    quotes: [
      'warn',
      'single',
      {
        allowTemplateLiterals: true,
      },
    ],
    indent: [
      'error',
      2,
      {
        SwitchCase: 1,
        ignoredNodes: ['ConditionalExpression'],
      },
    ],
    'no-console': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-var-requires': 0,
    'import/namespace': 0,
    'no-unused-vars': 'error',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all',
        args: 'after-used',
        ignoreRestSiblings: false,
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-empty': 'warn',
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-inferrable-types': 0,
  },
};
