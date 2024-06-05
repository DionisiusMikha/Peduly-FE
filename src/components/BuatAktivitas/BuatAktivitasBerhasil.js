import BerhasilLogo from '../berhasil.json'
import Lottie from 'lottie-react'
import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
  getBuatAktivitasBerhasil,
  removeBuatAktivitasBerhasil,
} from 'utils/cookiesHooks'

const BuatAktivitasBerhasil = () => {
  const history = useHistory()

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
            Aktivitas Berhasil Dibuat
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

export default BuatAktivitasBerhasil
