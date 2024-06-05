import { useEffect, useState } from 'react'
import TabStep from 'components/BuatAktivitas/TabStep'
import JudulAktivitas from 'components/BuatAktivitas/JudulAktivitas'
import DetailAktivitas from 'components/BuatAktivitas/DetailAktivitas'
import KategoriAktivitas from 'components/BuatAktivitas/KategoriAktivitas'
import TipeAktivitas from 'components/BuatAktivitas/TipeAktivitas'
import TautanAktivitas from 'components/BuatAktivitas/TautanAktivitas'
import axios from 'axios'
import { API_URL } from 'config/api'
import { getToken, setBuatAktivitasBerhasil, setBuatAktivitasError } from 'utils/cookiesHooks'
import Spinner from 'components/loaders/Spinner'
import { Redirect, useHistory } from 'react-router-dom'
import BiayaAktivitas from 'components/BuatAktivitas/BiayaAktivitas'

function BuatAktivitas({ location }) {
  console.log("location", location)
  const [step, setStep] = useState('aktivitas')

  const [idAktivitas, setIdAktivitas] = useState(
    location.state?.activity?.id ? location.state.activity.id : '',
  )
  const [judulAktivitas, setJudulAktivitas] = useState({
    judul: location.state?.activity?.judul_activity ? location.state.activity.judul_activity : '',
    slug: location.state?.activity?.judul_slug ? location.state.activity.judul_slug : '',
    image: location.state?.activity?.foto_activity ? location.state.activity.foto_activity : '',
  })
  const [detailAktivitas, setDetailAktivitas] = useState({
    detail: location.state?.activity?.detail_activity ? location.state.activity.detail_activity : '',
    kuota: location.state?.activity?.kuota ? location.state.activity.kuota : '',
    kriteria: location.state?.kriteria ? location.state.kriteria.map((item) => {
      return item.deskripsi
    }) : [''],
    tugas: location.state?.tugas ? location.state.tugas.map((item) => {
      return item.deskripsi
    }) : [''],
  })
  const [kategoriAktivitas, setKategoriAktivitas] = useState({
    kategori: location.state?.activity?.category_id ? location.state.activity.category_id : '',
    waktu: location.state?.activity?.batas_waktu ? location.state.activity.batas_waktu : '',
    lokasi: location.state?.activity?.lokasi ? location.state.activity.lokasi : '',
    provinsi: location.state?.activity?.provinsi ? location.state.activity.provinsi : '',
    waktuActivity: location.state?.waktu_activity?.judul_activity ? location.state.activity.waktu_activity : '',
  })
  const [tipeAktivitas, setTipeAktivitas] = useState(
    location.state?.activity?.tipe_activity ? location.state.activity.tipe_activity : '',
  )
  const [jenisAktivitas, setJenisAktivitas] = useState(
    location.state?.activity?.jenis_activity ? location.state.activity.jenis_activity : '',
  )
  const [biayaAktivitas, setBiayaAktivitas] = useState(
    location.state?.activity?.prices ? location.state.activity.prices : '',
  )
  const [vouchers, setVouchers] = useState(location?.state?.vouchers)
  const [isVouchers, setisVouchers] = useState(!!location?.state?.vouchers?.length > 0)
  console.log('isVoucher', isVouchers)
  console.log('vouchers', vouchers)
  const [tautanAktivitas, setTautanAktivitas] = useState(
    location.state?.activity?.link_wa ? location.state.activity.link_wa : '',
  )
  const [bookAktivitas, setBookAktivitas] = useState(
    location.state?.activity?.link_guidebook ? location.state.activity.link_guidebook : '',
  )
  const data = {
    id: idAktivitas,
    judul: judulAktivitas,
    detail: detailAktivitas,
    kategori: kategoriAktivitas,
    tipe: tipeAktivitas,
    jenis: jenisAktivitas,
    biaya: biayaAktivitas,
    vouchers: vouchers,
    tautan: tautanAktivitas,
    link_guidebook: bookAktivitas,
  }

  console.log(data);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const history = useHistory()
  // FORM
  const dataSend = new FormData()
  dataSend.append('category_id', data.kategori.kategori || '')
  dataSend.append('judul_activity', data.judul.judul || '')
  dataSend.append('judul_slug', data.judul.slug || '')
  // dataSend.append('foto_activity', data.judul.image?.image || '')
  dataSend.append('detail_activity', data.detail.detail || '')
  dataSend.append('kuota', data.detail.kuota || '')
  dataSend.append('batas_waktu', data.kategori.waktu || '')
  dataSend.append('waktu_activity', data.kategori.waktuActivity || '')
  dataSend.append('lokasi', data.kategori.lokasi || '')
  dataSend.append('provinsi', data.kategori.provinsi || '')
  dataSend.append('tipe_activity', data.tipe || '')
  dataSend.append('jenis_activity', data.jenis || '')
  // dataSend.append('tasks', JSON.stringify(data.detail.tugas) || [''])
  // dataSend.append('criterias', JSON.stringify(data.detail.kriteria) || [''])
  if (data.detail.tugas && data.detail.tugas.length > 0) {
    data.detail.tugas.forEach((task, index) => {
      dataSend.append(`tasks[${index}]`, task)
    })
  }
  if (data.detail.kriteria && data.detail.kriteria.length > 0) {
    data.detail.kriteria.forEach((criteria, index) => {
      dataSend.append(`criterias[${index}]`, criteria)
    })
  }

  dataSend.append('tautan', data.tautan || '')
  dataSend.append('link_guidebook', data.link_guidebook || undefined)
  dataSend.append('biaya', data.biaya.biaya || "")

  console.log("biaya", data.biaya.biaya)
  console.log("tipe data img", data.judul.image.image instanceof Blob)
  console.log(data.judul.image.image)
  // SUBMIT BUAT GALANG DANA
  const handleBuatGalangDana = async () => {
    setLoading(true)
    dataSend.append('status_publish', 'published')
    dataSend.append('foto_activity', data.judul.image?.image || '')
    dataSend.append('biaya_activity[0][per]', data.biaya.per_orang || 1)
    dataSend.append('biaya_activity[0][price]', data.biaya.biaya || 0)
    console.log("vouchers", vouchers)

    if (isVouchers && vouchers && vouchers.length > 0) {
      vouchers.filter(voucher => (voucher.name && voucher.discount)).forEach((voucher, index) => {
        dataSend.append(`vouchers[${index}][name_voucher]`, voucher.name)
        dataSend.append(`vouchers[${index}][presentase_diskon]`, voucher.discount)
        dataSend.append(`vouchers[${index}][kuota_voucher]`, voucher.quota)
        dataSend.append(`vouchers[${index}][minimum_donated]`, voucher.minVolunteer)
      })
    }
    console.log("dataSend")
    // console.log(Array.from([...dataSend]))

    await axios
      .post(`${API_URL}/api/aktivitas/create`, dataSend, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setBuatAktivitasBerhasil()
        history.push('/aktivitas-saya/create/berhasil')
      })
      .catch((error) => {
        setBuatAktivitasError()
        const errorMessage = error.message
        history.push({
          pathname: `/aktivitas-saya/create/error`,
          state: {
            H1: 'Buat Aktivitas Gagal!',
            P1: `${errorMessage}`,
          },
        })
        console.error(error)
      })
  }

  const handleEditGalangDana = async () => {
    setLoading(true)
    dataSend.append('status_publish', 'published')
    dataSend.append(`biaya`, data.biaya.biaya)
    dataSend.append('criterias', JSON.stringify(data.detail.kriteria))
    dataSend.append('tasks', JSON.stringify(data.detail.tugas))
    if (isVouchers && vouchers && vouchers.length > 0) {
      vouchers.filter(voucher => (voucher.name && voucher.discount)).forEach((voucher, index) => {
        dataSend.append(`vouchers[${index}][name_voucher]`, voucher.name)
        dataSend.append(`vouchers[${index}][presentase_diskon]`, voucher.discount)
        dataSend.append(`vouchers[${index}][kuota_voucher]`, voucher.quota)
        dataSend.append(`vouchers[${index}][minimum_donated]`, voucher.minVolunteer)
      })
    }
    console.log(data.judul.image.image)
    if (data.judul.image.image instanceof Blob) {
      dataSend.append('foto_activity', data.judul.image?.image || '')
    } else {
      // const response = await axios.get(data.judul.image.image);
      // const imageBuffer = await response.buffer();
      // const blob = new Blob([imageBuffer], { type: response.headers.get('content-type') });
      // dataSend.append('foto_activity', blob)
    }
    console.log("vouchers", vouchers)
    console.log("dataSend")
    console.log(Array.from([...dataSend]))
    await axios
      .post(`${API_URL}/api/aktivitas/${data.id}/update`, dataSend, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        setBuatAktivitasBerhasil()
        history.push('/aktivitas-saya/create/berhasil')
      })
      .catch((error) => {
        setBuatAktivitasError()
        const errorMessage = error.message
        history.push({
          pathname: `/aktivitas-saya/create/error`,
          state: {
            H1: 'Buat Aktivitas Gagal!',
            P1: `${errorMessage}`,
          },
        })
        console.error(error)
      })
  }

  // SUBMIT SIMPAN DRAFT
  const handleSimpanGalangDana = async () => {
    setLoading(true)
    dataSend.append('status_publish', 'drafted')
    await axios
      .post(`${API_URL}/api/aktivitas/create`, dataSend, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then(() => {
        history.push('/aktivitas')
      })
      .catch((error) => {
        console.error(error)
        setError(true)
      })
  }

  if (error) {
    return <Redirect to="/" />
  }

  if (!getToken()) {
    return <Redirect to="/login" />
  }

  if (loading) {
    return (
      <div className="mx-auto max-w-[430px] h-screen flex items-center justify-center">
        <Spinner color="#e7513b" />
      </div>
    )
  }

  return (
    <div
      style={{ maxWidth: '430px' }}
      className={`mx-auto pt-[24px] bg-involuntir-light-1/3`}
    >
      {step !== 'ringkasan' && <TabStep step={step} />}
      {step === 'aktivitas' && (
        <JudulAktivitas
          setStep={setStep}
          data={setJudulAktivitas}
          simpan={handleSimpanGalangDana}
          state={data}
        />
      )}
      {step === 'relawan' && (
        <DetailAktivitas
          setStep={setStep}
          data={setDetailAktivitas}
          simpan={handleSimpanGalangDana}
          state={data}
        />
      )}
      {step === 'detail' && (
        <KategoriAktivitas
          setStep={setStep}
          data={setKategoriAktivitas}
          simpan={handleSimpanGalangDana}
          state={data}
        />
      )}
      {step === 'tipe' && (
        <TipeAktivitas
          setStep={setStep}
          dataTipe={setTipeAktivitas}
          dataBiaya={setBiayaAktivitas}
          dataJenis={setJenisAktivitas}
          simpan={handleSimpanGalangDana}
          state={data}
          setTipeAktivitas={setTipeAktivitas}
          setJenisAktivitas={setJenisAktivitas}
        />
      )}
      {step === 'biaya' && (
        <BiayaAktivitas
          setStep={setStep}
          dataBiaya={setBiayaAktivitas}
          simpan={handleSimpanGalangDana}
          state={data}
          setBiayaAktivitas={setBiayaAktivitas}
          setVouchers={setVouchers}
          setisVouchers={setisVouchers}
        />
      )}
      {step === 'tautan' && (
        <TautanAktivitas
          setStep={setStep}
          data={setTautanAktivitas}
          simpan={handleSimpanGalangDana}
          state={data}
          setTautanAktivitas={setTautanAktivitas}
          setBookAktivitas={setBookAktivitas}
          buat={data.id ? handleEditGalangDana : handleBuatGalangDana}
        />
      )}
    </div>
  )
}

export default BuatAktivitas
