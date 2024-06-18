/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './setupTest.ts',
    coverage: {
      provider: 'istanbul',
      exclude: [
        ...configDefaults.exclude,
        'src/assets/**',
        'src/App.tsx',
        'src/main.tsx',
        '.eslintrc.cjs',
        'src/navigation/**',
        'src/network/**',
      ],
      thresholds: {
        lines: 80
      },
    },
  },
});
