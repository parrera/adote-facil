import './commands'

Cypress.on('uncaught:exception', (err, runnable) => {
  if (err.message.includes('Minified React error #418')) {
    return false;
  }
  return true;
});