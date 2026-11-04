<div align="center">

# OpenClassrooms - Eco-Bliss-Bath
</div>

<p align="center">
    <img src="https://img.shields.io/badge/MariaDB-v11.7.2-blue">
    <img src="https://img.shields.io/badge/Symfony-v6.2-blue">
    <img src="https://img.shields.io/badge/Angular-v13.3.0-blue">
    <img src="https://img.shields.io/badge/docker--build-passing-brightgreen">
  <br><br><br>
</p>

# Prérequis

Pour démarrer cette application web, les outils suivants sont nécessaires :

- Docker
- Node.js

## Installation et démarrage

Clonez le projet d'origine :

`git clone https://github.com/Orne-web/Eco-Bliss-Bath-QA.git `

Accédez au dossier du projet :

 `cd Eco-Bliss-Bath-QA `

 ### Configuration de l'environnement

Avant de démarrer les conteneurs Docker, créez un fichier `.env` à partir du fichier `.env.example`.

Dans le terminal PowerShell :

`Copy-Item .env.example .env`

Ouvrez ensuite le fichier `.env` et remplacez les valeurs d'exemple par des mots de passe locaux.

**Important :** le fichier `.env` contient des informations confidentielles et ne doit pas être publié sur GitHub.

Une fois la configuration terminée, démarrez les services avec :

`docker compose up -d`

Pour démarrer l'API et sa base de données :

`docker compose up -d`

Pour démarrer le frontend de l'application, rendez-vous dans le dossier frontend :

`cd ./frontend`

Installez les dépendances :

`npm install`

## Campagne de tests QA — Eco Bliss Bath

Ce dépôt contient les travaux réalisés dans le cadre du projet QA Engineer OpenClassrooms.

La campagne comprend :

- 9 tests API automatisés avec Cypress ;
- 2 tests Smoke automatisés ;
- 1 test de sécurité XSS automatisé ;
- 5 vérifications fonctionnelles manuelles.

**Résultats :** 16 vérifications réussies sur 17. Une anomalie liée à l'ajout au panier d'un produit dont le stock est négatif a été relevée.

### Documentation et résultats

- [Consulter la documentation QA et les instructions d'exécution](frontend/README.md)
- [Consulter les scripts de tests Cypress](frontend/cypress/e2e/)
- [Consulter les rapports de tests automatisés](frontend/rapports-tests/)