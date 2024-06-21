// @ts-check
import hopeConfig, {
  config,
  globals,
  tsParser,
} from 'eslint-config-mister-hope';
import { vue, vueParser } from 'eslint-config-mister-hope/vue';
import reactRecommended from 'eslint-plugin-react/configs/recommended.js';

export default config(
  ...vue,
  ...hopeConfig,
  {
    ignores: [
      '**/.vuepress/.cache/**',
      '**/.vuepress/.temp/**',
      // FIXME: Handle alias correctly
      '**/.vuepress/components/**',
      // FIXME: Correctly type these files
      '**/.vuepress/utils/transform/**',
      '**/dist/**',
      'example/**',
      '**/node_modules/**',
    ],
  },

  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parser: vueParser,
      parserOptions: {
        parser: tsParser,
        tsconfigDirName: import.meta.dirname,
        project: ['./tsconfig.eslint.json'],
        extraFileExtensions: ['.vue'],
      },
    },
  },

  {
    files: ['packages/admin/src/**.{js,jsx}'],
    ...reactRecommended,
    languageOptions: {
      ...reactRecommended.languageOptions,
      globals: {
        ...globals.browser,
        VERSION: 'readonly',
      },
    },
    rules: {
      'react/display-name': 'off',
      'react/prop-types': 'off',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['**/*.{ts,vue}'],
    rules: {
      '@typescript-eslint/naming-convention': [
        'warn',
        {
          selector: 'default',
          format: ['camelCase'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allow',
        },
        {
          selector: ['variable'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allowSingleOrDouble',
          trailingUnderscore: 'allowSingleOrDouble',
        },
        {
          selector: ['parameter'],
          format: ['camelCase', 'PascalCase'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: ['property'],
          format: null,
          custom: {
            regex: '(^\\/$|^/.*/$|^@|^[a-z]+(?:-[a-z]+)*?$)',
            match: true,
          },
          filter: '(^\\/$|^/.*/$|^@|^[a-z]+(?:-[a-z]+)*?$)',
        },
        {
          selector: ['property'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
          trailingUnderscore: 'allow',
        },
        {
          selector: 'import',
          format: ['PascalCase', 'camelCase'],
        },
        {
          selector: 'typeLike',
          format: ['PascalCase'],
        },
      ],
    },
  },

  {
    files: ['packages/client/src/**/*.{ts,vue}'],
    rules: {
      'vue/block-lang': [
        'error',
        {
          script: { lang: 'ts' },
        },
      ],
    },
  },

  {
    files: [
      'packages/cloudbase/**/*.js',
      'packages/hexo-next/**/*.js',
      'packages/server/**/*.{js,ts}',
      'scripts/**.cjs',
    ],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-commonjs': 'off',
    },
  },

  {
    files: ['packages/cloudbase/**/*.js', 'packages/server/**/*.{js,ts}'],
    languageOptions: {
      globals: {
        think: 'readonly',
      },
    },
  },

  {
    files: ['packages/server/**/*.{js,ts}'],
    rules: {
      '@typescript-eslint/class-literal-property-style': 'off',
      '@typescript-eslint/no-empty-function': 'off',
    },
  },

  {
    files: ['scripts/**.js'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
