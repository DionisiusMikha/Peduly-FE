import BerhasilLogo from '../berhasil.json'
import Lottie from 'lottie-react'
import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
  getDonasiBalanceBerhasil,
  removeDonasiBalanceBerhasil,
} from 'utils/cookiesHooks'

const BayarBerhasil = ({location}) => {
  const history = useHistory()

  useEffect(() => {
    if (getDonasiBalanceBerhasil() === 'sukses') {
      removeDonasiBalanceBerhasil()
    }
  }, [])

  if (!getDonasiBalanceBerhasil()) {
    return <Redirect to="/" />
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <div className="mx-[30px]">
        <div className="h-[150px] w-full mt-32 justify-center flex align-middle">
          <Lottie animationData={BerhasilLogo}/>
        </div>
        <div className="mt-14 flex justify-center mx-auto w-[135px]">
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
              history.push('/')
            }}
          >
            {location.state.Button}
          </button>
        </div>
      </div>
    </div>
  )
}

export default BayarBerhasil
