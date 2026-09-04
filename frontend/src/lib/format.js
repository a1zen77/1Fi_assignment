export function formatINR(amount) {
  return `₹${Number(amount).toLocaleString('en-IN')}`
}