import { speedToAngle } from '../speedToAngle'

test('converts speed proportionally to angle', () => {
  expect(speedToAngle(0, 100, -90, 90)).toBe(-90)
  expect(speedToAngle(50, 100, -90, 90)).toBe(0)
  expect(speedToAngle(100, 100, -90, 90)).toBe(90)
})
