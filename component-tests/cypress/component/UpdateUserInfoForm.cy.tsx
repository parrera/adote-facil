import UpdateUserInfoForm from "../../src/components/UpdateUserInfoForm";

describe("<UpdateUserInfoForm />", () => {
  it("renders core form elements", () => {
    cy.mount(<UpdateUserInfoForm />);
    
    cy.get('[data-testid="email-input"]').should("exist");
    cy.contains(/alterar senha/i).should("exist");
    cy.contains(/salvar alterações/i).should("exist");
  });

  it("validates email format on submit", () => {
    cy.mount(<UpdateUserInfoForm />);
    
    // Type invalid email
    cy.get('[data-testid="email-input"]').type("invalidemail");
    
    // Submit form
    cy.contains(/salvar alterações/i).click();
    
    // Should show validation error
    cy.contains(/email inválido/i).should("exist");
  });

  it("reveals password fields when 'Alterar senha' is clicked", () => {
    cy.mount(<UpdateUserInfoForm />);
    
    // Password fields should not be visible initially
    cy.contains(/nova senha/i).should("not.exist");
    cy.contains(/confirmar nova senha/i).should("not.exist");
    
    // Click the button
    cy.contains(/alterar senha/i).click();
    
    // Password fields should now be visible
    cy.contains(/nova senha/i).should("exist");
    cy.contains(/confirmar nova senha/i).should("exist");
    
    // Click again to hide
    cy.contains(/alterar senha/i).click();
    cy.contains(/nova senha/i).should("not.exist");
  });

  it("accepts valid email input", () => {
    cy.mount(<UpdateUserInfoForm />);
    
    const validEmail = "test@example.com";
    cy.get('[data-testid="email-input"]').type(validEmail);
    cy.get('[data-testid="email-input"]').should('have.value', validEmail);
    
    // Should not show error for valid email
    cy.contains(/email inválido/i).should("not.exist");
  });
});