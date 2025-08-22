//import AnimalRegisterForm from "../../src/components/AnimalRegisterForm";
import AnimalRegisterForm from "@/components/AnimalRegisterForm";

describe("<AnimalRegisterForm />", () => {
  it("renders key fields", () => {
    cy.mount(<AnimalRegisterForm />);
    
    cy.contains(/tipo/i).should("exist");
    cy.contains(/gênero/i).should("exist");
    cy.contains(/fotos?/i).should("exist");
    cy.contains(/nome/i).should("exist");
    cy.contains(/cadastrar/i).should("exist");
  });

  it("validates when submitting empty form", () => {
    cy.mount(<AnimalRegisterForm />);
    
    // Submit without filling anything
    cy.contains(/cadastrar/i).click();

    // Check for validation messages
    cy.contains(/o nome é obrigatório/i).should("exist");
    cy.contains(/o tipo é obrigatório/i).should("exist");
    cy.contains(/o gênero é obrigatório/i).should("exist");
    cy.contains(/adicione ao menos uma foto do animal/i).should("exist");
  });

  it("allows form submission", () => {
    cy.mount(<AnimalRegisterForm />);
    
    // Check that form exists and can be submitted
    cy.get('form[data-testid="animal-register-form"]').should('exist');
    cy.get('form').submit();
  });
});