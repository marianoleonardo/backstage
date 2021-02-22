const axios = require('axios');
const Resolvers = require('../../../graphql/device/Resolvers');

jest.mock('axios');

afterEach(() => {
  axios.mockReset();
});

const deviceData = {
  0: {
    data: {
      attrs: {
        0: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 3,
          is_static_overridden: false,
          label: "temperature",
          static_value: "",
          template_id: "0",
          type: "dynamic",
          value_type: "integer",
        }]
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '0998',
      label: 'temperature sensor',
      templates: [0]
    },
  },
  1: {
    data: {
      attrs: {
        1: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 1,
          is_static_overridden: false,
          label: "hue",
          static_value: "",
          template_id: "1",
          type: "dynamic",
          value_type: "string",
        }],
        2: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 2,
          is_static_overridden: false,
          label: "intensity",
          static_value: "",
          template_id: "2",
          type: "dynamic",
          value_type: "integer",
        }]
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '8aa0f9',
      label: 'colors sensor',
      templates: [1, 2]
    },
  },
  2: {
    data: {
      attrs: {
        3: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 4,
          is_static_overridden: false,
          label: "coordinate",
          static_value: "",
          template_id: "1",
          type: "dynamic",
          value_type: "geo:point",
        },
          {
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 5,
            is_static_overridden: false,
            label: "location",
            static_value: "-22.902639983447763, -47.059749301405674",
            template_id: "2",
            type: "static",
            value_type: "geo:pont",
          }],
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '44h7ff',
      label: 'GPS - Marca C',
      templates: [3]
    },
  },
  3: {
    data: {
      attrs: {
        3: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 4,
          is_static_overridden: false,
          label: "coordinate",
          static_value: "",
          template_id: "1",
          type: "dynamic",
          value_type: "geo:point",
        },
          {
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 5,
            is_static_overridden: false,
            label: "location",
            static_value: "-22.902639983447763, -47.059749301405674",
            template_id: "2",
            type: "static",
            value_type: "geo:pont",
          }],
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '44h7ff',
      label: 'GPS - Marca A',
      templates: [3]
    },
  },
  4: {
    data: {
      attrs: {
        3: [{
          created: "2020-09-18T14:20:20.248546+00:00",
          id: 4,
          is_static_overridden: false,
          label: "coordinate",
          static_value: "",
          template_id: "1",
          type: "dynamic",
          value_type: "geo:point",
        },
          {
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 5,
            is_static_overridden: false,
            label: "location",
            static_value: "-22.902639983447763, -47.059749301405674",
            template_id: "2",
            type: "static",
            value_type: "geo:pont",
          }],
      }, created: '2020-10-01T14:49:26.869152+00:00',
      id: '44h7ff',
      label: 'GPS - Marca B',
      templates: [3]
    },
  },
};
const devicesFromTemplateData = {
  data: {
    devices: [
      {
        attrs: {
          3: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 4,
            is_static_overridden: false,
            label: "coordinate",
            static_value: "",
            template_id: "1",
            type: "dynamic",
            value_type: "geo:point",
          },
            {
              created: "2020-09-18T14:20:20.248546+00:00",
              id: 5,
              is_static_overridden: false,
              label: "location",
              static_value: "-22.902639983447763, -47.059749301405674",
              template_id: "2",
              type: "static",
              value_type: "geo:pont",
            }],
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: '44h7ff',
        label: 'GPS - Marca C',
        templates: [3]
      },
      {
        attrs: {
          3: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 4,
            is_static_overridden: false,
            label: "coordinate",
            static_value: "",
            template_id: "1",
            type: "dynamic",
            value_type: "geo:point",
          },
            {
              created: "2020-09-18T14:20:20.248546+00:00",
              id: 5,
              is_static_overridden: false,
              label: "location",
              static_value: "-22.902639983447763, -47.059749301405674",
              template_id: "2",
              type: "static",
              value_type: "geo:pont",
            }],
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: '90bc2a',
        label: 'GPS - Marca A',
        templates: [3]
      },
      {
        attrs: {
          3: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 4,
            is_static_overridden: false,
            label: "coordinate",
            static_value: "",
            template_id: "1",
            type: "dynamic",
            value_type: "geo:point",
          },
            {
              created: "2020-09-18T14:20:20.248546+00:00",
              id: 5,
              is_static_overridden: false,
              label: "location",
              static_value: "-22.902639983447763, -47.059749301405674",
              template_id: "2",
              type: "static",
              value_type: "geo:pont",
            }],
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: 'ca19f8',
        label: 'GPS - Marca B',
        templates: [3]
      }
    ]
  }
};
const historyData = {
  0: {
    data: [{
      device_id: '0998',
      ts: '2020-07-20T16:47:07.050000Z',
      value: 10.6,
      attr: 'temperature',
    },
      {
        device_id: '0998',
        ts: '2020-07-20T15:46:42.455000Z',
        value: 15.6,
        attr: 'temperature',
      },
      {
        device_id: '0998',
        ts: '2020-07-20T15:46:21.535000Z',
        value: 36.5,
        attr: 'temperature',
      }],
  },
  1: {
    data: [{
      attr: 'hue',
      value: '#4785FF',
      device_id: '8aa0f9',
      ts: '2020-07-20T16:47:07.408000Z',
      metadata: {},
    },
      {
        attr: 'hue',
        value: '#4785FF',
        device_id: '8aa0f9',
        ts: '2020-07-20T16:25:13.366000Z',
        metadata: {},
      },
      {
        attr: 'hue',
        value: '#414DE8',
        device_id: '8aa0f9',
        ts: '2020-07-20T13:25:06.697000Z',
        metadata: {},
      }],
  },
  2: [{
    attr: 'intensity',
    value: 5,
    device_id: '8aa0f9',
    ts: '2020-07-20T16:48:50.408000Z',
    metadata: {},
  }],
  3: {
    data: [{
      attr: 'coordinate',
      value: '-22.902639983447763,-47.059749301405674',
      device_id: '44h7ff',
      ts: '2020-07-20T16:48:50.408000Z',
      metadata: {},
    }]
  },
};

