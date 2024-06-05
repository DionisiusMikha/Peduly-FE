import { Link } from 'react-router-dom'
import { printLocation } from 'utils/textFormat'

function CardAktivitas({ value }) {
  function dayToGo(TargetDay) {
    const firstDate = new Date(TargetDay)
    if (!isNaN(firstDate.getTime())) {
      const oneDay = 24 * 60 * 60 * 1000
      const secondDate = new Date()
      const diffDays = Math.round((firstDate - secondDate) / oneDay)
      if (diffDays <= 0) {
        return 'Berakhir'
      }
      return diffDays + ' Hari'
    }
    return 'Tanpa batas'
  }


  return (
    <div className="mb-6">
      <Link
        to={{
          pathname: `/aktivitas/${value.judul_slug}`,
        }}
      >
        {dayToGo(value.batas_waktu) !== 'Berakhir' &&
          (<div className="flex">
            <img
              src={value.foto_activity}
              alt=""
              className="mr-5"
              style={{
                height: '120px',
                width: '120px',
                objectFit: 'cover',
                borderRadius: '15px',
              }}
              onError={(e) => {
                e.target.onerror = null
                e.target.src = '/images/no-picture.png'
              }}
            />

            <div className="flex-grow block">
              <p className="line-clamp-2 text-left font-semibold text-base text-peduly-dark">
                {value.judul_activity}
              </p>
              <div className="flex mt-3 flex-col">
                <div className="flex">
                  <svg
                    className="mt-1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="14"
                    fill="none"
                    viewBox="0 0 12 14"
                  >
                    <path
                      stroke="#212121"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.875 13a5.252 5.252 0 01-5.25-5.25 5.252 5.252 0 015.25-5.25 5.252 5.252 0 015.25 5.25M5.875 4.6v3"
                    ></path>
                    <path
                      stroke="#212121"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeMiterlimit="10"
                      d="M4.075 1h3.6"
                    ></path>
                    <path
                      stroke="#212121"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.075 10v2.4M8.275 10v2.4"
                    ></path>
                  </svg>
                  {dayToGo(value.batas_waktu) !== 'Berakhir' ?
                    (<p className="text-sm text-peduly-dark ml-[7px] leading-6">
                      Batas Waktu {dayToGo(value.batas_waktu)} lagi  </p>) : (
                      (<p className="text-sm text-peduly-dark ml-[7px] leading-6">
                        Batas Waktu {dayToGo(value.batas_waktu)}</p>)
                    )
                  }
                </div>
                <div className="flex justify-start items-center">
                  <svg width={12} height={14} viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6.02993 7.83415C7.03509 7.83415 7.84993 7.01931 7.84993 6.01415C7.84993 5.00899 7.03509 4.19415 6.02993 4.19415C5.02477 4.19415 4.20993 5.00899 4.20993 6.01415C4.20993 7.01931 5.02477 7.83415 6.02993 7.83415Z" stroke="#212121" />
                    <path d="M1.14161 4.95252C2.29077 -0.0991449 9.77494 -0.0933115 10.9183 4.95835C11.5891 7.92169 9.74577 10.43 8.12994 11.9817C6.95744 13.1134 5.10244 13.1134 3.92411 11.9817C2.31411 10.43 0.470774 7.91585 1.14161 4.95252Z" stroke="#212121" />
                  </svg>
                  <p className="text-sm text-peduly-dark ml-[7px] leading-6">
                    {/* {value.} */}
                    {printLocation(value.lokasi)}
                  </p>
                </div>
              </div>
            </div>
          </div>)
        }

      </Link>
    </div>
  )
}

export default CardAktivitas
