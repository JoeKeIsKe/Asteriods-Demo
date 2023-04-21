export function formatTime(date) {
  if (!date) return '- -'
  return date.replace('T', ' ').split('.')[0] || '- -' 
}