module.exports = {
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'error', // Ensures all dependencies are listed in useEffect
    'no-unused-vars': ['error', {argsIgnorePattern: '^_'}], // Error on unused variables, except those starting with "_"
    '@typescript-eslint/no-unused-vars': ['error', {argsIgnorePattern: '^_'}], // Ensures TypeScript enforces this too
  },
};
