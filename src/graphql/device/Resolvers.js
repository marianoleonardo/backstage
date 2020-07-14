const axios = require('axios');
const UTIL = require('../utils/AxiosUtils');
const LOG = require('../../utils/Log');

const params = {
  token: null,
};
const setToken = ((token) => {
  params.token = token;
});
const optionsAxios = ((method, url) => UTIL.optionsAxios(method, url, params.token));

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
      } catch (err) {
        LOG.error(err);
        throw err;
      }
    },

    async getDevices(root, params, context) {
      setToken(context.token);
      // building the request string
      const requestParameters = {};
      if (params.hasOwnProperty('page') && params.page.size !== null) {
        requestParameters.page_size = params.page.size;
      } else {
        requestParameters.page_size = 20;
      }
      if (params.hasOwnProperty('page') && params.page.number !== null) {
        requestParameters.page_num = params.page.number;
      } else {
        requestParameters.page_num = 1;
      }
      if (params.hasOwnProperty('filter') && params.filter.label !== null) {
        requestParameters.label = params.filter.label;
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
      try {
        const { data: fetchedData } = await axios(optionsAxios(UTIL.GET, requestString));
        const devices = [];

        fetchedData.devices.forEach((device) => {
          const attributes = [];
          const keys = Object.keys(device.attrs);
          keys.forEach((key) => {
            device.attrs[key].forEach((attr) => {
              if (attr.type !== 'dynamic') { return; }
              attributes.push({
                label: attr.label,
                valueType: formatValueType(attr.value_type),
              });
            });
          });
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
        LOG.error(error);
        throw error;
      }
    },

    async getDeviceHistory(root, params, context) {
      setToken(context.token);
      const history = [];
      const keys = Object.keys(params.filter);
      // removing element "devices" from list so it isn't appended to requestString
      const index = keys.indexOf('devices');
      keys.splice(index, 1);
      const requestStringPt1 = '/history/device/';
      const requestStringPt2 = '/history';

      // if (keys.length !== 0) {
      //   requestStringPt2 += '?';
      //   keys.forEach((element) => {
      //     requestStringPt2 += `${element}=${params.filter[element]}&`;
      //   });
      // }

      const historyPromiseArray = [];
      const fetchedData = [];
      const devicePromiseArray = [];
      const devicesInfo = [];

      params.filter.devices.forEach((obj) => {
        // if (obj && obj.attrs) {
        if (!obj.attrs) {
          const requestString = `${requestStringPt1}${obj.deviceID}${requestStringPt2}`;
          const promiseHistory = axios(optionsAxios(UTIL.GET, requestString)).catch((err) => {
            LOG.error(`Device id ${obj.id}: ${err}`);
            return Promise.resolve(null);
          });
          historyPromiseArray.push(promiseHistory);
        } else {
          obj.attrs.forEach((attr) => {
            const requestString = `${requestStringPt1}${obj.deviceID}${requestStringPt2}?attr=${attr}`;
            const promiseHistory = axios(optionsAxios(UTIL.GET, requestString)).catch((err) => {
              LOG.error(`Device id ${obj.id}: ${err}`);
              return Promise.resolve(null);
            });
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
        LOG.error(`${error}`);
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
        LOG.error(error);
        throw error;
      });
      try {
        devicesInfo.forEach((deviceObj) => {
          if (deviceObj === null || deviceObj === undefined || deviceObj.attrs === undefined) { return; }
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
        //  }
      } catch (error) {
        LOG.error(error);
        throw error;
      }

      return history;
    },
  },
};


module.exports = Resolvers;
