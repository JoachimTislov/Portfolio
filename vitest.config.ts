import { fileURLToPath } from 'node:url'
import viteConfig from './vite.config'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      exclude: [...configDefaults.exclude, 'e2e/**'],
      environment: './vitest.environment',
      root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)
