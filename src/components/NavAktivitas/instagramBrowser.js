import { useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import ArrowTop from '../arrow-top.json'
import { CopyToClipboard } from 'react-copy-to-clipboard'


const InstagramBrowser = ({ slug }) => {
  const [copy, setCopy] = useState(false)

  const handleCopy = () => {
    setCopy(!copy)
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  }
  return (
    <div className="w-full h-full fixed bg-white z-50 max-w-[430px] overflow-x-hidden overflow-y-auto no-scrollbar left-1/2 transform -translate-x-1/2">
      <div className="absolute right-[20px] top-[-15px]">
        <Lottie animationData={ArrowTop}
          style={{ width: "25px", height: "auto" }}
        />
      </div>
      <div className="flex flex-col mt-[20vh] mx-[20px] items-center border-peduly-primary border p-[20px] rounded-[15px]" style={{ backgroundColor: 'rgba(2, 136, 209, 0.12)' }}>
        <h1 className="text-lg font-medium text-peduly-primary">Perhatian</h1>
        <p className="text-sm font-normal text-black mt-[4px] text-center">
          Kamu terdeteksi membuka tautan melalui sosial media. Untuk kenyamanan pengguna silahkan buka tautan ini di browser eksternal.
        </p>
      </div>
      <div className="mt-[3vh] mx-[20px]">
        <h1 className="text-md font-semibold">Ikuti step berikut:</h1>
        <li className="text-sm font-normal text-black">
          <span className="inline-flex items-center">
            Klik titik tiga di pojok kanan atas
            <div className="border-[1.5px] border-black rounded-md p-[1.5px] ml-1">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="14px"
                height="14px"
                viewBox="0 0 596.000000 599.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g transform="translate(0.000000,599.000000) scale(0.100000,-0.100000)" fill="#000000" stroke="none">
                  <path d="M2785 5671 c-212 -62 -382 -239 -431 -449 -23 -99 -15 -245 19 -342 101 -285 396 -454 688 -396 131 27 219 74 315 170 122 122 184 267 184 431 0 274 -195 521 -465 590 -80 20 -233 18 -310 -4z" />
                  <path d="M2792 3580 c-108 -29 -187 -75 -273 -160 -120 -120 -179 -260 -179 -430 0 -166 58 -308 174 -425 131 -132 286 -193 466 -182 273 16 492 197 560 463 47 184 1 382 -124 536 -144 177 -397 257 -624 198z" />
                  <path d="M2820 1495 c-86 -19 -213 -83 -277 -140 -66 -58 -144 -174 -173 -256 -30 -88 -38 -248 -16 -343 50 -213 237 -401 448 -451 82 -19 218 -19 293 0 202 51 371 209 436 406 33 102 34 262 2 364 -59 186 -205 336 -392 401 -91 32 -229 40 -321 19z" />
                </g>
              </svg>
            </div>
          </span>
        </li>
        <li className="text-sm font-normal text-black">
          Pilih Buka di browser eksternal / chrome
        </li>
      </div>
      <div className="mt-[3vh] mx-[20px]">
        <h1 className="text-md font-semibold">Alternatif lain:</h1>
        <li className="text-sm font-normal text-black">
          Salin tautan kemudian buka di browser
        </li>
      </div>

      <div className="mx-[20px] mt-[2vh]">
        <div className="flex justify-between items-center w-full border-2 rounded-full h-[60px] px-[20px] mt-[16px]">
          <span className="truncate">peduly.com/{slug}</span>
          <div className="cursor-pointer">
            <CopyToClipboard
              text={`peduly.com/${slug}`}
              onCopy={handleCopy}
            >
              <svg
                width={25}
                height={24}
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.0972 13.4V16.4C17.0972 20.4 15.488 22 11.4652 22H7.64347C3.62062 22 2.01147 20.4 2.01147 16.4V12.6C2.01147 8.6 3.62062 7 7.64347 7H10.6606"
                  stroke="#c41230"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17.0972 13.4H13.8789C11.4652 13.4 10.6606 12.6 10.6606 10.2V7L17.0972 13.4Z"
                  stroke="#c41230"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.6663 2H15.6891"
                  stroke="#c41230"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.04004 5C7.04004 3.34 8.3877 2 10.0572 2H12.6922"
                  stroke="#c41230"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.1256 8V14.19C22.1256 15.74 20.8584 17 19.2996 17"
                  stroke="#c41230"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M22.1256 8H19.1085C16.8456 8 16.0913 7.25 16.0913 5V2L22.1256 8Z"
                  stroke="#c41230"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </CopyToClipboard>
          </div>
        </div>
        {copy && (
          <div className="text-center text-peduly-primary">
            <p className="mt-2 text-sm">Copied to cliboard!</p>
          </div>
        )}
      </div>
      {/* <div className="bg-[#f2f2f2] bg-opacity-50 rounded-[15px] mt-[2vh] mx-[20px] mb-[24px]">
          <p className="mx-[20px] text-sm font-normal mt-[20px]">
            Tips: Salin link kemudian tempel dimana saja.
          </p>
        </div> */}
    </div>
  )
}

export default InstagramBrowser
