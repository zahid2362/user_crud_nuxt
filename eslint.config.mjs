import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  rules: {
    'no-unused-expressions': 'off', // Turn off the default ESLint rule
    '@typescript-eslint/no-unused-expressions': 'error', // Enable the TypeScript-specific rule
    'vue/html-self-closing': ['off'],
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off'
  }
  // Your additional custom configs here
})
