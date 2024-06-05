import { useState, useEffect, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import instance from 'axios'
import { useOnlineStatus } from 'utils/onlineStatus'
import SkeletonAktivitas from 'components/SkeletonLoading/SkeletonAktivitas'
import Offline from 'components/Offline'
import { getToken } from 'utils/cookiesHooks'
import { setIdTransaksi } from 'utils/cookiesHooks';
import { UserContext } from 'context/UserContext'

const RiwayatAktivitas = () => {
  const [itemKategori, setItemKategori] = useState([])
  const [loading, setLoading] = useState(true)
  const [listRiwayat, setListRiwayat] = useState([])
  const isOnline = useOnlineStatus()
  const userData = useContext(UserContext)
  console.log("userData", userData.user)
  // const { id } = useParams()

  useEffect(() => {
    if (userData) {
      getData()
    }
  }, [userData])

  const getData = async () => {
    const token = getToken(); // Pastikan fungsi getToken sudah didefinisikan dan mengembalikan token
    if (!token || !userData.user.id) return
    const data = await instance.get(`api/donation/riwayat/${userData.user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const response = await data.data
    console.log("response", response)
    // console.log(response);
    setItemKategori(response)
    setLoading(false)
  }

  function dayToGo(TargetDay) {
    const firstDate = new Date(TargetDay);
    const secondDate = new Date();

    const timeDiff = secondDate - firstDate;
    if (isNaN(firstDate.getTime())) {
      return 'Tanpa batas';
    }

    // if (timeDiff < 0) {
    //   return 'Berakhir';
    // }
    const seconds = Math.floor(timeDiff / (1000));
    const minutes = Math.floor(timeDiff / (1000 * 60));
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

    if (seconds < 60) {
      return seconds + ' Detik';
    } else if (minutes < 60) {
      return minutes + ' Menit';
    } else if (hours < 24) {
      return hours + ' Jam';
    } else {
      return days + ' Hari';
    }
  }

  const splitInDots = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <div className="mt-[32px] max-w-[430px]">
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
              itemKategori.slice().reverse().map((value) => (
                <div key={value.id} className="mb-6">
                  <Link
                    to={{
                      pathname: `/aktivitas/${value.judul_slug}/pembayaran/status/${value.id}`,
                    }}
                    className="flex"
                  >
                    <div className="flex">
                      <img
                        src={value.foto_activity}
                        alt=""
                        className="mr-5 my-auto"
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

                      <div className="block" style={{ maxWidth: '430px' }}>
                        <p className="line-clamp-1 text-left font-semibold text-base text-peduly-dark">
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
                            <p className="text-xs text-peduly-dark ml-[7px] leading-6">
                              {dayToGo(value.created_at)} yang lalu{' '}
                            </p>
                          </div>
                          <div className="flex justify-start items-center">
                            <svg
                              width={12}
                              height={14}
                              viewBox="0 0 12 14"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6.02993 7.83415C7.03509 7.83415 7.84993 7.01931 7.84993 6.01415C7.84993 5.00899 7.03509 4.19415 6.02993 4.19415C5.02477 4.19415 4.20993 5.00899 4.20993 6.01415C4.20993 7.01931 5.02477 7.83415 6.02993 7.83415Z"
                                stroke="#212121"
                              />
                              <path
                                d="M1.14161 4.95252C2.29077 -0.0991449 9.77494 -0.0933115 10.9183 4.95835C11.5891 7.92169 9.74577 10.43 8.12994 11.9817C6.95744 13.1134 5.10244 13.1134 3.92411 11.9817C2.31411 10.43 0.470774 7.91585 1.14161 4.95252Z"
                                stroke="#212121"
                              />
                            </svg>
                            <p className="text-xs text-peduly-dark ml-[7px] leading-6">
                              Rp {splitInDots(value.donasi)}
                            </p>
                          </div>
                          <div className="flex justify-start items-center">
                            {value.status_donasi === 'Approved' && (
                              <span className="inline-block bg-[#34A85333] text-[#34A853] text-xs mt-2 px-4 py-[2px] bottom-0 rounded-lg">
                                Berhasil
                              </span>
                            )}
                            {value.status_donasi === 'Pending' && (
                              <span className="inline-block bg-[#FCAE0333] text-[#FCAE03] text-xs mt-2 px-4 py-[2px] bottom-0 rounded-lg">
                                Pending
                              </span>
                            )}
                            {value.status_donasi === 'Rejected' && (
                              <span className="inline-block bg-[#E7513B33] text-[#C41230] text-xs mt-2 px-4 py-[2px] bottom-0 rounded-lg">
                                Dibatalkan
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
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

export default RiwayatAktivitas
