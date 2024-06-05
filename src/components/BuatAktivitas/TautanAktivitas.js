import { useState, useEffect } from 'react'

import './index.css'

const optionsTautan = [
  { value: 'involuntir', label: 'Involuntir' },
  { value: 'tautan', label: 'Tautan' },
]

function TautanAktivitas({ setStep, data, state, buat, setTautanAktivitas, setBookAktivitas }) {
  const [tautanActivity, setTautanActivity] = useState(state.tautan ? state.tautan : '')
  const [bookActivity, setBookActivity] = useState(state.link_guidebook ? state.link_guidebook : '')
  const [tautanFix, setTautanFix] = useState('')
  const [bookFix, setBookFix] = useState('')
  const optionTautan = optionsTautan.find(
    (option) => option.label === state.tautan
  )
  const [checklist, setChecklist] = useState(
    optionTautan ? optionTautan.value : ''
  )

  function handleOnSimpan() {
    data({
      tautan: tautanFix,
      link_guidebook: bookFix,
    })
  }

  const handleOnKirim = () => {
    handleOnSimpan()
    setTimeout(() => {
      buat()
    }, 2000)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  function validator() {
    if (tautanActivity) {
      return true
    }
    return false
  }

  return (
    <div className="py-6 bg-white rounded-t-[30px] mt-6">
      {/* DURASI */}
      <div className="mx-[20px]">
        {/* <h1 className="text-base font-normal">Tombol pendaftaran melalui...</h1> */}
        <div className="block w-full mt-[2px]">
          {/* <label forhtml="tautanInvoluntir">
            <div
              className={`rounded-[30px] mt-6 p-[20px] cursor-pointer  mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${
                checklist === optionsTautan[0].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
              }`}
            >
              <p className={`text-large font-semibold text-peduly-dark`}>
                Opsi Tambahan
              </p>
              <input
                type="checkbox"
                name="tautan"
                id="tautanInvoluntir"
                checked={checklist === optionsTautan[0].value}
                className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                onChange={() => {
                  setChecklist(optionsTautan[0].value)
                  setTautanFix(optionsTautan[0].value)
                  setTautanAktivitas(optionsTautan[0].value)
                }}
              />
            </div>
          </label> */}
          {/* <label forhtml="tautan">
            <div
              className={`rounded-[30px] mt-6 p-[20px] cursor-pointer  mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${
                checklist === optionsTautan[1].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
              }`}
            >
              <p className={`text-large font-semibold text-peduly-dark`}>
                Tambahkan tautan Lain
              </p>
              <input
                type="checkbox"
                name="tautan"
                id="tautan"
                checked={checklist === optionsTautan[1].value}
                className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                onChange={() => {
                  setChecklist(optionsTautan[1].value)
                  setTautanFix(null)
                }}
              />
            </div>
          </label> */}
            <div className='mt-[20px]'>
              <h1 className="text-base font-normal">Link grup whatsapp volunteer</h1>
              <input
                type="text"
                className="mt-4 p-5 w-full border-[1px] border-peduly-light rounded-[30px]"
                placeholder="Masukan link grup whatsapp disini"
                value={tautanActivity}
                onChange={(e) => {
                  setTautanActivity(e.target.value)
                  setTautanFix(e.target.value)
                  setTautanAktivitas(e.target.value)
                }}
              />
              <div className="mt-6 mb-11">
              <p className={`text-sm text-[#717171]`}>
                Link grup whatsapp digunakan untuk mengarahkan relawan masuk ke grup whatsapp kegiatan ini.{' '}
                {/* <a href="/error" className={`text-peduly-primary`}>
                  Selengkapnya
                </a> */}
              </p>
            </div>
            <h1 className="text-base font-normal">Link Buku Panduan</h1>
              <input
                type="text"
                className="mt-4 p-5 w-full border-[1px] border-peduly-light rounded-[30px]"
                placeholder="Masukan link guidebook disini"
                value={bookActivity}
                onChange={(e) => {
                  setBookActivity(e.target.value)
                  setBookFix(e.target.value)
                  setBookAktivitas(e.target.value)
                }}
              />
              {/* <div className="mt-6 mb-11">
              <p className={`text-sm text-[#717171]`}>
                Link grup whatsapp digunakan untuk mengarahkan relawan masuk ke grup whatsapp kegiatan ini.{' '}
                <a href="/error" className={`text-peduly-primary`}>
                  Selengkapnya
                </a>
              </p>
            </div> */}
          </div>
          
        </div>
      </div>
      {/* TOMBOL */}
      <div className="mt-36 mx-[20px]">
        <div className="flex items-center justify-center text-base font-normal mt-[8px]">
          <button
            className="bg-[#E4E4E4] text-[#717171] rounded-full w-full h-[60px] mr-[12px]"
            onClick={() =>
              state.biaya.length > 0 ? setStep('biaya') : setStep('tipe')
            }
          >
            Kembali
          </button>
          {validator() ? (
            <button
              className="bg-peduly-primary text-white rounded-full w-full h-[60px]"
              onClick={handleOnKirim}
            >
              kirim
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

export default TautanAktivitas
