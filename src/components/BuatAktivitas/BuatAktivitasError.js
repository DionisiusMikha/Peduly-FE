import GagalLogo from '../Akun/gagal.json'
import Lottie from 'lottie-react'
import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
  getBuatAktivitasError,
  removeBuatAktivitasError,
} from 'utils/cookiesHooks'

const BuatAktivitasError = ({location}) => {
  const history = useHistory()

  useEffect(() => {
    if (getBuatAktivitasError() === 'sukses') {
      removeBuatAktivitasError()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

//   if (!getBuatAktivitasError()) {
//     return <Redirect to="/" />
//   }

return (
  <div className="mx-auto" style={{ maxWidth: '430px' }}>
    <div className="mx-[30px]">
      <div className="h-[150px] w-full mt-32 justify-center flex align-middle">
        <Lottie animationData={GagalLogo}/>
      </div>
      <div className="mt-14 flex justify-center mx-auto w-full">
        <span className="text-[32px] font-semibold leading-4">
          {location.state.H1}
        </span>
      </div>
      <div className="mt-4 flex justify-center mx-auto text-gray-400 text-center w-[232px]">
        <p className="text-[14px]">{location.state.P1}</p>
      </div>
      <div className="w-full flex justify-center mt-40">
        <button
          className="bg-peduly-primary text-white w-full font-bold rounded-full text-[18px] py-[18px] h-[60px]"
          onClick={() => {
            history.push(`/`)
          }}
        >
          Kembali Ke Beranda
        </button>
      </div>
    </div>
  </div>
)
}

export default BuatAktivitasError
