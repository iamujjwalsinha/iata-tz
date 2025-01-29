const { convertToUTC, convertFromUTC, convertBetweenTimezones, getTimezoneOffset } = require('../src/index');

describe('iata-tz', () => {
  // Existing tests
  test('converts JFK local time to UTC', () => {
    const utcTime = convertToUTC('JFK', '2023-07-01 12:00:00');
    expect(utcTime).toBe('2023-07-01 16:00:00'); // EDT (UTC-4)
  });

  test('throws error for invalid IATA code', () => {
    expect(() => convertToUTC('XYZ', '2023-07-01 12:00:00')).toThrow('Invalid IATA code');
  });

  test('throws error for invalid local time', () => {
    expect(() => convertToUTC('JFK', '2023-13-32 25:61:61')).toThrow('Invalid local time');
  });

  // New tests for convertFromUTC
  describe('convertFromUTC', () => {
    test('converts UTC to JFK local time', () => {
      const localTime = convertFromUTC('JFK', '2023-07-01 16:00:00');
      expect(localTime).toBe('2023-07-01 12:00:00'); // EDT (UTC-4)
    });

    test('converts UTC to LAX local time', () => {
      const localTime = convertFromUTC('LAX', '2023-07-01 16:00:00');
      expect(localTime).toBe('2023-07-01 09:00:00'); // PDT (UTC-7)
    });

    test('throws error for invalid IATA code', () => {
      expect(() => convertFromUTC('XYZ', '2023-07-01 16:00:00')).toThrow('Invalid IATA code');
    });

    test('throws error for invalid UTC time', () => {
      expect(() => convertFromUTC('JFK', '2023-13-32 25:61:61')).toThrow('Invalid UTC time');
    });
  });

  // Tests for convertBetweenTimezones
  describe('convertBetweenTimezones', () => {
    test('converts time from JFK to LAX', () => {
      const laxTime = convertBetweenTimezones('JFK', 'LAX', '2023-07-01 12:00:00');
      expect(laxTime).toBe('2023-07-01 09:00:00'); // 3 hours behind
    });

    test('converts time from LAX to LHR', () => {
      const lhrTime = convertBetweenTimezones('LAX', 'LHR', '2023-07-01 12:00:00');
      expect(lhrTime).toBe('2023-07-01 20:00:00'); // 8 hours ahead
    });

    test('throws error for invalid source IATA code', () => {
      expect(() => convertBetweenTimezones('XYZ', 'LAX', '2023-07-01 12:00:00')).toThrow('Invalid source IATA code');
    });

    test('throws error for invalid target IATA code', () => {
      expect(() => convertBetweenTimezones('JFK', 'XYZ', '2023-07-01 12:00:00')).toThrow('Invalid target IATA code');
    });

    test('throws error for invalid source time', () => {
      expect(() => convertBetweenTimezones('JFK', 'LAX', '2023-13-32 25:61:61')).toThrow('Invalid source time');
    });
  });

  // Tests for getTimezoneOffset
  describe('getTimezoneOffset', () => {
    test('gets correct offset for JFK during EDT', () => {
      const offset = getTimezoneOffset('JFK', new Date('2023-07-01'));
      expect(offset).toEqual({
        offsetHours: -4,
        timezone: 'America/New_York',
        isDST: true
      });
    });

    test('gets correct offset for JFK during EST', () => {
      const offset = getTimezoneOffset('JFK', new Date('2023-01-01'));
      expect(offset).toEqual({
        offsetHours: -5,
        timezone: 'America/New_York',
        isDST: false
      });
    });

    test('gets correct offset for LHR during BST', () => {
      const offset = getTimezoneOffset('LHR', new Date('2023-07-01'));
      expect(offset).toEqual({
        offsetHours: 1,
        timezone: 'Europe/London',
        isDST: true
      });
    });

    test('throws error for invalid IATA code', () => {
      expect(() => getTimezoneOffset('XYZ')).toThrow('Invalid IATA code');
    });
  });
});