const axios = require('axios');
const Resolvers = require('../../../graphql/device/Resolvers');

jest.mock('axios');

afterEach(() => {
  axios.mockReset();
});

it('should return a device', () => {
  const root = {};
  const params = {deviceId: '10cf'};
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


it('should get a list of devices', () => {
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
                label: 'dina2',
                valueType: 'NUMBER',
              },
              {
                label: 'dinbool',
                valueType: 'BOOLEAN',
              },
            ],
            id: '1b32ee',
            label: 'device2',
          },
          {
            attrs: [
              {
                label: 'din',
                valueType: 'STRING',
              },
            ],
            id: '457be',
            label: 'deviceMock',
          },
          {
            attrs: [
              {
                label: 'dina2',
                valueType: 'NUMBER',
              },
              {
                label: 'dinbool',
                valueType: 'BOOLEAN',
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

it('should return a list of history entries', async () => {
  jest.mock('axios');

  const root = {};
  const params = {
    filter: {
      devices: [{ deviceID: '0998', attrs: ['temperature'] }],
      lastN: 3,
    },
  };

  const devReading = {
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
  };
  const dev = {
    data: {
      attrs: {
        1: [
          {
            created: '2020-03-09T17:10:34.364406+00:00',
            id: 1,
            is_static_overridden: false,
            label: 'temperature',
            metadata: [
              {
                created: '2020-03-09T17:10:34.369905+00:00',
                id: 2,
                is_static_overridden: false,
                label: 'protocol',
                static_value: 'mqtt',
                type: 'protocol',
                updated: null,
                value_type: 'string',
              },
            ],
            static_value: '',
            template_id: '1',
            type: 'dynamic',
            value_type: 'float',
          },
        ],
      },
      created: '2020-03-17T14:33:43.176756+00:00',
      id: '0998',
      label: 'Thermometer',
      templates: [
        1,
      ],
    },
  };

  axios.mockResolvedValue('default value')
    .mockResolvedValueOnce(devReading)
    .mockResolvedValueOnce(dev);

  const expectedResult = [{
    deviceID: '0998',
    label: 'Thermometer',
    attrs: [{
      label: 'temperature',
      valueType: 'NUMBER',
      value: 10.6,
      timestamp: '2018-03-22T13:47:07.050000Z',
    },
    {
      label: 'temperature',
      valueType: 'NUMBER',
      value: 15.6,
      timestamp: '2018-03-22T13:46:42.455000Z',
    },
    {
      label: 'temperature',
      valueType: 'NUMBER',
      value: 36.5,
      timestamp: '2018-03-22T13:46:21.535000Z',
    }],
  }];

  const result = await Resolvers.Query.getDeviceHistory(root, params, {});
  expect(result).toEqual(expectedResult);
});

it('should return empty array', async () => {
  jest.mock('axios');

  const root = {};
  const params = {
    filter: {
      devices: [{ deviceID: '0998', attrs: ['temperature'] }],
      lastN: 3,
    },
  };

  const devReading = {
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
  };

  axios.mockResolvedValue(null)
    .mockResolvedValueOnce(null)
    .mockResolvedValueOnce(devReading);

  const result = await Resolvers.Query.getDeviceHistory(root, params, {});
  expect(result).toEqual([]);
});

it('should return history from 2 devices', async () => {
  jest.mock('axios');

  const devices = [{
    data: {
      attrs: {
        1: [
          {
            created: '2020-03-09T17:10:34.364406+00:00',
            id: 1,
            is_static_overridden: false,
            label: 'temperature',
            metadata: [
              {
                created: '2020-03-09T17:10:34.369905+00:00',
                id: 2,
                is_static_overridden: false,
                label: 'protocol',
                static_value: 'mqtt',
                type: 'protocol',
                updated: null,
                value_type: 'string',
              },
            ],
            static_value: '',
            template_id: '1',
            type: 'dynamic',
            value_type: 'float',
          },
        ],
      },
      created: '2020-03-17T14:33:43.176756+00:00',
      id: '0998',
      label: 'Thermometer',
      templates: [
        1,
      ],
    },
  }, {
    data: {
      attrs: {
        1: [
          {
            created: '2020-05-06T16:19:32.247307+00:00',
            id: 1,
            is_static_overridden: false,
            label: 'hue',
            static_value: '',
            template_id: '1',
            type: 'dynamic',
            value_type: 'string',
          },
          {
            created: '2020-05-06T16:19:32.397514+00:00',
            id: 2,
            is_static_overridden: false,
            label: 'intensity',
            static_value: '',
            template_id: '1',
            type: 'dynamic',
            value_type: 'integer',
          },
        ],
      },
      created: '2020-05-06T16:19:46.185424+00:00',
      id: '8aa0f9',
      label: 'Living_Room',
      templates: [
        1,
      ],
    },
  }];

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
        ts: '2020-05-06T16:48:50.408000Z',
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
    .mockResolvedValueOnce(historyData[0])
    .mockResolvedValueOnce(devices[0])
    .mockResolvedValueOnce(historyData[1])
    .mockResolvedValueOnce(historyData[2])
    .mockResolvedValueOnce(devices[1]);

  const params = {
    filter: {
      devices: [{ deviceID: '0998', attrs: ['temperature'] }, { deviceID: '8aa0f9', attrs: ['hue', 'intensity'] }],
      lastN: 3,
    },
  };

  const result = await Resolvers.Query.getDeviceHistory({}, params, {});
  expect(result).toEqual([{
    attrs: [
      {
        label: 'temperature',
        timestamp: '2018-03-22T13:47:07.050000Z',
        value: 10.6,
        valueType: 'NUMBER',
      },
      {
        label: 'temperature',
        timestamp: '2018-03-22T13:46:42.455000Z',
        value: 15.6,
        valueType: 'NUMBER',
      },
      {
        label: 'temperature',
        timestamp: '2018-03-22T13:46:21.535000Z',
        value: 36.5,
        valueType: 'NUMBER',
      },
    ],
    deviceID: '0998',
    label: 'Thermometer',
  },
  {
    attrs: [
      {
        label: 'hue',
        timestamp: '2020-05-06T16:48:50.408000Z',
        value: '#4785FF',
        valueType: 'STRING',
      },
      {
        label: 'hue',
        timestamp: '2020-05-06T16:25:13.366000Z',
        value: '#4785FF',
        valueType: 'STRING',
      },
      {
        label: 'hue',
        timestamp: '2020-05-06T16:25:06.697000Z',
        value: '#414DE8',
        valueType: 'STRING',
      },
    ],
    deviceID: '8aa0f9',
    label: 'Living_Room',
  }]);
});

it('should return history from 1 device', async () => {
  jest.mock('axios');

  const device = {
    data: {
      attrs: {
        1: [
          {
            created: '2020-03-09T17:10:34.364406+00:00',
            id: 1,
            is_static_overridden: false,
            label: 'temperature',
            metadata: [
              {
                created: '2020-03-09T17:10:34.369905+00:00',
                id: 2,
                is_static_overridden: false,
                label: 'protocol',
                static_value: 'mqtt',
                type: 'protocol',
                updated: null,
                value_type: 'string',
              },
            ],
            static_value: '',
            template_id: '1',
            type: 'dynamic',
            value_type: 'float',
          },
        ],
      },
      created: '2020-03-17T14:33:43.176756+00:00',
      id: '0998',
      label: 'Thermometer',
      templates: [
        1,
      ],
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
        ts: '2020-05-06T16:48:50.408000Z',
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

  axios.mockResolvedValue(null)
    .mockResolvedValueOnce(historyData[0])
    .mockResolvedValueOnce(device)
    .mockResolvedValueOnce(historyData[1])
    .mockResolvedValueOnce(historyData[2]);

  const params = {
    filter: {
      devices: [{ deviceID: '0998', attrs: ['temperature'] }, { deviceID: '8aa0f9', attrs: ['hue', 'intensity'] }],
      lastN: 3,
    },
  };

  const result = await Resolvers.Query.getDeviceHistory({}, params, {});
  expect(result).toEqual([{
    deviceID: '0998',
    label: 'Thermometer',
    attrs: [{
      label: 'temperature',
      valueType: 'NUMBER',
      value: 10.6,
      timestamp: '2018-03-22T13:47:07.050000Z',
    },
    {
      label: 'temperature',
      valueType: 'NUMBER',
      value: 15.6,
      timestamp: '2018-03-22T13:46:42.455000Z',
    },
    {
      label: 'temperature',
      valueType: 'NUMBER',
      value: 36.5,
      timestamp: '2018-03-22T13:46:21.535000Z',
    }],
  }]);
});

it('Consult the history for the last 3 records (dashboard)', async () => {
  jest.mock('axios');

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
    .mockResolvedValueOnce(historyData[0])
    .mockResolvedValueOnce(historyData[1])
    .mockResolvedValueOnce(historyData[2])

  const params = {
    filter: {
      devices: [{deviceID: '0998', attrs: ['temperature']}, {deviceID: '8aa0f9', attrs: ['hue']}], operationType: 0, lastN: 3,
    },
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('[{"timestamp":"2020-05-06T16:25:13Z","0998temperature":null,"8aa0f9hue":"#4785FF"},{"timestamp":"2020-05-06T16:25:06Z","0998temperature":null,"8aa0f9hue":"#414DE8"},{"timestamp":"2018-03-22T13:47:07Z","0998temperature":10.6,"8aa0f9hue":"#4785FF"},{"timestamp":"2018-03-22T13:46:42Z","0998temperature":15.6,"8aa0f9hue":null},{"timestamp":"2018-03-22T13:46:21Z","0998temperature":36.5,"8aa0f9hue":null}]')
});

it('Consult the history by time period (dashboard)', async () => {
  jest.mock('axios');

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
  };

  axios.mockResolvedValue('default value')
    .mockResolvedValueOnce(historyData[0])
    .mockResolvedValueOnce(historyData[1])
    .mockResolvedValueOnce(historyData[2])

  const params = {
    filter: {
      devices: [{deviceID: '0998', attrs: ['temperature']}, {deviceID: '8aa0f9', attrs: ['hue']}], dateFrom: "2020-07-20T15:00:00.000z", dateTo: "2020-07-20T17:00:00.000z",
    },
  };

  const result = await Resolvers.Query.getDeviceHistoryForDashboard({}, params, {});
  expect(result).toEqual('[{"timestamp":"2020-07-20T16:47:07Z","0998temperature":10.6,"8aa0f9hue":"#4785FF"},{"timestamp":"2020-07-20T16:25:13Z","0998temperature":null,"8aa0f9hue":"#4785FF"},{"timestamp":"2020-07-20T15:46:42Z","0998temperature":15.6,"8aa0f9hue":null},{"timestamp":"2020-07-20T15:46:21Z","0998temperature":36.5,"8aa0f9hue":null},{"timestamp":"2020-07-20T13:25:06Z","0998temperature":null,"8aa0f9hue":"#414DE8"}]')
});
