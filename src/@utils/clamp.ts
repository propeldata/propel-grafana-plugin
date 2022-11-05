export default function clamp (min: number, n: any, max: number): number {
  if (!isNaN(n)) {
    if (min < Number(n) && Number(n) < max) return Number(n)
    if (min > Number(n)) return min
    return max
  } else {
    return min
  }
}
