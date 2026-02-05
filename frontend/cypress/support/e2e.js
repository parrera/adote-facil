// Comandos customizados para testes

// Comando para login via API (evita repetir fluxo de login nos testes)
Cypress.Commands.add("login", (email, password) => {
  cy.request({
    method: "POST",
    url: "http://localhost:8080/login",
    body: { email, password },
  }).then((response) => {
    if (response.body.token) {
      cy.setCookie("token", response.body.token);
    }
  });
});

// Comando para limpar estado antes dos testes
Cypress.Commands.add("resetState", () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});
