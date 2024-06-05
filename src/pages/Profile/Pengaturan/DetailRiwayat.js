import axios from 'axios'
import { API_URL } from 'config/api'
import { useState, useEffect, useContext } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useCountdown } from '../../../hooks/useCountdown'
import IdrFormat from 'utils/IdrFormat'
import Spinner from 'components/loaders/Spinner'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { getToken, setIdTransaksi } from 'utils/cookiesHooks'
import NotFound from 'pages/NotFound'
import { UserContext } from 'context/UserContext'
import BackButton from 'components/BackButton'

const DetailRiwayat = ({ location }) => {
  const [detailRiwayat, setDetailRiwayat] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const { slug, id } = useParams()
  // const id = location.state.id
  // const idUser = location.state.idUser
  const history = useHistory()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    getData()
  }, [])

  const getData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/donation/histories/${id}/details`, {
        headers: {
          "Authorization": "Bearer " + getToken()
        }
      });
      if (response.status === 401) {
        history.push('/')
      }

      setDetailRiwayat(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleLinkClick = (detailRiwayat) => {
    // Fungsi untuk mengatur ID transaksi
    setIdTransaksi(detailRiwayat.kode_donasi);
    // history.push({
    //   pathname: `/aktivitas/${detailRiwayat.judul_slug}/pembayaran`,
    // })
  };

  const handleButtonClick = () => {
    history.push('/aktivitas');
  };

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

  const splitInDots = (numberString) => {
    if (typeof numberString === 'string') {
      return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    // Handle the case where numberString is not a string (or undefined)
    return "";
  };

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes} WIB`;
  };

  const skeleton_sub = {
    height: '20px',
    marginTop: '-8px',
  }
  const skeleton_title = {
    height: '20px',
    marginTop: '-8px',
    marginLeft: '10px'
  }
  const square_skeleton = {
    height: '120px',
    borderRadius: '15px',
  }

  if (error) {
    return <NotFound />
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[430px] h-screen flex items-center justify-center">
        <Spinner color="#c41230" />
      </div>
    )
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <div className="fixed z-20 top-0 bg-white" style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 5px 5px -5px' }}>
        <BackButton hrf={`/profile`} txt="Riwayat Aktivitas" />
      </div>
      {loading ? (
        <div>
          <div className="text-center mt-[94px]">
            <h1 className="text-[18px] leading-[24.51px] font-medium mx-[40px]">
              <Skeleton count={1} style={skeleton_sub} />
            </h1>
            <p className="font-medium text-[12px] leading-[19.2px] text-[#717171] mt-[12px] mx-[20px]">
              <Skeleton count={1} style={skeleton_sub} />
            </p>
          </div>
        </div>
      ) : (
        <div>
          {detailRiwayat.status_donasi === 'Approved' && (
            <div className="text-center mt-[94px]">
              <h1 className="text-[18px] leading-[24.51px] font-medium">Aktivitas berhasil dibayar</h1>
              <p className="font-medium text-[12px] leading-[19.2px] text-[#717171] mt-[12px]">
                Cek email kamu untuk mendapat info selanjutnya
              </p>
            </div>
          )}
          {detailRiwayat.status_donasi === 'Pending' && (
            <div style={{ marginTop: '70px' }}>
              <div className='text-center'>
                <h3 className="text-[18px] font-medium leading-[24.51px] mt-[94px]">
                  Menunggu pembayaran
                </h3>
                <p className="text-[12px] font-medium leading-[19.2px] text-[#717171] mt-[12px]">
                  Segera lakukan pembayaran sebelum
                </p>
                <p className="text-[12px] font-medium leading-[19.2px] mt-[4px]">
                  {formatDate(detailRiwayat.deadline)}
                </p>
                <hr className="hr-bold  mx-[20px] mt-[18px]" />
              </div>
              <Link
                to={`/aktivitas/${slug}/pembayaran/${detailRiwayat.kode_donasi}`}
                // to={`/aktivitas/${detailRiwayat.judul_slug}/pembayaran`} 
                className="flex items-center justify-center my-[18px]"
                onClick={() => handleLinkClick(detailRiwayat)}>
                <p class="text-[12px] font-medium leading-[19.2px] text-peduly-primary">Lihat instruksi pembayaran</p>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.19751 11.62L9.00084 7.81667C9.45001 7.3675 9.45001 6.6325 9.00084 6.18334L5.19751 2.38" stroke="#c41230" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
              </Link>
              <hr class="border-b-[2px] border-[#E4E4E4]" />
            </div>
          )}
          {detailRiwayat.status_donasi === 'Rejected' && (
            <div className="text-center mt-[94px]">
              <h1 className="text-[18px] leading-[24.51px] font-medium">Transaksi Dibatalkan</h1>
              <p className="font-medium text-[12px] leading-[19.2px] text-[#717171] mt-[12px]">
                Transaksi dibatalkan karena batas waktu telah berakhir
              </p>
            </div>
          )}
        </div>
      )}
      <div className="mx-[20px] py-[20px]">
        {loading ? (
          <div className="grid grid-cols-12 gap-4" style={{ marginBottom: '5px', marginTop: '10px' }}>
            <div className="col-span-6">
              <Skeleton style={square_skeleton} />
            </div>
            <div className="col-span-6">
              <Skeleton count={1} style={skeleton_sub} />
              <div className="grid grid-cols-6 text-[#717171] text-[10px]" style={{ marginTop: '5px' }}>
                <p className="col-span-3 font-normal text-[#717171] line-clamp-2 me-2">
                  <Skeleton count={1} style={skeleton_sub} />
                </p>
                <p className="col-span-3 font-normal text-[#717171] truncate">
                  <Skeleton count={1} style={skeleton_sub} />
                </p>
              </div>
              <div className="mt-[10px]">
                <Skeleton count={1} style={skeleton_sub} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4" style={{ marginBottom: '5px', marginTop: '10px' }}>
            <div className="col-span-6">
              <img src={detailRiwayat.foto_activity} alt="" className="w-full h-full"
                style={{
                  height: '121px', objectFit: 'cover', borderRadius: '15px'
                }}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/images/no-picture.png'
                }} />
            </div>
            <div className="col-span-6">
              <p className="text-left line-clamp-2 font-normal text-base">{detailRiwayat.judul_activity}</p>
              <div className="grid grid-cols-6 text-[#717171] text-[10px]" style={{ marginTop: '5px' }}>
                <p className="col-span-3 font-normal text-[#717171] line-clamp-2">
                  {dayToGo(detailRiwayat.created_at)} yang lalu{' '}
                </p>
                <p className="col-span-3 font-normal text-[#717171] truncate">
                  • Rp {splitInDots(detailRiwayat.donasi)}
                </p>
              </div>
              <div className="mt-[10px] ml-[5px]">
                {detailRiwayat.status_donasi === 'Approved' && (
                  <span className="inline-block bg-[#34A85333] text-[#34A853] text-xs mt-2 py-[8px] px-[10px] rounded-[30px]">
                    Berhasil
                  </span>
                )}
                {detailRiwayat.status_donasi === 'Pending' && (
                  <span className="inline-block bg-[#FCAE0333] text-[#FCAE03] text-xs mt-2 py-[8px] px-[10px] rounded-[30px]">
                    Pending
                  </span>
                )}
                {detailRiwayat.status_donasi === 'Rejected' && (
                  <span className="inline-block bg-[#E7513B33] text-[#C41230] text-xs mt-2 py-[8px] px-[10px] rounded-[30px]">
                    Dibatalkan
                  </span>
                )}
                {/* <span className="bg-[#FCAE03] text-white font-semibold text-[10px] leading-4 py-[8px] px-[10px] rounded-[30px]">
                  Pending
                </span> */}
              </div>
            </div>
          </div>
        )}
      </div>
      <hr class="border-b-[2px] border-[#E4E4E4]" />
      {loading ? (
        <div className="mx-[20px] text-[14px] font-normal leading-[19.07px]">
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5 pe-5"><Skeleton count={1} style={skeleton_title} /></p>
            <p className="col-span-7"><Skeleton count={1} style={skeleton_sub} /></p>
          </div>
          <hr />
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5 pe-5"><Skeleton count={1} style={skeleton_title} /></p>
            <p className="col-span-7"><Skeleton count={1} style={skeleton_sub} /></p>
          </div>
          <hr />
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5 pe-5"><Skeleton count={1} style={skeleton_title} /></p>
            <p className="col-span-7"><Skeleton count={1} style={skeleton_sub} /></p>
          </div>
          <hr />
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5 pe-5"><Skeleton count={1} style={skeleton_title} /></p>
            <p className="col-span-7"><Skeleton count={1} style={skeleton_sub} /></p>
          </div>
          <hr />
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5 pe-5"><Skeleton count={1} style={skeleton_title} /></p>
            <p className="col-span-7"><Skeleton count={1} style={skeleton_sub} /></p>
          </div>
        </div>
      ) : (
        <div className="mx-[20px] text-[14px] font-normal leading-[19.07px]">
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5">Tanggal</p>
            <p className="col-span-7">{formatDate(detailRiwayat.created_at)}</p>
          </div>
          <hr />
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5">Metode</p>
            <p className="col-span-7">{detailRiwayat.metode_pembayaran}</p>
          </div>
          <hr />
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5">ID donasi</p>
            <p className="col-span-7">{detailRiwayat.kode_donasi}</p>
          </div>
          <hr />
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5">Status</p>
            <p className="col-span-7">{detailRiwayat.status_donasi}</p>
          </div>
          <hr />
          <div className="grid grid-cols-12 h-[61px] items-center mx-[7px]">
            <p className="col-span-5">Harga</p>
            <p className="col-span-7">Rp {splitInDots(detailRiwayat.donasi)}</p>
          </div>
        </div>
      )}

      <hr class="border-b-[2px] border-[#E4E4E4]" />
      <div className="flex justify-center mx-[20px] mt-[24px] mb-[44px]">
        <button
          className="bg-peduly-primary text-white w-full font-bold rounded-full text-[18px] py-[18px] h-[60px]"
          onClick={handleButtonClick}>
          Daftar Aktivitas Lainnya
        </button>
      </div>
    </div>
  )
}

export default DetailRiwayat
