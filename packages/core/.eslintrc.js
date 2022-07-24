const { rockConfig } = require('@rockpack/codestyle');

module.exports = rockConfig({
  '@typescript-eslint/return-await': 'off',
  'react/jsx-no-constructed-context-values': 'off',
  '@typescript-eslint/ban-types': 'off'
}, {
  globals: {
    JSX: true
  }
});