it('Device - should return a device', () => {
  const root = {};
  const params = { deviceId: '10cf' };
  const context = {};

  axios.mockImplementationOnce(() => Promise.resolve({
    data: {
      attrs: {
        4865: [
          {
            created: '2017-12-20T18:14:43.994796+00:00',
            id: 30,
            label: 'tag_temperature',
            template_id: '4865',
            type: 'dynamic',
            value_type: 'integer',
          },
          {
            created: '2017-12-20T18:14:44.014065+00:00',
            id: 31,
            label: 'tag_pressure',
            template_id: '4865',
            type: 'dynamic',
            value_type: 'float',
          },
          {
            created: '2017-12-20T18:14:44.015474+00:00',
            id: 32,
            label: 'tag_led',
            template_id: '4865',
            type: 'dynamic',
            value_type: 'bool',
          },
          {
            created: '2017-12-20T18:14:44.016804+00:00',
            id: 33,
            label: 'tag_fan',
            template_id: '4865',
            type: 'dynamic',
            value_type: 'bool',
          },
          {
            created: '2017-12-20T18:14:44.016804+00:00',
            id: 34,
            label: 'location',
            template_id: '4865',
            type: 'geo:point',
          },
          {
            created: '2017-12-20T18:14:44.016804+00:00',
            id: 34,
            label: 'customName',
            template_id: '4865',
            type: 'string',
          },
          {
            created: '2017-12-20T18:14:44.016804+00:00',
            id: 34,
            label: 'someact',
            template_id: '4865',
            type: 'actuator',
          },
        ],
      },
      created: '2017-12-20T18:15:08.864677+00:00',
      id: '10cf',
      label: 'sensor-4',
      templates: [
        '4865',
      ],
    },
  }));

  return Resolvers.Query.getDeviceById(root, params, context).then((output) => {
    expect(output).toEqual({
      attrs: [
        {
          label: 'tag_temperature',
          valueType: 'NUMBER',
        },
        {
          label: 'tag_pressure',
          valueType: 'NUMBER',
        },
        {
          label: 'tag_led',
          valueType: 'BOOLEAN',
        },
        {
          label: 'tag_fan',
          valueType: 'BOOLEAN',
        },
      ],
      id: '10cf',
      label: 'sensor-4',
    });
  });
});

