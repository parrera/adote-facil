import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3001',
    viewportWidth: 1280,
    viewportHeight: 720,
    // Importante: garante que ele leia o arquivo para ignorar o erro de hydration
    supportFile: 'cypress/support/e2e.ts', 
  },
});