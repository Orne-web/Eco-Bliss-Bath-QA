
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4200",
    supportFile: false,
    setupNodeEvents(on, config) {
      // Configuration des événements Cypress
    },
  },
});
