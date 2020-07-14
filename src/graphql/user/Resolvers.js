const LOG = require('../../utils/Log');
const { userPool } = require('../../db');

const Resolvers = {
  Query: {
    async getConfig(root, params) {
      let query = {};
      if (params.user) {
        if (params.user === '**generic_user**') {
          throw 'Cannot use this username';
        }
        query = {
          text: 'SELECT configuration FROM user_config WHERE username=$1 AND tenant=$2;',
          values: [params.user, params.tenant],
        };
      } else {
        query = {
          text: 'SELECT configuration FROM user_config WHERE username=$1 AND tenant=$2;',
          values: ['**generic_user**', params.tenant],
        };
      }

      try {
        const result = await userPool.query(query);
        if (result.rowCount) {
          return (JSON.stringify(result.rows[0].configuration));
        }

        throw `Could not retrieve configuration from user ${params.user} in tenant ${params.tenant}`;
      } catch (error) {
        LOG.error(error);
        return 'Could not complete operation';
      }
    },
  },

  Mutation: {
    async updateConfig(root, params) {
      const genUser = '**generic_user**';
      try {
        if (params.config === null) {
          throw 'Dashboard configuration cannot be null';
        }
        let query = {};
        if (params.user) {
          if (params.user === genUser) {
            throw 'Cannot use this username';
          }
          query = {
            text: 'SELECT * FROM user_config WHERE username=$1 AND tenant=$2;',
            values: [params.user, params.tenant],
          };
        } else {
          query = {
            text: 'SELECT * FROM user_config WHERE username=$1 AND tenant=$2;',
            values: [genUser, params.tenant],
          };
          params.user = genUser;
        }

        const date = new Date().toLocaleString();
        let result = await userPool.query(query);


        if (result.rowCount) {
          query = {
            text: 'UPDATE user_config SET configuration=$3, last_update=$4 WHERE username=$1 AND tenant=$2;',
            values: [params.user, params.tenant, JSON.parse(params.config), date],
          };
          result = await userPool.query(query);
          if (result.rowCount) {
            return "Updated user's dashboard configuration";
          }

          throw 'Could not update database';
        } else {
          query = {
            text: 'INSERT INTO user_config VALUES ($1, $2, $3, $4);',
            values: [params.tenant, params.user, JSON.parse(params.config), date],
          };
          result = await userPool.query(query);
          if (result.rowCount) {
            return 'Added configuration to database';
          }

          throw 'Failed to inserto into database';
        }
      } catch (error) {
        LOG.error(error);
        return 'Could not complete operation';
      }
    },
  },
};

module.exports = Resolvers;
