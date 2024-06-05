import { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom'
import {
  getDonasiBalanceBerhasil,
  removeDonasiBalanceBerhasil,
} from 'utils/cookiesHooks'

function DonasiBalanceBerhasil() {
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
      <div className="flex items-center justify-center h-[90vh] flex-col text-center">
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="244"
            height="193"
            fill="none"
            viewBox="0 0 244 193"
          >
            <path
              fill="#c41230"
              d="M122 157c33.137 0 60-26.863 60-60s-26.863-60-60-60-60 26.863-60 60 26.863 60 60 60z"
              opacity="0.5"
            ></path>
            <path
              fill="#c41230"
              d="M122 147c27.614 0 50-22.386 50-50s-22.386-50-50-50-50 22.386-50 50 22.386 50 50 50z"
            ></path>
            <path
              fill="#fff"
              d="M116.054 119.888a6.23 6.23 0 01-3.744-1.244l-.067-.051-14.1-10.786a6.272 6.272 0 01-2.247-6.595 6.261 6.261 0 015.237-4.595 6.265 6.265 0 014.635 1.244l9.133 7.004 21.583-28.157a6.26 6.26 0 018.782-1.16h.001l-.133.187.137-.186a6.27 6.27 0 011.159 8.784l-25.386 33.104a6.266 6.266 0 01-4.984 2.443l-.006.008z"
            ></path>
            <circle cx="61" cy="162" r="5" fill="#34A853"></circle>
            <circle cx="139" cy="181" r="5" fill="#2E9BCC"></circle>
            <circle cx="194" cy="90" r="5" fill="#2E9BCC"></circle>
            <circle cx="102" cy="12" r="5" fill="#E7513B"></circle>
            <circle cx="48" cy="70" r="5" fill="#E7513B"></circle>
            <circle cx="121" cy="23" r="3" fill="#34A853"></circle>
            <circle cx="122" cy="173" r="3" fill="#E7513B"></circle>
            <path
              stroke="#E7513B"
              strokeLinecap="round"
              strokeWidth="4"
              d="M171 154c7.934 4.773 9.953 8.442 11.627 15.78"
            ></path>
            <path
              stroke="#34A853"
              strokeLinecap="round"
              strokeWidth="4"
              d="M177.5 44c9.5 1.5 18-4.5 18-12.5s.5-15 9.675-17.639"
            ></path>
            <path
              stroke="#2E9BCC"
              strokeLinecap="round"
              strokeWidth="4"
              d="M52.876 121.596C41 132.5 24 120.5 28.5 115.5S39 129 30 136.5s-21.405 2.623-21.405 2.623"
            ></path>
          </svg>
        </span>
        <h1 className="text-2xl font-medium text-peduly-primary mt-[31px]">
          Berhasil Terkirim
        </h1>
        <p className="text-base text-peduly-subtitle font-normal max-w-[285px] mt-[17px]">
          Duduk manis, tunggu kabar terbaru dari penyelenggara :)
        </p>
      </div>
      <div className="fixed bottom-0 w-full h-[84px] bg-white flex justify-center items-center max-w-[430px] py-[12px] z-40">
        <span className="w-[90%]">
          <button
            className="bg-peduly-primary  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] "
            onClick={() => history.push('/')}
          >
            Kembali ke Beranda
          </button>
        </span>
      </div>
    </div>
  )
}

export default DonasiBalanceBerhasil
