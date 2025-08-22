import { useForm } from "react-hook-form";
import PasswordInput from "../../src/components/PasswordInput";

// Wrapper component for testing with react-hook-form
const TestWrapper = () => {
  const { register } = useForm();
  return <PasswordInput fieldName="password" zodRegister={register} />;
};

describe("<PasswordInput />", () => {
  it("renders with password type by default", () => {
    cy.mount(<TestWrapper />);
    
    cy.get('input').should('have.attr', 'type', 'password');
    cy.get('button').should('exist');
  });

  it("toggles password visibility", () => {
    cy.mount(<TestWrapper />);
    
    // Initially should be password type
    cy.get('input').should('have.attr', 'type', 'password');
    
    // Click toggle button
    cy.get('button').click();
    
    // Should now be text type
    cy.get('input').should('have.attr', 'type', 'text');
    
    // Click again to hide
    cy.get('button').click();
    cy.get('input').should('have.attr', 'type', 'password');
  });

  it("accepts input", () => {
    cy.mount(<TestWrapper />);
    
    const testPassword = "mySecret123";
    cy.get('input').type(testPassword);
    cy.get('input').should('have.value', testPassword);
  });
});