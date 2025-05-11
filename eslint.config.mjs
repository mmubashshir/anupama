import gvseslint from '@glasshouse/style-guide/eslint';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['src/**/*.{js,mjs,cjs,ts,mts,cts}'],
    ignores: ['eslint.config.mjs'],
  },
  ...gvseslint.configs.flat.browser,
  ...gvseslint.configs.flat.react,
  ...gvseslint.configs.flat.typescript,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  ...gvseslint.configs.flat.next,
  eslintConfigPrettier,
  {
    rules: {
      'react/function-component-definition': [
        'error',
        { namedComponents: 'function-declaration' },
      ],
      'simple-import-sort/imports': 'off',
      'react/jsx-no-useless-fragment': 'off',
      'import/no-default-export': 'off',
      'react/jsx-sort-props': 'off',
      camelcase: 'off',
    },
  },
];
