const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000", // URL base da sua aplicação
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    supportFile: false, // Desabilitado para uma configuração mais simples
  },
});
