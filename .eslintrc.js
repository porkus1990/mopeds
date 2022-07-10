module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
    
  plugins: [
    '@typescript-eslint',
    'jest',
  ],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'airbnb-typescript/base',
        'plugin:jest/recommended',
        'plugin:import/recommended'
      ],
      parserOptions: {
        "project": ['./tsconfig.json']
      },
    }
  ],
  'rules': {
    "indent": ["error", 2],
  },
  env: {
    node: true,
    'es2022': true
  }
};