it('Device - should get a list of devices', () => {
  axios.mockResolvedValue({
    data: {
      devices: [
        {
          attrs: {
            2: [
              {
                created: '2020-05-14T18:15:47.307374+00:00',
                id: 6,
                is_static_overridden: false,
                label: 'dina2',
                static_value: '',
                template_id: '2',
                type: 'dynamic',
                value_type: 'float',
              },
              {
                created: '2020-05-14T18:15:47.306332+00:00',
                id: 5,
                is_static_overridden: false,
                label: 'static',
                static_value: 'true',
                template_id: '2',
                type: 'static',
                value_type: 'bool',
              },
              {
                created: '2020-05-14T18:15:47.305416+00:00',
                id: 4,
                is_static_overridden: false,
                label: 'dinbool',
                static_value: '',
                template_id: '2',
                type: 'dynamic',
                value_type: 'bool',
              },
            ],
          },
          created: '2020-05-14T18:18:34.401142+00:00',
          id: '1b32ee',
          label: 'device2',
          templates: [
            2,
          ],
        },
        {
          attrs: {
            1: [
              {
                created: '2020-05-14T17:25:25.437877+00:00',
                id: 1,
                is_static_overridden: false,
                label: 'din',
                static_value: '',
                template_id: '1',
                type: 'dynamic',
                value_type: 'string',
              },
              {
                created: '2020-05-14T17:25:25.439239+00:00',
                id: 2,
                is_static_overridden: false,
                label: 'static',
                static_value: '20',
                template_id: '1',
                type: 'static',
                value_type: 'float',
              },
              {
                created: '2020-05-14T17:25:25.439943+00:00',
                id: 3,
                is_static_overridden: false,
                label: 'actuate',
                static_value: '',
                template_id: '1',
                type: 'actuator',
                value_type: 'bool',
              },
            ],
          },
          created: '2020-05-14T17:25:38.646423+00:00',
          id: '457be',
          label: 'deviceMock',
          templates: [
            1,
          ],
        },
        {
          attrs: {
            2: [
              {
                created: '2020-05-14T18:15:47.307374+00:00',
                id: 6,
                is_static_overridden: false,
                label: 'dina2',
                static_value: '',
                template_id: '2',
                type: 'dynamic',
                value_type: 'float',
              },
              {
                created: '2020-05-14T18:15:47.306332+00:00',
                id: 5,
                is_static_overridden: false,
                label: 'static',
                static_value: 'true',
                template_id: '2',
                type: 'static',
                value_type: 'bool',
              },
              {
                created: '2020-05-14T18:15:47.305416+00:00',
                id: 4,
                is_static_overridden: false,
                label: 'dinbool',
                static_value: '',
                template_id: '2',
                type: 'dynamic',
                value_type: 'bool',
              },
            ],
          },
          created: '2020-05-14T18:18:07.802635+00:00',
          id: 'd16fe3',
          label: 'device2Mock',
          templates: [
            2,
          ],
        },
      ],
      pagination: {
        has_next: false,
        next_page: null,
        page: 1,
        total: 1,
      },
    },
  });
  const root = {};
  const params = { page: { number: 1, size: 4 }, filter: { label: 'd' } };

  return Resolvers.Query.getDevices(root, params, {}).then((output) => {
    expect(output).toEqual(
      {
        currentPage: 1,
        devices: [
          {
            attrs: [
              {
                "isDynamic": true,
                label: 'dina2',
                valueType: 'NUMBER',
                "staticValue": "",
              },
              {
                "isDynamic": true,
                label: 'dinbool',
                valueType: 'BOOLEAN',
                "staticValue": "",
              },
            ],
            id: '1b32ee',
            label: 'device2',
          },
          {
            attrs: [
              {
                "isDynamic": true,
                label: 'din',
                valueType: 'STRING',
                "staticValue": "",
              },
            ],
            id: '457be',
            label: 'deviceMock',
          },
          {
            attrs: [
              {
                "isDynamic": true,
                label: 'dina2',
                valueType: 'NUMBER',
                "staticValue": "",
              },
              {
                "isDynamic": true,
                label: 'dinbool',
                valueType: 'BOOLEAN',
                "staticValue": "",
              },
            ],
            id: 'd16fe3',
            label: 'device2Mock',
          },
        ],
        totalPages: 1,
      },
    );
  });
});

