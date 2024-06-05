import axios from 'axios'
import { API_URL } from 'config/api'
import { useEffect } from 'react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'
import BackButton from 'components/BackButton'
import Spinner from 'components/loaders/Spinner'
import { useContext } from 'react'
import { UserContext } from 'context/UserContext'
import { TitleNameContext } from 'context/TitleNameContext'
import {
  getDataDonasi,
  getReferal,
  getToken,
  removeDataDonasi,
  setDonasiBalanceBerhasil,
  setIdTransaksi,
  getIdTransaksi,
  removeIdTransaksi,
  setPartisipasiBerhasil
} from 'utils/cookiesHooks'

import { useOnlineStatus } from 'utils/onlineStatus'
// import { connect } from 'react-redux'



import 'index.css'

function KonfirmasiFullyFunded({ }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pilihMetodeActive, setPilihMetodeActive] = useState(false)
  const [data, setData] = useState([])
  const [dataAktivitas, setDataAktivitas] = useState({})
  const [dataUser, setDataUser] = useState({})
  const [checked, setChecked] = useState(false)
  const [checked2, setChecked2] = useState(false)
  const [active, setActive] = useState(0)
  const [referalStatus, setReferalStatus] = useState('pending')
  const [pilihanMetode, setPilihanMetode] = useState(false)
  const [namaLengkap, setNamaLengkap] = useState('')
  const [email, setEmail] = useState('')
  const [noHp, setNoHp] = useState('')
  const [referal, setReferal] = useState('')
  const [pesan, setPesan] = useState('')
  const [akunLinkedIn, setAkunLinkedIn] = useState('')
  const [value, setValue] = useState('')
  const [method, setMethod] = useState('')
  const [click, setClick] = useState(false)
  const isOnline = useOnlineStatus()

  const [tautan, setTautan] = useState()
  const [ownerActivity, setOwnerActivity] = useState(false)
  const [loading, setLoading] = useState(true)

  const user = useContext(UserContext)
  const { slug } = useParams()
  const history = useHistory()

  const { handleSetTitle } = useContext(TitleNameContext)

  const temp = getDataDonasi() ? JSON.parse(getDataDonasi()) : ''

  const getData = async () => {
    setLoading(true)
    let gettingData = await axios.get(`${API_URL}/api/aktivitas/byslug/${slug}`)
    let gettingUserData = await axios.get(`${API_URL}/api/user`)
    let response = await gettingData.data
    let responseUser = await gettingUserData.data
    // console.log(response)
    // console.log(responseUser)
    setDataAktivitas(response)
    setDataUser(responseUser)
    // console.log(response.data.activity.batas_waktu)
    setTautan(response.data.activity.tautan)
    if (user?.user?.username === response?.data?.user[0]?.username) {
      setOwnerActivity(true)
    }
    setLoading(false)
    setIdTransaksi(response.data.kode_donasi)

    // setData(data)
  }

  useEffect(() => {
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dataAktivitas.data) {
      handleSetTitle(dataAktivitas.data.activity.judul_activity)
    }
    // clean up
    return () => handleSetTitle('peduly')
  }, [dataAktivitas]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setReferalStatus('pending')
    const delayDebounceFn = setTimeout(
      async () => {
        let getData = await axios.get(
          `${API_URL}/api/donation/checkreferal?referal=${referal}`
        )
        let response = await getData.data.status
        if (response === 202) {
          setReferalStatus('invalid')
        } else if (response === 201) {
          setReferalStatus('success')
        } else {
          setReferalStatus('invalid')
        }
      },
      referal ? 0 : 500
    )
    return () => clearTimeout(delayDebounceFn)
  }, [referal]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (dataUser.user && dataUser.user.no_telp) {
      setNoHp(dataUser.user.no_telp)
    }
  }, [dataUser.user]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  const handleOnSubmit = async (e) => {
    setClick(true)
    e.preventDefault()
    await axios
      .post(
        `${API_URL}/api/donation/${'emoney'
        }?nomor_ponsel=${formattedNoHp
        }&akun_linkedin=${akunLinkedIn
        }&pesan_baik=${pesan
        }&user_id=${user.user.id && !checked ? user.user.id : 1
        }&activity_id=${dataAktivitas.data && dataAktivitas.data.activity && dataAktivitas.data.activity && dataAktivitas.data.activity.id
        }${method.metode === 'bank_transfer'
          ? `&bank_name=${method.nama}`
          : method.metode === 'emoney'
            ? `&emoney_name=${method.nama}`
            : ''
        }`
      )
      .then((response) => {
        setIdTransaksi(response.data.kode_donasi)
        history.push({
          pathname: `/aktivitas/:slug/partisipasi/berhasil`,
          state: {
            H1: 'Selamat!',
            P1: 'Duduk manis, tunggu kabar terbaru dari penyelenggara :)',
            hrf: 'profile',
            Button: 'Kembali',
          },
        })
      })
      .catch((err) => {
        console.log(err)
      })
    // setClick(true)
    // e.preventDefault()
    // setIdTransaksi(response.data.kode_donasi)
    // setPartisipasiBerhasil()
    // history.push({
    //   pathname: `/aktivitas/:slug/partisipasi/berhasil`,
    //   state: {
    //     H1: 'Selamat!',
    //     P1: 'Duduk manis, tunggu kabar terbaru dari penyelenggara :)',
    //     hrf: 'profile',
    //     Button: 'Kembali',
    //   },
    // })

    // await axios
    //   .post(
    //     `${API_URL}/api/donation/${
    //       'emoney'
    //     }?nomor_ponsel=${
    //       formattedNoHp
    //     }&akun_linkedin=${
    //       akunLinkedIn
    //     }&pesan_baik=${
    //       pesan
    //     }&user_id=${
    //       user.user.id && !checked ? user.user.id : 1
    //     }&activity_id=${data.id}${
    //       method.metode === 'bank_transfer'
    //         ? `&bank_name=${method.nama}`
    //         : method.metode === 'emoney'
    //         ? `&emoney_name=${method.nama}`
    //         : ''
    //     }`
    //   )
    //   .then((response) => {
    //       setIdTransaksi(response.data.kode_donasi)
    //       history.push({
    //         pathname: `/aktivitas/${slug}/berhasil`,
    //       })
    //   })
    //   .catch((err) => {
    //     console.log(err)
    //   })
  }

  function nominal() {
    if (method.metode === 'transfer_manual') {
      return (
        parseInt(value.replaceAll('.', '')) +
        Math.floor(Math.random() * 200) +
        1
      )
    } else {
      return parseInt(value.replaceAll('.', ''))
    }
  }

  const handleChangePhoneNumber = (e) => {
    // setPhoneNumber(e.target.value);
    // const result = e.target.value.replace(/\D/g, '')
    // setNoHp(result)

    const rawInput = e.target.value;
    const cleanedInput = rawInput.replace(/\D/g, ''); // Remove non-numeric characters
    const minPhoneNumberLength = 8;

    // Validate minimum length
    if (cleanedInput.length >= minPhoneNumberLength) {
      setNoHp(cleanedInput);
    } else {
      setNoHp('')
    }
  }

  const handleChangePesan = (e) => {
    setPesan(e.target.value);
  }

  function validator() {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (
      method.metode === 'emoney' ||
      method.metode === 'shopeepay' ||
      method.metode === 'dana'
    ) {
      return (value ? parseInt(value.replaceAll('.', '')) : 0) >= 100 && method
    } else if (method.nama === 'tunai') {
      return (
        (value ? parseInt(value.replaceAll('.', '')) : 0) >= 100 &&
        method &&
        (referalStatus === 'success' || getReferal())
      )
    } else if (method.metode === 'balance') {
      return (
        (value ? parseInt(value.replaceAll('.', '')) : 0) >= 100 &&
        method &&
        user?.user?.balance?.amount >= parseInt(value.replaceAll('.', ''))
      )
    } else {
      return (
        (value ? parseInt(value.replaceAll('.', '')) : 0) >= 10000 && method
      )
    }
  }

  const phoneNumberValidator = () => {
    return noHp !== undefined && noHp !== null && noHp.trim() !== '';
  };

  const formattedNoHp = noHp.startsWith('0') ? noHp : '0' + noHp;

  return (
    <>
      <div className="mx-auto" style={{ maxWidth: '430px' }}>
        <div className="">
          <div className="flex flex-col" style={{ marginTop: 78 }}>
            <h1 className="my-8 text-xl text-peduly-primary font-semibold text-[22px]">
              Let’s doing good, It’s free!
            </h1>
            <p className="text-sm text-peduly-dark font-normal overflow-hidden overflow-ellipsis whitespace-normal">
              Selangkah lagi, Beri tahu <span className='font-bold' >{dataAktivitas.data && dataAktivitas.data.user && dataAktivitas.data.user[0] && dataAktivitas.data.user[0].name}</span> tentangmu dengan menjawab beberapa pertanyaan dibawah ini.
            </p>
            <div className="flex justify-between py-[14px] items-center text-sm font-normal text-[#212121]">
              <h2>Nomor Ponsel<span className='text-[#c41230]'>*</span></h2>
            </div>
            <div
              className="flex rounded-full h-[60px] items-center text-xl font-medium px-[23px] border border-[#CACACA]"
            >
              <label htmlFor="nomor_telepon" className='text-peduly-primary text-[16px]'>+62</label>
              <input
                id="nomor_telepon"
                className="text-left w-full text-peduly-primary text-[16px] outline-none focus:ring-transparent border-none bg-transparent text-[#717171] placeholder-[#717171] pl-[10px] font-medium"
                type="text"
                onChange={handleChangePhoneNumber}
                // placeholder="test"
                // placeholder={dataUser.user && dataUser.user.no_telp}
                pattern="[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*"
                defaultValue={noHp ? noHp.replace(/^0+/, '') : ''}
                inputMode="numeric"
                maxLength="12"
                minLength="9"
              />
            </div>
            <hr className="border-t-[1px] border-solid border-peduly-light mb-6" />
            <div className="flex justify-between py-[14px] items-center text-sm font-normal text-[#212121]">
              <h2>Akun Linkedin (opsional)</h2>
            </div>
            <div
              className="flex rounded-full h-[60px] items-center text-xl font-medium px-[23px] border border-[#CACACA]"
            >
              <input
                id="akunLinkedIn"
                className="text-left w-full text-peduly-primary text-[16px] outline-none focus:ring-transparent border-none bg-transparent placeholder-[#717171] pl-[10px] font-medium"
                type="text"
                placeholder='URL Profile'
              />
            </div>
            <hr className="border-t-[1px] border-solid border-peduly-light mb-6" />
            <div className="flex justify-between py-[14px] items-center text-sm font-normal text-[#212121]">
              <h2>Tulis Pesan (opsional)</h2>
            </div>
            <div
              className="flex rounded-[30px] h-[161px] items-start text-xl font-medium px-[23px] border border-[#CACACA] pt-[20px] overflow-auto"
            >
              <textarea
                id="nomor_telepon"
                className="text-left w-full h-full text-[16px] outline-none focus:ring-transparent border-none bg-transparent placeholder-[#717171] pl-[10px] font-medium pt-0"
                type="text"
                onChange={handleChangePesan}
                placeholder='Tulis tentang kamu, motivasi atau pengalaman yang pernah kamu lakukan  sebelumnya'
                maxLength="100"
              />
            </div>
          </div>
          <div className="w-full h-[84px] bg-white flex justify-center items-center max-w-[430px] py-[12px]">
            <span className="w-[100%]">
              {!isOnline ? (
                <>
                  <button className="bg-[#E4E4E4]  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] pointer-events-none">
                    You're Offline
                  </button>
                </>
              ) : (
                <>
                  {phoneNumberValidator() ? (
                    !click ? (
                      <button
                        className="bg-peduly-primary  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] "
                        onClick={handleOnSubmit}
                      >
                        Donasi Sekarang
                      </button>
                    ) : (
                      <button className="bg-[#E4E4E4]  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] pointer-events-none">
                        <Spinner color={'#c41230'} />
                      </button>
                    )
                  ) : (
                    <button className="bg-[#E4E4E4]  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] pointer-events-none">
                      Lanjut
                    </button>
                  )}
                </>
              )}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}

// const mapStateToProps = (state) => ({
//   data: state.data,
// });

export default KonfirmasiFullyFunded
// export default connect(mapStateToProps)(KonfirmasiFullyFunded);
