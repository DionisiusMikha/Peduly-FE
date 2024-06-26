import BerhasilLogo from '../berhasil.json'
import Lottie from 'lottie-react'
import { UserContext } from 'context/UserContext'
import { useContext } from 'react'
import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
  getPasswordReset,
  getRekeningBerhasil,
  getUbahKataSandiBerhasil,
  getUbahProfileBerhasil,
  getVerifikasiAkunBerhasil,
  removePasswordReset,
  removeRekeningBerhasil,
  removeUbahKataSandiBerhasil,
  removeUbahProfileBerhasil,
  removeVerifikasiAkunBerhasil,
} from 'utils/cookiesHooks'

const Berhasil = ({ location }) => {
  const history = useHistory()

  const { user } = useContext(UserContext)

  useEffect(() => {
    if (getUbahKataSandiBerhasil() === 'sukses') {
      removeUbahKataSandiBerhasil()
    } else if (getVerifikasiAkunBerhasil() === 'sukses') {
      removeVerifikasiAkunBerhasil()
    } else if (getUbahProfileBerhasil() === 'sukses') {
      removeUbahProfileBerhasil()
    } else if (getRekeningBerhasil() === 'sukses') {
      removeRekeningBerhasil()
    } else if (getPasswordReset() === 'sukses') {
      removePasswordReset()
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // if (
  //   !getUbahKataSandiBerhasil() &&
  //   !getVerifikasiAkunBerhasil() &&
  //   !getUbahProfileBerhasil() &&
  //   !getRekeningBerhasil() &&
  //   !getPasswordReset()
  // ) {
  //   return <Redirect to="/" />
  // }

  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <div className="mx-[30px]">
        <div className="h-[150px] w-full mt-32 justify-center flex align-middle">
          <Lottie animationData={BerhasilLogo} />
          {/* <svg
            width={244}
            height={193}
            viewBox="0 0 244 193"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.5"
              d="M122 157C155.137 157 182 130.137 182 97C182 63.8629 155.137 37 122 37C88.863 37 62 63.8629 62 97C62 130.137 88.863 157 122 157Z"
              fill="#34A853"
            />
            <path
              d="M122 147C149.614 147 172 124.614 172 97C172 69.3858 149.614 47 122 47C94.3858 47 72 69.3858 72 97C72 124.614 94.3858 147 122 147Z"
              fill="#34A853"
            />
            <path
              d="M116.054 119.888C114.704 119.89 113.39 119.453 112.31 118.644L112.243 118.593L98.1427 107.807C97.4886 107.306 96.9396 106.682 96.527 105.969C96.1144 105.257 95.8463 104.47 95.738 103.654C95.6297 102.837 95.6834 102.008 95.896 101.212C96.1086 100.416 96.4758 99.6706 96.9769 99.0171C97.4779 98.3636 98.1028 97.8152 98.8159 97.4033C99.5289 96.9915 100.316 96.7242 101.133 96.6168C101.949 96.5094 102.779 96.564 103.574 96.7774C104.369 96.9909 105.115 97.3589 105.768 97.8606L114.901 104.865L136.484 76.7076C137.494 75.3892 138.987 74.5264 140.634 74.3088C142.281 74.0913 143.947 74.5369 145.266 75.5476L145.267 75.549L145.134 75.7349L145.271 75.549C146.588 76.5611 147.45 78.0545 147.667 79.7012C147.884 81.348 147.439 83.0137 146.43 84.3327L121.044 117.437C120.457 118.199 119.701 118.817 118.837 119.24C117.973 119.664 117.022 119.883 116.06 119.88L116.054 119.888Z"
              fill="white"
            />
            <circle cx={61} cy={162} r={5} fill="#34A853" />
            <circle cx={139} cy={181} r={5} fill="#2E9BCC" />
            <circle cx={194} cy={90} r={5} fill="#2E9BCC" />
            <circle cx={102} cy={12} r={5} fill="#E7513B" />
            <circle cx={48} cy={70} r={5} fill="#E7513B" />
            <circle cx={121} cy={23} r={3} fill="#34A853" />
            <circle cx={122} cy={173} r={3} fill="#E7513B" />
            <path
              d="M171 154C178.934 158.773 180.953 162.442 182.627 169.78"
              stroke="#E7513B"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <path
              d="M177.5 43.9999C187 45.5 195.499 39.4999 195.499 31.4999C195.499 23.5 196 16.5 205.175 13.861"
              stroke="#34A853"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <path
              d="M52.8764 121.596C40.9998 132.5 24.0002 120.5 28.5 115.5C32.9997 110.5 39 129 30.0004 136.5C21.0009 144 8.59565 139.123 8.59565 139.123"
              stroke="#2E9BCC"
              strokeWidth={4}
              strokeLinecap="round"
            />
          </svg> */}
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
              history.push(
                location.state.hrf === 'profile'
                  ? `/profile`
                  : location.state.hrf
              )
            }}
          >
            {location.state.Button}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Berhasil
