// eslint.config.js (flat)
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

import importPlugin from 'eslint-plugin-import'
import unusedImports from 'eslint-plugin-unused-imports'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
const __dirname = dirname(fileURLToPath(import.meta.url))

// Сформируем «типовой» набор так, чтобы он применялся ТОЛЬКО к нужным файлам
const typedFiles = ['src/**/*.ts', 'src/**/*.tsx', 'vite.config.ts']
const typedConfigs = tseslint.configs.recommendedTypeChecked.map((cfg) => ({
  ...cfg,
  files: typedFiles,
  languageOptions: {
    ...(cfg.languageOptions ?? {}),
    parserOptions: {
      ...(cfg.languageOptions?.parserOptions ?? {}),
      // используем Project Service — плоская конфигурация, без явного пути к tsconfig
      projectService: true,
      tsconfigRootDir: __dirname,
    },
    globals: {
      ...globals.browser,
      ...globals.es2024,
      ...(cfg.languageOptions?.globals ?? {}),
    },
  },
}))

export default [
  // Игноры
  { ignores: ['dist', 'node_modules', '.vite', '.idea', '.git'] },

  // Базовые правила JS
  js.configs.recommended,

  // 1) НЕ типо-осведомлённый слой — для всех TS/TSX
  ...tseslint.config({
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2024 },
    },
    plugins: {
      import: importPlugin,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      prettier,
    },
    rules: {
      // Форматирование / стиль
      semi: ['warn', 'off'],
      quotes: ['warn', 'double', { avoidEscape: true }],
      'prettier/prettier': [
        'warn',
        {
          semi: false,
          singleQuote: false,
          trailingComma: 'all',
          tabWidth: 4,
          useTabs: false,
          printWidth: 100,
          bracketSpacing: true,
          arrowParens: 'always',
          endOfLine: 'lf',
        },
      ],

      // Неиспользуемые импорты/переменные
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
      ],

      // Порядок импортов
      'import/order': 'off',
      'simple-import-sort/imports': 'warn',
      'simple-import-sort/exports': 'warn',

      // Важно: отключаем правило, требующее тип-инфо, в нетиповом слое
      '@typescript-eslint/await-thenable': 'off',
    },
  }),

  // 2) Типо-осведомлённый слой — строго для typedFiles
  ...typedConfigs,

  // Отключает конфликтующие стилистические правила
  eslintConfigPrettier,
]
