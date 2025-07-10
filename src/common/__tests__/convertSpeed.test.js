import { convertSpeed } from '../convertSpeed'

test('converts meters per second to km/h and mph', () => {
  expect(convertSpeed(1, 'kmh')).toBeCloseTo(3.6)
  expect(convertSpeed(1, 'mph')).toBeCloseTo(2.23694)
})
