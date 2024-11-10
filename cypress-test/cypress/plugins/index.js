const { queryPostgres } = require('cypress-postgres');

module.exports = (on, config) => {
  on('task', {
    queryPostgres: queryPostgres,
  });
};
