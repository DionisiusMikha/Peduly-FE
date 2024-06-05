import Select from 'react-select'
import { useContext, useEffect, useRef, useState } from 'react'
import { Redirect, useHistory, useLocation } from 'react-router-dom'
import UserEditPhotoIcon from '../../assets/svg/Profile/UserEditPhotoIcon'
import UserPhotoIcon from '../../assets/svg/Profile/UserPhotoIcon'
import UserCoverPhoto from '../../assets/svg/Profile/UserCoverPhoto'
import BackButton from '../../components/BackButton'
import '../../styles/Profile.css'
import { API_URL } from '../../config/api'
import { fetcher } from '../../config/axiosHooks'
import { UserContext } from '../../context/UserContext'
import {
  useOptionJenisOrganisasi,
  useOptionKabupaten,
  useOptionKecamatan,
  useOptionPekerjaan,
  useOptionProvinsi,
} from '../../hooks/useUbahProfile'
import { getToken, setUbahProfileBerhasil, setUbahProfileError } from '../../utils/cookiesHooks'
import {
  handleFotoBackground,
  handleImgProfil,
} from '../../utils/handleImgLink'
import formatDate from '../../utils/formatDate'
import DateIcon from '../../assets/svg/Profile/DateIcon'
import Spinner from '../../components/Spinner'
import { useOnlineStatus } from 'utils/onlineStatus'
import UserEditCoverPhoto from 'assets/svg/Profile/UserEditCoverPhoto'

// const optionsJenisAkun = [
//   { value: 1, label: 'Individu' },
//   { value: 2, label: 'organisasi' },
// ]

const optionsJenisKelamin = [
  { value: 1, label: 'Laki laki' },
  { value: 2, label: 'Perempuan' },
]

