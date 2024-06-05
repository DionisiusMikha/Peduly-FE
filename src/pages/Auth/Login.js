import { Link } from 'react-router-dom'
import { useState } from 'react'
import jwt from 'jwt-decode'
import Cookies from 'js-cookie'
// import Alert from 'components/Alert/Alert'
import GoogleLogin from './GoogleLogin'
import NavLink from '../../components/Navbar/index'
import axios from 'axios'
import { API_URL } from 'config/api'
import { useEffect } from 'react'
import { getSlug, removeSlug } from 'utils/cookiesHooks'
import Offline from 'components/Offline'
import { useOnlineStatus } from 'utils/onlineStatus'

const Login = () => {
  const [mode, setMode] = useState('selection') // selection, email, google
  const [email, setEmail] = useState('')
  const [hasError, setHasError] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordType, setPasswordType] = useState('password')
  const [passwordInput, setPasswordInput] = useState('')
  const [tautan, setTautan] = useState()
  const isOnline = useOnlineStatus()

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value)
    setPassword(e.target.value)
  }

  const resetEmailForm = () => {
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

  const getDataActivity = async () => {
    await axios
      .get(`${API_URL}/api/aktivitas/byslug/${getSlug()}`)
      .then((response) => {
        setTautan(response.data.data.activity.tautan)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const handleGoogleLogin = async () => {
    window.location.href = `${API_URL}/auth/google`
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await getDataActivity()

    const data = {
      email: email,
      password: password,
    }

    await axios
      .post(`${API_URL}/api/auth/login`, data)
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('isLoggedIn', true)
          const token = res.data.token
          const decode = jwt(token)
          const exp = decode.exp * 1000

          const currentDate = new Date();
          const expireDate = new Date(currentDate);
          expireDate.setFullYear(expireDate.getFullYear() + 1);

          // localStorage.setItem('token',token)
          Cookies.set('token', token, { expires: 7 })
          // Cookies.set('expireAt', expireDate)
          window.location.pathname = '/'
        }
      })
      .catch((err) => {
        setHasError(err.message)
      })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div style={{ maxWidth: '430px' }} className="mx-auto">
      <NavLink />
      <div className="relative mx-[30px]">
        <div className="flex flex-col ">
          <div className="rounded-full mx-auto max-w-[80px] mt-[66px]">
            <img src='/icon/logo.svg' />
          </div>
          {isOnline ? (
            <>
              <p className="font-bold mx-auto text-[24px] mt-[36px]">Masuk</p>
              <p className="mx-auto text-[#717171] text-[14px]">
                Belum memiliki akun?{' '}
                <Link to="/register" className="text-peduly-primary">
                  Daftar
                </Link>
              </p>
              {mode === 'selection' && (
                <div className="my-16">
                  <button
                    className="bg-white text-merchant-subtitle w-full font-semibold rounded-full py-[18px] my-[24px] h-[60px] border-[1px] flex items-center justify-center hover:border-peduly-primary"
                    onClick={handleGoogleLogin}
                  >
                    <div className="w-full flex flex-row justify-center items-center">
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 30 30"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M29.9842 15.2806C29.9842 14.0515 29.8821 13.1546 29.6613 12.2245H15.2988V17.772H23.7292C23.5593 19.1506 22.6415 21.2268 20.6018 22.6219L20.5732 22.8076L25.1144 26.2453L25.429 26.276C28.3184 23.6683 29.9842 19.8315 29.9842 15.2806Z"
                          fill="#4285F4"
                        />
                        <path
                          d="M15.2989 29.8969C19.4291 29.8969 22.8964 28.5681 25.429 26.2761L20.6019 22.6219C19.3101 23.5022 17.5764 24.1168 15.2989 24.1168C11.2536 24.1168 7.82028 21.5092 6.59638 17.9049L6.41698 17.9198L1.69505 21.4908L1.6333 21.6586C4.14882 26.5417 9.3159 29.8969 15.2989 29.8969Z"
                          fill="#34A853"
                        />
                        <path
                          d="M6.59621 17.905C6.27328 16.9749 6.08638 15.9782 6.08638 14.9485C6.08638 13.9187 6.27328 12.9221 6.57922 11.992L6.57067 11.7939L1.78956 8.16553L1.63313 8.23824C0.596365 10.2646 0.00146484 12.5401 0.00146484 14.9485C0.00146484 17.3569 0.596365 19.6323 1.63313 21.6587L6.59621 17.905Z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M15.2989 5.78004C18.1713 5.78004 20.1089 6.99252 21.2138 8.00576L25.531 3.8866C22.8796 1.47824 19.4291 0 15.2989 0C9.31591 0 4.14882 3.35507 1.6333 8.2382L6.5794 11.992C7.82028 8.38774 11.2536 5.78004 15.2989 5.78004Z"
                          fill="#EB4335"
                        />
                      </svg>
                      <p className="ml-[16px]">Masuk lewat Google</p>
                    </div>
                  </button>
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

                    <p className="ml-4">Masuk lewat Email</p>
                  </button>
                </div>
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
                  {/* Form Login Email */}
                  <form onSubmit={handleSubmit}>
                    <div className="w-full border-[1px] h-[60px] px-[20px] flex items-center rounded-full mt-[24px] border-[#CACACA]">
                      <input
                        name="email"
                        type="email"
                        autoComplete="off"
                        className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                        placeholder="Alamat Email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                    </div>
                    <div className="relative w-full border-[1px] h-[60px] px-[20px] flex items-center rounded-full mt-[20px] border-[#CACACA]">
                      <input
                        name="password"
                        className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                        placeholder="Password"
                        type={passwordType}
                        value={passwordInput}
                        onChange={handlePasswordChange}
                        required
                      />
                      <div
                        onClick={togglePassword}
                        className="absolute right-[20px] z-10 "
                      >
                        {passwordType === 'password' ? (
                          <svg
                            width={24}
                            height={24}
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
                            width={24}
                            height={24}
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
                    <div className="flex justify-end mt-[24px]">
                      <Link
                        to="/password/lupa"
                        className="text-peduly-primary text-[14px]"
                      >
                        Lupa password?
                      </Link>
                    </div>
                    {hasError && (
                      <div
                        className="bg-red-100 rounded-lg py-2 px-6 mb-3 mt-3 text-base text-red-700 inline-flex items-center w-full"
                        role="alert"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="times-circle"
                          className="svg-inline--fa fa-times-circle w-4 h-4 mr-2 fill-current"
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
                          />
                        </svg>
                        email atau password salah
                      </div>
                    )}
                    <button className="bg-peduly-primary text-white w-full font-bold rounded-full text-[18px] py-[18px] mt-[24px] h-[60px]">
                      Masuk
                    </button>
                  </form>
                </>
              )}
            </>
          ) : (
            <div className="mx-auto mt-[36px]">
              <Offline />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Login
