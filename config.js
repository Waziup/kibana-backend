module.exports = {
  // Node.js app
  port: process.env.SERVER_PORT || 6565,
  // API URL to be used in the server-side code
  serverUrl: process.env.SERVER_URL || `http://localhost:${process.env.SERVER_PORT || 3000}`,
  keycloakRealm: 'waziup',
  keycloakClientId: 'kibana-backend',
  elsPrefix: 'waziup',
  elasticsearchUrl:       process.env.ELASTICSEARCH_URL    || 'http://localhost:9200',
  keycloakUrl:       process.env.KEYCLOAK_URL    || 'http://localhost:8080/auth',
  kibanaUrl:       process.env.KIBANA_URL    || 'http://localhost:5601'
};

