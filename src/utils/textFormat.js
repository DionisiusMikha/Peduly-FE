export const printLocation = (location) => {
  if (!location) return '-'
  const words = location.split(' ')
  const capitalWords = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  })
  return capitalWords.join(' ')
}
