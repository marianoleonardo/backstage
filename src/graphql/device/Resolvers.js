const axios = require('axios');
const UTIL = require('../utils/AxiosUtils');
const LOG = require('../../utils/Log');

const paramsAxios = {
  token: null,
};
const setToken = ((token) => {
  paramsAxios.token = token;
});
const optionsAxios = ((method, url) => UTIL.optionsAxios(method, url, paramsAxios.token));

function formatValueType(valType) {
  let valueType = '';
  switch (valType) {
    case 'integer':
      valueType = 'NUMBER';
      break;
    case 'float':
      valueType = 'NUMBER';
      break;
    case 'bool':
      valueType = 'BOOLEAN';
      break;
    case 'string':
      valueType = 'STRING';
      break;
    case 'geo:point':
      valueType = 'GEO';
      break;
    default:
      valueType = 'UNDEFINED';
  }
  return valueType;
}

const Resolvers = {
  Query: {
    async getDeviceById(root, { deviceId }, context) {
      setToken(context.token);
      const device = {};

      try {
        const { data: deviceData } = await axios(optionsAxios(UTIL.GET, `/device/${deviceId}`));
        device.id = deviceData.id;
        device.label = deviceData.label;
        device.attrs = [];
        Object.keys(deviceData.attrs).forEach((key) => {
          deviceData.attrs[key].forEach((attr) => {
            if (attr.type !== 'dynamic') { return; }
            device.attrs.push({
              label: attr.label,
              valueType: formatValueType(attr.value_type),
            });
          });
        });
        return (device);
      } catch (error) {
        LOG.error(error.stack || error);
        throw error;
      }
    },

    async getDevices(root, params, context) {
      setToken(context.token);
      // building the request string
      try {
        const requestParameters = {};

        if (params.page) {
          if (params.page.size) {
            requestParameters.page_size = params.page.size;
          } else {
            requestParameters.page_size = 20;
          }
          if (params.page.number) {
            requestParameters.page_num = params.page.number;
          } else {
            requestParameters.page_num = 1;
          }
        }

        if (params.filter) {
          if (params.filter.label) {
            requestParameters.label = params.filter.label;
          }
        }

        let requestString = '/device?';
        const keys = Object.keys(requestParameters);
        const last = keys[keys.length - 1];
        keys.forEach((element) => {
          if (element === last) {
            requestString += `${element}=${requestParameters[element]}`;
          } else {
            requestString += `${element}=${requestParameters[element]}&`;
          }
        });

        const { data: fetchedData } = await axios(optionsAxios(UTIL.GET, requestString));
        const devices = [];

        fetchedData.devices.forEach((device) => {
          const attributes = [];
          if (device.attrs) {
            Object.keys(device.attrs).forEach((key) => {
              device.attrs[key].forEach((attr) => {
                if (attr.type !== 'dynamic') { return; }
                attributes.push({
                  label: attr.label,
                  valueType: formatValueType(attr.value_type),
                });
              });
            });
          }
          devices.push({
            id: device.id,
            label: device.label,
            attrs: attributes,
          });
        });

        const deviceList = ({
          totalPages: fetchedData.pagination.total,
          currentPage: fetchedData.pagination.page,
          devices,
        });

        return deviceList;
      } catch (error) {
        LOG.error(error.stack || error);
        throw error;
      }
    },

    async getDeviceHistory(root, params, context) {
      setToken(context.token);
      const history = [];
      try {
        let queryStringParams = '';

        if (params.filter) {
          if (params.filter.dateFrom) {
            queryStringParams += `dateFrom=${params.filter.dateFrom}&`;
          }

          if (params.filter.dateTo) {
            queryStringParams += `dateTo=${params.filter.dateTo}&`;
          }


          if (params.filter.lastN) {
            queryStringParams += `lastN=${params.filter.lastN}`;
          }
        }

        const historyPromiseArray = [];
        const fetchedData = [];
        const devicePromiseArray = [];
        const devicesInfo = [];

        params.filter.devices.forEach((obj) => {
          if (obj.attrs) {
            obj.attrs.forEach((attr) => {
              let requestString = `/history/device/${obj.deviceID}/history?attr=${attr}`;
              if (queryStringParams != null) {
                requestString += `&${queryStringParams}`;
              }
              const promiseHistory = axios(optionsAxios(UTIL.GET, requestString))
                .catch(() => Promise.resolve(null));
              historyPromiseArray.push(promiseHistory);
            });
          }
          const promiseDevice = axios(optionsAxios(UTIL.GET, `/device/${obj.deviceID}`));
          devicePromiseArray.push(promiseDevice);
        });

        // API calls are made and results are saved in arrays
        await Promise.all(historyPromiseArray).then((values) => {
          Object.keys(values).forEach((keys) => {
            if (values[keys] !== null && values[keys] !== undefined) {
              if (values[keys].data && Array.isArray(values[keys].data)) {
                values[keys].data.forEach((entry) => {
                  fetchedData.push(entry);
                });
              }
            }
          });
        }).catch((error) => {
          LOG.error(error.stack || error);
          throw error;
        });

        await Promise.all(devicePromiseArray).then((values) => {
          Object.keys(values).forEach((keys) => {
            if (values[keys] !== null && values[keys] !== undefined) {
              if (values[keys].data) {
                devicesInfo.push(values[keys].data);
              }
            }
          });
        }).catch((error) => {
          LOG.error(error.stack || error);
          throw error;
        });

        devicesInfo.forEach((deviceObj) => {
          if (deviceObj === null
            || deviceObj === undefined
            || deviceObj.attrs === undefined) { return; }
          // listing device attributes so a  reading's value type can be defined
          const deviceAttributes = {};
          Object.keys(deviceObj.attrs).forEach((key) => {
            deviceObj.attrs[key].forEach((attr) => {
              deviceAttributes[attr.label] = {
                label: attr.label,
                valueType: formatValueType(attr.value_type),
              };
            });
          });

          const readings = [];
          fetchedData.forEach((data) => {
            if (deviceObj.id === data.device_id) {
              readings.push({
                label: data.attr,
                valueType: deviceAttributes[data.attr].valueType,
                value: data.value,
                timestamp: data.ts,
              });
            }
          });

          if (readings.length !== 0) {
            history.push({
              deviceID: deviceObj.id,
              label: deviceObj.label,
              attrs: readings,
            });
          }
        });
      } catch (error) {
        LOG.error(error.stack || error);
        throw error;
      }

      return history;
    },
  },
};


module.exports = Resolvers;
