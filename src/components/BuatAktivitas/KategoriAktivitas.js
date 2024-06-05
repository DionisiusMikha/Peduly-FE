import { useEffect, useState } from 'react'
import { API_URL } from 'config/api'
import { fetcher } from 'config/axiosHooks'
import SelectSheet from './SelectSheet'

import { format } from 'date-fns'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
const options = [
  { value: 'Fleksibel', label: 'Fleksibel' },
  { value: 'ditentukan', label: 'ditentukan' },
]

function KategoriAktivitas({ setStep, data, state }) {
  const [waktuActivity, setWaktuActivity] = useState(null)
  const [waktuFix, setWaktuFix] = useState(
    state.kategori.waktuActivity ? state.kategori.waktuActivity : null)
  const [provinsiList, setProvinsiList] = useState([])
  const [kotaId, setKotaId] = useState(
    state.kategori.provinsi ?
      provinsiList.find((item) => item.name === state.kategori.provinsi)?.id
      : ''
  );
  const [kota, setKota] = useState(
    state.kategori.lokasi ? state.kategori.lokasi : '',
  )
  const [kotaList, setKotaList] = useState([])
  const [kategoriList, setKategoriList] = useState([])
  const [kategori, setKategori] = useState(
    state.kategori.kategori ? state.kategori.kategori : '',
  )
  // const convertDate = (dateString) => {
  //   const date = parseISO(dateString);
  //   const formattedDate = format(date, "MMM d yyyy 'M' {'$L': 'en', '$u': undefined, '$d': EEE MMM dd yyyy HH:mm:ss 'GMT'ZZZZ (z)");
  //   return formattedDate;
  // }
  // const [selectedDate, setSelectedDate] = useState(
  //   state.kategori.waktu ? convertDate(state.kategori.waktu) :null
  // )
  const [selectedDate, setSelectedDate] = useState(null)
  // const [waktu, setWaktu] = useState(
  //   0
  // )

  const option = options.find(
    (option) => option.label === state.kategori.waktuActivity
  )

  const [checklist, setChecklist] = useState(option ? option.value : '')

  const handleOnNext = () => {
    setStep('tipe')
    data({
      lokasi: kota,
      provinsi: provinsiList.find((item) => item.id === kotaId)?.name,
      kategori: kategori,
      waktu: format(new Date(selectedDate), "yyyy-MM-dd'T'HH:mm:ss"),
      waktuActivity: waktuFix,
    })
  }

  const getListCategory = async () => {
    await fetcher(`${API_URL}/api/categories`, {
      method: 'GET',
    })
      .then((res) => {
        setKategoriList(res.data.data)
      })
      .catch((err) => { })
  }

  useEffect(() => {
    getListCategory()
  }, [])

  useEffect(() => {
    const formattedDate = format(new Date(waktuActivity), "yyyy-MM-dd'T'HH:mm")
    setWaktuFix(formattedDate)
  }, [waktuActivity])

  const getListProvinsi = async () => {
    await fetcher(`${API_URL}/api/prov`, {
      method: 'GET',
    })
      .then((res) => {
        setProvinsiList(res.data)
      })
      .catch((err) => { })
  }

  useEffect(() => {
    getListProvinsi()
  }, [])

  const getListKota = async (id) => {
    await fetcher(`${API_URL}/api/kabupaten/${id}`, {
      method: 'GET',
    })
      .then((res) => {
        setKotaList(res.data)
      })
      .catch((err) => { })
  }

  useEffect(() => {
    if (kotaId) {
      getListKota(kotaId)
    }
  }, [kotaId])

  // useEffect(() => {
  //   const selectedTimestamp = Date.parse(selectedDate)
  //   // Mendapatkan tanggal saat ini dalam milidetik
  //   const nowTimestamp = Date.now()
  //   // Menghitung selisih tanggal dalam milidetik
  //   const diffInMilliseconds = selectedTimestamp - nowTimestamp
  //   // Konversi milidetik menjadi hari
  //   const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24))

  //   setWaktu(diffInDays)
  // }, [selectedDate])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  function validator() {
    if (kota && kategori && waktuFix) {
      return true
    }
    return false
  }

  console.log(state.kategori.provinsi);
  console.log(provinsiList);
  console.log(kotaId);
  console.log("selectedDate", format(new Date(selectedDate), "yyyy-MM-dd HH:mm:ss"))

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="py-6 bg-white rounded-t-[30px] mt-6">
        {/* KATEGORI */}
        <div className="mx-[20px]">
          <SelectSheet
            id="kategori"
            options={kategoriList}
            setValue={setKategori}
            kategoriData={kategori}
          />
        </div>
        {/* waktu */}
        <div className="mx-[20px] mt-[24px]">
          <MobileDateTimePicker
            className="w-full select-sheet-box flex justify-start p-[20px] border-none"
            value={selectedDate}
            ampm={false}
            slotProps={{
              textField: {
                placeholder: 'Batas Waktu',
                InputProps: {
                  sx: { p: '18px' },
                  disableUnderline: true,
                },
                variant: 'standard',
              },
            }}
            onChange={setSelectedDate}
          />
        </div>
        {/* PROVINSI */}
        <div className="mx-[20px] mt-[24px]">
          <SelectSheet
            id="provinsi"
            options={provinsiList}
            setValue={setKotaId}
            provinsiData={kotaId}
          />
        </div>
        {/* KOTA/KAB */}
        <div className="mx-[20px] mt-[24px]">
          <SelectSheet
            id="kota"
            options={kotaList}
            setValue={setKota}
            lokasiData={kota}
          />
        </div>
        {/* Detail aktivitas */}
        <div className="mx-[20px] mt-6">
          <h1 className="text-large font-medium">Waktu Aktivitas</h1>
          <div className=" w-full mt-[2px] grid grid-cols-2 gap-5">
            <label forhtml="fleksibel">
              <div
                className={`rounded-[30px] mt-6 p-[20px] cursor-pointer  mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${checklist === options[0].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
                  }`}
              >
                <p className={`text-large font-semibold text-peduly-dark`}>
                  fleksibel
                </p>
                <input
                  type="checkbox"
                  name="tipe"
                  id="fleksibel"
                  checked={checklist === options[0].value}
                  className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                  onChange={() => {
                    setChecklist(options[0].value)
                    setWaktuFix(options[0].value)
                  }}
                />
              </div>
            </label>
            <label forhtml="ditentukan">
              <div
                className={`rounded-[30px] mt-6 p-[20px] cursor-pointer  mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${checklist === options[1].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
                  }`}
              >
                <p className={`text-large font-semibold text-peduly-dark`}>
                  Di Tentukan
                </p>
                <input
                  type="checkbox"
                  name="tipe"
                  id="ditentukan"
                  checked={checklist === options[1].value}
                  className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                  onChange={() => {
                    setChecklist(options[1].value)
                    setWaktuFix(null)
                  }}
                />
              </div>
            </label>
          </div>
          {checklist === 'ditentukan' && (
            <div className="mt-4">
              <MobileDateTimePicker
                className="w-full select-sheet-box flex justify-start p-[20px] border-none"
                ampm={false}
                slotProps={{
                  textField: {
                    placeholder: 'Waktu Acara',
                    InputProps: {
                      sx: { p: '18px' },
                      disableUnderline: true,
                    },
                    variant: 'standard',
                  },
                }}
                value={waktuActivity}
                onChange={setWaktuActivity}
              />
            </div>
          )}
        </div>
        {/* TOMBOL */}
        <div className="mt-[32px] mx-[20px]">
          <div className="flex items-center justify-center text-base font-normal mt-[8px]">
            <button
              className="bg-[#E4E4E4] text-[#717171] rounded-full w-full h-[60px] mr-[12px]"
              onClick={() => setStep('relawan')}
            >
              Kembali
            </button>
            {validator() ? (
              <button
                className="bg-peduly-primary text-white rounded-full w-full h-[60px]"
                onClick={handleOnNext}
              >
                Lanjut
              </button>
            ) : (
              <button
                className="bg-[#E4E4E4] text-[#717171] rounded-full w-full h-[60px]"
                disabled
              >
                Lanjut
              </button>
            )}
          </div>
          {/* <button
          className="bg-white text-peduly-primary font-semibold rounded-full w-full h-[60px] border-[1px] boder-[#E4E4E4] mt-[12px]"
          onClick={handleOnSimpan}
        >
          Simpan dan lanjutkan nanti
        </button> */}
        </div>
      </div>
    </LocalizationProvider>
  )
}

export default KategoriAktivitas
