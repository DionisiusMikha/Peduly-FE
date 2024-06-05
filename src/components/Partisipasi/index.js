import axios from 'axios'
import { API_URL } from 'config/api'
import { useEffect } from 'react'
import { useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
// import { useContext } from 'react'
// import { UserContext } from 'context/UserContext'
import {
  setPartisipasiBerhasil,
  getToken,
  // getDataPartisipan,
  removeDataPartisipan,
} from 'utils/cookiesHooks'
import BackButton from 'components/BackButton'

function Partisipasi() {
  const [data, setData] = useState([])
  const [userData, setUserData] = useState('')
  const [noHp, setNoHp] = useState('')
  const [pesan, setPesan] = useState('')
  const [linkedIn, setLinkedIn] = useState('')

  // const user = useContext(UserContext)
  const { slug } = useParams()
  const history = useHistory()

  // const temp = getDataPartisipan() ? JSON.parse(getDataPartisipan()) : ''

  useEffect(() => {
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getData = async () => {
    let gettingData = await axios.get(`${API_URL}/api/aktivitas/byslug/${slug}`)
    let response = await gettingData.data

    setUserData(response.data.user[0].name)
    setData(response.data.activity)
  }

  setTimeout(() => {
    removeDataPartisipan()
  }, 100)

  const handleChangePhoneNumber = (e) => {
    const result = e.target.value.replace(/\D/g, '')
    setNoHp(result)
  }

  const dataSend = new FormData()
  dataSend.append('nomor_hp', noHp || '')
  dataSend.append('akun_linkedin', linkedIn || '')
  dataSend.append('pesan', pesan || '')
  dataSend.append('activity_id', data.id || '')

  const handleOnSubmit = async () => {
    await axios
      .post(`${API_URL}/api/participation`, dataSend, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setPartisipasiBerhasil()
        history.push(`/aktivitas/${slug}/partisipasi/berhasil`)
      })
      .catch((error) => {
        console.error(error)
        // setError(true)
      })
  }

  if (!getToken()) {
    ;<Redirect to="/" />
  }

  function validator() {
    if (noHp === '') {
      return false
    } else {
      return true
    }
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="mx-auto" style={{ maxWidth: '430px' }}>
      <BackButton hrf={'1'} txt="Jadi Volunteer" />
      <div
        className="absolute min-h-screen pb-[84px] mx-auto"
        style={{ maxWidth: '430px' }}
      >
        <div className="px-5 mt-[72px]">
          <h1 className="text-2xl text-peduly-primary font-semibold py-8">
            Lets Doing Good!
          </h1>
          <p className="text-base text-peduly-dark font-normal mb-3">
            Selangkah lagi, beri tahu{' '}
            <span className="font-semibold">{userData}</span> tentangmu dengan
            menjawab beberapa pertanyaan dibawah ini.
          </p>
          <div className="my-3">
            <label className="font-semibold text-[14px]">
              Nomor Whatsapp <span className="text-peduly-primary">*</span>
            </label>
            <div className="w-full border-[1px] h-[60px] px-[20px] flex items-center rounded-full mt-[14px] border-[#CACACA]">
              <input
                className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                type="tel"
                placeholder="Nomor Ponsel"
                maxLength="14"
                value={noHp}
                onChange={handleChangePhoneNumber}
              />
            </div>
          </div>
          <div className="my-3">
            <label className="font-semibold text-[14px]">
              Akun Linkedin (opsional)
            </label>
            <div className="w-full border-[1px] h-[60px] px-[20px] flex items-center rounded-full mt-[14px] border-[#CACACA]">
              <input
                className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                type="text"
                placeholder="URL Profil"
                value={linkedIn}
                onChange={(e) => {
                  setLinkedIn(e.target.value)
                }}
              />
            </div>
          </div>
          <div className="my-3">
            <h2 className="font-semibold text-[14px] mb-[14px]">
              Tulis pesan (opsional)
            </h2>
            <span className="relative">
              <textarea
                className="outline-none border-[#E4E4E4] focus:ring-0 focus:border-[#E4E4E4] w-full border-[1px] rounded-[15px] h-[134px] py-[17px] px-[21px] text-sm font-normal placeholder-[#C4C4C4] resize-none"
                placeholder="Tulis tentang kamu, motivasi atau pengalaman kamu sebelumnya"
                maxLength={140}
                value={pesan}
                onChange={(e) => {
                  setPesan(e.target.value)
                }}
              ></textarea>
            </span>
          </div>
        </div>
        <div className="absolute bottom-5 inset-x-0 px-5">
          {validator() ? (
            <button
              className="bg-peduly-primary text-white w-full text-center font-bold rounded-full text-[18px] py-[18px] mt-[24px] h-[60px]"
              onClick={() => {
                handleOnSubmit()
              }}
            >
              Kirim
            </button>
          ) : (
            <button className="bg-peduly-light text-white w-full text-center font-bold rounded-full text-[18px] py-[18px] mt-[24px] h-[60px]">
              Kirim
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Partisipasi
