# EcoBlissBath

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Campagne de tests QA — Eco Bliss Bath

### Présentation

Eco Bliss Bath est une application e-commerce spécialisée dans la vente de savons.

Dans le cadre de ce projet, une campagne de tests a été réalisée afin d'évaluer le fonctionnement de l'application, d'identifier les anomalies et d'automatiser certains contrôles.

### Technologies utilisées

- **Cypress 13.17.0** : automatisation des tests.
- **JavaScript** : écriture des scénarios de tests.
- **Angular 13** : framework du frontend.
- **Symfony** : backend de l'application.
- **Docker** : exécution des services backend et base de données.
- **Google Chrome** : réalisation des tests fonctionnels manuels.

### Tests réalisés

La campagne comprend :

- **9 tests API automatisés** : 8 réussis et 1 échoué.
- **2 smoke tests automatisés** : 2 réussis.
- **1 test de sécurité XSS automatisé** : 1 réussi.
- **5 tests fonctionnels manuels** : 5 réussis.

**Bilan : 17 vérifications réalisées, dont 16 réussies et 1 échouée.**

Une anomalie concernant l'ajout au panier d'un produit présentant un stock négatif a été identifiée et documentée sous la référence **BUG-001**.

## Exécution des tests automatisés

### Prérequis

Avant de lancer les tests, vérifier que :

- Docker Desktop est démarré.
- Les conteneurs du backend et de la base de données sont actifs.
- Le frontend Angular est accessible à l'adresse `http://localhost:4200`.
- Le backend est accessible à l'adresse `http://localhost:8081`.
- Les dépendances du projet ont été installées avec `npm ci`.

Les tests nécessitant une authentification utilisent des identifiants de test configurés localement dans `cypress.env.json`. Ce fichier contient des informations sensibles et ne doit pas être publié sur GitHub.

### Lancer les tests avec Cypress

Ouvrir un terminal dans le dossier `frontend`, puis exécuter les commandes suivantes.

**Tests API :**

```bash
npx.cmd cypress run --spec "cypress/e2e/api.cy.js" --browser electron
```

**Smoke tests :**

```bash
npx.cmd cypress run --spec "cypress/e2e/smoke.cy.js" --browser electron
```

**Test de sécurité XSS :**

```bash
npx.cmd cypress run --spec "cypress/e2e/xss.cy.js" --browser electron
```

### Rapports de tests

Les rapports de tests au format XML sont disponibles dans le dossier `rapports-tests/`.

Les rapports ont été générés à l'aide du reporter JUnit de Cypress lors des exécutions de la campagne QA.

### Tests fonctionnels manuels

Cinq vérifications fonctionnelles ont été réalisées manuellement sur Google Chrome :

- Connexion avec des identifiants valides.
- Refus de connexion avec un mot de passe incorrect.
- Ajout d'un produit disponible au panier.
- Modification de la quantité d'un produit dans le panier.
- Suppression d'un produit du panier.

Les résultats détaillés et le rapport d'incident BUG-001 figurent dans le bilan de campagne de tests.
