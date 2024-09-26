const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'dqzevk',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'https://opensource-demo.orangehrmlive.com',
    watchForFileChanges: false,
  },
});