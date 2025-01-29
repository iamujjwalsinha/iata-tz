const moment = require('moment-timezone');
const airports = require('./airports.json');

function convertToUTC(iataCode, localTime) {
  const timezone = airports[iataCode.toUpperCase()];
  if (!timezone) {
    throw new Error(`Invalid IATA code: ${iataCode}`);
  }

  const localMoment = moment.tz(localTime, 'YYYY-MM-DD HH:mm:ss', timezone);
  if (!localMoment.isValid()) {
    throw new Error(`Invalid local time: ${localTime}`);
  }

  return localMoment.utc().format('YYYY-MM-DD HH:mm:ss');
}

function convertFromUTC(iataCode, utcTime) {
  const timezone = airports[iataCode.toUpperCase()];
  if (!timezone) {
    throw new Error(`Invalid IATA code: ${iataCode}`);
  }

  const utcMoment = moment.utc(utcTime, 'YYYY-MM-DD HH:mm:ss');
  if (!utcMoment.isValid()) {
    throw new Error(`Invalid UTC time: ${utcTime}`);
  }

  return utcMoment.tz(timezone).format('YYYY-MM-DD HH:mm:ss');
}

function convertBetweenTimezones(sourceIATA, targetIATA, sourceTime) {
  const sourceTimezone = airports[sourceIATA.toUpperCase()];
  const targetTimezone = airports[targetIATA.toUpperCase()];
  
  if (!sourceTimezone) {
    throw new Error(`Invalid source IATA code: ${sourceIATA}`);
  }
  if (!targetTimezone) {
    throw new Error(`Invalid target IATA code: ${targetIATA}`);
  }

  const sourceMoment = moment.tz(sourceTime, 'YYYY-MM-DD HH:mm:ss', sourceTimezone);
  if (!sourceMoment.isValid()) {
    throw new Error(`Invalid source time: ${sourceTime}`);
  }

  return sourceMoment.tz(targetTimezone).format('YYYY-MM-DD HH:mm:ss');
}

function getTimezoneOffset(iataCode, date = new Date()) {
  const timezone = airports[iataCode.toUpperCase()];
  if (!timezone) {
    throw new Error(`Invalid IATA code: ${iataCode}`);
  }

  const momentDate = moment.tz(date, timezone);
  return {
    offsetHours: momentDate.utcOffset() / 60,
    timezone: timezone,
    isDST: momentDate.isDST()
  };
}

module.exports = {
  convertToUTC,
  convertFromUTC,
  convertBetweenTimezones,
  getTimezoneOffset
};