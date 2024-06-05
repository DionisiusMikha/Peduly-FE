import axios from 'axios'
import { API_URL } from 'config/api'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { setEditBerhasil } from 'utils/cookiesHooks'

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }
  React.useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}

const LengkapiConfirmation = ({ onClickOutside, status, source}) => {
  const clickRef = React.useRef()
  useClickOutside(clickRef, onClickOutside)

  const history = useHistory()
  const { slug } = useParams()

  const lengkapiData = async () => {
    history.push({
      pathname: `/ubah-profile`,
      state: { source: source }
    });
  }

  return (
    <div className={(!status && 'hidden') + ''}>
      <div
        className="fixed w-[374px] left-1/2 transform -translate-x-1/2 bottom-75 bottom-1/3 z-50 bg-white rounded-[30px] overflow-hidden"
        ref={clickRef}
        style={{ maxWidth: '430px' }}
      >
        <div className="text-center my-[24px] mx-[36px]">
            <p className="text-sm font-normal text-[14px]">
                Sebelum daftar jadi volunteer silahkan lengkapi data diri kamu terlebih dahulu ya
            </p>
        </div>
        <div className="flex items-center justify-center pb-3 text-base font-normal">
          <button
            className="bg-peduly-primary text-base text-white rounded-[15px] px-[63px] h-[60px] ml-[12px]"
            ref={clickRef}
            onClick={() => lengkapiData()}
          >
            Lengkapi Data Diri Sekarang          
          </button>
        </div>
      </div>
    </div>
  )
}

export default LengkapiConfirmation
