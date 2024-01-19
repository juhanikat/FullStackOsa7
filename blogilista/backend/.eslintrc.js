module.exports = {
  'env': {
    'node': true,
    'commonjs': true,
    'es2021': true,
    'jest': true,
  },
  'extends': 'eslint:recommended',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest'
  },
  'rules': {
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'unix'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ]
  }
}
