const configGraphQL = {
  local_url: process.env.LOCAL_URL || 'http://apigw',
  local_port: process.env.LOCAL_PORT || '8000',
  auth_internal_url: process.env.AUTH_INTERNAL_URL || 'http://auth',
  auth_internal_port: process.env.AUTH_INTERNAL_PORT || '5000',
};
const config = {
  port: process.env.PORT || 3005,
  postgres_user: process.env.DEVICE_MANAGER_POSTGRES_USER || 'postgres',
  postgres_host: process.env.DEVICE_MANAGER_POSTGRES_HOST || 'postgres',
  postgres_database: process.env.DEVICE_MANAGER_POSTGRES_DATABASE || 'dojot_devm',
  postgres_password: process.env.DEVICE_MANAGER_POSTGRES_PASSWORD || 'postgres',
  postgres_port: process.env.DEVICE_MANAGER_POSTGRES_PORT || 5432,
  base_local_url_graphql: `${configGraphQL.local_url}:${configGraphQL.local_port}`,
  base_auth_url_graphql: `${configGraphQL.auth_internal_url}:${configGraphQL.auth_internal_port}`,
  postgres_backstage_database: process.env.BACKSTAGE_DASBOARD_DB_NAME || 'dojot_dash_users',
  postgres_backstage_user: process.env.BACKSTAGE_DASHBOARD_DB_USER || 'postgres',
  postgres_backstage_pwd: process.env.BACKSTAGE_DASHBOARD_DB_PASSWORD || 'postgres',
  postgres_backstage_host: process.env.BACKSTAGE_DASHBOARD_DB_HOST || 'postgres',
  postgres_backstage_port: process.env.BACKSTAGE_DASHBOARD_DB_PORT || 5432,
};

module.exports = config;
