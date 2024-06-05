import LoadingLogo from './loading.json'
import BerhasilLogo from '../berhasil.json'
import GagalLogo from '../Akun/gagal.json'
import Lottie from 'lottie-react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import imageCompression from 'browser-image-compression'
import { fetcher } from 'config/axiosHooks'
import { API_URL } from 'config/api'

function JudulAktivitas({ setStep, data, state }) {
  const history = useHistory()
  const [id, setId] = useState(state.id ? state.id : '')
  const [judul, setJudul] = useState(state.judul.judul ? state.judul.judul : '')
  const [slug, setSlug] = useState(state.judul.slug ? state.judul.slug : '')
  const [isSlugExist, setIsSlugExist] = useState(false)
  const [image1, setImage1] = useState(
    state.judul.image ? state.judul.image : ''
  )
  const [dataImage, setDataImage] = useState('')
  const [showLoading, setShowLoading] = useState(true);
  const [showSecondCode, setShowSecondCode] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowSecondCode(true);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return
      if (slug === state.judul.slug) {
        setIsSlugExist(false)
        return
      }
      try {
        const res = await fetcher(`${API_URL}/api/aktivitas/isExist/${slug}`, {
          method: 'GET',
        })
        console.log(slug)
        console.log(id)
        console.log(res.data)
        setIsSlugExist(res.data.isExist)
      } catch (err) {
        console.error(err);
      }
    };

    const timeOutId = setTimeout(() => fetchData(), 100);
    return () => clearTimeout(timeOutId);

  }, [slug]);
  const handleOnNext = () => {
    setStep('relawan')
    data({
      judul,
      slug,
      image: {
        image: image1,
      },
    })
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  async function handleBanner(e, pilihan) {
    const reader = new FileReader()
    const file = e.target.files[0]
    try {
      reader.addEventListener('load', () => {
        if (pilihan === 1) {
          setDataImage(reader.result)
        }
      })

      reader.readAsDataURL(file)

      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1,
      })
      setImage1(compressedFile)
    } catch (error) {
      console.error(error)
    }
  }

  function validator() {
    if (judul && slug && image1 && !isSlugExist) {
      return true
    }
    return false
  }
  const handleChange = (e) => {
    const newSlug = e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-');
    setSlug(newSlug);
    setShowLoading(true); // Show loading animation
    setTimeout(() => {
      setShowLoading(false);
    }, 2000);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="py-6 bg-white rounded-t-[30px] mt-6">
      {/* JUDUL */}
      <div className="mx-[20px]">
        <h1 className="text-large font-medium">Judul Aktivitas</h1>
        <input
          type="text"
          className="outline-none border-[#E4E4E4] focus:ring-0 focus:border-[#E4E4E4] w-full border-[1px] rounded-[30px] p-[20px] text-large font-normal placeholder-[#C4C4C4] mt-[14px]"
          placeholder="Contoh : Recruitment Relawan Batch 1"
          value={judul}
          onChange={(e) => {
            setJudul(e.target.value)
          }}
        />
      </div>
      {/* LINK SLUG */}
      <div className="mx-[20px] mt-[24px]">
        <h1 className="text-large font-medium">
          Buat link untuk aktivitas ini
        </h1>
        <p className="text-sm font-normal text-[#717171] mt-[4px]">
          Link harus dimulai dengan huruf, tanpa spasi (opsional)
        </p>
        <div className="px-[20px] h-[65px] rounded-[30px] border-[1px] flex items-center overflow-hidden mt-[14px]">
          <span
            className="h-[60px] text-lg flex items-center pr-[14px]"
            style={{ borderRight: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <label
              htmlFor="slug"
              className="text-base font-normal text-[#212121]"
            >
              peduly.com/
            </label>
          </span>
          <input
            type="text"
            id="slug"
            className="outline-none border-0 w-full text-large font-normal placeholder-[#C4C4C4] pl-[10px] focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
            placeholder="Contoh: oprecrelawan"
            value={slug}
            onChange={handleChange}
          />
        </div>
        <div className="flex">
          {showLoading ? (
            <>
              <Lottie
                style={{ width: 45 }}
                animationData={LoadingLogo}
              />
              <p className='text-sm font-normal ms-1 text-peduly-primary'>
                loading
              </p>
            </>
          ) : (
            isSlugExist ? (
              <>
                <Lottie
                  style={{ width: 20 }}
                  animationData={GagalLogo}
                />
                <p className='text-sm font-normal ms-1 text-peduly-danger'>
                  tautan sudah digunakan
                </p>
              </>
            ) : (
              <>
                <Lottie
                  style={{ width: 20 }}
                  animationData={BerhasilLogo}
                />
                <p className='text-sm font-normal ms-1 text-peduly-primary'>
                  tautan bisa digunakan
                </p>
              </>
            )
          )}
        </div>
        {/* {isSlugExist ? (
          <>
            <div className="flex">
              {showLoading ? (
                <>
                  <Lottie
                      style={{ width: 45 }}
                      animationData={LoadingLogo}
                  />
                  <p className='text-sm font-normal ms-1 text-peduly-primary'>
                     loading
                  </p>
                </>
              ) : (
                  <>
                      <Lottie
                          style={{ width: 20 }}
                          animationData={GagalLogo}
                      />
                      <p className="text-sm font-normal ms-1 text-peduly-danger">
                          tautan sudah digunakan
                      </p>
                  </>
              )}
            </div>
          </>
        ):(
          <>
            <div className="flex">
              {showLoading ? (
                <>
                  <Lottie
                      style={{ width: 45 }}
                      animationData={LoadingLogo}
                  />
                  <p className='text-sm font-normal ms-1 text-peduly-primary'>
                     loading
                  </p>
                </>
              ) : (
                  <>
                  <Lottie 
                  style={{width: 20}}
                  animationData={BerhasilLogo}/>
                  <p className='text-sm font-normal ms-1 text-peduly-primary'>
                     tautan bisa digunakan
                  </p>
                  </>
              )}
            </div>
          </>
        )} */}
      </div>
      {/* BANNER */}
      <div className="mx-[20px] mt-[24px]">
        <h1 className="text-large font-medium">Banner Aktivitas</h1>
        <ul className="text-basic text-[#717171] list-disc mt-[4px] ml-4">
          <li>Foto menggambarkan aktivitas</li>
          <li>Foto tidak buram</li>
          <li>Resolusi kualitas tinggi</li>
          <li>Format .jpg/.jpeg/.png</li>
        </ul>
        <div className="flex flex-row mt-[14px]">
          <div className="w-full mr-[7px]">
            <label htmlFor="banner-1" className="w-full cursor-pointer">
              {dataImage.length > 0 || image1 !== '' ? (
                <img
                  src={dataImage || image1}
                  className="rounded-[15px] border-[1px] border-peduly-primary h-64 w-full object-cover"
                  alt=""
                />
              ) : (
                <div className="rounded-[15px] border-[1px] border-peduly-primary border-dashed h-64 flex items-center justify-center">
                  <svg
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                      stroke="#c41230"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 12H16"
                      stroke="#c41230"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M12 16V8"
                      stroke="#c41230"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              name="banner-1"
              id="banner-1"
              className="hidden"
              onChange={(e) => handleBanner(e, 1)}
            />
          </div>
        </div>
        {/* TIPS BANNER */}
        <div
          className="p-[20px] mt-[16px] rounded-[15px] drop-shadow"
          style={{ backgroundColor: 'rgba(228, 228, 228, 0.16)' }}
        >
          <h1 className="text-large font-medium">
            Contoh banner aktivitas
          </h1>
          <img
            src={'/images/galangdana/tips_banner.jpg'}
            className="h-[230px] w-[230px] rounded-[10px] object-cover mt-3"
            alt=""
          />
        </div>
      </div>
      {/* TOMBOL */}
      <div className="mt-[32px] mx-[20px]">
        <div className="flex items-center justify-center text-base font-normal mt-[8px]">
          <button
            className="bg-[#E4E4E4] text-[#717171] rounded-full w-full h-[60px] mr-[12px]"
            onClick={history.goBack}
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
  )
}

export default JudulAktivitas
