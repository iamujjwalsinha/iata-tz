# iata-tz

<p align="center">
  <picture>
    <img alt="iata-tz: A robust Node.js module for airport timezone conversion" src="./iata-tz.svg">
  </picture>
  <br>
  <a href="#">Website</a> |
  <a href="#">Getting Started</a> |
  <a href="#">Documentation</a> |
  <a href="#">API Reference</a> |
  <a href="#">Contributing</a>
</p>

## ✈️ Overview

`iata-tz` is a robust Node.js module for converting times between airport timezones using IATA codes. It provides accurate conversions between UTC and local airport times, handles daylight saving time (DST) automatically, and supports all major airports worldwide.

## 🚀 Installation

```bash
npm install iata-tz
```

## 🔥 Features

- ✅ Convert local airport time to UTC  
- ✅ Convert UTC to local airport time  
- ✅ Convert times between different airport timezones  
- ✅ Get timezone offset information for airports  
- ✅ Automatic handling of Daylight Saving Time (DST)  
- ✅ Supports all major airports worldwide  

## 🛠️ Usage

```javascript
const { convertToUTC, convertFromUTC, convertBetweenTimezones, getTimezoneOffset } = require('iata-tz');

// Convert local time to UTC
const utcTime = convertToUTC('JFK', '2024-01-29 14:30:00');
console.log(utcTime); // '2024-01-29 19:30:00'

// Convert UTC to local time
const localTime = convertFromUTC('LAX', '2024-01-29 19:30:00');
console.log(localTime); // '2024-01-29 11:30:00'

// Convert time between two airports
const convertedTime = convertBetweenTimezones(
  'JFK',  // source airport
  'LAX',  // target airport
  '2024-01-29 14:30:00'  // time in JFK
);
console.log(convertedTime); // '2024-01-29 11:30:00'

// Get timezone information
const tzInfo = getTimezoneOffset('JFK');
console.log(tzInfo);
// Output:
// {
//   offsetHours: -5,
//   timezone: 'America/New_York',
//   isDST: false
// }
```

## 📖 API Reference

### `convertToUTC(iataCode, localTime)`
Converts local time at an airport to UTC.

- **iataCode** (string): IATA airport code (e.g., 'JFK', 'LAX')  
- **localTime** (string): Local time in `'YYYY-MM-DD HH:mm:ss'` format  
- **Returns**: UTC time string in `'YYYY-MM-DD HH:mm:ss'` format  

---

### `convertFromUTC(iataCode, utcTime)`
Converts UTC time to local time at an airport.

- **iataCode** (string): IATA airport code  
- **utcTime** (string): UTC time in `'YYYY-MM-DD HH:mm:ss'` format  
- **Returns**: Local time string in `'YYYY-MM-DD HH:mm:ss'` format  

---

### `convertBetweenTimezones(sourceIATA, targetIATA, sourceTime)`
Converts time between two airport timezones.

- **sourceIATA** (string): Source airport IATA code  
- **targetIATA** (string): Target airport IATA code  
- **sourceTime** (string): Source time in `'YYYY-MM-DD HH:mm:ss'` format  
- **Returns**: Target time string in `'YYYY-MM-DD HH:mm:ss'` format  

---

### `getTimezoneOffset(iataCode, [date])`
Gets timezone information for an airport.

- **iataCode** (string): IATA airport code  
- **date** (Date, optional): Date to check offset for (defaults to current date)  
- **Returns**: Object containing offset information:
  - `offsetHours` (number): Offset from UTC in hours  
  - `timezone` (string): Timezone name  
  - `isDST` (boolean): Whether DST is in effect  

## ⚠️ Error Handling

All functions will throw an `Error` if:  
- ❌ An invalid IATA code is provided  
- ❌ An invalid time format is used  
- ❌ An invalid timezone conversion is attempted  

## 📦 Dependencies

- `moment-timezone` for reliable timezone calculations  

## 📜 License

MIT  

## 🛠️ Contributing

1. **Fork** the repository  
2. **Create** your feature branch (`git checkout -b feature/amazing-feature`)  
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)  
4. **Push** to the branch (`git push origin feature/amazing-feature`)  
5. **Open** a Pull Request  
