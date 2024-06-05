import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import instance from 'axios'
import { useOnlineStatus } from 'utils/onlineStatus'
import SkeletonAktivitas from 'components/SkeletonLoading/SkeletonAktivitas'
import Offline from 'components/Offline'
import CardAktivitas from '../search/CardAktivitas'
import { API_URL } from 'config/api'

export const Category = () => {
  // const kategori = data.kategori
  const [kategori, setKategori] = useState([])
  const [itemKategori, setItemKategori] = useState([])
  const [loading, setLoading] = useState(true)
  const isOnline = useOnlineStatus()

  useEffect(() => {
    getData()
    fetchKategori()
  }, [])
  const fetchKategori = async () => {
    const result = await instance.get(`${API_URL}/api/categories`)
    const resultData = await result.data

    console.log(resultData)
  }

  const getData = async () => {
    const data = await instance.get('api/aktivitas?limit=4&urutan=terbaru')
    const response = await data.data

    setItemKategori(response.data)
    setLoading(false)
  }

  async function ChangeCategory(item) {
    setLoading(true)
    const data = await instance.get(`api/aktivitas?limit=4&kategori=${item}`)
    const response = await data.data
    console.log(response)
    setLoading(false)

    setItemKategori(response.data)
  }
  function dayToGo(targetDay) {
    if (/^\d+$/.test(targetDay)) {
      return targetDay + " Hari"
      // const currentDate = new Date()
      // const currDay = currentDate.getDate()
      // currentDate.setDate(currentDate.getDate() + targetDay)

      // // const firstDate = new Date(targetDay)
      // if (!isNaN(currentDate.getTime())) {
      //   const oneDay = 24 * 60 * 60 * 1000
      //   const secondDate = new Date()
      //   const diffDays = Math.round((currentDate - secondDate) / oneDay)
      //   console.log("Calc", diffDays, currentDate, secondDate, oneDay)
      //   if (diffDays <= 0) {
      //     console.log("berakhir")
      //     return 'Berakhir'
      //   }
      //   return diffDays + ' Hari'
      // }

    } else {
      const targetDate = new Date(targetDay);

      const differenceMs = targetDate - Date.now();

      const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));

      const daysLeftString = `${differenceDays} Hari`;
      return daysLeftString;
    }
    // return 'Tanpa batas'

  }

  return (
    <div className="mt-[24px]">
      <div className="flex justify-between mx-5 mb-5">
        <div>
          <p className="text-xl font-semibold text-peduly-dark">
            Aktivitas Terbaru
          </p>
        </div>
        <div className="flex items-center">
          <Link to="/aktivitas">
            <p className="text-peduly-primary text-basic font-semibold">
              Lihat semua
            </p>
          </Link>
        </div>
      </div>

      {/* <div className="hidden mx-5 overflow-x-scroll whitespace-nowrap py-[16px] pr-[20px]">
        {kategori.map((value) => (
          <button
            key={value.id}
            type="button"
            className="h-[41px] py-[5px] px-[35px] border border-solid border-peduly-primary bg-white text-sm text-peduly-primary rounded-full mr-[10px] hover:shadow-md inline-block"
            onClick={() => ChangeCategory(value.id)}
          >
            <div className="flex flex-row content-center">
              <img
                style={{
                  marginRight: '10px',
                  width: '20px',
                }}
                src={value.imgurl}
                alt=""
              />
              {value.title}
            </div>
          </button>
        ))}
      </div> */}

      {isOnline ? (
        <div
          style={{ marginTop: '10px', maxWidth: '430px' }}
          className="mx-[20px]"
        >
          {!loading ? (
            itemKategori.length <= 0 ? (
              <div className="h-[40px] text-center text-base">
                tidak ditemukan
              </div>
            ) : (
              itemKategori.map((value) => (
                <CardAktivitas value={value} />

              ))
            )
          ) : (
            <div className="pb-[24px]">
              {[1, 2, 3, 4].map((i) => (
                <div key={i}>
                  <SkeletonAktivitas />
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div
          style={{ marginTop: '10px', maxWidth: '430px' }}
          className="mx-[20px]"
        >
          <Offline />
        </div>
      )}
    </div>
  )
}
