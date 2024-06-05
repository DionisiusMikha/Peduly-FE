import BerhasilLogo from '../berhasil.json'
import { useEffect, useContext, useState } from 'react'
import Lottie from 'lottie-react'
import { Redirect, useHistory } from 'react-router-dom'
import { fetcher } from 'config/axiosHooks'

import {
  getBuatAktivitasBerhasil,
  removeBuatAktivitasBerhasil,
  getIdTransaksi,
} from 'utils/cookiesHooks'

const BayarBerhasil = () => {
  const history = useHistory()
  const [dataTransaksi, setDataTransaksi] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)

  const getDetailTransaksi = async () => {
    // const idTranksaksi = 'INVO17031492057186'
    await fetcher(`api/donation/transaction/${getIdTransaksi()}`)
    // await fetcher(`api/donation/transaction/${idTranksaksi}`)
      .then(
        (res) =>
          setDataTransaksi(
            res.data.data.metode_pembayaran
              ? res.data.data
              : res.data.data.donasi
          ) & setIsLoading(false)
      )
      .catch(() => setError(false))
  }

  useEffect(() => {
    if (getBuatAktivitasBerhasil() === 'sukses') {
      removeBuatAktivitasBerhasil()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  if (!getBuatAktivitasBerhasil()) {
    return <Redirect to="/" />
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <div className="mx-[30px]">
        <div className="w-full mt-32 justify-center flex align-middle">
        <Lottie animationData={BerhasilLogo}/>
        </div>
        <div className="mt-8 flex justify-center mx-auto">
          <span className="text-2xl font-semibold text-peduly-primary">
            Berhasil Bayar Aktivitas
          </span>
        </div>
        {/* <div className="mt-4 flex justify-center mx-auto text-gray-400 text-center w-[232px]">
          <p className="text-[14px]">{location.state.P1}</p>
        </div> */}
        <div
          className="fixed z-10 bottom-5 w-full max-w-[430px] px-5 flex justify-center"
          style={{ left: '50%', transform: 'translateX(-50%)' }}
        >
          <button
            className="bg-peduly-primary text-white w-full font-bold rounded-full text-[18px] py-[18px] h-[60px]"
            onClick={() => {
              history.push('/')
            }}
          >
            Kembali Ke Beranda
          </button>
        </div>
      </div>
    </div>
  )
}

export default BayarBerhasil
