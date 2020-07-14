const Resolver = require('../../../graphql/user/Resolvers');
const { Pool } = require('pg');

jest.mock('pg', () => {
  const testPool = {
    connect: jest.fn(),
    query: jest.fn(),
    end: jest.fn(),
  };
  return { Pool: jest.fn(() => testPool) };
});
beforeEach(() => {
  userPool = new Pool();
});
afterEach(() => {
  jest.clearAllMocks();
});

it('should return a configuration string', () => {
  const params = { user: "admin", tenant: "admin" };
  const config = {config:'something'};

  userPool.query.mockImplementation(() => Promise.resolve({ "command": "SELECT", "rowCount": 1, "oid": null, "rows": [{"configuration":config}], "fields": [{ "name": "configuration", "tableID": 24576, "columnID": 3, "dataTypeID": 114, "dataTypeSize": -1, "dataTypeModifier": -1, "format": "text" }], "_parsers": [null], "RowCtor": null, "rowAsArray": false }));

  return Resolver.Query.getConfig({}, params).then((output) => {
    expect(output).toEqual(JSON.stringify(config));
  });
});

it('should return an update message', () => {
  const params = { user: 'admin', tenant: 'admin', config: '{"config":"newconfig"}' };

  userPool.query.mockImplementation(() => Promise.resolve({"command":"SELECT","rowCount":1,"oid":null,"rows":[],"fields":[],"_parsers":[],"RowCtor":null,"rowAsArray":false}));
  userPool.query.mockImplementation(() => Promise.resolve({"command":"UPDATE","rowCount":1,"oid":null,"rows":[],"fields":[],"_parsers":[],"RowCtor":null,"rowAsArray":false}));

  return Resolver.Mutation.updateConfig({}, params).then((output) => {
    expect(output).toEqual("Updated user's dashboard configuration");
  });
});

it('should return and inserted message', () => {
  const params = { user: 'sims', tenant: 'admin', config: '{"config":"simsconfig"}' };

  userPool.query.mockReturnValueOnce({ "command": "SELECT", "rowCount": 0 })
    .mockReturnValueOnce({ "command": "INSERT", "rowCount": 1, "oid": null, "rows": [], "fields": [], "_parsers": [], "RowCtor": null, "rowAsArray": false });

  return Resolver.Mutation.updateConfig({}, params).then((output) => {
    expect(output).toEqual("Added configuration to database");
  });
});

it('should return an error on getConfig', () => {
  const params = { user: "admin", tenant: "admin" };

  userPool.query.mockImplementation(() => Promise.resolve({"command": "SELECT", "rowCount": 0}));

  return Resolver.Query.getConfig({}, params).then((output) => {
    expect(output).toEqual('Could not complete operation');
  });
});

it('should return an error on updateConfig', () => {
  const params = { user: 'sims', tenant: 'admin', config: '{"config":"simsconfig"}' };

  userPool.query.mockResolvedValue('default value')
    .mockResolvedValueOnce({ "command": "SELECT", "rowCount": 0 })
    .mockResolvedValueOnce({ "command": "INSERT", "rowCount": 0 });

  return Resolver.Mutation.updateConfig({}, params).then((output) => {
    expect(output).toEqual("Could not complete operation");
  });
});

it('should return an error from getConfig', () => {
  const params = {user:'**generic_user**', tenant:'admin'};

  return Resolver.Query.getConfig({},params).catch((output)=>{
    expect(output).toEqual('Cannot use this username');
  });
});

it('should complete a select query', () => {
  const params = {tenant: "admin" };
  const config = {config:'something'};

  userPool.query.mockImplementation(() => Promise.resolve({ "command": "SELECT", "rowCount": 1, "oid": null, "rows": [{"configuration":config}], "fields": [{ "name": "configuration", "tableID": 24576, "columnID": 3, "dataTypeID": 114, "dataTypeSize": -1, "dataTypeModifier": -1, "format": "text" }], "_parsers": [null], "RowCtor": null, "rowAsArray": false }));

  return Resolver.Query.getConfig({}, params).then((output) => {
    expect(output).toEqual(JSON.stringify(config));
  });
});

it('should sucessfully complete a mutation', () => {
  const params = {tenant: 'admin', config: '{"config":"simsconfig"}' };

  userPool.query.mockReturnValueOnce({ "command": "SELECT", "rowCount": 0 })
    .mockReturnValueOnce({ "command": "INSERT", "rowCount": 1, "oid": null, "rows": [], "fields": [], "_parsers": [], "RowCtor": null, "rowAsArray": false });

  return Resolver.Mutation.updateConfig({}, params).then((output) => {
    expect(output).toEqual("Added configuration to database");
  });
});