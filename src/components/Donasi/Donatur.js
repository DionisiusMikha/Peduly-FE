import React from 'react'
import IdrFormat from 'utils/IdrFormat'

const donaturList = [
  {
    id: 1,
    nama: 'Antoni felix M.',
    foto: '',
    jumlah_donasi: 50000,
    tanggal_donasi: '3 hari yang lalu',
  },
  {
    id: 2,
    nama: 'M. Felix Antoni',
    foto: '',
    jumlah_donasi: 30000,
    tanggal_donasi: 'sehari yang lalu',
  },
]

const Donatur = () => {
  return (
    <div className="whitespace-normal relative mt-[42px]">
      <div className="flex justify-between border-[1px] border-solid border-peduly-light rounded-full my-8 py-5 px-6">
        <p className="text-base text-peduly-subtitle font-normal">
          Donasi Terkumpul
        </p>
        <p className="text-base text-peduly-dark font-semibold">Rp3.056.100</p>
      </div>
      <div className="px-[10px]">
        {donaturList.map((donatur) => (
          <div
            key={donatur.id}
            className="grid grid-cols-12 items-start h-[65px] mb-[15px]"
          >
            <div className="w-[40px]">
              <img
                src={donatur.foto}
                alt=""
                onError={(e) => (e.target.src = '/images/no-avatar.png')}
                className="object-cover w-[40px] h-[40px] rounded-full"
              />
            </div>
            <div className="col-span-11 ml-[20px]">
              <h1 className="text-base font-bold">
                {donatur.nama}
                {/* {donatur.id === 1 ? 'Anonim' : donatur.nama} */}
              </h1>
              <h3 className="text-sm font-medium">
                Donasi {IdrFormat(donatur.jumlah_donasi)}
              </h3>
              <p className="text-xs font-light text-[#717171]">
                {donatur.tanggal_donasi}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Donatur
