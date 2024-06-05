import BerhasilLogo from '../berhasil.json'
import Lottie from 'lottie-react'
import { useContext } from 'react'
import { UserContext } from 'context/UserContext'
import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
  getEditBerhasil,
  removeEditBerhasil,
  // getEndBerhasil,
  // removeEndBerhasil,
} from 'utils/cookiesHooks'

const DeleteBerhasil = ({location}) => {
  const history = useHistory()
  const { user } = useContext(UserContext)

  if (!getEditBerhasil()) {
    history.push('/')
  }

  const berhasilEdit = () => {
    removeEditBerhasil()
    // removeEndBerhasil()
    history.push(
      location.state.hrf === 'aktivitas-saya'
          ? `/aktivitas-saya`
          : location.state.hrf
    )
  }
  
  // useEffect(() => {
  //   if (getDeleteBerhasil() === 'sukses' || getEndBerhasil() === 'sukses') {
      
  //   }

  //   // Redirect based on conditions
    
  // }, [history])
  

  // useEffect(() => {
  //   if () {
      
  //   }
  // }, [])
  
  // if (!getDeleteBerhasil()) {
  //   return <Redirect to="/" />
  // }
  // if (!getEndBerhasil()) {
  //   return <Redirect to="/aktivitas-saya" />
  // }


  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <div className="flex items-center justify-center h-[90vh] flex-col text-center">
        <div className="h-[150px] w-full mt-24 justify-center flex align-middle">
          <Lottie animationData={BerhasilLogo}/>
        </div>
        <h1 className="text-[20px] font-medium text-peduly-primary mt-[31px]">
          {location.state.H1}
        </h1>
      </div>
      <div className="fixed bottom-0 w-full h-[84px] bg-white flex justify-center items-center max-w-[430px] py-[12px] z-40">
        <span className="w-[90%]">
          <button
            className="bg-peduly-primary  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] "
            onClick={() => berhasilEdit()}
          >
            {location.state.Button}
          </button>
        </span>
      </div>
    </div>
  )
}

export default DeleteBerhasil
