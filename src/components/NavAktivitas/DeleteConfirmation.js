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

const DeleteConfirmation = ({ onClickOutside, status, data }) => {
  const clickRef = React.useRef()
  useClickOutside(clickRef, onClickOutside)

  const history = useHistory()
  const { slug } = useParams()

  const deleteActivity = async () => {
    await axios
      .delete(`${API_URL}/api/aktivitas/${data?.activity?.id}/delete`)
      .then(() => {
        setEditBerhasil()
        history.push({
        pathname: `/aktivitas/${slug}/edit/berhasil`,
        state: {
          H1: 'Berhasil Hapus Aktivitas!',
          hrf: 'aktivitas-saya',
          Button: 'Kembali',
        },})
      })
  }

  return (
    <div className={(!status && 'hidden') + ''}>
      <div
        className="fixed bottom-0 z-50 bg-white w-full h-[189px] rounded-t-[15px] overflow-hidden left-1/2 transform -translate-x-1/2"
        ref={clickRef}
        style={{ maxWidth: '430px' }}
      >
        <div className="text-center my-[40px] mx-[36px]">
          <h1 className="text-lg font-normal">Yakin ingin menghapus aktivitas ini?</h1>
        </div>
        <div className="flex items-center justify-center pb-3 text-base font-normal">
          <button
            className="bg-[#E4E4E4] text-[#717171] rounded-[15px] px-[63px] h-[60px] "
            onClick={() => onClickOutside(true)}
          >
            Batal
          </button>
          <button
            className="bg-peduly-primary text-white rounded-[15px] px-[63px] h-[60px] ml-[12px]"
            ref={clickRef}
            onClick={() => deleteActivity()}
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteConfirmation
