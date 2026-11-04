
describe("Tests API - Eco Bliss Bath", () => {

    it("doit vérifier que l'API fonctionne", () => {
      cy.request("GET", "http://localhost:8081/api/health")
        .then((response) => {
          expect(response.status).to.eq(200);
        });
    });
  
    it("doit récupérer la liste des produits", () => {
      cy.request("GET", "http://localhost:8081/products")
        .then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body).to.be.an("array");
          expect(response.body.length).to.be.greaterThan(0);
        });
    });
  
    it("doit récupérer un produit individuel", () => {
      cy.request("GET", "http://localhost:8081/products")
        .then((response) => {
          const produit = response.body[0];
  
          cy.request("GET", `http://localhost:8081/products/${produit.id}`)
            .then((detail) => {
              expect(detail.status).to.eq(200);
              expect(detail.body.id).to.eq(produit.id);
            });
        });
    });
    
    it("doit gérer la demande d'un produit inexistant", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/products/999999",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404);
    });
  });
     
    it("doit vérifier si la création d'un avis nécessite une authentification", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/reviews",
      failOnStatusCode: false,
      body: {
        title: "Test QA - Authentification",
        comment: "Commentaire de test sans contenu dangereux",
        rating: 5
      }
    
    }).then((response) => {
       expect(response.status).to.eq(401);
    });
  
  });
     
    it("doit vérifier l'accès au panier sans connexion", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:8081/orders",
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

    it("doit récupérer le panier d'un utilisateur connecté", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: Cypress.env("testUsername"),
        password: Cypress.env("testPassword")
      },
      log: false
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
  
      const token = loginResponse.body.token;
      expect(token).to.be.a("string").and.not.be.empty;
  
      cy.request({
        method: "GET",
        url: "http://localhost:8081/orders",
        headers: {
          Authorization: `Bearer ${token}`
        },
        log: false
      }).then((panierResponse) => {
        expect(panierResponse.status).to.eq(200);
        expect(panierResponse.body.orderLines).to.be.an("array");
      });
    });
  });
   
    it("doit ajouter un produit disponible au panier", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: Cypress.env("testUsername"),
        password: Cypress.env("testPassword")
      },
      log: false
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
  
      const token = loginResponse.body.token;
  
      cy.request({
        method: "GET",
        url: "http://localhost:8081/products/4"
      }).then((productResponse) => {
        expect(productResponse.status).to.eq(200);
  
        cy.request({
          method: "PUT",
          url: "http://localhost:8081/orders/add",
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: {
            product: 4,
            quantity: 1
          },
          log: false
        }).then((response) => {
          expect(response.status).to.eq(200);
          expect(response.body.orderLines).to.be.an("array");
  
          const produitAjoute = response.body.orderLines.find(
            (ligne) => ligne.product.id === 4
          );
  
          expect(produitAjoute).to.exist;
          expect(produitAjoute.quantity).to.be.greaterThan(0);
        });
      });
    });
  });

    it("doit refuser l'ajout d'un produit en rupture de stock", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8081/login",
      body: {
        username: Cypress.env("testUsername"),
        password: Cypress.env("testPassword")
      },
      log: false
    }).then((loginResponse) => {
      expect(loginResponse.status).to.eq(200);
  
      const token = loginResponse.body.token;
  
      cy.request({
        method: "PUT",
        url: "http://localhost:8081/orders/add",
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: {
          product: 3,
          quantity: 1
        },
        failOnStatusCode: false,
        log: false
      }).then((response) => {
        expect(response.status).to.be.oneOf([400, 409, 422]);
      });
    });
  });












  
  });
  
