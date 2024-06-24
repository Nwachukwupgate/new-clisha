import globals from 'globals';
import pluginJs from '@eslint/js';
import ParserTypescriptEslint from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import PluginImport from 'eslint-plugin-import';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import tseslint from 'typescript-eslint';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import { fixupConfigRules } from '@eslint/compat';

export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    languageOptions: {
      parser: ParserTypescriptEslint,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...fixupConfigRules(pluginReactConfig),
  eslintConfigPrettier,
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
      import: PluginImport,
    },
    rules: {
      'no-alert': 0,
      camelcase: 0,
      'no-console': 0,
      'no-unused-vars': 0,
      'no-param-reassign': 0,
      'no-underscore-dangle': 0,
      'no-restricted-exports': 0,
      'react/jsx-uses-react': 0,
      'react/no-children-prop': 0,
      'react/react-in-jsx-scope': 0,
      'jsx-a11y/anchor-is-valid': 0,
      'react/no-array-index-key': 0,
      'no-promise-executor-return': 0,
      'react/require-default-props': 0,
      'react/jsx-props-no-spreading': 0,
      'import/prefer-default-export': 0,
      'react/function-component-definition': 0,
      '@typescript-eslint/naming-convention': 0,
      'jsx-a11y/control-has-associated-label': 0,
      '@typescript-eslint/no-use-before-define': 0,
      'react/jsx-no-useless-fragment': [
        1,
        {
          allowExpressions: true,
        },
      ],
      'prefer-destructuring': [
        1,
        {
          object: true,
          array: false,
        },
      ],
      'react/no-unstable-nested-components': [
        1,
        {
          allowAsProps: true,
        },
      ],
      '@typescript-eslint/no-unused-vars': [
        1,
        {
          args: 'none',
        },
      ],
      'react/jsx-no-duplicate-props': [
        1,
        {
          ignoreCase: false,
        },
      ],
      'simple-import-sort/exports': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      // Should remove this rule.
      'react/prop-types': 0,
      'react/no-unescaped-entities': 0,
      'react/no-unknown-property': 0,
    },
  },
];
