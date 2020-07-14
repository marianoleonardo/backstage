const { Router } = require('express');
const expressGraphQL = require('express-graphql');
const { schemaLogin, schemaPermission } = require('../graphql/auth/SchemaAuth');
const rootSchema = require('../graphql/Schema');

const router = Router();

/**
 * Create endpoint for login,
 * This end point not need a jwt token,  that is config in kong
 */
router.use('/graphql-auth/', expressGraphQL({
  schema: schemaLogin,
  graphiql: false, // graphql interface
}));

/**
 * Create endpoint for permissions
 */
router.use('/graphql/permissions', expressGraphQL({
  schema: schemaPermission,
  graphiql: false, // graphql interface
}));

/**
 * Create endpoint for  geral
 */
router.use('/graphql/', expressGraphQL({
  schema: rootSchema,
  graphiql: false, // graphql interface
}));


module.exports = router;
