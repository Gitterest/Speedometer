export default function convertSpeed(ms: number, unit: 'kmh' | 'mph' = 'kmh'): number {
  return unit === 'mph' ? ms * 2.23694 : ms * 3.6;
}
