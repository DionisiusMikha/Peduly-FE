import moment from 'moment'

function formatDate(tanggal) {
    return moment(tanggal, 'YYYY/MM/DD').format('d MMMM YYYY')
}

export default formatDate