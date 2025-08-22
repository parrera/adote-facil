import { defineConfig } from "cypress";
import viteConfig from './vite.config'; // You'll need this


export default defineConfig({
  video: true,
  screenshotOnRunFailure: true,

  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
      viteConfig: viteConfig, // Use custom Vite config
    },
    indexHtmlFile: "cypress/support/component-index.html",
    specPattern: "cypress/component/**/*.cy.{ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
});