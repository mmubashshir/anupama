import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import { defineConfig } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = defineConfig([
  ...compat.config({
    extends: [
      'next',
      'eslint-config-next',
      'next/core-web-vitals',
      'next/typescript',
    ],
  }),

  eslintConfigPrettier,
]);

export default eslintConfig;
