
// Update the import path to the correct relative path
import AnimalCard from "../../src/components/AnimalCard";

describe("<AnimalCard />", () => {
  const mockAnimal = {
    id: "1",
    type: "Cachorro",
    gender: "macho" as const,
    race: "Vira-lata",
    description: "Amigável",
    images: [{ id: "1", base64: "data:image/png;base64,iVBORw0KGgoAAA" }]
  };

  it("renders basic animal info", () => {
    cy.mount(
      <AnimalCard animal={mockAnimal} listType="animals-available-to-adopt" />
    );
    cy.contains("Cachorro").should("exist");
    cy.contains("macho").should("exist");
    cy.contains("Vira-lata").should("exist");
  });

  it("shows 'Saiba mais' on available-to-adopt list", () => {
    cy.mount(
      <AnimalCard animal={mockAnimal} listType="animals-available-to-adopt" />
    );
    cy.contains(/saiba mais/i).should("exist");
  });

  it("shows adoption + delete controls on 'my-animals' list", () => {
    cy.mount(<AnimalCard animal={mockAnimal} listType="my-animals" />);
    cy.contains(/confirmar adoção/i).should("exist");
    cy.get("button").should('have.length', 2); // Adopt + delete
  });
});