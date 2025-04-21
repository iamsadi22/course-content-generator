export const formatTimestamp = (timestamp) => {
  if (!timestamp) return ""

  const date = new Date(timestamp)
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // Format as HH:MM AM/PM
  return `${hours % 12 || 12}:${minutes.toString().padStart(2, "0")} ${hours >= 12 ? "PM" : "AM"}`
}
