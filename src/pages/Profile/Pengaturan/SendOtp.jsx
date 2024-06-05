import { useContext, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from 'context/UserContext'
import { API_URL } from 'config/api'
import BackButton from 'components/BackButton'
import { getToken } from 'utils/cookiesHooks'
import Spinner from 'components/loaders/Spinner'

function SendOtp() {
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const user = useContext(UserContext)

  const dataSend = {
    email: user.user.email,
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await axios
      .post(`${API_URL}/api/password/request-otp`, dataSend, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        if (res.status === 200) history.push('/verifikasi-otp')
        setIsLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }

  if (!getToken()) {
    return <Redirect to="/" />
  }

  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <BackButton hrf={'1'} txt="Verifikasi" />
      <form
        className="mt-[150px] mx-[20px] space-y-5"
        autoComplete="off"
        onSubmit={(e) => handleOnSubmit(e)}
      >
        <div>
          <div className="relative w-full border-[1px] h-[60px] px-[20px] flex items-center rounded-full mt-[20px] border-[#CACACA]">
            <input
              className="bg-transparent outline-none focus:ring-transparent border-none text-base font-normal w-full"
              value={user.user?.email}
              readOnly={true}
            />
          </div>
        </div>
        <button
          className="flex justify-center items-center bg-[#c41230] text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px]"
          type="submit"
        >
          {isLoading ? 'Loading...' : 'Kirim Kode'}
        </button>
      </form>
    </div>
  )
}

export default SendOtp
