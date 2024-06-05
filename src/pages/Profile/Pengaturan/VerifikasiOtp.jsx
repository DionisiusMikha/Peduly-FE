import { useContext, useEffect, useState } from 'react'
import { useHistory, Redirect } from 'react-router-dom'
import { UserContext } from 'context/UserContext'
import axios from 'axios'
import BackButton from 'components/BackButton'
import OTPForm from 'components/Pengaturan/OTPForm'
import { API_URL } from 'config/api'
import { getToken } from 'utils/cookiesHooks'
import '../../../styles/OTPForm.css'

function VerifikasiOtp() {
  const [otpValues, setOtpValues] = useState(['', '', '', ''])
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory()
  const user = useContext(UserContext)

  const handleOtpChange = (index, value) => {
    const newOtpValues = [...otpValues]
    newOtpValues[index] = value
    setOtpValues(newOtpValues)
  }

  const combinedOtp = otpValues.join('')

  const dataSend = {
    email: user.user.email,
    otp: combinedOtp,
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    await axios
      .post(`${API_URL}/api/password/verify-otp`, dataSend, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        if (res.status === 200)
          history.push(`/ubah-kata-sandi?q=${res.data.token}`)
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
        className="form-otp mx-[20px] space-y-5"
        autoComplete="off"
        onSubmit={handleOnSubmit}
      >
        <div className="flex justify-center mb-4">
          <OTPForm otpValues={otpValues} onOtpChange={handleOtpChange} />
        </div>
        <button
          className="bg-peduly-primary text-white font-bold w-full max-w-[374px] text-[16px] rounded-full h-[60px]"
          type="submit"
        >
          {isLoading ? 'Loading...' : 'Verifikasi'}
        </button>
      </form>
    </div>
  )
}

export default VerifikasiOtp
