
describe("Page d'accueil - Eco Bliss Bath", () => {
    it("doit afficher correctement la page d'accueil", () => {
      cy.visit("/");
      cy.contains("Accueil").should("be.visible");
      cy.contains("Produits").should("be.visible");
    });
  });
  