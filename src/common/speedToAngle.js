export function speedToAngle(speed, max, start, end) {
  const clamped = Math.min(speed, max)
  const range = end - start
  return start + (clamped / max) * range
}
