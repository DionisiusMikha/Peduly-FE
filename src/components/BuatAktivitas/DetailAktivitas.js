import { useEffect, useState } from 'react'
// import ReactQuill from 'react-quill'
// import 'react-quill/dist/quill.snow.css'

// const modules = {
//   toolbar: [
//     [{ header: false }],
//     ['bold', 'italic'],
//     [{ list: 'bullet' }],
//     ['image'],
//   ],
// }

// const formats = [
//   'header',
//   'bold',
//   'italic',
//   'underline',
//   'strike',
//   'blockquote',
//   'list',
//   'bullet',
//   'indent',
//   'link',
//   'image',
// ]
function DetailAktivitas({ setStep, data, state }) {
  const [detail, setDetail] = useState(
    state.detail.detail ? state.detail.detail : ''
  )
  const [tugasList, setTugasList] = useState(
    state.detail.tugas ? state.detail.tugas : '',
  )
  const [kriteriaList, setKriteriaList] = useState(
    state.detail.kriteria ? state.detail.kriteria : '',
  )
  const [kuota, setKuota] = useState(
    state.detail.kuota ? state.detail.kuota : ''
  )

  const handleAddKriteria = () => {
    setKriteriaList([...kriteriaList, ''])
  }

  const handleRemoveKriteria = (index) => {
    const list = [...kriteriaList]
    list.splice(index, 1)
    setKriteriaList(list)
  }

  const handleKriteriaChange = (e, index) => {
    const list = [...kriteriaList]
    list[index] = e.target.value
    setKriteriaList(list)
  }

  const handleAddTugas = () => {
    setTugasList([...tugasList, ''])
  }

  const handleRemoveTugas = (index) => {
    const list = [...tugasList]
    list.splice(index, 1)
    setTugasList(list)
  }

  const handleTugasChange = (e, index) => {
    const list = [...tugasList]
    list[index] = e.target.value
    setTugasList(list)
  }

  const handleOnNext = () => {
    setStep('detail')
    data({
      detail: detail,
      tugas: tugasList,
      kriteria: kriteriaList,
      kuota: kuota,
    })
  }

  // const handleOnSimpan = () => {
  //   data({
  //     detail: detail,
  //     tugas: tugasList,
  //     kriteria: kriteriaList,
  //   })
  // }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  function validator() {
    if (detail && tugasList[0] !== '' && kriteriaList[0] !== '' && kuota) {
      return true
    }
    return false
  }

  return (
    <div className="py-6 bg-white rounded-t-[30px] mt-6">
      {/* Detail aktivitas */}
      <div className="mx-[20px]">
        <h1 className="text-large font-medium">Detail Aktivitas</h1>
        <textarea
          className="outline-none border-[#E4E4E4] focus:ring-0 focus:border-[#E4E4E4] w-full h-[157px] border-[1px] rounded-[30px] p-[20px] text-large font-normal placeholder-[#C4C4C4] resize-none  mt-[14px]"
          placeholder="Perkenalkan dirimu dan beri tahu detail aktivitas yang akan dilaksanakan"
          value={detail}
          onChange={(e) => {
            setDetail(e.target.value)
          }}
        >
          tujuan galang dana
        </textarea>
      </div>
      {/* Kuota */}
      <div className="mx-[20px] mt-[24px]">
        <h1 className="text-large font-medium">Kuota Relawan</h1>
        <div className="px-[20px] h-[65px] rounded-[30px] border-[1px] flex items-center overflow-hidden mt-[14px]">
          <input
            id="kuota"
            className="outline-none border-0 w-full text-large font-normal placeholder-[#C4C4C4] pr-[10px] focus:ring-transparent focus:ring-0 focus:ring-opacity-0 focus:ring-offset-0"
            placeholder="Jumlah kuota relawan yang tersedia"
            value={kuota}
            onChange={(e) => {
              setKuota(e.target.value.replace(/\D/g, ''))
            }}
          />
          <span
            className="h-[60px] text-lg flex items-center pl-[14px]"
            style={{ borderLeft: '1px solid rgba(0, 0, 0, 0.1)' }}
          >
            <label
              htmlFor="kuota"
              className="text-base font-normal text-[#212121]"
            >
              Orang
            </label>
          </span>
        </div>
      </div>
      {/* tugas relawan */}
      <div className="mx-[20px] mt-[24px]">
        <h1 className="text-large font-medium">Tugas Relawan</h1>
        {tugasList.map((singleTugas, index) => (
          <div className="flex" key={index}>
            <input
              type="text"
              className={`flex-grow outline-none border-[#E4E4E4] focus:ring-0 focus:border-[#E4E4E4] p-[20px] text-large font-normal placeholder-[#C4C4C4] mt-[14px] ${tugasList.length > 1
                  ? 'border-[1px] border-r-0 rounded-l-[30px]'
                  : 'border-[1px] rounded-[30px]'
                }`}
              placeholder="Tuliskan tugas-tugas relawan"
              value={singleTugas.deskripsi || singleTugas}
              onChange={(e) => handleTugasChange(e, index)}
            />
            {tugasList.length > 1 && (
              <div
                className="w-12 mt-[14px] rounded-r-[30px] bg-[#e3170a] grid place-content-center cursor-pointer"
                onClick={() => handleRemoveTugas(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#fff"
                    strokeMiterlimit="10"
                    d="M10 2L9 3H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1h-4l-1-1zM5 7v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7zm4 2c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1s-1-.4-1-1v-9c0-.6.4-1 1-1zm6 0c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1s-1-.4-1-1v-9c0-.6.4-1 1-1z"
                    fontFamily="none"
                    fontSize="none"
                    fontWeight="none"
                    textAnchor="none"
                    transform="scale(10.66667)"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        ))}
        {tugasList.length < 8 && (
          <button
            className="bg-peduly-primary text-white rounded-full mt-[12px] px-4 py-3"
            onClick={handleAddTugas}
          >
            Tambah Tugas
          </button>
        )}
      </div>
      {/* kriteria relawan */}
      <div className="mx-[20px] mt-[24px]">
        <h1 className="text-large font-medium">Kriteria Relawan</h1>
        {kriteriaList.map((singleKriteria, index) => (
          <div className="flex" key={index}>
            <input
              type="text"
              className={`flex-grow outline-none border-[#E4E4E4] focus:ring-0 focus:border-[#E4E4E4] p-[20px] text-large font-normal placeholder-[#C4C4C4] mt-[14px] ${kriteriaList[0].length > 1
                  ? 'border-[1px] border-r-0 rounded-l-[30px]'
                  : 'border-[1px] rounded-[30px]'
                }`}
              placeholder="Tuliskan Kriteria relawan"
              value={singleKriteria.deskripsi || singleKriteria}
              onChange={(e) => handleKriteriaChange(e, index)}
            />
            {kriteriaList.length > 1 && (
              <div
                className="w-12 mt-[14px] rounded-r-[30px] bg-[#e3170a] grid place-content-center cursor-pointer"
                onClick={() => handleRemoveKriteria(index)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="#fff"
                    strokeMiterlimit="10"
                    d="M10 2L9 3H5c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1h-4l-1-1zM5 7v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V7zm4 2c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1s-1-.4-1-1v-9c0-.6.4-1 1-1zm6 0c.6 0 1 .4 1 1v9c0 .6-.4 1-1 1s-1-.4-1-1v-9c0-.6.4-1 1-1z"
                    fontFamily="none"
                    fontSize="none"
                    fontWeight="none"
                    textAnchor="none"
                    transform="scale(10.66667)"
                  ></path>
                </svg>
              </div>
            )}
          </div>
        ))}
        {kriteriaList.length < 8 && (
          <button
            className="bg-peduly-primary text-white rounded-full mt-[12px] px-4 py-3"
            onClick={handleAddKriteria}
          >
            Tambah Kriteria
          </button>
        )}
      </div>
      {/* react quill */}
      {/* <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
      /> */}
      {/* TOMBOL */}
      <div className="mt-[32px] mx-[20px]">
        <div className="flex items-center justify-center text-base font-normal mt-[8px]">
          <button
            className="bg-[#E4E4E4] text-[#717171] rounded-full w-full h-[60px] mr-[12px]"
            onClick={() => setStep('aktivitas')}
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

export default DetailAktivitas
