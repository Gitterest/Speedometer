export function convertSpeed(ms, unit = 'kmh') {
  return unit === 'mph' ? ms * 2.23694 : ms * 3.6
}