it('Device - Consult the history for the last 3 records (dashboard)', async () => {
  jest.mock('axios');
  const deviceData = {
    0: {
      data: {
        attrs: {
          0: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 1,
            is_static_overridden: false,
            label: "temperature",
            static_value: "",
            template_id: "0",
            type: "dynamic",
            value_type: "integer",
          }]
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: '0998',
        label: 'temperature sensor',
        templates: [0]
      },
    },
    1: {
      data: {
        attrs: {
          1: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 1,
            is_static_overridden: false,
            label: "hue",
            static_value: "",
            template_id: "1",
            type: "dynamic",
            value_type: "string",
          }],
          2: [{
            created: "2020-09-18T14:20:20.248546+00:00",
            id: 1,
            is_static_overridden: false,
            label: "intensity",
            static_value: "",
            template_id: "2",
            type: "dynamic",
            value_type: "integer",
          }]
        }, created: '2020-10-01T14:49:26.869152+00:00',
        id: '8aa0f9',
        label: 'colors sensor',
        templates: [1, 2]
      },
    },
  };
  const historyData = {
    0: {
      data: [{
        device_id: '0998',
        ts: '2018-03-22T13:47:07.050000Z',
        value: 10.6,
        attr: 'temperature',
      },
        {
          device_id: '0998',
          ts: '2018-03-22T13:46:42.455000Z',
          value: 15.6,
          attr: 'temperature',
        },
        {
          device_id: '0998',
          ts: '2018-03-22T13:46:21.535000Z',
          value: 36.5,
          attr: 'temperature',
        }],
    },
    1: {
      data: [{
        attr: 'hue',
        value: '#4785FF',
        device_id: '8aa0f9',
        ts: '2018-03-22T13:47:07.408000Z',
        metadata: {},
      },
        {
          attr: 'hue',
          value: '#4785FF',
          device_id: '8aa0f9',
          ts: '2020-05-06T16:25:13.366000Z',
          metadata: {},
        },
        {
          attr: 'hue',
          value: '#414DE8',
          device_id: '8aa0f9',
          ts: '2020-05-06T16:25:06.697000Z',
          metadata: {},
        }],
    },
    2: [{
      attr: 'intensity',
      value: 5,
      device_id: '8aa0f9',
      ts: '2020-05-06T16:48:50.408000Z',
      metadata: {},
    }],
  };

  axios.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[0])
    .mockResolvedValueOnce(deviceData[1])
    .mockResolvedValueOnce(historyData[0])
    .mockResolvedValueOnce(historyData[1])
    .mockResolvedValueOnce(historyData[2])

  const params = {
    filter: {
      devices: [{ deviceID: '0998', dynamicAttrs: ['temperature'] }, { deviceID: '8aa0f9', dynamicAttrs: ['hue'] }],
      templates: [],
      lastN: 3
    },
    configs: { sourceType: 0, operationType: 0 }
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('[{"0998temperature":36.5,"timestamp":"2018-03-22T13:46:21Z"},{"0998temperature":15.6,"timestamp":"2018-03-22T13:46:42Z"},{"0998temperature":10.6,"timestamp":"2018-03-22T13:47:07Z","8aa0f9hue":"#4785FF"},{"8aa0f9hue":"#414DE8","timestamp":"2020-05-06T16:25:06Z"},{"8aa0f9hue":"#4785FF","timestamp":"2020-05-06T16:25:13Z"}]')
});

