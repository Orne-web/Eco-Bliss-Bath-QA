describe("Sécurité XSS - Eco Bliss Bath", () => {
    it("doit empêcher l'exécution de JavaScript dans les commentaires", () => {
      const payload = "<img src=x onerror=alert('XSS_TEST')>";
      let alerteDeclenchee = false;

      cy.on("window:alert", (message) => {
        if (message.includes("XSS_TEST")) {
          alerteDeclenchee = true;
        }
      });
  
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
  
        cy.visit("http://localhost:4200", {
          onBeforeLoad(win) {
            win.localStorage.setItem("user", token);
          }
        });
  
        cy.visit("http://localhost:4200/#/reviews"); 
          
        
  
        cy.get('[data-cy="review-input-rating-images"] img')
          .eq(4)
          .click();
  
        cy.get('[data-cy="review-input-title"]')
          .type("Test de sécurité XSS");
  
        cy.get('[data-cy="review-input-comment"]')
          .type(payload);
  
        cy.intercept("POST", "**/reviews").as("publicationAvis");

        cy.get('[data-cy="review-submit"]')
            .click();
          
        cy.wait("@publicationAvis").then((interception) => {
            expect(interception.response, "Réponse du serveur").to.exist;
              
            const statut = interception.response.statusCode;
              
            expect(statut, "Statut HTTP de publication").to.eq(200);
         });
  
        cy.get('[data-cy="review-form"]')
          .should("be.visible");

        cy.reload();
        cy.contains("Test de sécurité XSS")
          .should("be.visible");
          
        cy.get("body").then(($body) => {
            const contenu = $body.text();
          
        cy.log("Présence du texte XSS_TEST : " + contenu.includes("XSS_TEST"));
          
            const imagesSuspectes = $body.find('img[onerror*="XSS_TEST"]');
          
            expect(
              imagesSuspectes.length,
              "Aucune image avec un gestionnaire XSS dangereux"
            ).to.equal(0);
        });  

        cy.then(() => {
            expect(
              alerteDeclenchee,
              "Aucune alerte XSS ne doit être déclenchée"
            ).to.equal(false);
        });  
  
        
      });
    });






  });