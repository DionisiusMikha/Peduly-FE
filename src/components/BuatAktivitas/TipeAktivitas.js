import { useState, useEffect } from 'react'

import './index.css'

const optionsTipeAktivitas = [
  { value: 'Virtual', label: 'Virtual' },
  { value: 'In-Person', label: 'Tatap Muka' },
  { value: 'Hybrid', label: 'Hybrid' },
]

const optionsJenisAktivitas = [
  { value: 'free', label: 'Aktivitas Gratis' },
  { value: 'paid', label: 'Aktivitas Berbayar' },
]

function TipeAktivitas({
  setStep,
  dataTipe,
  dataJenis,
  dataBiaya,
  state,
  setTipeAktivitas,
  setJenisAktivitas,
}) {
  const optionTipe = optionsTipeAktivitas.find(
    (option) => option.value === state.tipe
  )
  const [checklistTipe, setChecklistTipe] = useState(
    optionTipe ? optionTipe.value : ''
  )

  const optionJenis = optionsJenisAktivitas.find(
    (option) => option.value === state.jenis
  )
  const [checklistJenis, setChecklistJenis] = useState(
    optionJenis ? optionJenis.value : ''
  )

  const handleOnNext = () => {
    if (checklistJenis === 'paid') {
      setStep('biaya')
    } else {
      dataBiaya([])
      setStep('tautan')
    }
    dataTipe(checklistTipe)
    dataJenis(checklistJenis)
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  function validator() {
    if (checklistTipe && checklistJenis) {
      return true
    }
    return false
  }

  return (
    <div className="py-6 bg-white rounded-t-[30px] mt-6">
      {/* DURASI */}
      <div className="mx-[20px]">
        <h1 className="text-base font-normal">
          Aktivitas ini diadakan secara...
        </h1>
        <div className="block w-full mt-[2px]">
          <label htmlFor="virtual">
            <div
              className={`rounded-[30px] mt-6 p-[20px] cursor-pointer  mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${
                checklistTipe === optionsTipeAktivitas[0].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
              }`}
              onClick={setTipeAktivitas(optionsTipeAktivitas[0].value)}
            >
              <p className={`text-large font-semibold text-peduly-dark`}>
                Virtual
              </p>
              <input
                type="checkbox"
                name="tipe"
                id="virtual"
                checked={checklistTipe === optionsTipeAktivitas[0].value}
                className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                onChange={() => setChecklistTipe(optionsTipeAktivitas[0].value)}
              />
              {/* <input type="checkbox" name="" className="input-custom" checked /> */}
            </div>
          </label>
          <label htmlFor="tatapmuka">
            <div
              className={`rounded-[30px] mt-6 p-[20px] cursor-pointer  mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${
                checklistTipe === optionsTipeAktivitas[1].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
              }`}
              onClick={setTipeAktivitas(optionsTipeAktivitas[1].value)}
            >
              <p className={`text-large font-semibold text-peduly-dark`}>
                Tatap Muka
              </p>
              <input
                type="checkbox"
                name="tipe"
                id="tatapmuka"
                checked={checklistTipe === optionsTipeAktivitas[1].value}
                className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                onChange={() => setChecklistTipe(optionsTipeAktivitas[1].value)}
              />
            </div>
          </label>
          <label htmlFor="hybrid">
            <div
              className={`rounded-[30px] mt-6 p-[20px] cursor-pointer  mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${
                checklistTipe === optionsTipeAktivitas[2].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
              }`}
              onClick={setTipeAktivitas(optionsTipeAktivitas[2].value)}
            >
              <p className={`text-large font-semibold text-peduly-dark`}>
                Hybrid
              </p>
              <input
                type="checkbox"
                name="tipe"
                id="hybrid"
                checked={checklistTipe === optionsTipeAktivitas[2].value}
                className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                onChange={() => setChecklistTipe(optionsTipeAktivitas[2].value)}
              />
            </div>
          </label>
        </div>
      </div>
      {/* JENIS AKTIVITAS */}
      <div className="mx-[20px] mt-[30px]">
        <h1 className="text-base font-normal">Jenis Aktivitas</h1>
        <div className="block w-full mt-[2px]">
          <label htmlFor="aktivitas-gratis" className='pointer-events-none'>
            <div
              className={`rounded-[30px] mt-6 p-[20px] pointer-events-none mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${
                checklistJenis === optionsJenisAktivitas[0].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
              }`}
              onClick={setJenisAktivitas(optionsJenisAktivitas[0].value)}
            >
              <p className={`text-large font-semibold text-peduly-subtitle`}>
                Aktivitas Fully Funded / Free
              </p>
              <input
                type="checkbox"
                name="tipe"
                id="aktivitas-gratis"
                checked={checklistJenis === optionsJenisAktivitas[0].value}
                className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                onChange={() =>
                  setChecklistJenis(optionsJenisAktivitas[0].value)
                }
              />
            </div>
          </label>
          <label htmlFor="jenis-berbayar">
            <div
              className={`rounded-[30px] mt-6 p-[20px] cursor-pointer  mr-[20px] w-full flex flex-row justify-between items-center drop-shadow ${
                checklistJenis === optionsJenisAktivitas[1].value
                  ? `bg-involuntir-bgicon border-[1px] border-peduly-primary`
                  : `bg-white border-[1px]`
              }`}
              onClick={setJenisAktivitas(optionsJenisAktivitas[1].value)}
            >
              <p className={`text-large font-semibold text-peduly-dark`}>
                Aktivitas Self Funded
              </p>
              <input
                type="checkbox"
                name="tipe"
                id="jenis-berbayar"
                checked={checklistJenis === optionsJenisAktivitas[1].value}
                className="rounded-full text-peduly-primary input-custom focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
                onChange={() =>
                  setChecklistJenis(optionsJenisAktivitas[1].value)
                }
              />
            </div>
          </label>
        </div>
      </div>
      {/* TOMBOL */}
      <div className="mt-32 mx-[20px]">
        <div className="flex items-center justify-center text-base font-normal mt-[8px]">
          <button
            className="bg-[#E4E4E4] text-[#717171] rounded-full w-full h-[60px] mr-[12px]"
            onClick={() => setStep('detail')}
          >
            Kembali
          </button>
          {validator() ? (
            <button
              className="bg-peduly-primary text-white rounded-full w-full h-[60px]"
              onClick={handleOnNext}
            >
              lanjut
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

export default TipeAktivitas
