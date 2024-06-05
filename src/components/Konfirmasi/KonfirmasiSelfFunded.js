import axios from 'axios'
import { API_URL } from 'config/api'
import { useEffect, useState } from 'react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
// import splitInDots from 'utils/splitDots'
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
} from 'utils/cookiesHooks'

import { useOnlineStatus } from 'utils/onlineStatus'
import IdrFormat from 'utils/IdrFormat'
import { METODE_PEMBAYARAN } from 'config/metodePembayaran'
// import { connect } from 'react-redux'

import 'index.css'
import { parseDateIndonesia } from 'utils/parseDate'

const KonfirmasiSelfFunded = () => {
  const [dataAktivitas, setDataAktivitas] = useState({})
  const [dataUser, setDataUser] = useState({})
  const [checked2, setChecked2] = useState(false)
  const [active, setActive] = useState(0)
  const [referalStatus, setReferalStatus] = useState('pending')
  const [switchPage, setSwitchPage] = useState("initial")
  const [noHp, setNoHp] = useState('');
  const [referal, setReferal] = useState('')
  const [value, setValue] = useState('')
  const [method, setMethod] = useState('')
  const [click, setClick] = useState(false)
  const [voucher, setVoucher] = useState('')
  const [currentVoucher, setcurrentVoucher] = useState()
  const isOnline = useOnlineStatus()

  const [tautan, setTautan] = useState()
  const [ownerActivity, setOwnerActivity] = useState(false)
  const [loading, setLoading] = useState(true)

  const user = useContext(UserContext)
  const { slug } = useParams()
  const history = useHistory()

  const { handleSetTitle } = useContext(TitleNameContext)

  const temp = getDataDonasi() ? JSON.parse(getDataDonasi()) : ''

  // console.log(noHp);

  const getData = async () => {
    setLoading(true)
    let gettingData = await axios.get(`${API_URL}/api/aktivitas/byslug/${slug}`)
    let gettingUserData = await axios.get(`${API_URL}/api/user`)
    let response = await gettingData.data
    let responseUser = await gettingUserData.data
    console.log(response)
    console.log(responseUser)
    setDataAktivitas(response)
    setDataUser(responseUser)
    // console.log(response.data.activity.batas_waktu)
    setTautan(response.data.activity.tautan)
    if (user?.user?.username === response?.data?.user[0]?.username) {
      setOwnerActivity(true)
    }
    setLoading(false)

    // setData(data)
  }
  console.log(voucher)
  // console.log(dataUser.user.no_telp)

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
    if (dataUser.user && dataUser.user.no_telp) {
      setNoHp(dataUser.user.no_telp)
    }
  }, [dataUser.user]) // eslint-disable-line react-hooks/exhaustive-deps

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
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  useEffect(() => {
    if (!dataAktivitas) return
    if (!voucher) setcurrentVoucher(null)
    else {
      setcurrentVoucher(dataAktivitas?.data?.vouchers.find(item => item.id === voucher))
    }
  }, [voucher])

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
  const phoneNumberValidator = () => {
    return noHp !== undefined && noHp !== null && noHp.trim() !== '';
  };

  const zeroRemover = noHp.startsWith('0') ? noHp.slice(1) : noHp;
  const formattedNoHp = '62' + zeroRemover;

  function handlePilihanMetode(step = 'initial') {
    if (!dataAktivitas.data) return
    setSwitchPage(step)
  }



  const handleChange = (e) => {
    const result = temp.value
      ? temp.value.replace(/\D/g, '')
      : e.target.value.replace(/\D/g, '')
        ? e.target.value.replace(/\D/g, '')
        : ''

    if (temp.value) {
      setValue(splitInDots(result))
    } else {
      setValue(e.target.validity.valid ? IdrFormat(result) : '')
    }
  }

  const splitInDots = (input) => {
    if (input === undefined) {
      return '';  // atau throw error sesuai kebutuhan aplikasi
    }

    const number = typeof input === 'string' ? parseFloat(input) : input;
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  function pilihMetode(pilih) {
    setChecked2(false)
    let select =
      !temp.method &&
      METODE_PEMBAYARAN.find(
        (pembayaran) =>
          pembayaran.metode === pilih.metode && pembayaran.nama === pilih.nama
      )
    if (temp.method) {
      setMethod(temp.method)
    } else {
      setMethod(select)
      handlePilihanMetode()
    }
  }

  if (active === 0) {
    if (temp.value) {
      handleChange()
    }
    if (temp.method) {
      pilihMetode()
    }
  }

  setTimeout(() => {
    removeDataDonasi()
  }, 100)

  const handleOnSubmit = async (e) => {
    setClick(true)
    e.preventDefault()
    console.log("method", method)
    const url = `${API_URL}/api/donation/${method.metode}`
    const postData = {
      "activity_id": dataAktivitas.data.activity.id,
      "user_id": dataUser.user.id,
      "nomor_ponsel": formattedNoHp,
      "metode": method.metode,
    }
    if (voucher) {
      postData["voucher_id"] = currentVoucher.id
      postData["used_voucher"] = true
    }

    if (method.metode === "bank_transfer") {
      postData['bank_name'] = method.nama
    } else {
      postData['emoney_name'] = method.nama
    }
    await axios.post(url, postData).then(response => {
      if (method.metode === 'balance') {
        setDonasiBalanceBerhasil()
        history.push({
          pathname: `/aktivitas/${slug}/berhasil`,
        })
      } else {
        setIdTransaksi(response.data.kode_donasi)
        history.push({
          pathname: `/aktivitas/${slug}/pembayaran/${response.data.kode_donasi}`,
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
  const isActivityPriceValid = () => {
    const activity = dataAktivitas.data && dataAktivitas.data.activity;

    // Pemeriksaan apakah properti tidak kosong
    return (
      activity &&
      activity.prices &&
      activity.prices[0] &&
      activity.prices[0].price !== undefined &&
      activity.prices[0].price !== null
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  const countDiscount = () => {
    if (!currentVoucher || currentVoucher.status === "not available") return

    const discount = parseFloat(currentVoucher?.presentase_diskon)
    if (isNaN(discount)) return
    return splitInDots(dataAktivitas?.data?.activity?.prices[0]?.price * discount / 100)
  }
  const countPrice = () => {
    let price = dataAktivitas?.data?.activity?.prices[0]?.price
    if (!voucher) return splitInDots(price)
    const discount = parseFloat(currentVoucher?.presentase_diskon)
    const finalPrice = price - (price * discount / 100)
    return splitInDots(finalPrice)
  }
  const switchRendering = () => {

    switch (switchPage) {
      case "payment":
        return (
          <MetodePembayaran
            handlePilihanMetode={handlePilihanMetode}
            nominal={nominal}
            pilihMetode={pilihMetode} />
        )
      case "voucher":
        return (<>
          <PilihVoucher
            handlePilihanMetode={handlePilihanMetode}
            listVoucher={dataAktivitas.data.vouchers}
            voucher={voucher}
            setSwitchPage={setSwitchPage}
            setVoucher={setVoucher} />
        </>)
      default:
        return (<div className="flex flex-col" style={{ maxWidth: '430px', marginTop: 98 }}>
          <div className='px-4'>
            <div className='rounded-[15px] border flex p-3 gap-3 items-center hover:cursor-pointer' onClick={() => {

            }}>
              <img
                src={dataAktivitas.data?.activity?.foto_activity || ''}
                alt=""
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/images/no-picture.png'
                }}
                className="object-cover w-[80px] h-[80px]"
              />
              <div className='font-semibold w-full text-sm'>
                {dataAktivitas.data?.activity?.judul_activity}
              </div>
            </div>
          </div>
          <div className='my-[30px]'>
            <p className='font-semibold'>Nomor Ponsel <sup className='text-peduly-primary'>*</sup></p>
            <div className='border-b focus-within:border-peduly-primary w-full flex gap-2 items-center'>
              <div className='text-peduly-subtitle'>
                +62
              </div>
              <input id='nomor_telepon'
                className='outline-none border-none focus:ring-0 w-full'
                type="text"
                onChange={handleChangePhoneNumber}
                pattern="[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*[0-9]*"
                defaultValue={noHp ? noHp.replace(/^0+/, '') : ''}
                inputMode="numeric"
                maxLength="12"
                minLength="9"
              />
            </div>
          </div>
          <div className='flex h-3 bg-[#F4F4F4] -mx-4' />
          <div className='mt-[30px] '>
            <p className='font-semibold'>Voucher</p>
            <div className='flex justify-between items-center gap-4 hover:cursor-pointer pt-3 pb-2' onClick={() => handlePilihanMetode("voucher")}>
              <div>
                <img src="/icon/voucher.svg" alt="" width={24} />
              </div>
              <div className={`font-normal text-sm ${voucher || 'text-peduly-subtitle'} w-full`}>{voucher ? `${currentVoucher?.name_voucher} (${currentVoucher && parseFloat(currentVoucher.presentase_diskon)}%)` : 'Lihat voucher saya'}</div>
              <div>
                <img src="/icon/arrow-right.svg" alt="" />
              </div>
            </div>
          </div>
          <hr className='mt-3' />
          <div className='my-4'>
            <p className='font-semibold'>Metode Pembayaran</p>
            <div className='flex justify-between items-center gap-4 hover:cursor-pointer pt-3 pb-2' onClick={() => handlePilihanMetode("payment")}>
              {method ? (<>
                <div>
                  <img src={method.image} alt="" className='w-full max-w-[60px]' />
                </div>
                <div className='font-normal text-sm w-full'>{method.label}</div>
                <div>
                  <img src="/icon/arrow-right.svg" alt="" />
                </div>
              </>) : (<>
                <div>
                  <img src="/icon/payment.svg" alt="" width={24} />
                </div>
                <div className='font-normal text-sm text-peduly-subtitle w-full'>Pilih metode pembayaran</div>
                <div>
                  <img src="/icon/arrow-right.svg" alt="" />
                </div>
              </>)}
            </div>
          </div>
          <div className='flex h-3 bg-[#F4F4F4] -mx-4' />
          <div>
            <p className='font-semibold mt-[30px]'>Rincian Pembayaran</p>
            <div className='flex justify-between text-sm text-peduly-subtitle mt-5'>
              <p>Biaya</p>
              <p>Rp. {splitInDots(dataAktivitas?.data?.activity?.prices[0]?.price)}</p>
            </div>
            {voucher && (<>
              <div className='flex justify-between text-sm text-peduly-subtitle mt-3'>
                <p>Potongan Harga</p>
                <p>Rp. {countDiscount()}</p>
              </div>
            </>)}
            <hr className='border-dashed mt-5 ' />
            <div className='mt-5 flex justify-between text-peduly-primary font-semibold'>
              <p>Total Biaya </p>
              <p>Rp. {countPrice()}</p>
            </div>
          </div>
          <div className="">
            <div className="">
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
                      {phoneNumberValidator() && method && isActivityPriceValid() ? (
                        !click ? (
                          <button
                            className="bg-peduly-primary  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] "
                            onClick={handleOnSubmit}
                          >
                            Daftar Sekarang
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
        </div>)
    }
  }
  return (
    <>
      <div className="mx-auto" style={{ maxWidth: '430px' }}>
        <div className="">
          {switchRendering()}
        </div>
      </div>
    </>
  )
}

export default KonfirmasiSelfFunded


const MetodePembayaran = ({ handlePilihanMetode, nominal, pilihMetode }) => {
  return (
    <div className="flex -mx-6 justify-center">
      <div className="container mx-auto max-w-[430px] min-h-screen">
        <div
          className="fixed z-50 top-0 bg-white"
          style={{
            boxShadow: '0 5px 5px -5px rgb(0 0 0 / 0.1)',
          }}
        >
          <div className="w-[430px]">
            <div className="mx-[20px] inline-flex items-center h-[72px]">
              <div
                onClick={() => handlePilihanMetode()}
                className="cursor-pointer"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.57 5.92999L3.5 12L9.57 18.07"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20.4999 12H3.66992"
                    stroke="#292D32"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className=" relative ml-[16px] text-[16px] leading-[21.79px] font-medium mt-1">
                Metode Pembayaran
              </span>
            </div>
          </div>
        </div>
        <div className="bg-[#E4E4E44D] mt-[72px]">
          <p className="px-[20px] py-[22px] flex flex-col font-medium text-small">
            Pembayaran QRIS (verifikasi otomatis)
          </p>
        </div>
        <div
          className={`space-y-6 mx-[20px] my[24px] ${nominal() >= 1 ? '' : ''
            }`}
        >
          <div
            className="mt-[20px] flex flex-row items-center cursor-pointer"
            onClick={() => pilihMetode({ metode: 'emoney', nama: 'gopay' })}
          >
            <div className="w-[60px] flex justify-center">
              <svg
                width={54}
                height={13}
                viewBox="0 0 54 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.22895 12.4579C9.6691 12.4579 12.4579 9.6691 12.4579 6.22895C12.4579 2.78879 9.6691 0 6.22895 0C2.78879 0 0 2.78879 0 6.22895C0 9.6691 2.78879 12.4579 6.22895 12.4579Z"
                  fill="#02AFD9"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.62897 7.62638C2.70003 8.6448 3.3395 9.42638 4.52371 9.49743C5.66055 9.5448 6.77371 9.5448 7.91055 9.49743C8.95266 9.42638 9.73424 8.6448 9.80529 7.62638C9.85266 7.10532 9.87634 6.58427 9.85266 6.06322C9.59213 4.64217 8.40792 4.5948 8.31318 4.5948H8.2895H4.31055C4.16845 4.5948 4.05003 4.47638 4.05003 4.33427C4.05003 4.19217 4.16845 4.09743 4.31055 4.09743H8.31318C8.26581 3.15006 7.22371 2.96059 6.72634 2.9369H6.46582C5.82634 2.91322 5.16318 2.9369 4.52371 2.98427C3.31582 3.07901 2.70003 3.81322 2.62897 4.85532C2.55792 5.77901 2.55792 6.70269 2.62897 7.62638ZM8.62108 7.08164V7.4369C8.62108 7.55533 8.52634 7.65006 8.38424 7.65006C8.26581 7.65006 8.17108 7.55533 8.17108 7.4369V7.08164C8.05266 7.01059 7.9816 6.91585 7.9816 6.77375C7.9816 6.58427 8.17108 6.41848 8.38424 6.41848C8.59739 6.41848 8.78687 6.58427 8.78687 6.77375C8.78687 6.91585 8.71582 7.01059 8.62108 7.08164Z"
                  fill="#FEFEFE"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M43.8631 5.66054V6.79738C43.8631 6.79738 43.4604 7.55527 42.1341 7.72106C40.8078 7.91054 40.8078 7.08159 40.9025 6.86843C40.9973 6.65527 41.3052 6.37106 42.4183 6.18159C43.5788 5.99212 43.8631 5.66054 43.8631 5.66054ZM45.4262 4.57106V8.97633H43.9815V8.2658C43.5078 8.69212 42.8446 9.09475 41.921 9.14212C39.0315 9.21317 37.9183 6.0158 41.4236 5.06843C42.2525 4.83159 43.0578 4.90264 43.4841 4.68948C43.7683 4.52369 43.8394 4.26317 43.6499 4.02633C42.9394 3.07896 41.2341 3.4579 40.7604 4.76054L39.3157 4.40527C39.6946 2.96054 40.8552 2.32106 42.2525 2.17896C43.7446 2.03685 45.4262 2.84212 45.4262 4.57106ZM18.071 3.78948C17.0288 3.78948 16.1762 4.64212 16.1762 5.7079C16.1762 6.75001 17.0288 7.60264 18.071 7.60264C19.1131 7.60264 19.9657 6.75001 19.9657 5.7079C19.9657 4.64212 19.1131 3.78948 18.071 3.78948ZM21.8131 2.39212H19.9657V3.10264C19.3973 2.60527 18.6394 2.29738 17.7867 2.29738C15.9394 2.29738 14.4236 3.83685 14.4236 5.73159C14.4236 7.65001 15.9394 9.18948 17.7867 9.18948C18.6394 9.18948 19.3973 8.88159 19.9657 8.38422V9.02369C19.9657 10.0421 19.2315 10.8474 18.2131 10.8474C17.3604 10.8474 16.6736 10.6816 16.1052 10.0184L14.921 11.0842C15.892 12.1263 16.8631 12.4579 18.2367 12.4579C20.2262 12.4579 21.8131 11.1079 21.8131 8.83422V7.83948V2.39212ZM53.9999 2.27369H52.0578L50.1157 6.51317L47.8894 2.27369H45.9236L49.1446 8.31317L47.4394 11.8184H49.4052L53.9999 2.27369ZM34.8867 3.78948C35.9525 3.78948 36.8052 4.64212 36.8052 5.7079C36.8052 6.75001 35.9525 7.60264 34.8867 7.60264C33.8446 7.60264 32.992 6.75001 32.992 5.7079C32.992 4.64212 33.8446 3.78948 34.8867 3.78948ZM31.1683 2.39212H32.992V3.10264C33.5841 2.60527 34.342 2.29738 35.171 2.29738C37.0183 2.29738 38.5341 3.83685 38.5341 5.73159C38.5341 7.65001 37.0183 9.18948 35.171 9.18948C34.342 9.18948 33.5841 8.88159 32.992 8.38422V11.8184H31.1683V2.39212ZM26.2894 3.74212C27.4499 3.74212 28.3736 4.64212 28.3736 5.73159C28.3736 6.84475 27.4499 7.74475 26.2894 7.74475C25.1525 7.74475 24.2288 6.84475 24.2288 5.73159C24.2288 4.64212 25.1525 3.74212 26.2894 3.74212ZM26.2894 2.15527C28.3262 2.15527 29.9841 3.7658 29.9841 5.73159C29.9841 7.72106 28.3262 9.33159 26.2894 9.33159C24.2525 9.33159 22.5946 7.72106 22.5946 5.73159C22.5946 3.7658 24.2525 2.15527 26.2894 2.15527Z"
                  fill="#1D1819"
                />
              </svg>
            </div>
            <p className="ml-[30px] text-sm font-normalnormal">Go-Pay</p>
          </div>
          <hr style={{ border: '0.5px solid #E4E4E480' }} />
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() =>
              pilihMetode({ metode: 'emoney', nama: 'shopeepay' })
            }
          >
            <div className="w-[60px] flex justify-center">
              <svg
                width={54}
                height={20}
                viewBox="0 0 54 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.0359 0.00424767L0.594066 1.82396C0.594066 1.82396 0 1.89634 0 2.61998C0 3.34383 0 15.5818 0 15.5818C0 15.5818 0.0780653 17.0981 1.78886 17.0981C3.49964 17.0981 17.0229 17.0981 17.0229 17.0981C17.0229 17.0981 18.3808 16.7674 18.3808 15.3888C18.3808 14.0103 18.3808 4.69133 18.3808 4.69133C18.3808 4.69133 18.4078 3.17486 16.6156 3.17486C14.8234 3.17486 1.92463 3.17486 1.92463 3.17486C1.92463 3.17486 1.35437 3.07838 1.20842 2.46844C1.16426 2.22723 1.25935 2.20298 1.5105 2.20298C1.76166 2.20298 14.9999 2.20298 14.9999 2.20298V0.728062C14.9999 0.728062 14.9524 -0.0645733 14.0359 0.00424767Z"
                  fill="#EE3929"
                />
                <path
                  d="M9.46308 14.8987C8.34813 14.8987 7.52749 14.4377 6.31711 13.2213C6.10126 13.0044 6.09949 12.6511 6.31314 12.4318C6.5268 12.2127 6.87485 12.2109 7.09079 12.4279C8.36514 13.7081 8.95719 14.0262 9.97511 13.7457C10.5668 13.5829 11.0978 12.8167 11.1289 11.9386C11.1529 11.2552 10.6787 10.8099 9.71893 10.615C7.99622 10.2651 6.97967 9.59607 6.69746 8.62635C6.46998 7.8452 6.7681 6.97361 7.51516 6.23497L7.54608 6.2067C9.15244 4.84338 11.0172 5.85913 11.7788 6.58685C11.9999 6.79826 12.0105 7.15146 11.8022 7.37599C11.5945 7.60048 11.2474 7.61114 11.0262 7.40103C10.9616 7.34011 9.51878 6.00898 8.26739 7.05009C7.83956 7.47936 7.64709 7.94916 7.75209 8.3099C7.90516 8.83552 8.68021 9.26532 9.93467 9.52013C12.0674 9.95323 12.2489 11.3836 12.228 11.9786C12.1822 13.274 11.1148 14.7251 10.113 14.8537C9.88353 14.8832 9.66832 14.8987 9.46308 14.8987Z"
                  fill="white"
                />
                <path
                  d="M24.0347 3.09879C23.8183 2.96411 23.5602 2.84376 23.253 2.75866C22.6876 2.59576 22.2758 2.38302 22.0803 2.11384C21.9058 1.87991 21.9058 1.5753 22.1151 1.18542C22.2339 0.951495 22.52 0.802664 22.89 0.774355C23.2738 0.746047 23.7415 0.838093 24.2302 1.09321C24.3489 1.15711 24.5025 1.10745 24.5652 0.979804C24.628 0.85945 24.5793 0.7035 24.4535 0.639764C23.8812 0.342101 23.3157 0.228697 22.8481 0.264125C22.3036 0.306673 21.8779 0.547718 21.6685 0.937426C21.3545 1.52563 21.3754 2.00739 21.6685 2.41133C21.9407 2.77273 22.4364 3.04926 23.1134 3.24057C23.3785 3.31849 23.6019 3.41776 23.7764 3.52402C24.0417 3.68699 24.2161 3.87836 24.2999 4.08389C24.3838 4.27525 24.3908 4.4878 24.3348 4.69333C24.307 4.79252 24.258 4.89178 24.2023 4.99103C24.2023 5.00513 24.1883 5.01931 24.1744 5.04056C23.9719 5.34536 23.6438 5.50123 23.2459 5.50123C22.8064 5.50123 22.2687 5.32411 21.6964 4.96977C21.6128 4.92012 21.536 4.87053 21.4662 4.82093C21.3475 4.74298 21.1939 4.77841 21.1171 4.89178C21.0403 5.01222 21.0752 5.16815 21.1869 5.2461C21.2777 5.30987 21.3613 5.35952 21.4243 5.4162C22.0803 5.82011 22.7015 6.01849 23.2319 6.01849C23.8044 6.01849 24.2791 5.79184 24.5793 5.33828C24.5861 5.32411 24.6001 5.2957 24.621 5.26742C24.7048 5.13274 24.7676 4.98388 24.8095 4.84212C24.9003 4.53032 24.8863 4.19724 24.7537 3.89253C24.628 3.59488 24.3908 3.31849 24.0347 3.09879Z"
                  fill="#EE3929"
                />
                <path
                  d="M27.8804 2.53898C27.6222 2.46812 27.322 2.47524 27.0149 2.56728C26.7236 2.65458 26.4293 2.81816 26.1494 3.06475V0.505002C26.1494 0.37041 26.0377 0.264124 25.8982 0.264124C25.7584 0.264124 25.6467 0.37041 25.6467 0.505002V5.77053C25.6467 5.90514 25.7584 6.01148 25.8982 6.01148C26.0377 6.01148 26.1494 5.90514 26.1494 5.77053V3.79982C26.1539 3.79518 26.1591 3.79128 26.1633 3.78624C26.4775 3.3965 26.8264 3.15554 27.1614 3.04926C27.3777 2.98547 27.5803 2.97835 27.7547 3.02802C27.9224 3.07753 28.0549 3.16971 28.1526 3.30432C28.2504 3.44603 28.3062 3.63739 28.3062 3.87836V5.76345C28.3062 5.90521 28.4179 6.01849 28.5575 6.01849C28.6972 6.01849 28.8087 5.90521 28.8087 5.76345V3.87836C28.8087 3.53111 28.7181 3.24057 28.5575 3.01378C28.39 2.77273 28.1526 2.61695 27.8804 2.53898Z"
                  fill="#EE3929"
                />
                <path
                  d="M32.1525 5.14691C31.9223 5.37369 31.6151 5.5154 31.273 5.5154C30.9312 5.5154 30.617 5.37369 30.3936 5.14691C30.1703 4.92012 30.0307 4.60115 30.0307 4.25399C30.0307 3.90675 30.1703 3.58786 30.3936 3.36101C30.6241 3.13422 30.9312 2.99259 31.273 2.99259C31.6151 2.99259 31.9293 3.13422 32.1525 3.36101C32.3759 3.58786 32.5157 3.90675 32.5157 4.25399C32.5157 4.60115 32.3759 4.92012 32.1525 5.14691ZM31.273 2.48948C30.7985 2.48948 30.3588 2.68781 30.0447 3.00666C29.7305 3.32558 29.5352 3.76492 29.5352 4.25399C29.5352 4.74298 29.7305 5.18233 30.0447 5.50123C30.3588 5.82011 30.7917 6.01849 31.273 6.01849C31.7547 6.01849 32.1876 5.82011 32.5016 5.50123C32.8157 5.18233 33.0112 4.74298 33.0112 4.25399C33.0112 3.76492 32.8157 3.32558 32.5016 3.00666C32.1876 2.68781 31.7547 2.48948 31.273 2.48948Z"
                  fill="#EE3929"
                />
                <path
                  d="M36.3822 5.14687C36.152 5.37364 35.8448 5.51535 35.5027 5.51535C35.1609 5.51535 34.8467 5.37364 34.6233 5.14687C34.3999 4.92008 34.2603 4.60111 34.2603 4.25395C34.2603 3.9067 34.3999 3.58782 34.6233 3.36096C34.8537 3.13417 35.1609 2.99254 35.5027 2.99254C35.8448 2.99254 36.1588 3.13417 36.3822 3.36096C36.6056 3.58782 36.7453 3.9067 36.7453 4.25395C36.7453 4.60111 36.6056 4.92008 36.3822 5.14687ZM35.5097 2.48943C35.0282 2.48943 34.5954 2.68776 34.2814 3.00661C34.2603 3.02085 34.2465 3.04204 34.2254 3.06338V2.74438C34.2254 2.60266 34.1137 2.48943 33.9742 2.48943C33.8346 2.48943 33.7229 2.60266 33.7229 2.74438V7.76184C33.7229 7.90355 33.8346 8.01691 33.9742 8.01691C34.1137 8.01691 34.2254 7.90355 34.2254 7.76184V5.44443C34.2465 5.4586 34.2603 5.47986 34.2814 5.50118C34.5954 5.82007 35.0282 6.01845 35.5097 6.01845C35.9913 6.01845 36.4241 5.82007 36.7383 5.50118C37.0524 5.18228 37.2479 4.74294 37.2479 4.25395C37.2479 3.76487 37.0524 3.32553 36.7383 3.00661C36.4241 2.68776 35.9913 2.48943 35.5097 2.48943Z"
                  fill="#EE3929"
                />
                <path
                  d="M38.5247 3.86419C38.5875 3.65158 38.7062 3.46735 38.8528 3.3185C39.0553 3.12012 39.3204 2.99955 39.6066 2.99955C39.8927 2.99955 40.158 3.12012 40.3604 3.3185C40.507 3.46735 40.6187 3.65158 40.6955 3.86419H38.5247ZM40.7095 2.95717C40.4232 2.65934 40.0323 2.48949 39.6066 2.48949C39.1808 2.48949 38.783 2.65239 38.5038 2.95717C37.9035 3.61615 37.9105 4.32484 38.1477 5.04057C38.2526 5.36656 38.4758 5.60049 38.7341 5.77054C38.9923 5.94065 39.3066 6.02566 39.6623 6.0185C40.0115 6.01149 40.4023 5.92641 40.8212 5.74928C40.9467 5.6926 41.0095 5.54375 40.9538 5.41621C40.898 5.28869 40.7514 5.22485 40.6257 5.28153C40.2627 5.43747 39.9346 5.51541 39.6553 5.51541C39.3972 5.51541 39.1738 5.45866 38.9994 5.34537C38.8319 5.23193 38.6992 5.06891 38.6085 4.84921C38.5596 4.70758 38.5177 4.55163 38.4968 4.38153H40.8072C40.9329 4.38153 41.3446 4.40987 41.1282 3.69414C41.0446 3.43902 40.9467 3.19806 40.7095 2.95717Z"
                  fill="#EE3929"
                />
                <path
                  d="M42.3362 3.86419C42.3991 3.65158 42.5177 3.46735 42.6643 3.3185C42.8668 3.12012 43.1321 2.99955 43.4182 2.99955C43.7042 2.99955 43.9695 3.12012 44.1719 3.3185C44.3185 3.46735 44.4302 3.65158 44.507 3.86419H42.3362ZM44.9399 3.69414C44.8561 3.43902 44.7584 3.19806 44.521 2.95717C44.2348 2.65934 43.8438 2.48949 43.4182 2.48949C42.9925 2.48949 42.5945 2.65239 42.3153 2.95717C41.7149 3.61615 41.7219 4.32484 41.9594 5.04057C42.064 5.36656 42.2874 5.60049 42.5457 5.77054C42.804 5.94065 43.118 6.02566 43.474 6.0185C43.8229 6.01149 44.2138 5.92641 44.6327 5.74928C44.7584 5.6926 44.8212 5.54375 44.7652 5.41621C44.7095 5.28869 44.5629 5.22485 44.4372 5.28153C44.0742 5.43747 43.7461 5.51541 43.4672 5.51541C43.2089 5.51541 42.9855 5.45866 42.8108 5.34537C42.6434 5.23193 42.5108 5.06891 42.42 4.84921C42.3711 4.70758 42.3293 4.55163 42.3083 4.38153H44.6187C44.7444 4.38153 45.1563 4.40987 44.9399 3.69414Z"
                  fill="#EE3929"
                />
                <path
                  d="M25.3265 12.5981H22.7181V8.75126H25.072C25.1129 8.75126 25.1527 8.75331 25.1934 8.75796C25.5514 8.79847 27.1172 9.07361 27.1172 10.778C27.1172 12.5981 25.3265 12.5981 25.3265 12.5981ZM24.866 7.28293H21.2517V17.0981H22.7181V14.1687H25.0234C25.7961 14.1687 26.5633 13.9797 27.2281 13.5797C28.0186 13.1043 28.8092 12.2669 28.8092 10.8189C28.8092 9.46157 28.1143 8.59977 27.3762 8.0672C26.6464 7.54071 25.7614 7.28293 24.866 7.28293Z"
                  fill="#EE3929"
                />
                <path
                  d="M32.4437 15.747C31.2433 15.747 30.2681 14.7587 30.2681 13.5378C30.2681 12.3188 31.2433 11.3307 32.4437 11.3307C33.6453 11.3307 34.618 12.3175 34.6193 13.5352V13.5405C34.618 14.7602 33.6453 15.747 32.4437 15.747ZM34.6193 10.1227V10.8133C34.0256 10.3219 33.2686 10.028 32.4437 10.028C30.5374 10.028 28.9849 11.6024 28.9849 13.5378C28.9849 15.4752 30.5374 17.0496 32.4437 17.0496C33.2686 17.0496 34.0256 16.7556 34.6193 16.2645V17.05H36.0859V10.1227H34.6193Z"
                  fill="#EE3929"
                />
                <path
                  d="M36.7451 10.0279H38.7064L41.0077 14.4996L43.2277 10.0279H45.0011L39.7246 20H37.9978L40.0098 16.2986L36.7451 10.0279Z"
                  fill="#EE3929"
                />
              </svg>
            </div>
            <p className="ml-[30px] text-sm font-normal">ShopeePay</p>
          </div>
          <hr style={{ border: '0.5px solid #E4E4E480' }} />
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() => pilihMetode({ metode: 'emoney', nama: 'dana' })}
          >
            <div className="w-[60px] flex justify-center">
              <svg
                width="54"
                height="20"
                viewBox="0 0 54 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.74771 3.10829C3.49129 3.51651 1.61864 4.94808 0.640714 7.01251C0.151786 8.04479 0 8.75208 0 9.99872C0 11.2454 0.151786 11.9527 0.640714 12.9849C1.46143 14.7175 2.89807 16 4.71086 16.6184C8.53593 17.9234 12.6768 15.6854 13.7211 11.7487C13.8845 11.1325 13.9106 10.8922 13.9106 9.99872C13.9106 9.10522 13.8845 8.86494 13.7211 8.24872C12.7866 4.72579 9.28514 2.46843 5.74771 3.10829ZM26.8791 6.58851C26.0249 6.88729 25.5556 7.32808 25.2293 8.13815C25.0761 8.51822 25.0687 8.63879 25.0469 11.088L25.0241 13.6416H25.671H26.318V12.5701V11.4987H28.068H29.818V12.5701V13.6416H30.4966H31.1751L31.1739 11.3737C31.1726 8.88408 31.1205 8.41858 30.7721 7.77843C30.517 7.30972 30.1253 6.96329 29.5411 6.68986C29.1085 6.48736 28.9946 6.46643 28.2109 6.44544C27.461 6.42544 27.2943 6.44329 26.8791 6.58851ZM35.592 6.56015C34.8501 6.80515 34.3947 7.18615 34.0723 7.83186C33.7824 8.41222 33.7466 8.79365 33.7466 11.2941V13.6416H34.4251H35.1037L35.1041 11.3023C35.1044 9.87351 35.134 8.85679 35.1803 8.69008C35.3689 8.01093 36.1237 7.57386 36.9421 7.67008C37.6953 7.75858 38.1531 8.15465 38.3127 8.85586C38.3541 9.03729 38.3867 10.1493 38.3877 11.4094L38.3894 13.6416H39.068H39.7466L39.7451 11.4809C39.7436 9.06315 39.6904 8.51394 39.3966 7.88522C39.1345 7.32415 38.768 6.96322 38.1815 6.68872C37.7504 6.48694 37.6388 6.46665 36.8537 6.44751C36.1671 6.43072 35.9161 6.45315 35.592 6.56015ZM44.1239 6.58994C43.2479 6.90315 42.7276 7.42715 42.4472 8.27836C42.3033 8.71536 42.2902 8.92222 42.2631 11.1952L42.2338 13.6416H42.9188H43.6037V12.5701V11.4987H45.3537H47.1037V12.5701V13.6416H47.7506H48.3976L48.3756 11.0523L48.3537 8.46301L48.1286 7.98794C47.6137 6.90115 46.749 6.42786 45.2823 6.43001C44.7268 6.43086 44.4693 6.46636 44.1239 6.58994ZM16.3894 10.1059V13.6416L17.8359 13.6391C18.7376 13.6375 19.4898 13.5996 19.8334 13.5384C21.1796 13.2983 22.0535 12.5739 22.4661 11.3559C22.5874 10.9979 22.6242 10.7198 22.6268 10.1416C22.6335 8.63165 22.0598 7.55351 20.9521 6.99429C20.207 6.61822 19.8786 6.57015 18.053 6.57015H16.3894V10.1059ZM10.3894 7.54815L10.9251 7.82015L10.944 10.0417L10.9629 12.2634L10.567 12.0637C9.77414 11.6637 9.25129 11.7005 7.4165 12.285C5.616 12.8586 4.68543 12.9126 3.49657 12.5125L2.92514 12.3201L2.90621 10.1174C2.89121 8.36365 2.90579 7.92244 2.97764 7.95251C3.61529 8.21944 4.07864 8.30101 4.77136 8.26844C5.41814 8.23801 5.62657 8.19008 6.69943 7.82501C8.24771 7.29815 8.655 7.20808 9.318 7.24572C9.7615 7.27086 9.94593 7.32293 10.3894 7.54815ZM28.998 7.85658C29.5643 8.13072 29.8169 8.69786 29.8176 9.69644L29.818 10.287L28.0859 10.2679L26.3537 10.2487L26.3546 9.60586C26.356 8.54801 26.7059 7.94565 27.4389 7.73915C27.8861 7.61308 28.6073 7.66744 28.998 7.85658ZM46.2346 7.84979C46.8329 8.15501 47.0443 8.60322 47.0586 9.59686L47.068 10.2487L45.3279 10.2679L43.5879 10.287L43.6142 9.51786C43.6377 8.83115 43.6619 8.71229 43.8397 8.40894C43.9493 8.22201 44.1209 8.01536 44.2212 7.94965C44.7176 7.62443 45.6976 7.57579 46.2346 7.84979ZM19.9649 7.95736C20.4132 8.11829 20.7491 8.41415 20.9964 8.86615C21.1775 9.19736 21.2094 9.34129 21.2341 9.93822C21.2692 10.7867 21.1383 11.2441 20.7351 11.6814C20.275 12.1806 19.8802 12.3106 18.7287 12.3424L17.7466 12.3696V10.0676V7.76579L18.693 7.80322C19.3015 7.82722 19.7556 7.88229 19.9649 7.95736Z"
                  fill="#108EE9"
                />
              </svg>
            </div>
            <p className="ml-[30px] text-sm font-normal">Dana</p>
          </div>
          <hr style={{ border: '0.5px solid #E4E4E480' }} />
        </div>
        <div className="bg-[#E4E4E44D] my-[24px]">
          <p className="px-[20px] py-[22px] flex flex-col font-medium text-small">
            Virtual account (verifikasi otomatis)
          </p>
        </div>
        <div
          className={`space-y-6 mx-[20px] my[24px] ${nominal() >= 10000 ? '' : ''
            }`}
        >
          <div
            className="flex flex-row items-center cursor-pointer"
            onClick={() =>
              pilihMetode({ metode: 'bank_transfer', nama: 'bni' })
            }
          >
            <div className="w-[60px] flex justify-center">
              <svg
                width={54}
                height={17}
                viewBox="0 0 54 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0 6.3896L4.55542 12.1363L0 15.9113V6.3896ZM1.83317 15.9113L5.26119 13.0437L7.63039 15.9113H1.83317ZM0 3.31462L1.1884 4.81845L6.07663 10.9264L7.66074 9.66527C7.66074 9.66527 6.34591 8.1172 5.46283 6.3896C3.7365 3.01215 4.95871 0.909062 4.95871 0.909062H0V3.31462ZM6.77323 11.8695L8.38673 10.537C8.38673 10.537 9.92722 12.5648 11.7136 13.0437C14.0547 13.6711 15.0911 12.1366 15.0911 12.1366V15.9113H9.94935L11.1087 14.9088C11.1087 14.9088 10.5037 15.3121 9.02423 14.2874C8.15127 13.6824 6.77355 11.8695 6.77355 11.8695H6.77323ZM6.92178 0.898315C6.92178 0.898315 6.40723 1.59934 6.77323 3.31462C7.16515 5.14778 8.72208 7.08841 8.7186 7.04479C8.7186 7.04479 8.81847 5.11807 9.94935 3.98752C12.3593 1.57753 15.0911 3.01215 15.0911 3.01215V0.909378L6.92178 0.898315Z"
                  fill="#F15A23"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M15.0911 5.55296C15.0911 5.55296 13.567 4.24762 12.2417 4.24762C10.5467 4.24762 9.62158 5.71099 9.62158 6.77233C9.62158 8.31851 10.3637 9.17757 11.1087 9.92253C12.1792 10.993 13.4817 12.1476 15.0911 11.2184V5.55296Z"
                  fill="#F15A23"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M32.4482 1.05574H36.045C36.045 1.05574 39.2309 5.87981 40.7967 7.87322C42.3625 9.86599 44.0477 12.1363 44.0477 12.1363V2.13604C44.0477 1.70398 42.9137 1.05574 42.9137 1.05574H47.0611C47.0611 1.05574 45.7004 1.61485 45.7004 2.13604V16.6841C45.7004 16.6841 44.3944 15.96 42.9137 14.2394C41.2502 12.3063 35.332 4.50146 35.332 4.50146V14.6104C35.332 15.1281 36.466 15.9113 36.466 15.9113H32.4482C32.4482 15.9113 33.55 15.1218 33.55 14.6104V2.13604C33.55 1.6768 32.4482 1.05574 32.4482 1.05574ZM49.3838 1.05574H53.9999C53.9999 1.05574 52.7603 1.64267 52.7603 2.13604V14.6104C52.7603 15.1493 53.9999 15.9113 53.9999 15.9113H49.3838C49.3838 15.9113 50.5381 15.1322 50.5381 14.6104V2.13604C50.5381 1.66194 49.3838 1.05574 49.3838 1.05574ZM18.8679 1.05574C18.8679 1.05574 20.0645 1.65246 20.0645 2.13604V14.6104C20.0645 15.1408 18.8679 15.9113 18.8679 15.9113H25.7063C26.1336 15.9113 30.9204 15.1284 30.9204 11.4381C30.9204 7.74774 27.2022 7.40197 27.2022 7.40197C27.2022 7.40197 29.4674 6.77237 29.4674 4.24766C29.4674 1.52572 26.1336 1.05542 25.7063 1.05542H18.8679V1.05574ZM22.5004 7.15733V2.5131H25.2786C25.7059 2.5131 27.2019 3.01217 27.2019 4.86366C27.2019 6.38962 25.7059 7.15733 25.2783 7.15733H22.5001H22.5004ZM22.5004 8.37544H25.7059C26.1333 8.37544 28.6548 9.03064 28.6548 11.2184C28.6548 13.4489 26.1333 14.2394 25.7059 14.2394H22.5004V8.37544Z"
                  fill="#005E6A"
                />
              </svg>
            </div>
            <p className="ml-[30px] text-sm font-normal">
              BNI Virtual Account
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
const PilihVoucher = ({ handlePilihanMetode, setSwitchPage, listVoucher, voucher, setVoucher }) => {
  const [activeVoucher, setactiveVoucher] = useState([])
  const [inactiveVoucher, setinactiveVoucher] = useState([])
  useEffect(() => {
    if (listVoucher && listVoucher.length > 0) {
      setactiveVoucher(listVoucher.filter(obj => obj.status === "available"))
      setinactiveVoucher(listVoucher.filter(obj => obj.status === "not available"))
    }
  }, [listVoucher])
  return (
    <>
      <div className="flex justify-center">
        <div className="container mx-auto w-full max-w-[430px] min-h-screen">
          <div
            className="fixed w-full pr-4 z-50 top-0 bg-white"
            style={{
              boxShadow: '0 5px 5px -5px rgb(0 0 0 / 0.1)',
            }}
          >
            <div className="w-full max-w-[430px] h-screen overflow-y-auto pr-4">
              <div className="mx-2 inline-flex items-center h-[72px] w-full " style={{
                boxShadow: '0 5px 5px -5px rgb(0 0 0 / 0.1)',
              }}>
                <div
                  onClick={() => handlePilihanMetode()}
                  className="cursor-pointer"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.57 5.92999L3.5 12L9.57 18.07"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.4999 12H3.66992"
                      stroke="#292D32"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span className=" relative ml-[16px] text-[16px] leading-[21.79px] font-medium mt-1">
                  Voucher
                </span>
              </div>
              {listVoucher.length > 0 ? (
                <>
                  <div className='mt-[30px] w-full max-w-full pr-2'>

                    {activeVoucher.map(item => (
                      <>
                        <div className={`rounded-[15px] mt-6 p-[20px] cursor-pointer flex justify-between items-center shadow-md ${voucher === item.id
                          ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                          : `bg-white border-[1px]`
                          }`}
                          onClick={() => {
                            if (voucher === item.id) {
                              setVoucher('')
                            } else {
                              setVoucher(item.id)
                            }
                            setSwitchPage("initial")
                          }}
                        >
                          <div className='flex flex-col gap-2 w-full overflow-hidden'>
                            <p className='text-peduly-primary font-semibold text-sm text-ellipsis overflow-hidden'>{item.name_voucher}</p>
                            <p className='text-xs'>Min. pernah jadi volunteer {item.minimum_donated}x</p>
                            <div className='flex gap-2 text-[10px]'>
                              <div>
                                <p className='text-peduly-subtitle'>Berlaku hingga</p>
                                <p>{parseDateIndonesia(item.deadline)}</p>
                              </div>
                              <div>
                                <p className='text-peduly-subtitle'>Berlaku untuk</p>
                                <p>{item.kuota_voucher} Volunteer</p>
                              </div>
                            </div>
                          </div>
                          <div className=''>
                            <input
                              type="checkbox"
                              name="voucher"
                              id={"voucher_" + item.id}
                              checked={voucher === item.id}
                              className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0" />
                          </div>
                        </div>
                      </>
                    ))}
                    {inactiveVoucher.map(item => (
                      <>
                        <div className={`cursor-not-allowed rounded-[15px] mt-6 p-[20px] flex justify-between bg-white border-[1px] items-center shadow-md opacity-50`}
                        >
                          <div className='flex flex-col gap-2 overflow-hidden'>
                            <p className='font-semibold text-sm text-ellipsis overflow-hidden'>{item.name_voucher}</p>
                            <p className='text-xs'>Min. pernah jadi volunteer {item.minimum_donated}x</p>
                            <div className='flex gap-2 text-[10px]'>
                              <div>
                                <p className='text-peduly-subtitle'>Berlaku hingga</p>
                                <p>{parseDateIndonesia(item.deadline)}</p>
                              </div>
                              <div>
                                <p className='text-peduly-subtitle'>Berlaku untuk</p>
                                <p>{item.kuota_voucher} Volunteer</p>
                              </div>
                            </div>
                          </div>
                          <input
                            type="checkbox"
                            name="voucher"
                            id={"voucher_" + item.id}
                            disabled
                            className="rounded-full text-peduly-primary focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0 hover:cursor-not-allowed" />
                        </div>
                      </>
                    ))}

                  </div>
                </>
              ) : (<>
                <div className='mt-[30px] h-[70vh] w-full flex items-center justify-center '>
                  <p className='font-semibold text-center text-peduly-subtitle '>Voucher tidak tersedia
                  </p>
                </div>
              </>)}
            </div>
          </div>
        </div>
      </div >
    </>
  )
}
