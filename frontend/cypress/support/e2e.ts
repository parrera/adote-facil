// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Ignora erros de "Hydration failed" e outros erros não tratados do Next.js ou React
Cypress.on('uncaught:exception', (err, runnable) => {
  // Retorna falso para impedir que o Cypress falhe o teste
  return false;
});