import Button from "../../src/components/Button";

describe("<Button />", () => {
  it("renders with text", () => {
    cy.mount(<Button>Clique aqui</Button>);
    cy.contains("Clique aqui").should("be.visible");
  });

  it("calls onClick", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<Button onClick={onClick}>Clique</Button>);
    cy.contains("Clique").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });

  it("supports disabled", () => {
    cy.mount(<Button disabled>Desabilitado</Button>);
    cy.contains("Desabilitado").should("be.disabled");
  });
});