it('Device - Consult the history by time period (dashboard)', async () => {
  jest.mock('axios');

  axios.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[0])
    .mockResolvedValueOnce(deviceData[1])
    .mockResolvedValueOnce(historyData[0])
    .mockResolvedValueOnce(historyData[1])
    .mockResolvedValueOnce(historyData[2])

  const params = {
    filter: {
      devices: [{ deviceID: '0998', dynamicAttrs: ['temperature'] }, { deviceID: '8aa0f9', dynamicAttrs: ['hue'] }],
      dateFrom: "2020-07-20T15:00:00.000z",
      dateTo: "2020-07-20T17:00:00.000z",
    },
    configs: { sourceType: 0, operationType: 0 }
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('[{"8aa0f9hue":"#414DE8","timestamp":"2020-07-20T13:25:06Z"},{"0998temperature":36.5,"timestamp":"2020-07-20T15:46:21Z"},{"0998temperature":15.6,"timestamp":"2020-07-20T15:46:42Z"},{"8aa0f9hue":"#4785FF","timestamp":"2020-07-20T16:25:13Z"},{"0998temperature":10.6,"timestamp":"2020-07-20T16:47:07Z","8aa0f9hue":"#4785FF"}]')
});

it('Device - should obtain a static coordinate point for the map', async () => {
  jest.mock('axios');

  axios.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[2])

  const params = {
    filter: {
      devices: [{ deviceID: '44h7ff', dynamicAttrs: [], staticAttrs: ['location'] }],
      lastN: 1
    },
    configs: { sourceType: 0, operationType: 8 }
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('{"44h7fflocation":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca C"}}')
});

it('Device - should obtain a static and dynamic coordinates points for the map', async () => {
  jest.mock('axios');

  axios.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[2])
    .mockResolvedValueOnce(historyData[3])

  const params = {
    filter: {
      devices: [{ deviceID: '44h7ff', dynamicAttrs: ['coordinate'], staticAttrs: ['location'] }],
      lastN: 1
    },
    configs: { sourceType: 0, operationType: 8 }
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('{"44h7ffcoordinate":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-07-20T16:48:50.408Z","deviceLabel":"GPS - Marca C"},"44h7fflocation":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca C"}}')
});

it('Device - should obtain a empty responde', async () => {
  jest.mock('axios');

  axios.mockResolvedValue('default value')
    .mockResolvedValueOnce(deviceData[2])

  const params = {
    filter: {
      devices: [{ deviceID: '44h7ff', dynamicAttrs: [], staticAttrs: ['location'] }],
      lastN: 1
    },
    configs: { sourceType: 99, operationType: 0 }
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('[]')
});

it('Template - should get the coordinates from three devices', async () => {
  jest.mock('axios');

  axios.mockResolvedValue('default value')
    .mockResolvedValueOnce(devicesFromTemplateData)

  const params = {
    filter: {
      templates: [{ templateID: '3', dynamicAttrs: [], staticAttrs: ['location'] }],
      lastN: 1
    },
    configs: { sourceType: 1, operationType: 8 }
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('{"44h7fflocation":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca C"},"90bc2alocation":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca A"},"ca19f8location":{"value":[-22.902639983447763,-47.059749301405674],"timestamp":"2020-09-18T14:20:20.248Z","deviceLabel":"GPS - Marca B"}}')
});
