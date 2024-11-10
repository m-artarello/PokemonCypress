const { defineConfig } = require('cypress')

module.exports = defineConfig({
  db: {
    user: 'postgres',
    password: 'root',
    host: 'localhost',
    post: '5432',
    database: 'pokemon'
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
    baseUrl: 'http://localhost:5173',
  },
})

