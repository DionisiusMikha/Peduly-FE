import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, Redirect } from 'react-router-dom'
import NavLink from '../../components/Navbar/index'
import { getToken } from 'utils/cookiesHooks'
import { API_URL } from 'config/api'

const LihatProfile = () => {
  // const [checked, setChecked] = useState(false)
  // const [checked2, setChecked2] = useState(false)
  const user = useContext(UserContext)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  if (!getToken()) {
    return <Redirect to="/" />
  }

  return (
    <div>
      <div className="mx-auto" style={{ maxWidth: '430px' }}>
        <NavLink />
      </div>
      <div className="w-screen h-screen flex justify-center overflow-x-hidden">
        <div className="container top-y-10  mx-auto max-w-[430px]  h-screen  bg-white mb-[104px]">
          <div className="flex justify-center items-center flex-col">
            <div className="mt-[58px]">
              {user?.user?.photo ? (
                <img
                  src={
                    user?.user?.photo.slice(0, 4) === 'http'
                      ? `${user?.user?.photo}`
                      : user?.user?.photo.slice(0, 7) === '/images'
                        ? `${API_URL}${user?.user?.photo}`
                        : `${API_URL}/images/images_profile/${user?.user?.photo}`
                  }
                  alt=""
                  className="w-[86px] h-[86px] rounded-full object-cover"
                />
              ) : (
                <svg
                  width="86"
                  height="86"
                  viewBox="0 0 86 86"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.4"
                    d="M43 86C66.7482 86 86 66.7482 86 43C86 19.2518 66.7482 0 43 0C19.2518 0 0 19.2518 0 43C0 66.7482 19.2518 86 43 86Z"
                    fill="#E7513B"
                  />
                  <path
                    d="M46.1791 59.1821C46.9302 59.1821 47.5351 59.7927 47.5351 60.5409C47.5351 61.292 46.9302 61.8997 46.1791 61.8997H23.3089C22.5607 61.8997 21.9501 61.292 21.9501 60.5409C21.9501 51.1698 28.8702 42.2918 38.5223 42.2918C39.2733 42.2918 39.8811 42.8995 39.8811 43.6506C39.8811 44.3988 39.2733 45.0094 38.5223 45.0094C30.9915 45.0094 25.3385 51.7145 24.7221 59.1821H46.1791ZM43.4472 39.6688C38.4965 39.6688 34.4831 35.6784 34.4831 30.7534C34.4831 25.8285 38.4993 21.8381 43.4472 21.8381C48.3951 21.8381 52.4113 25.8285 52.4113 30.7534C52.4113 35.6784 48.3979 39.6688 43.4472 39.6688ZM43.4472 36.954C46.9015 36.954 49.6965 34.1762 49.6965 30.7534C49.6965 27.3307 46.9015 24.5529 43.4472 24.5529C39.9929 24.5529 37.1979 27.3307 37.1979 30.7534C37.1979 34.1762 39.9929 36.954 43.4472 36.954ZM56.6224 42.329C58.6147 42.114 60.6042 42.7791 62.0519 44.1465L62.0633 44.158C63.3304 45.3849 64.0471 47.0647 64.0471 48.8163C64.0471 50.5735 63.3304 52.2534 62.0662 53.4803L53.793 61.5127C53.2627 62.0258 52.4256 62.0258 51.901 61.5127L43.6307 53.4832C42.3607 52.2534 41.6441 50.5735 41.6441 48.8191C41.6441 47.0647 42.3607 45.3849 43.6421 44.1465C45.0898 42.7791 47.0793 42.114 49.0716 42.329C50.4877 42.4838 51.8035 43.0686 52.847 43.9888C53.8905 43.0686 55.2063 42.481 56.6224 42.329ZM56.9148 45.0266C55.7137 45.1584 54.6358 45.8034 53.9736 46.7838C53.4347 47.5836 52.2593 47.5836 51.7233 46.7838C51.0611 45.8034 49.9832 45.1584 48.7821 45.0266C47.5781 44.8976 46.3769 45.3017 45.5198 46.1073C44.7773 46.8268 44.3617 47.8043 44.3617 48.8191C44.3617 49.8339 44.7802 50.8115 45.5227 51.531L52.8499 58.6432L60.1771 51.5281C60.9224 50.8086 61.3352 49.8339 61.3352 48.8163C61.3352 47.8015 60.9195 46.8325 60.1828 46.113C59.3085 45.2989 58.1131 44.8976 56.9148 45.0266Z"
                    fill="#E7513B"
                  />
                </svg>
              )}
            </div>
            <div className="font-semibold mt-[12px] mb-1 flex items-center space-x-1">
              <span>{user?.user?.name ? user?.user?.name : 'username'}</span>
              {user?.user?.status_akun === 'Verified' ? (
                user?.user?.tipe === 'pribadi' ||
                  user?.user?.tipe === 'Individu' ? (
                  <>
                    {user?.user?.role === 'User' && (
                      <svg
                        width={19}
                        height={18}
                        viewBox="0 0 19 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.9086 0L13.3799 2.27486L16.0859 2.41029L16.2226 5.11586L18.4987 6.58586L17.264 8.99786L18.5 11.4086L16.2251 12.8799L16.0897 15.5859L13.3841 15.7226L11.9141 17.9987L9.50214 16.764L7.09143 18L5.62014 15.7251L2.91414 15.5897L2.77743 12.8841L0.501286 11.4141L1.736 9.00214L0.5 6.59143L2.77486 5.12014L2.91029 2.41414L5.61586 2.27743L7.08586 0.00128572L9.49786 1.236L11.9086 0Z"
                          fill="#42A5F5"
                        />
                        <path
                          d="M8.38398 12.1093L5.59955 9.3257L6.50898 8.4167L8.39769 10.3054L12.4983 6.33084L13.3931 7.25398L8.38398 12.1093Z"
                          fill="white"
                        />
                      </svg>
                    )}
                    {(user?.user?.role === 'Fundraiser' ||
                      user?.user?.role === 'Volunteer') && (
                        <svg
                          width="86"
                          height="86"
                          viewBox="0 0 86 86"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.4"
                            d="M43 86C66.7482 86 86 66.7482 86 43C86 19.2518 66.7482 0 43 0C19.2518 0 0 19.2518 0 43C0 66.7482 19.2518 86 43 86Z"
                            fill="#c41230"
                          />
                          <path
                            d="M46.1792 59.182C46.9302 59.182 47.5351 59.7926 47.5351 60.5408C47.5351 61.2919 46.9302 61.8996 46.1792 61.8996H23.3089C22.5607 61.8996 21.9501 61.2919 21.9501 60.5408C21.9501 51.1697 28.8702 42.2917 38.5223 42.2917C39.2734 42.2917 39.8811 42.8994 39.8811 43.6505C39.8811 44.3987 39.2734 45.0093 38.5223 45.0093C30.9916 45.0093 25.3385 51.7144 24.7222 59.182H46.1792ZM43.4472 39.6687C38.4965 39.6687 34.4832 35.6783 34.4832 30.7534C34.4832 25.8284 38.4994 21.838 43.4472 21.838C48.3951 21.838 52.4113 25.8284 52.4113 30.7534C52.4113 35.6783 48.398 39.6687 43.4472 39.6687ZM43.4472 36.9539C46.9016 36.9539 49.6966 34.1761 49.6966 30.7534C49.6966 27.3306 46.9016 24.5528 43.4472 24.5528C39.9929 24.5528 37.1979 27.3306 37.1979 30.7534C37.1979 34.1761 39.9929 36.9539 43.4472 36.9539ZM56.6224 42.3289C58.6148 42.1139 60.6042 42.779 62.0519 44.1464L62.0634 44.1579C63.3304 45.3848 64.0471 47.0647 64.0471 48.8162C64.0471 50.5734 63.3304 52.2533 62.0662 53.4802L53.793 61.5126C53.2627 62.0258 52.4256 62.0258 51.901 61.5126L43.6307 53.4831C42.3608 52.2533 41.6441 50.5734 41.6441 48.8191C41.6441 47.0647 42.3608 45.3848 43.6422 44.1464C45.0898 42.779 47.0793 42.1139 49.0716 42.3289C50.4878 42.4837 51.8036 43.0685 52.847 43.9887C53.8905 43.0685 55.2063 42.4809 56.6224 42.3289ZM56.9148 45.0265C55.7137 45.1583 54.6358 45.8033 53.9736 46.7837C53.4347 47.5835 52.2594 47.5835 51.7233 46.7837C51.0611 45.8033 49.9832 45.1583 48.7821 45.0265C47.5781 44.8975 46.377 45.3017 45.5198 46.1072C44.7774 46.8267 44.3617 47.8043 44.3617 48.8191C44.3617 49.8339 44.7802 50.8114 45.5227 51.5309L52.8499 58.6431L60.1771 51.528C60.9224 50.8085 61.3352 49.8338 61.3352 48.8162C61.3352 47.8014 60.9196 46.8325 60.1828 46.1129C59.3085 45.2988 58.1131 44.8975 56.9148 45.0265Z"
                            fill="#c41230"
                          />
                        </svg>
                      )}
                  </>
                ) : (
                  <svg
                    width={18}
                    height={19}
                    viewBox="0 0 18 19"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.4086 0.5L12.8799 2.77486L15.5859 2.91029L15.7226 5.61586L17.9987 7.08586L16.764 9.49786L18 11.9086L15.7251 13.3799L15.5897 16.0859L12.8841 16.2226L11.4141 18.4987L9.00214 17.264L6.59143 18.5L5.12014 16.2251L2.41414 16.0897L2.27743 13.3841L0.00128572 11.9141L1.236 9.50214L0 7.09143L2.27486 5.62014L2.41029 2.91414L5.11586 2.77743L6.58586 0.501286L8.99786 1.736L11.4086 0.5Z"
                      fill="#34A853"
                    />
                    <path
                      d="M7.88398 12.6093L5.09955 9.8257L6.00898 8.9167L7.89769 10.8054L11.9983 6.83084L12.8931 7.75398L7.88398 12.6093Z"
                      fill="white"
                    />
                  </svg>
                )
              ) : (
                ''
              )}
            </div>
            <div className="text-[#717171]">
              <span>{user?.user?.tipe ? user?.user?.tipe : '.......'}</span>
            </div>
          </div>
          <div className="mt-[24px]">
            <Link to={'/riwayatsaya'}>
              <div className="grid grid-cols-6 py-[25px]  w-full  align-middle">
                <div className="xs:ml-[30px] ml-[15px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke="#292D32"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 22h6c5 0 7-2 7-7V9c0-5-2-7-7-7H9C4 2 2 4 2 9v6c0 5 2 7 7 7zM15.75 9h-7.5M15.75 15h-7.5"
                    ></path>
                  </svg>
                </div>
                <div className="col-span-3">
                  <span>Riwayat Saya</span>
                </div>
              </div>
            </Link>
          </div>
          {(user?.user?.role === 'Fundraiser' ||
            user?.user?.role === 'Volunteer') && (
              <>
                <hr style={{ width: '90%', margin: 'auto' }} />
                <Link to="/dashboard">
                  <div className="grid grid-cols-6  py-[25px] w-full  align-middle">
                    <div className="xs:ml-[30px] ml-[15px] ">
                      <svg
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 9C19 10.45 18.57 11.78 17.83 12.89C16.75 14.49 15.04 15.62 13.05 15.91C12.71 15.97 12.36 16 12 16C11.64 16 11.29 15.97 10.95 15.91C8.96 15.62 7.25 14.49 6.17 12.89C5.43 11.78 5 10.45 5 9C5 5.13 8.13 2 12 2C15.87 2 19 5.13 19 9Z"
                          stroke="#E7513B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21.25 18.47L19.6 18.86C19.23 18.95 18.94 19.23 18.86 19.6L18.51 21.07C18.32 21.87 17.3 22.11 16.77 21.48L12 16L7.23 21.49C6.7 22.12 5.68 21.88 5.49 21.08L5.14 19.61C5.05 19.24 4.76 18.95 4.4 18.87L2.75 18.48C1.99 18.3 1.72 17.35 2.27 16.8L6.17 12.9C7.25 14.5 8.96 15.63 10.95 15.92C11.29 15.98 11.64 16.01 12 16.01C12.36 16.01 12.71 15.98 13.05 15.92C15.04 15.63 16.75 14.5 17.83 12.9L21.73 16.8C22.28 17.34 22.01 18.29 21.25 18.47Z"
                          stroke="#E7513B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M12.58 5.98L13.17 7.15999C13.25 7.31999 13.46 7.48 13.65 7.51L14.72 7.68999C15.4 7.79999 15.56 8.3 15.07 8.79L14.24 9.61998C14.1 9.75998 14.02 10.03 14.07 10.23L14.31 11.26C14.5 12.07 14.07 12.39 13.35 11.96L12.35 11.37C12.17 11.26 11.87 11.26 11.69 11.37L10.69 11.96C9.97 12.38 9.54 12.07 9.73 11.26L9.97 10.23C10.01 10.04 9.94 9.75998 9.8 9.61998L8.97 8.79C8.48 8.3 8.64 7.80999 9.32 7.68999L10.39 7.51C10.57 7.48 10.78 7.31999 10.86 7.15999L11.45 5.98C11.74 5.34 12.26 5.34 12.58 5.98Z"
                          stroke="#E7513B"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="col-span-3">
                      <span className="text-[#E7513B]">Dashboard</span>
                    </div>
                  </div>
                </Link>
              </>
            )}
          <div
            className={
              user?.user?.role === 'Fundraiser' ||
                user?.user?.role === 'Volunteer'
                ? 'mt-0'
                : 'mt-0'
            }
          >
            <hr style={{ width: '90%', margin: 'auto' }} />
          </div>
          {/* Donasi */}
          <Link to={'/donasi'}>
            <div className="grid grid-cols-6 py-[25px]  w-full  align-middle">
              <div className="xs:ml-[30px] ml-[15px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="#292D32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.04 13.55c-.42.41-.66 1-.6 1.63.09 1.08 1.08 1.87 2.16 1.87h1.9v1.19c0 2.07-1.69 3.76-3.76 3.76H6.26c-2.07 0-3.76-1.69-3.76-3.76v-6.73c0-2.07 1.69-3.76 3.76-3.76h11.48c2.07 0 3.76 1.69 3.76 3.76v1.44h-2.02c-.56 0-1.07.22-1.44.6z"
                  ></path>
                  <path
                    stroke="#292D32"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M2.5 12.41V7.84c0-1.19.73-2.25 1.84-2.67l7.94-3a1.9 1.9 0 012.57 1.78v3.8M22.559 13.97v2.06c0 .55-.44 1-1 1.02h-1.96c-1.08 0-2.07-.79-2.16-1.87-.06-.63.18-1.22.6-1.63.37-.38.88-.6 1.44-.6h2.08c.56.02 1 .47 1 1.02zM7 12h7"
                  ></path>
                </svg>
              </div>
              <div className="col-span-3">
                <span>Donasi</span>
              </div>
            </div>
          </Link>
          <hr style={{ width: '90%', margin: 'auto' }} />
          <Link to={`/ubah-profile`}>
            <div className="grid grid-cols-6  py-[25px] w-full  align-middle">
              <div className="xs:ml-[30px] ml-[15px] ">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="col-span-3">
                <span>Ubah Profil</span>
              </div>
            </div>
          </Link>
          <hr style={{ width: '90%', margin: 'auto' }} />
          <Link to="/pengaturan">
            <div className="grid grid-cols-6  py-[25px] w-full  align-middle">
              <div className="xs:ml-[30px] ml-[15px] ">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12.8799V11.1199C2 10.0799 2.85 9.21994 3.9 9.21994C5.71 9.21994 6.45 7.93994 5.54 6.36994C5.02 5.46994 5.33 4.29994 6.24 3.77994L7.97 2.78994C8.76 2.31994 9.78 2.59994 10.25 3.38994L10.36 3.57994C11.26 5.14994 12.74 5.14994 13.65 3.57994L13.76 3.38994C14.23 2.59994 15.25 2.31994 16.04 2.78994L17.77 3.77994C18.68 4.29994 18.99 5.46994 18.47 6.36994C17.56 7.93994 18.3 9.21994 20.11 9.21994C21.15 9.21994 22.01 10.0699 22.01 11.1199V12.8799C22.01 13.9199 21.16 14.7799 20.11 14.7799C18.3 14.7799 17.56 16.0599 18.47 17.6299C18.99 18.5399 18.68 19.6999 17.77 20.2199L16.04 21.2099C15.25 21.6799 14.23 21.3999 13.76 20.6099L13.65 20.4199C12.75 18.8499 11.27 18.8499 10.36 20.4199L10.25 20.6099C9.78 21.3999 8.76 21.6799 7.97 21.2099L6.24 20.2199C5.33 19.6999 5.02 18.5299 5.54 17.6299C6.45 16.0599 5.71 14.7799 3.9 14.7799C2.85 14.7799 2 13.9199 2 12.8799Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="col-span-3">
                <span>Pengaturan</span>
              </div>
            </div>
          </Link>
          <hr style={{ width: '90%', margin: 'auto' }} />
          <Link to="/bantuan">
            <div className="grid grid-cols-6 py-[25px]  w-full  align-middle">
              <div className="xs:ml-[30px] ml-[15px]  ">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17 18.43H13L8.54999 21.39C7.88999 21.83 7 21.36 7 20.56V18.43C4 18.43 2 16.43 2 13.43V7.42993C2 4.42993 4 2.42993 7 2.42993H17C20 2.42993 22 4.42993 22 7.42993V13.43C22 16.43 20 18.43 17 18.43Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12.0001 11.3599V11.1499C12.0001 10.4699 12.4201 10.1099 12.8401 9.81989C13.2501 9.53989 13.66 9.1799 13.66 8.5199C13.66 7.5999 12.9201 6.85986 12.0001 6.85986C11.0801 6.85986 10.3401 7.5999 10.3401 8.5199"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9955 13.75H12.0045"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="col-span-3">
                <span>Bantuan</span>
              </div>
            </div>
          </Link>
          <hr style={{ width: '90%', margin: 'auto' }} />
          <Link to={'/tentang-kami'}>
            <div className="grid grid-cols-6 py-[25px]  w-full  align-middle">
              <div className="xs:ml-[30px] ml-[15px]  ">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8V13"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M11.9946 16H12.0036"
                    stroke="#212121"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="col-span-3">
                <span>Tentang Peduly</span>
              </div>
            </div>
          </Link>
          <hr style={{ width: '90%', margin: 'auto' }} />
          <Link
            to={{ pathname: 'http://help.peduly.com/syarat-ketentuan/' }}
            target="_blank"
          >
            <div className="grid grid-cols-6 py-[25px]  w-full  align-middle">
              <div className="xs:ml-[30px] ml-[15px]  ">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.3801 15.27V7.57999C18.3801 6.80999 17.7601 6.25 17.0001 6.31H16.9601C15.6201 6.42 13.5901 7.11001 12.4501 7.82001L12.3401 7.89002C12.1601 8.00002 11.8501 8.00002 11.6601 7.89002L11.5001 7.79001C10.3701 7.08001 8.34012 6.40999 7.00012 6.29999C6.24012 6.23999 5.62012 6.81001 5.62012 7.57001V15.27C5.62012 15.88 6.1201 16.46 6.7301 16.53L6.9101 16.56C8.2901 16.74 10.4301 17.45 11.6501 18.12L11.6801 18.13C11.8501 18.23 12.1301 18.23 12.2901 18.13C13.5101 17.45 15.6601 16.75 17.0501 16.56L17.2601 16.53C17.8801 16.46 18.3801 15.89 18.3801 15.27Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 8.1001V17.6601"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="col-span-3">
                <span>Syarat dan Ketentuan</span>
              </div>
            </div>
          </Link>
          <hr style={{ width: '90%', margin: 'auto' }} />
          <Link to={'/terbaru'}>
            <div className="grid grid-cols-6 py-[25px]  w-full  align-middle">
              <div className="xs:ml-[30px] ml-[15px]  ">
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M15.5 9.75C16.3284 9.75 17 9.07843 17 8.25C17 7.42157 16.3284 6.75 15.5 6.75C14.6716 6.75 14 7.42157 14 8.25C14 9.07843 14.6716 9.75 15.5 9.75Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 9.75C9.32843 9.75 10 9.07843 10 8.25C10 7.42157 9.32843 6.75 8.5 6.75C7.67157 6.75 7 7.42157 7 8.25C7 9.07843 7.67157 9.75 8.5 9.75Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.4 13.3H15.6C16.1 13.3 16.5 13.7 16.5 14.2C16.5 16.69 14.49 18.7 12 18.7C9.51 18.7 7.5 16.69 7.5 14.2C7.5 13.7 7.9 13.3 8.4 13.3Z"
                    stroke="#212121"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="col-span-3">
                <span>Ada Yang Baru!</span>
              </div>
            </div>
          </Link>
          <div
            className="text-xs font-medium"
            style={{
              paddingBottom: '75px',
              maxWidth: '374px',
              width: '100%',
              marginTop: '10px',
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default LihatProfile
