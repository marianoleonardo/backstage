const axios = require('axios');
const UTIL = require('../utils/AxiosUtils');
const _ = require('lodash');
const moment = require('moment');
const LOG = require('../../utils/Log');

const paramsAxios = {
  token: null,
};
const setToken = ((token) => {
  paramsAxios.token = token;
});
const optionsAxios = ((method, url) => UTIL.optionsAxios(method, url, paramsAxios.token));

const reduceList = (prop, keysList) => {
  const array = [];
  Object.keys(prop).forEach(listKey => {
    array.push(
      prop[listKey].reduce((acc, fItem) => {
        const obj = {...fItem};
        Object.keys(obj).forEach(item => {
          if (_.isEmpty(acc)) {
            acc = Object.assign({}, keysList);
          }
          acc[item] = obj[item];
        });
        return acc;
      }, {}),
    );
  });
  return array;
};

const convertList = list => _.groupBy(list, item => item.timestamp);

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
    async getDeviceById(root, {deviceId}, context) {
      setToken(context.token);
      const device = {};

      try {
        const {data: deviceData} = await axios(optionsAxios(UTIL.GET, `/device/${deviceId}`));
        device.id = deviceData.id;
        device.label = deviceData.label;
        device.attrs = [];
        Object.keys(deviceData.attrs).forEach((key) => {
          deviceData.attrs[key].forEach((attr) => {
            if (attr.type !== 'dynamic') {
              return;
            }
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

        if (!!params.filter) {
          if (!!params.filter.label) {
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

        const {data: fetchedData} = await axios(optionsAxios(UTIL.GET, requestString));
        const devices = [];

        fetchedData.devices.forEach((device) => {
          const attributes = [];
          if (device.attrs) {
            Object.keys(device.attrs).forEach((key) => {
              device.attrs[key].forEach((attr) => {
                if (attr.type !== 'dynamic') {
                  return;
                }
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

    async getDeviceHistory(
      root,
      {filter: {dateFrom = '', dateTo = '', lastN = '', devices = []}},
      context) {
      setToken(context.token);
      const history = [];
      const historyPromiseArray = [];
      const fetchedData = [];
      const devicePromiseArray = [];
      const devicesInfo = [];

      try {
        let queryStringParams = `${dateFrom && `dateFrom=${dateFrom}&`}${dateTo && `dateTo=${dateTo}&`}${lastN && `lastN=${lastN}&`}`;

        devices.forEach((device) => {
          if (device.attrs) {
            device.attrs.forEach((attribute) => {
              let requestString = `/history/device/${device.deviceID}/history?attr=${attribute}`;
              if (!!queryStringParams) {
                requestString += `&${queryStringParams}`;
              }
              const promiseHistory = axios(optionsAxios(UTIL.GET, requestString))
                .catch(() => Promise.resolve(null));
              historyPromiseArray.push(promiseHistory);
            });
          }
          devicePromiseArray.push(axios(optionsAxios(UTIL.GET, `/device/${device.deviceID}`)));
        });

        // Contains the list of attribute values
        await Promise.all(historyPromiseArray).then((values) => {
          Object.keys(values).forEach((keys) => {
            if (!!values[keys] && !!values[keys].data && Array.isArray(values[keys].data)) {
              fetchedData.push(...values[keys].data)
            }
          });
        }).catch((error) => {
          LOG.error(error.stack || error);
          throw error;
        });

        // Contains a list of device details
        await Promise.all(devicePromiseArray).then((device) => {
          Object.keys(device).forEach((keys) => {
            if (!!device[keys] && !!device[keys].data) {
              devicesInfo.push(device[keys].data);
            }
          });
        }).catch((error) => {
          LOG.error(error.stack || error);
          throw error;
        });

        devicesInfo.forEach((deviceObj) => {
          if (!deviceObj || !deviceObj.attrs) {
            return;
          }
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

          if (!!readings.length) {
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

    async getDeviceHistoryForDashboard(
      root,
      {filter: {dateFrom = '', dateTo = '', lastN = '', operationType = 0, devices = []}},
      context) {
      setToken(context.token);
      const history = [];
      const historyPromiseArray = [];
      const fetchedData = [];
      let attributesKey = {['timestamp']: null};
      let queryStringParams = '';

      switch (operationType) {
        case 0:
          // To get the latest N records
          queryStringParams += `${lastN && `&lastN=${lastN}`}`
          break
        case 1:
          // To get the data for the last minutes
          queryStringParams += `&dateFrom=${moment().subtract(lastN, "minute").toISOString()}`
          break
        case 2:
          // To get the data for the last hours
          queryStringParams += `&dateFrom=${moment().subtract(lastN, "hour").toISOString()}`
          break
        case 3:
          // To get the data for the last days
          queryStringParams += `&dateFrom=${moment().subtract(lastN, "days").toISOString()}`
          break
        case 4:
          // To get the data for the last months
          queryStringParams += `&dateFrom=${moment().subtract(lastN, "month").toISOString()}`
          break
        default:
          // Standard option is to get data by time window
          queryStringParams = `${dateFrom && `&dateFrom=${dateFrom}`}${dateTo && `&dateTo=${dateTo}`}`;
          break
      }
      //console.log(queryStringParams);

      try {
        devices.forEach((device) => {
          if (device.attrs) {
            device.attrs.forEach((attribute) => {
              attributesKey[[`${device.deviceID}${attribute}`]] = null;
              const requestString = `/history/device/${device.deviceID}/history?attr=${attribute}${queryStringParams ? `${queryStringParams}` : ''}`;
              const promiseHistory = axios(optionsAxios(UTIL.GET, requestString))
                .catch(() => Promise.resolve(null));
              historyPromiseArray.push(promiseHistory);
            });
          }
        });

        // Contains the list of attribute values
        await Promise.all(historyPromiseArray).then((values) => {
          Object.keys(values).forEach((keys) => {
            if (!!values[keys] && !!values[keys].data && Array.isArray(values[keys].data)) {
              fetchedData.push(...values[keys].data)
            }
          });
        }).catch((error) => {
          LOG.error(error.stack || error);
          throw error;
        });

        fetchedData.forEach((data) => {
          const {attr, device_id, value, ts} = data;
          history.push({
            [`${device_id}${attr}`]: value,
            timestamp: ts.substring(0, ts.length - 8),
          });
        });

      } catch (error) {
        LOG.error(error.stack || error);
        throw error;
      }
      return JSON.stringify(reduceList(convertList(history), attributesKey));
    },
  },
};


module.exports = Resolvers;
