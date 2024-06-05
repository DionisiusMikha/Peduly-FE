import GoogleLogin from '../GoogleLogin'
import axios from 'axios'
import Spinner from 'components/loaders/Spinner'
import { API_URL } from 'config/api'
import { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { setRegisterEmail } from 'utils/cookiesHooks'
import NavLink from '../../../components/Navbar/index'

const Daftar = () => {
  const [mode, setMode] = useState('selection') // selection, email, google
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [Error, setError] = useState({})
  const [passwordType, setPasswordType] = useState('password')
  const [passwordInput, setPasswordInput] = useState('')
  const [loading, setLoading] = useState(false)

  const history = useHistory()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setTimeout(() => {
      setLoading(true)
    }, 1000)


    const data = {
      name: name,
      email: email,
      password: password,
    }

    await axios
      .post(`${API_URL}/api/auth/register`, data)
      .then((res) => {
        if (res.status === 201) {
          setRegisterEmail()
          history.push('/register/verifikasi-email')
        }
      })
      .catch((e) => {
        setError(e.response.data.error)
        setTimeout(() => {
          setError('')
        }, 10000)
      })
  }

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value)
    setPassword(e.target.value)
  }

  const resetEmailForm = () => {
    setName('')
    setEmail('')
    setPasswordInput('')
  }

  const togglePassword = () => {
    if (passwordType === 'password') {
      setPasswordType('text')
      return
    }
    setPasswordType('password')
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (loading) {
    return (
      <div className="mx-auto max-w-[430px] h-screen flex items-center justify-center">
        <Spinner color="#e7513b" />
      </div>
    )
  }

  return (
    <div style={{ maxWidth: '430px' }} className="mx-auto">
      <NavLink />
      <div className="relative mx-[30px]">
        <div className="flex flex-col ">
          <div className="rounded-full mx-auto max-w-[80px] mt-[66px]">
            <img src='/icon/logo.svg' />
          </div>
          <p className="font-bold mx-auto text-[24px] mt-[36px]">Daftar</p>
          <p className="mx-auto text-[#717171] text-[14px]">
            Sudah memiliki akun?{' '}
            <Link to="/login" className="text-peduly-primary">
              Masuk
            </Link>{' '}
          </p>
          {mode === 'selection' && (
            <>
              <div className="my-16">
                <GoogleLogin label="Daftar lewat Google" />
                <button
                  className="bg-white text-merchant-subtitle w-full font-semibold rounded-full py-[18px] my-[24px] h-[60px] border-[1px] flex items-center justify-center hover:border-peduly-primary"
                  onClick={() => setMode('email')}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z"
                      stroke="#D10234"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>

                  <p className="ml-4">Daftar lewat Email</p>
                </button>
              </div>
            </>
          )}
          {mode === 'email' && (
            <>
              {/* Back Button */}
              <button
                className="absolute top-0 left-0 mt-5"
                onClick={() => {
                  resetEmailForm()
                  setMode('selection')
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.57 5.92993L3.5 11.9999L9.57 18.0699"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.5 12H3.66998"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              {/* Form Daftar with Email */}
              <form onSubmit={handleSubmit}>
                <div className="w-full border-[1px] h-[60px] px-[20px] flex items-center rounded-full mt-[24px] border-[#CACACA]">
                  <input
                    type="text"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                    placeholder="Nama lengkap"
                    required
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  />
                </div>
                <div className="w-full border-[1px] h-[60px] px-[20px] flex items-center rounded-full mt-[20px] border-[#CACACA]">
                  <input
                    type="email"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                    placeholder="Alamat Email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                    }}
                  />
                </div>
                <div
                  className={`${Error.password && 'ring-1 ring-peduly-danger border-none'
                    } relative w-full border-[1px] h-[60px] px-[20px] flex items-center rounded-full mt-[20px] border-[#CACACA]`}
                >
                  <input
                    placeholder="Password"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                    type={passwordType}
                    value={passwordInput}
                    required
                    onChange={handlePasswordChange}
                  />
                  <div
                    onClick={togglePassword}
                    className="absolute right-[20px] z-10 "
                  >
                    {passwordType === 'password' ? (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M14.5299 9.47001L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42001 11.9999 8.42001C12.9899 8.42001 13.8799 8.82001 14.5299 9.47001Z"
                          stroke="#ADADAD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M17.8201 5.77001C16.0701 4.45001 14.0701 3.73001 12.0001 3.73001C8.47009 3.73001 5.18009 5.81001 2.89009 9.41001C1.99009 10.82 1.99009 13.19 2.89009 14.6C3.68009 15.84 4.60009 16.91 5.60009 17.77"
                          stroke="#ADADAD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M8.41992 19.53C9.55992 20.01 10.7699 20.27 11.9999 20.27C15.5299 20.27 18.8199 18.19 21.1099 14.59C22.0099 13.18 22.0099 10.81 21.1099 9.39999C20.7799 8.87999 20.4199 8.38999 20.0499 7.92999"
                          stroke="#ADADAD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52"
                          stroke="#ADADAD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M9.47 14.53L2 22"
                          stroke="#ADADAD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M22 2L14.53 9.47"
                          stroke="#ADADAD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.5799 12C15.5799 13.98 13.9799 15.58 11.9999 15.58C10.0199 15.58 8.41992 13.98 8.41992 12C8.41992 10.02 10.0199 8.42001 11.9999 8.42001C13.9799 8.42001 15.5799 10.02 15.5799 12Z"
                          stroke="#ADADAD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.0001 20.27C15.5301 20.27 18.8201 18.19 21.1101 14.59C22.0101 13.18 22.0101 10.81 21.1101 9.4C18.8201 5.8 15.5301 3.72 12.0001 3.72C8.47009 3.72 5.18009 5.8 2.89009 9.4C1.99009 10.81 1.99009 13.18 2.89009 14.59C5.18009 18.19 8.47009 20.27 12.0001 20.27Z"
                          stroke="#ADADAD"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
                {Error.password && (
                  <p className="text-sm font-light text-peduly-danger mt-1">
                    {Error.password[0]}
                  </p>
                )}
                <button
                  className="bg-[#c41230] text-white w-full font-bold rounded-full text-[18px] py-[18px] mt-[24px] h-[60px]"
                  type="submit"
                >
                  Daftar
                </button>
              </form>
            </>
          )}
          <div className="text-center mt-6 mb-20 text-[12px]">
            <p>Dengan mendaftar, kamu setuju dengan</p>
            <p>
              {/* ganti */}
              <a
                href="https://help.involuntir.com/syarat-ketentuan/"
                className="text-peduly-primary text-[12px] underline"
              >
                Syarat dan Kaetentuan
              </a>{' '}
              &{' '}
              <a
                href="https://help.involuntir.com/privasi/"
                className="text-peduly-primary text-[12px] underline"
              >
                kebijakan privasi
              </a>{' '}
              involuntir.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Daftar
