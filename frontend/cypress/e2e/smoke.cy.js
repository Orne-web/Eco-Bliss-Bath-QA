describe("Smoke tests - Eco Bliss Bath", () => {
    it("doit afficher les éléments du formulaire de connexion", () => {
      cy.visit("http://localhost:4200");
  
      cy.contains("Connexion").click();
  
      cy.contains("Se connecter").should("be.visible");
  
      cy.contains("Email").should("be.visible");
  
      cy.contains("Mot de passe").should("be.visible");
  
      cy.get('[data-cy="login-input-username"]').should("be.visible");
  
      cy.get('input[type="password"]').should("be.visible");
    });

    it("doit afficher le bouton Ajouter au panier pour un utilisateur connecté", () => {
        cy.request({
          method: "POST",
          url: "http://localhost:8081/login",
          body: {
            username: Cypress.env("testUsername"),
            password: Cypress.env("testPassword")
          },
          log: false
        }).then((response) => {
          expect(response.status).to.eq(200);
      
          const token = response.body.token;
      
          cy.visit("http://localhost:4200");
      
          window.localStorage.setItem("token", token);
      
          cy.visit("http://localhost:4200/#/products/4");
      
          cy.get('[data-cy="detail-product-add"]')
            .should("be.visible");
        });
      });



  });