import React, { useState } from 'react'

const WarningModal = () => {
  const [isOpen, setisOpen] = useState(true)
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none cursor-pointer" onClick={() => setisOpen(false)}>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative z-50 bg-white rounded-lg shadow-lg p-6 max-w-md">
        <p className='text-center font-bold text-xl text-peduly-secondary'>Pengumuman</p>
        <p className='text-center font-semibold'>Saat ini, aplikasi sedang dalam tahap pengembangan. Mohon untuk tidak melakukan pembuatan ataupun transaksi aktivitas.</p>
        <p className='text-center text-md'>Kami mohon maaf atas ketidaknyamanannya</p>
      </div>
    </div>
  )
}

export default WarningModal
