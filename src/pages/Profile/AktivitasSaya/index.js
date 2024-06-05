import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BackButton from 'components/BackButton'
import NavLink from 'components/Navbar'
import NavAktivitasMenu from 'components/NavAktivitas/NavAktivitasMenu'
import SkeletonAktivitas from 'components/SkeletonLoading/SkeletonAktivitas'
import { API_URL } from 'config/api'
import { fetcher } from 'config/axiosHooks'
import { useOnlineStatus } from 'utils/onlineStatus'
import Offline from 'components/Offline'

const AktivitasSaya = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const isOnline = useOnlineStatus()

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    await fetcher(`${API_URL}/api/aktivitassaya`, {
      method: 'GET',
    })
      .then((res) => {
        setLoading(false)
        setData(res.data.data)
        console.log(res.data.data)
        // setData(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  // console.log(data);

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <NavLink />
      <NavAktivitasMenu />
      <BackButton hrf={'1'} txt="Buat Aktivitas" />
      <div className="my-[72px]">
        {isOnline ? (
          <>
            {!loading ? (
              data.length <= 0 ? (
                <div
                  className="grid place-content-center"
                  style={{ height: 'calc(100vh - 126px)' }}
                >
                  <p className="text-peduly-subtitle">
                    Belum ada aktivitas yang kamu buat
                  </p>
                </div>
              ) : (
                <div className="pt-3 mx-5">
                  {data.slice().reverse().map((value) => (
                    <div key={value.id} className="mb-6">
                      <Link
                        to={{
                          pathname: `/aktivitas/${value.judul_slug}`,
                        }}
                      >
                        <div className="flex">
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
                            <div className="flex mt-3">
                              <div className="flex">
                                <svg
                                  className="mt-1"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="13"
                                  height="14"
                                  fill="none"
                                  viewBox="0 0 13 14"
                                >
                                  <path
                                    stroke="#212121"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6.623 7C8.43 7 9.895 5.657 9.895 4S8.43 1 6.623 1C4.815 1 3.35 2.343 3.35 4s1.465 3 3.273 3zM12.245 13c0-2.322-2.52-4.2-5.622-4.2C3.52 8.8 1 10.678 1 13"
                                  ></path>
                                </svg>
                                <p className="text-sm text-peduly-dark ml-[7px] leading-6">
                                  Pendaftar <br /> {value.total_volunteer} Orang
                                </p>
                              </div>
                              <div className="flex ml-6">
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
                                <p className="text-sm text-peduly-dark ml-[7px] leading-6">
                                  Batas Waktu <br />{' '}
                                  {dayToGo(value.batas_waktu)}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <div className="pt-[1px] mx-5">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div key={i}>
                    <SkeletonAktivitas />
                  </div>
                ))}
                <span className="opacity-0 cursor-default">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
                  consequuntur!
                </span>
              </div>
            )}
          </>
        ) : (
          <div className="pt-3 mx-5">
            <Offline />
          </div>
        )}
      </div>
    </div>
  )
}

export default AktivitasSaya
