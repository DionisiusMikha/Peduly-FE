import { Link } from 'react-router-dom'
import { getToken } from 'utils/cookiesHooks'

const Header = () => {
  return (
    <div className="px-5 mt-7 flex justify-between mb-[38px]">
      <img src='/icon/peduly_icon.svg' />
      <div className="flex">
        {/* SEARCH */}
        <Link to="/search">
          <div className="ml-3">
            <div className="w-[48px] h-[48px] bg-involuntir-bgicon rounded-full flex justify-center items-center">
              <svg
                width={20}
                height={20}
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.55 18.1C14.272 18.1 18.1 14.272 18.1 9.55C18.1 4.82797 14.272 1 9.55 1C4.82797 1 1 4.82797 1 9.55C1 14.272 4.82797 18.1 9.55 18.1Z"
                  stroke="#c41230"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M19 19L17.2 17.2"
                  stroke="#c41230"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </Link>
        {/* NOTIFIKASI */}
        {/* <div className="ml-3">
          <Link to="/notifikasi">
            <div className="w-[48px] h-[48px] bg-involuntir-bgicon rounded-full flex justify-center items-center">
              <img
                src="/icon/landing-page/bell.svg"
                className="rounded-full mx-w-[45px] mx-h-[48px]"
                alt=""
              />
            </div>
          </Link>
        </div> */}
        {/* SIMPAN */}
        {/* <div className="ml-3">
          <Link to={getToken() ? '/simpan' : '/login'}>
            <div className="w-[48px] h-[48px] bg-involuntir-bgicon rounded-full flex justify-center items-center">
              <svg
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.7393 20.909C12.3955 21.0303 11.8292 21.0303 11.4854 20.909C8.55281 19.9079 2 15.7315 2 8.65281C2 5.52809 4.51798 3 7.62247 3C9.46292 3 11.091 3.88989 12.1124 5.26517C13.1337 3.88989 14.7719 3 16.6022 3C19.7067 3 22.2247 5.52809 22.2247 8.65281C22.2247 15.7315 15.6719 19.9079 12.7393 20.909Z"
                  fill="#c41230"
                />
              </svg>
            </div>
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default Header
