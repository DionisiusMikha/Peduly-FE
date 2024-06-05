import React, { useEffect } from 'react'
import { API_URL } from 'config/api'
import scooter from '../../assets/img/Scooter.jpg'
import TikTokIcon from '../../assets/icons/TikTokIcon.svg'
import InstagramIcon from '../../assets/icons/InstagramIcon.svg'
import TwitterIcon from '../../assets/icons/TwitterIcon.svg'
import LinkedinIcon from '../../assets/icons/LinkedinIcon.svg'

import { useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import AktivitasAktif from 'components/Akun/AktivitasAktif'
import AktivitasBerakhir from 'components/Akun/AktivitasBerakhir'

export default function AkunOrganisasi() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [dataUser, setDataUser] = useState(null)
  const [dataAktivitas, setDataAktivitas] = useState(null)
  const [loading, setLoading] = useState(true)

  const { slug } = useParams()

  useEffect(async () => {
    await axios
      .get(`${API_URL}/api/user/${slug.substring(1)}`)
      .then((response) => {
        setDataUser(response.data.data.user)
        setDataAktivitas(response.data.data.activities)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <div
      style={{ maxWidth: '430px' }}
      className="mx-auto overflow-hidden overflow-y-auto min-h-screen"
    >
      {/* NAVBAWAH */}
      {/* <NavLink /> */}

      <div className="w-full max-w-[430] h-[138px]">
        {dataUser?.banner !== null ? (
          <img
            src={`${API_URL}${dataUser?.banner}`}
            alt=""
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-[#415557] to-[#5B86E5]"></div>
        )}
      </div>
      {dataUser?.photo !== null ? (
        <img
          src={`${API_URL}${dataUser?.photo}`}
          style={{
            marginTop: '-43px',
          }}
          alt=""
          className="relative w-[86px] h-[86px] border-4 border-white rounded-full ml-5 object-cover"
        />
      ) : (
        <img
          src="/images/no-avatar.png"
          style={{
            marginTop: '-43px',
          }}
          alt=""
          className="relative w-[86px] h-[86px] border-4 border-white rounded-full ml-5 object-cover"
        />
      )}
      <div className="px-5 mt-3">
        <h1 className="text-lg text-peduly-dark font-semibold self-center">
          {dataUser?.name}
        </h1>
        <div className="text-peduly-subtitle mt-[1px]">
          @{dataUser?.username}
        </div>

        <div className="mt-3 mb-5">{dataUser?.description}</div>

        <div className="w-full flex items-center gap-3">
          <img
            src={TikTokIcon}
            alt="ikon tik tok, klik disini bila anda ingin mengecek tik tok organsisasi terkait"
            className="cursor-pointer"
          />
          <img
            src={InstagramIcon}
            alt="ikon instagram, klik disini bila anda ingin mengecek tik tok organsisasi terkait"
            className="cursor-pointer"
          />
          <img
            src={TwitterIcon}
            alt="ikon twitter, klik disini bila anda ingin mengecek tik tok organsisasi terkait"
            className="cursor-pointer"
          />
          <img
            src={LinkedinIcon}
            alt="ikon linkedin, klik disini bila anda ingin mengecek tik tok organsisasi terkait"
            className="cursor-pointer"
          />
        </div>
      </div>

      <div className="px-5 mt-3">
        <div className="flex gap-6">
          <li
            className={`font-semibold text-base py-5 inline-block cursor-pointer ${
              activeIndex === 1
                ? ' border-b-2 border-peduly-primary text-peduly-dark'
                : 'text-peduly-subtitle'
            }`}
            onClick={() => {
              setActiveIndex(1)
            }}
          >
            Aktivitas Aktif
          </li>
          <li
            className={`font-semibold text-base py-5 inline-block cursor-pointer ${
              activeIndex === 2
                ? ' border-b-2 border-peduly-primary text-peduly-dark'
                : 'text-peduly-subtitle'
            }`}
            onClick={() => {
              setActiveIndex(2)
            }}
          >
            Berakhir
          </li>
        </div>
      </div>
      {activeIndex === 1 && (
        <AktivitasAktif
          activeIndex={activeIndex}
          loading={loading}
          dataAktivitas={dataAktivitas}
        />
      )}
      {activeIndex === 2 && (
        <AktivitasBerakhir
          activeIndex={activeIndex}
          loading={loading}
          dataAktivitas={dataAktivitas}
        />
      )}
    </div>
  )
}
