import { Link } from 'react-router-dom'

const dampak = [
  {
    id: 1,
    slug: 'volunteer-sukses',
    judul: 'Aksi Volunter di cianjur mendapat banyak apresiasi dari warga',
    foto: '',
  },
  {
    id: 2,
    slug: 'kisah-sukses',
    judul: 'Kisah sukses Galang dana surabaya dan sekitarnya',
    foto: '',
  },
  {
    id: 3,
    slug: 'kisah-tsunami-lombok',
    judul: 'kisah relawan tsunami lombok',
    foto: '',
  },
  {
    id: 4,
    slug: 'relawan-cianjur',
    judul: 'relawan gempa cianjur menyelamatkan banyak orang',
    foto: '',
  },
]

export const DampakBaik = () => {
  return (
    <div className="mb-[54px] pb-6">
      <div className="flex justify-between mx-5 mb-6">
        <p className="text-xl font-semibold text-peduly-dark">
          Lihat Dampak Baikmu
        </p>
        <div className="flex items-center">
          <Link to="/">
            <p className="text-peduly-primary text-basic font-semibold">
              Lihat semua
            </p>
          </Link>
        </div>
      </div>
      <div className="mx-5 flex overflow-x-scroll whitespace-nowrap mr-4 max-h-[230px]">
        {dampak.map((value) => (
          <div key={value.slug}>
            <div className="mr-4 relative w-[170px] h-[230px] cursor-pointer">
              <img
                src={value.foto}
                alt=""
                className="absolute z-10"
                style={{
                  height: '230px',
                  width: '170px',
                  objectFit: 'cover',
                  borderRadius: '30px',
                }}
                onError={(e) => {
                  e.target.onerror = null
                  e.target.src = '/images/involunter/defaultImage.png'
                }}
              />
              <div className="absolute z-20 w-full h-full backdrop-brightness-50 rounded-[30px]">
                <div className="flex items-center justify-center h-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="42"
                    height="42"
                    fill="none"
                    viewBox="0 0 42 42"
                  >
                    <path
                      stroke="#c41230"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      d="M20.948 38.5c9.665 0 17.5-7.835 17.5-17.5s-7.835-17.5-17.5-17.5-17.5 7.835-17.5 17.5 7.835 17.5 17.5 17.5z"
                    ></path>
                    <path
                      fill="#c41230"
                      d="M15.295 21.402V18.48c0-3.64 2.572-5.128 5.722-3.308l2.538 1.47 2.538 1.47c3.15 1.82 3.15 4.796 0 6.616l-2.538 1.47-2.538 1.47c-3.15 1.82-5.722.332-5.722-3.308v-2.957z"
                    ></path>
                  </svg>
                </div>
              </div>
              <div className="absolute z-30 bottom-5 max-w-[170px]">
                <p className="px-5 text-base font-semibold text-white overflow-hidden overflow-ellipsis whitespace-normal line-clamp-2">
                  {value.judul}
                </p>
              </div>
            </div>
          </div>
        ))}
        {/* <div className="absolute w-full h-full "></div> */}
      </div>
    </div>
  )
}