function UbahProfile() {
  const user = useContext(UserContext)
  const location = useLocation()

  const profile = useRef(null)
  const bannerRef = useRef(null)
  const history = useHistory()
  const [ubahData, setUbahData] = useState(false)
  const optionsPekerjaan = useOptionPekerjaan(ubahData)
  const optionsJenisOrganisasi = useOptionJenisOrganisasi(ubahData)
  const optionsProvinsi = useOptionProvinsi()
  const [idKabupaten, setIdKabupaten] = useState('')
  const optionsKabupaten = useOptionKabupaten(
    idKabupaten === '' ? user?.user?.provinsi : idKabupaten
  )
  const [idKecamatan, setIdKecamatan] = useState('')
  const optionsKecamatan = useOptionKecamatan(
    idKecamatan === '' ? user?.user?.kabupaten : idKecamatan
  )
  const isOnline = useOnlineStatus()
  useEffect(() => {
    // Mengecek apakah ada data yang dikirimkan bersama navigasi
    if (location.state && location.state.source) {
      const sourceData = location.state.source;
      // Lakukan sesuatu dengan data yang diterima, misalnya:
      console.log('Data yang diterima:', sourceData);
    }
  }, [location]);

  function socialsCheck(socialName) {
    if (user?.user?.socials) {
      const social = user?.user?.socials.find(
        (social) => social.name === socialName
      )
      if (social && (social.username !== '' || social.username !== null)) {
        return social.username
      }
    }
    return null
  }

  const handleOnEdit = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    setDataUser({
      name: user.user?.name || '',
      username: user.user?.username || '',
      photo: user.user?.photo || '',
      tipe: dataUser.tipe || '',
      description: user.user?.description || '',
      pekerjaan: user.user?.pekerjaan || '',
      jenis_organisasi: user.user?.jenis_organisasi || '',
      tanggal_lahir: user.user?.tanggal_lahir || '',
      tanggal_berdiri: user.user?.tanggal_berdiri || '',
      jenis_kelamin: user.user?.jenis_kelamin || '',
      email: user.user?.email || '',
      no_telp: user.user?.no_telp || '',
      provinsi: user.user?.provinsi || '',
      kabupaten: user.user?.kabupaten || '',
      kecamatan: user.user?.kecamatan || '',
      alamatLengkap: user.user?.alamat || '', //not in use
      banner: user.user?.banner || '',
      tiktok: socialsCheck('tiktok') !== null ? socialsCheck('tiktok') : '',
      instagram:
        socialsCheck('instagram') !== null ? socialsCheck('instagram') : '',
      twitter: socialsCheck('twitter') !== null ? socialsCheck('twitter') : '',
      linkedin:
        socialsCheck('linkedin') !== null ? socialsCheck('linkedin') : '',
    })
    setUbahData(true)
  }

  const [loading, setLoading] = useState(false)
  const [usernameUnique, setUsernameUnique] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isFocusedProv, setIsFocusedProv] = useState(false)
  const [isFocusedKab, setIsFocusedKab] = useState(false)
  const [isFocusedKec, setIsFocusedKec] = useState(false)


  const [fotoProfileUrl, setFotoProfileUrl] = useState(
    user.user?.photo ? handleImgProfil(user.user?.photo || '') : ''
  )

  const [bannerUrl, setBannerUrl] = useState(
    user.user?.banner ? handleImgProfil(user.user?.banner || '') : ''
  )
  console.log('user prov')
  console.log(user.user.provinsi)
  console.log('prov', optionsProvinsi)
  const [dataUser, setDataUser] = useState({
    name: '',
    username: '',
    photo: '',
    tipe: user.user?.tipe === 'Individu' ? 'Individu' : user.user?.tipe || '',
    pekerjaan: '',
    jenis_organisasi: '',
    tanggal_lahir: '',
    tanggal_berdiri: '',
    jenis_kelamin: '',
    email: '',
    no_telp: '',
    provinsi: '',
    kabupaten: '',
    kecamatan: '',
    alamatLengkap: '', //not in use
    description: '',
    banner: '',
    tiktok: '',
    instagram: '',
    twitter: '',
    linkedin: '',
  })

  const {
    name,
    username,
    photo,
    pekerjaan,
    jenis_organisasi,
    tipe,
    tanggal_lahir,
    tanggal_berdiri,
    jenis_kelamin,
    email,
    no_telp,
    provinsi,
    kabupaten,
    kecamatan,
    alamatLengkap, // not in use
    banner,
    description,
    tiktok,
    instagram,
    twitter,
    linkedin,
  } = dataUser

  const onImageChange = async (event) => {
    if (event.target.files && event.target.files[0]) {
      setDataUser({ ...dataUser, photo: event.target.files[0] })
      setFotoProfileUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  const onBannerChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDataUser({ ...dataUser, banner: event.target.files[0] })

      setBannerUrl(URL.createObjectURL(event.target.files[0]))
    }
  }

  const handleCheckUsername = async () => {
    if (username === user.user?.username) setUsernameUnique(false)
    await fetcher('/api/user/check-username', {
      method: 'POST',
      data: { username: dataUser.username },
    })
      .then(() => {
        setUsernameUnique(false)
      })
      .catch(() => {
        setUsernameUnique(true)
      })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const data = new FormData()
    data.append('photo', photo)
    data.append('banner', banner)
    data.append('name', name)
    data.append('username', username)
    data.append('tipe', tipe)
    data.append('description', description)
    data.append('provinsi', provinsi)
    data.append('kabupaten', kabupaten)
    data.append('kecamatan', kecamatan)
    data.append('alamat', alamatLengkap)
    data.append('socials[1][name]', 'tiktok')
    data.append('socials[1][username]', tiktok)
    data.append('socials[2][name]', 'instagram')
    data.append('socials[2][username]', instagram)
    data.append('socials[3][name]', 'twitter')
    data.append('socials[3][username]', twitter)
    data.append('socials[4][name]', 'linkedin')
    data.append('socials[4][username]', linkedin)
    data.append('no_telp', no_telp)
    if (tipe === 'Individu') {
      data.append('pekerjaan', pekerjaan)
      data.append('tanggal_lahir', tanggal_lahir)
      data.append('jenis_kelamin', jenis_kelamin)

    } else if (tipe === 'organisasi') {
      data.append('jenis_organisasi', jenis_organisasi)
      data.append('tanggal_berdiri', tanggal_berdiri)
    }
    console.log(Array.from(data))
    await fetcher(`${API_URL}/api/user`, {
      method: 'POST',
      data: data,
    })
      .then(() => {
        setUbahProfileBerhasil();
        let redirectPath = `/ubah-profile/berhasil`;
        const sourceData = location.state && location.state.source
        const hrfValue = sourceData ? `/aktivitas/${sourceData}` : '/profile'

        history.push({
          pathname: redirectPath,
          state: {
            H1: 'Selamat!',
            P1: 'Perubahan Berhasi ^,^',
            hrf: hrfValue,
            Button: 'Kembali',
          },
        });
      })
      .catch((e) => {
        setUbahProfileError();
        const errorMessage = e ? (e.data ? e.data.message : e.message) : 'Unknown error'; // Menangani jika e kosong atau tidak memiliki properti data/message
        console.error('Ubah Profil Bermasalah ', errorMessage);
        history.push({
          pathname: `/ubah-profile/error`,
          state: {
            H1: 'Ubah Profile Gagal!',
            P1: `${errorMessage}`,
            hrf: 'profile',
            Button: 'Kembali',
          },
        });
      });

  }

  function validator() {
    if (name && username && email && no_telp && provinsi && kabupaten && kecamatan) {
      return true
    }
    return false
  }

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: '1px solid #F4F4F4',
      color: state.isSelected ? 'white' : 'black',
      padding: 10,
      zIndex: 99999,
      backgroundColor: state.isSelected ? '#E7513B' : 'white',
    }),
    control: (provided, state) => ({
      ...provided,
      height: '60px',
      paddingLeft: 1,
      paddingRight: 0,
      borderRadius: 0,
      borderTop: 0,
      borderRight: 0,
      borderLeft: 0,
      borderBottom: '2px solid #F4F4F4',
      color: '#212121',
      font: 'root.font.regular',
      marginTop: 1,
      boxShadow: 'none',
      outline: 'none',
      '& input': {
        boxShadow: 'none', // Menghilangkan persegi biru (focus style) dari input
      },
      '&:hover': {
        outline: 'none !important',
        borderColor: 'rgba(0, 0, 0, 0.3)',
      },
      '&:focus': {
        outline: 'none !important',
        boxShadow: 'none !important',
      },
      '&:active': {
        outline: 'none !important',
        boxShadow: 'none !important',
      },
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = 'opacity 300ms';

      return { ...provided, opacity, transition };
    },
    input: (provided) => ({
      ...provided,
      '&:focus': {
        boxShadow: 'none', // Menghapus shadow yang muncul saat fokus pada input
      },
    }),
  };


  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])
  useEffect(() => {
    console.log('ini useEffect')
    if (user.user)
      setDataUser(user.user)
  }, [user.user])

  if (!getToken()) return <Redirect to="/login" />

  return user.user?.id && !loading ? (
    <div className="mx-auto" style={{ maxWidth: '430px', height: '1600px' }}>
      <BackButton hrf={'1'} txt="Ubah Profil" />
      <form
        onSubmit={onSubmit}
        className={validator ? ' mb-[310px] ' : ' mb-[310px] '}
      >
        <div className="mt-[108px] space-y-5 mx-[20px]">
          {/* FOTO PROFILE */}
          <div
            onClick={() => (ubahData ? profile.current.click() : null)}
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            {user.user && user.user.photo ? (
              <img
                src={fotoProfileUrl || handleImgProfil(user.user?.photo || '')}
                alt=""
                className={`rounded-full object-cover w-[86px] h-[86px] ${user.user.photo && !photo ? 'opacity-75' : ''
                  }`}
              />
            ) : ubahData ? (
              <UserEditPhotoIcon />
            ) : (
              <UserPhotoIcon />
            )}
            {ubahData && (
              <span>
                <input
                  style={{ display: 'none' }}
                  multiple={false}
                  ref={profile}
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={onImageChange}
                />
                <p className="text-center text-sm text-peduly-primary mt-2">
                  Ganti Foto
                </p>
              </span>
            )}
          </div>
          {/* NAMA LENGKAP */}
          <div className="pt-[20px]">
            <label
              htmlFor="namaLengkap"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Nama Lengkap<sup>*</sup>
            </label>
            <div
              className={`w-full border-b-2 border-[#F4f4f4] ${ubahData && 'hover:border-[#0000004d]'
                } h-[60px] pr-[20px] flex items-center mt-[1px]`}
            >
              {ubahData ? (
                <input
                  id="namaLengkap"
                  className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                  type="text"
                  placeholder="Nama Lengkap"
                  maxLength="50"
                  value={name}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, name: e.target.value })
                  }
                />
              ) : (
                <p className="text-base font-normal ml-[10px]">
                  {user.user ? user.user?.name : ''}
                </p>
              )}
            </div>
          </div>
          {/* USERNAME */}
          <div>
            <label
              htmlFor="username"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Username<sup>*</sup>
            </label>
            <div
              className={`w-full border-b-2 border-[#F4f4f4] ${usernameUnique && 'border-[#E7513B]'
                } ${ubahData && 'hover:border-[#0000004d]'
                } h-[60px] pr-[20px] flex items-center justify-start mt-[1px]`}
            >
              <span className="h-[60px] text-lg flex items-center">
                <p className="ml-2">@</p>
              </span>
              {ubahData ? (
                <input
                  id="username"
                  className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full p-0 ml-0"
                  type="text"
                  placeholder="username"
                  maxLength="50"
                  value={username}
                  onBlur={handleCheckUsername}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, username: e.target.value })
                  }
                />
              ) : (
                <p className="text-base font-normal p-0 ml-0">
                  {user.user ? user.user?.username : ''}
                </p>
              )}
            </div>
            {usernameUnique && (
              <p className="text-xs text-peduly-primary">
                Username sudah digunakan
              </p>
            )}
          </div>
          {/* PEKERJAAN */}
          {dataUser.tipe === 'Individu' && (
            <div>
              <label
                htmlFor="perkerjaan"
                className="text-sm font-normal ml-[10px] text-[#717171]"
              >
                Pekerjaan
              </label>
              {ubahData ? (
                <Select
                  id="perkerjaan"
                  placeholder="Pilih Pekerjaan"
                  defaultValue={
                    pekerjaan
                      ? { value: pekerjaan, label: pekerjaan }
                      : 'Pilih Pekerjaan'
                  }
                  value={
                    optionsPekerjaan.value === null
                      ? ''
                      : optionsPekerjaan.value
                  }
                  styles={customStyles}
                  noOptionsMessage={() => 'Pekerjaan Tidak Ditemukan :('}
                  options={optionsPekerjaan}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  isSearchable={false}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, pekerjaan: e.label })
                  }
                />
              ) : (
                <div
                  className="w-full border-b-2 h-[60px] pr-[20px] flex items-center mt-[1px]"
                  style={{
                    borderColor: '#F4f4f4',
                  }}
                >
                  <p className="text-base font-normal ml-[10px]">
                    {user.user?.pekerjaan ? user.user?.pekerjaan : '-'}
                  </p>
                </div>
              )}
            </div>
          )}
          {/* JENIS ORGANISASI */}
          {dataUser.tipe === 'Organisasi' && (
            <div>
              <label
                htmlFor="jenisOrganisasi"
                className="text-sm font-normal ml-[10px] text-[#717171]"
              >
                Jenis Organisasi
              </label>
              {ubahData ? (
                <Select
                  id="jenisOrganisasi"
                  placeholder={!isFocused ? 'Pilih Jenis Organisasi' : ''}
                  defaultValue={
                    jenis_organisasi
                      ? {
                        value: jenis_organisasi,
                        label: jenis_organisasi,
                      }
                      : 'Pilih Jenis Organisasi'
                  }
                  value={
                    optionsJenisOrganisasi.value === null
                      ? ''
                      : optionsJenisOrganisasi.value
                  }
                  styles={customStyles}
                  noOptionsMessage={() => 'Jenis Organisasi Tidak Ditemukan :('}
                  options={optionsJenisOrganisasi}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  isSearchable={false}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, jenis_organisasi: e.label })
                  }
                />
              ) : (
                <div
                  className="w-full border-b-2 h-[60px] pr-[20px] flex items-center mt-[1px]"
                  style={{
                    borderColor: '#F4f4f4',
                  }}
                >
                  <p className="text-base font-normal ml-[10px]">
                    {user.user?.jenis_organisasi
                      ? user.user?.jenis_organisasi
                      : '-'}
                  </p>
                </div>
              )}
            </div>
          )}
          {/* TANGGAL LAHIR */}
          {dataUser.tipe === 'Individu' && (
            <div>
              <label
                htmlFor="tanggalLahir"
                className="text-sm font-normal ml-[10px] text-[#717171]"
              >
                Tanggal Lahir
              </label>
              <div
                className={`w-full border-b-2 ${ubahData && 'hover:border-[#0000004d]'
                  } h-[60px] flex items-center justify-between mt-[1px]`}
              >
                {ubahData ? (
                  <input
                    id="tanggalLahir"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal date-input"
                    type="date"
                    value={tanggal_lahir}
                    onChange={(e) =>
                      setDataUser({
                        ...dataUser,
                        tanggal_lahir: e.target.value,
                      })
                    }
                  />
                ) : (
                  <>
                    <p className="text-base font-normal ml-[10px]">
                      {user.user?.tanggal_lahir
                        ? formatDate(user.user?.tanggal_lahir)
                        : '-'}
                    </p>
                    <span className="h-[60px] text-lg flex items-center">
                      <DateIcon />
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
          {/* TANGGAL BERDIRI */}
          {dataUser.tipe === 'organisasi' && (
            <div>
              <label
                htmlFor="tanggalBerdiri"
                className="text-sm font-normal ml-[10px] text-[#717171]"
              >
                Tanggal Berdiri
              </label>
              <div
                className={`w-full border-b-2 ${ubahData && 'hover:border-[#0000004d]'
                  } h-[60px] flex items-center justify-between mt-[1px]`}
              >
                {ubahData ? (
                  <input
                    id="tanggalBerdiri"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal date-input"
                    type="date"
                    value={tanggal_berdiri}
                    onChange={(e) =>
                      setDataUser({
                        ...dataUser,
                        tanggal_berdiri: e.target.value,
                      })
                    }
                  />
                ) : (
                  <>
                    <p className="text-base font-normal ml-[10px]">
                      {user.user?.tanggal_berdiri
                        ? formatDate(user.user?.tanggal_berdiri)
                        : '-'}
                    </p>
                    <span className="h-[60px] text-lg flex items-center">
                      <DateIcon />
                    </span>
                  </>
                )}
              </div>
            </div>
          )}
          {/* JENIS KELAMIN */}
          {dataUser.tipe === 'Individu' && (
            <div>
              <h3 className="text-sm font-normal ml-[10px] text-[#717171]">
                Jenis Kelamin
              </h3>
              {ubahData ? (
                <Select
                  id="jenisKelamin"
                  placeholder="Pilih Jenis Kelamin"
                  defaultValue={
                    jenis_kelamin
                      ? {
                        value: jenis_kelamin,
                        label: jenis_kelamin,
                      }
                      : 'Pilih Jenis Kelamin'
                  }
                  value={
                    optionsJenisKelamin.value === null
                      ? ''
                      : optionsJenisKelamin.value
                  }
                  styles={customStyles}
                  noOptionsMessage={() => 'Jenis Kelamin Tidak Ditemukan'}
                  options={optionsJenisKelamin}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  isSearchable={false}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, jenis_kelamin: e.label })
                  }
                />
              ) : (
                <div
                  className="w-full border-b-2 h-[60px] pr-[20px] flex items-center mt-[1px]"
                  style={{
                    borderColor: '#F4f4f4',
                  }}
                >
                  <p className="text-base font-normal ml-[10px]">
                    {user.user?.jenis_kelamin ? user.user?.jenis_kelamin : '-'}
                  </p>
                </div>
              )}
            </div>
          )}
          {/* EMAIL */}
          <div>
            <label
              htmlFor="email"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Email<sup>*</sup>
            </label>
            <div
              className="w-full border-b-2 h-[70px] flex flex-col mt-[1px]"
              style={{
                borderColor: '#F4F4F4',
              }}
            >
              <input
                id="email"
                className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                type="email"
                placeholder="zainalmultazam@gmail.com"
                maxLength="40"
                value={user.user?.email || email}
                disabled
              />
              <p className="text-peduly-secondary mt-0 text-xs ml-[10px]">
                Alamat email tidak bisa diubah
              </p>
            </div>
          </div>
          {/* NO TLP */}
          <div>
            <label
              htmlFor="noTelepon"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              No. Telepon<sup>*</sup>
            </label>
            {ubahData ? (
              <div>
                <div
                  className={`w-full h-[50px]  ${ubahData && 'hover:border-[#0000004d]'
                    } flex items-center justify-center mt-[1px]`}
                >
                  <span className="h-[50px] text-lg flex items-center pl-[10px]">
                    <p className="ml-0 text-base font-normal">+62</p>
                  </span>
                  <input
                    id="noTelepon"
                    className="bg-transparent outline-none focus:ring-transparent border-none text-base font-normal w-full"
                    type="tel"
                    placeholder="85X-XXXX-XXXX"
                    maxLength="14"
                    value={no_telp}
                    onChange={(e) => {
                      let cleanedNumber = e.target.value.replace(/\D/g, ''); // Hapus karakter selain angka
                      if (cleanedNumber.startsWith('62')) {
                        cleanedNumber = cleanedNumber.substring(2); // Hapus awalan '62'
                      }
                      setDataUser({
                        ...dataUser,
                        no_telp: cleanedNumber,
                      })
                      console.log(cleanedNumber)
                    }}
                  />
                </div>
                <p className="text-peduly-primary mt-0 text-xs ml-[10px]">
                  Wajib diisi
                </p>
              </div>
            ) : (
              <div
                className={`w-full h-[60px]  ${ubahData && 'hover:border-[#0000004d]'
                  } flex items-center justify-center mt-[1px]`}
              >
                <span className="h-[60px] text-lg flex items-center pl-[10px]">
                  <p className="ml-0 text-base font-normal">+62</p>
                </span>
                <p className="text-base font-normal w-full ml-2">
                  {user.user?.no_telp ? user.user?.no_telp : '-'}
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="mb-[20px] mt-1 h-2 w-full bg-[#F4F4F4]"></div>
        <div className="space-y-5 mx-[20px]">
          {/* PROVINSI */}
          <div>
            <label
              htmlFor="provinsiAlamat"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Provinsi
            </label>
            {ubahData ? (
              <div>
                <Select
                  id="provinsiAlamat"
                  placeholder={!isFocusedProv ? 'Pilih Provinsi' : ''}
                  value={!isFocusedProv ? optionsProvinsi.find((item) => item.value === provinsi.toString()) : ''}
                  styles={customStyles}
                  noOptionsMessage={() => 'Provinsi Tidak Ditemukan :('}
                  options={optionsProvinsi}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  isSearchable={true}
                  onFocus={() => setIsFocusedProv(true)}
                  onBlur={() => setIsFocusedProv(false)}
                  onChange={(e) => {
                    setIsFocusedProv(false)
                    setDataUser({ ...dataUser, provinsi: e.value })
                    setIdKabupaten(e.value)
                  }}
                />
                <p className="text-peduly-primary mt-0 text-xs ml-[10px]">
                  Wajib diisi
                </p>
              </div>
            ) : (
              <div
                className="w-full border-b-2 h-[60px] pr-[20px] flex items-center mt-[1px]"
                style={{
                  borderColor: '#F4f4f4',
                }}
              >
                <p className="text-base font-normal ml-[10px]">
                  {user.user?.provinsi
                    ? optionsProvinsi.find(
                      (option) => option.value === user?.user?.provinsi.toString()
                    )?.label || '-'
                    : '-'}
                </p>
              </div>
            )}
          </div>

          {/* KABUPATEN */}
          <div>
            <label
              htmlFor="kotaKabubatenAlamat"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Kota/Kabupaten
            </label>
            {ubahData ? (
              <div>
                <Select
                  id="kotaKabubatenAlamat"
                  placeholder={!isFocusedKab ? 'Pilih Kabupaten' : ''}
                  value={!isFocusedKab ? optionsKabupaten.find((item) => item.value === kabupaten.toString()) : ''}
                  styles={customStyles}
                  noOptionsMessage={() => 'Kota/Kabupatan tidak Ditemukan :('}
                  options={optionsKabupaten}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  isSearchable={true}
                  onFocus={() => setIsFocusedKab(true)}
                  onBlur={() => setIsFocusedKab(false)}
                  onChange={(e) => {
                    setIsFocusedKab(false)
                    setDataUser({ ...dataUser, kabupaten: e.value })
                    setIdKecamatan(e.value)
                  }}
                />
                <p className="text-peduly-primary mt-0 text-xs ml-[10px]">
                  Wajib diisi
                </p>
              </div>
            ) : (
              <div
                className="w-full border-b-2 h-[60px] pr-[20px] flex items-center mt-[1px]"
                style={{
                  borderColor: '#F4f4f4',
                }}
              >
                <p className="text-base font-normal ml-[10px]">
                  {user.user?.kabupaten
                    ? optionsKabupaten.find(
                      (option) => option.value === user?.user?.kabupaten.toString()
                    )?.label || '-'
                    : '-'}
                </p>
              </div>
            )}
          </div>
          {/* KECAMATAN */}
          <div>
            <label
              htmlFor="kecamatanAlamat"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Kecamatan
            </label>
            {ubahData ? (
              <div>
                <Select
                  id="kecamatanAlamat"
                  placeholder={!isFocusedKec ? 'Pilih Kecamatan' : ''}
                  value={!isFocusedKec ? optionsKecamatan.find((item) => item.value === kecamatan.toString()) : ''}
                  styles={customStyles}
                  noOptionsMessage={() => 'Kecamatan Tidak Ditemukan :('}
                  options={optionsKecamatan}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  isSearchable={true}
                  onFocus={() => setIsFocusedKec(true)}
                  onBlur={() => setIsFocusedKec(false)}
                  onChange={(e) => {
                    setIsFocusedKec(false)
                    setDataUser({ ...dataUser, kecamatan: e.value })
                  }}
                />
                <p className="text-peduly-primary mt-0 text-xs ml-[10px]">
                  Wajib diisi
                </p>
              </div>
            ) : (
              <div
                className="w-full h-[60px] pr-[20px] flex items-center mt-[1px]"
                style={{
                  borderColor: '#F4f4f4',
                }}
              >
                <p className="text-base font-normal ml-[10px]">
                  {user.user?.kecamatan
                    ? optionsKecamatan.find(
                      (option) => option.value === user?.user?.kecamatan.toString()
                    )?.label || '-'
                    : '-'}
                </p>
              </div>
            )}
          </div>
          <div className=" h-2 w-full mb-2 bg-[#F4F4F4]"></div>
          {/* cover photo */}
          <div
            onClick={() => (ubahData ? bannerRef.current.click() : null)}
            className="flex flex-col items-center justify-center cursor-pointer"
          >
            <label
              htmlFor="coverphoto"
              className="text-sm self-start ml-[10px] font-normal text-[#717171]"
            >
              Banner
            </label>
            {user.user && user.user.banner ? (
              <img
                src={bannerUrl || handleFotoBackground(user.user?.banner || '')}
                alt=""
                className={`object-cover w-full h-full ${user.user.banner && !banner ? 'opacity-75' : ''
                  }`}
              />
            ) : ubahData ? (
              <UserEditCoverPhoto />
            ) : (
              <UserCoverPhoto /> //ganti komponen lainn
            )}
            {ubahData && (
              <span>
                <input
                  style={{ display: 'none' }}
                  multiple={false}
                  ref={bannerRef}
                  type="file"
                  accept="image/png, image/gif, image/jpeg, image/heic"
                  onChange={onBannerChange}
                />
              </span>
            )}
          </div>
          <hr className="bg-[#F4F4F4] h-0.5 border-1 my-6" />
          {/* Deskripsi */}
          <div className="pt-[20px]">
            <label
              htmlFor="deskripsi"
              className="text-sm font-normal  ml-[10px] text-[#717171]"
            >
              Deskripsi
            </label>
            <div
              className={`w-full border-b-2 border-[#F4f4f4] ${ubahData && 'hover:border-[#0000004d]'
                } h-[60px] pr-[20px] flex items-center mt-[1px]`}
            >
              {ubahData ? (
                <input
                  id="deskripsi"
                  className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                  type="text"
                  placeholder="Deskripsi Profilemu"
                  maxLength="100"
                  value={description}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, description: e.target.value })
                  }
                />
              ) : (
                <p className="text-base font-normal ml-[10px]">
                  {user.user ? user.user?.description : ''}
                </p>
              )}
            </div>
          </div>
          {/* Instagram*/}
          <div className="pt-[20px]">
            <label
              htmlFor="instagram"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Username Instagram
            </label>
            <div
              className={`w-full border-b-2 border-[#F4f4f4] ${ubahData && 'hover:border-[#0000004d]'
                } h-[60px] pr-[20px] flex items-center mt-[1px]`}
            >
              {ubahData ? (
                <div>
                  <input
                    id="instagram"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                    type="text"
                    placeholder="Akun Instagramu"
                    maxLength="20"
                    value={instagram}
                    onChange={(e) => {
                      let cleanedValue = e.target.value.trim()
                      if (!/[^\w.,_]/.test(cleanedValue)) {
                        setDataUser({ ...dataUser, instagram: cleanedValue })
                      }
                    }}
                  />

                </div>
              ) : (
                <p className="text-base font-normal ml-[10px]">
                  {socialsCheck('instagram') ? socialsCheck('instagram') : ''}
                </p>
              )}
            </div>
          </div>
          {/*Twitter*/}
          <div className="pt-[20px]">
            <label
              htmlFor="twitter"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Username Twitter
            </label>
            <div
              className={`w-full border-b-2 border-[#F4f4f4] ${ubahData && 'hover:border-[#0000004d]'
                } h-[60px] pr-[20px] flex items-center mt-[1px]`}
            >
              {ubahData ? (
                <div>
                  <input
                    id="twitter"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                    type="text"
                    placeholder="Akun Twittermu"
                    maxLength="20"
                    value={twitter}
                    onChange={(e) => {
                      let cleanedValue = e.target.value.trim()
                      if (!/[^\w.,_]/.test(cleanedValue)) {
                        setDataUser({ ...dataUser, twitter: cleanedValue })
                      }
                    }}
                  />

                </div>
              ) : (
                <p className="text-base font-normal ml-[10px]">
                  {socialsCheck('twitter') ? socialsCheck('twitter') : ''}
                </p>
              )}
            </div>
          </div>
          {/*Tiktok*/}
          <div className="pt-[20px]">
            <label
              htmlFor="twitter"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Username Tiktok
            </label>
            <div
              className={`w-full border-b-2 border-[#F4f4f4] ${ubahData && 'hover:border-[#0000004d]'
                } h-[60px] pr-[20px] flex items-center mt-[1px]`}
            >
              {ubahData ? (
                <div>
                  <input
                    id="tiktok"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                    type="text"
                    placeholder="Akun Tiktokmu"
                    maxLength="20"
                    value={tiktok}
                    onChange={(e) => {
                      let cleanedValue = e.target.value.trim()
                      if (!/[^\w.,_]/.test(cleanedValue)) {
                        setDataUser({ ...dataUser, tiktok: cleanedValue })
                      }
                    }}
                  />

                </div>
              ) : (
                <p className="text-base font-normal ml-[10px]">
                  {socialsCheck('tiktok') ? socialsCheck('tiktok') : ''}
                </p>
              )}
            </div>
          </div>
          {/*LinkedIn*/}
          <div className="pt-[20px] pbottom">
            <label
              htmlFor="linkedin"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Username LinkedIn
            </label>
            <div
              className={`w-full border-b-2 border-[#F4f4f4] ${ubahData && 'hover:border-[#0000004d]'
                } h-[60px] pr-[20px] flex items-center mt-[1px]`}
            >
              {ubahData ? (
                <div>
                  <input
                    id="linkedin"
                    className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                    type="text"
                    placeholder="Akun LinkedInmu"
                    maxLength="20"
                    value={linkedin}
                    onChange={(e) => {
                      let cleanedValue = e.target.value.trim()
                      if (!/[^\w.,_]/.test(cleanedValue)) {
                        setDataUser({ ...dataUser, linkedin: cleanedValue })
                      }
                    }}
                  />

                </div>
              ) : (
                <p className="text-base font-normal ml-[10px]">
                  {socialsCheck('linkedin') ? socialsCheck('linkedin') : ''}
                </p>
              )}
            </div>
          </div>
          {/* ALAMAT */}
          {/* <div>
            <label
              htmlFor="alamat"
              className="text-sm font-normal ml-[10px] text-[#717171]"
            >
              Alamat
            </label>
            <div
              className={`w-full border-b-2 ${
                ubahData && 'hover:border-[#0000004d]'
              } h-[60px] pr-[20px] flex items-center mt-[1px]`}
            >
              {ubahData ? (
                <input
                  id="alamat"
                  className="bg-transparent outline-none  focus:ring-transparent border-none text-base font-normal w-full"
                  type="text"
                  placeholder="Tulis Alamat Lengkap"
                  maxLength="50"
                  value={alamatLengkap}
                  onChange={(e) =>
                    setDataUser({ ...dataUser, alamatLengkap: e.target.value })
                  }
                />
              ) : (
                <p className="text-base font-normal ml-[10px]">
                  {user.user?.alamat ? user.user?.alamat : '-'}
                </p>
              )}
            </div>
          </div> */}
        </div>
        <div className="fixed bottom-0 w-full mt-[10px] h-[84px] bg-white flex justify-center items-center max-w-[430px] py-[12px] z-40">
          <span className="w-[90%]">
            {isOnline ? (
              <>
                {!ubahData && (
                  <button
                    className="w-full bg-transparent border-[1px] border-peduly-primary text-peduly-primary font-bold max-w-[374px] text-[16px] rounded-full h-[60px]"
                    onClick={handleOnEdit}
                  >
                    Ubah Data
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  disabled
                  className="w-full bg-transparent border-[1px] border-slate-300 text-slate-300 font-bold max-w-[374px] text-[16px] rounded-full h-[60px]"
                >
                  You're Offline
                </button>
              </>
            )}

            {ubahData &&
              (validator() ? (
                <button
                  className="bg-[#c41230]  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] "
                  type="submit"
                >
                  Simpan
                </button>
              ) : (
                <button className="bg-[#E4E4E4]  text-white font-bold w-full max-w-[374px]  text-[16px] rounded-full h-[60px] pointer-events-none">
                  Simpan
                </button>
              ))}
          </span>
        </div>
      </form>
    </div>
  ) : (
    <div className="mx-auto max-w-[430px] h-screen flex items-center justify-center">
      <Spinner color="#c41230" />
    </div>
  )
}

export default UbahProfile
