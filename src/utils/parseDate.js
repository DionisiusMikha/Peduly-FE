const namaBulan = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
]
const parseDateIndonesia = (stringDate) => {
  const date = new Date(stringDate)
  return `${date.getDate()} ${namaBulan[date.getMonth()]} ${date.getFullYear()}`
}
export { parseDateIndonesia }
