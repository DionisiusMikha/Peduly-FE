import BerhasilLogo from '../berhasil.json'
import Lottie from 'lottie-react'
import { useContext } from 'react'
import { UserContext } from 'context/UserContext'
import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
  getPartisipasiBerhasil,
  removePartisipasiBerhasil,
} from 'utils/cookiesHooks'

const PartisipasiBerhasil = ({ location }) => {
  const history = useHistory()
  const { user } = useContext(UserContext)


  useEffect(() => {
    if (getPartisipasiBerhasil() === 'sukses') {
      removePartisipasiBerhasil()
    }
  }, [])

  if (!getPartisipasiBerhasil()) {
    return <Redirect to="/" />
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <div className="flex items-center justify-center h-[90vh] flex-col text-center">
        <div className="h-[150px] w-full mt-24 justify-center flex align-middle">
          <Lottie animationData={BerhasilLogo} />
        </div>
        <h1 className="text-[20px] font-medium text-peduly-primary mt-[31px]">
          {location.state.H1}
        </h1>
        <p className="text-base text-peduly-subtitle font-normal max-w-[285px] mt-[8px]">
          {location.state.P1}
        </p>
      </div>
      <div className="fixed bottom-0 w-full h-[84px] bg-white flex justify-center items-center max-w-[430px] py-[12px] z-40">
        <span className="w-[90%]">
          <button
            className="bg-peduly-primary  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] "
            onClick={() => history.push(
              location.state.hrf === 'profile'
                ? `/profile`
                : location.state.hrf
            )}
          >
            {location.state.Button}
          </button>
        </span>
      </div>
    </div>
  )
}

export default PartisipasiBerhasil
