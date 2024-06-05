import NavLink from '../../components/Navbar/index'
import NavFilter from 'components/NavAktivitas/NavFilter'
import { useState, useEffect } from 'react'
import instance from 'axios'
import SkeletonAktivitas from 'components/SkeletonLoading/SkeletonAktivitas'
import CardAktivitas from 'components/Landing/search/CardAktivitas'
import Offline from 'components/Offline'
import { useOnlineStatus } from 'utils/onlineStatus'

function Aktivitas() {
  const [hidden, setHidden] = useState(false)
  const [itemKategori, setItemKategori] = useState([])
  const [loading, setLoading] = useState(true)
  const isOnline = useOnlineStatus()
  const today = new Date()

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  // Filter aktivitas yang akan datang
  const upcomingActivities =
    itemKategori &&
    itemKategori.filter((activity) => {
      const deadline = new Date(activity.batas_waktu)
      // console.log('deadline', deadline)
      // console.log('deadline', deadline >= today)
      return deadline >= today
    })
  // console.log(upcomingActivities)
  const getData = async () => {

    const data = await instance.get('api/aktivitas?is_active=true')

    const response = await data.data
    console.log(response)
    setItemKategori(response.data)
    setLoading(false)
  }

  async function ChangeCategory(item) {
    setLoading(true)
    const data = await instance.get(`api/aktivitas?kategori=${item}`)

    const response = await data.data
    setLoading(false)

    setItemKategori(response.data)
  }

  async function ChangeFilter(item) {
    setLoading(true)
    const data = await instance.get(`api/aktivitas?filter=${item}`)

    const response = await data.data
    setLoading(false)

    setItemKategori(response.data)
  }

  async function ChangeUrutan(item) {
    setLoading(true)
    const data = await instance.get(`api/aktivitas?urutan=${item}`)

    const response = await data.data
    setLoading(false)

    setItemKategori(response.data)
  }

  return (
    <div style={{ maxWidth: '430px' }} className="mx-auto overflow-hidden">
      <div>
        {/* <NavAktivitasMenu /> */}
        <NavLink />
        <NavFilter
          clk={setHidden}
          ChangeCategory={ChangeCategory}
          ChangeFilter={ChangeFilter}
          ChangeUrutan={ChangeUrutan}
        />
        <div className={`mt-2 flex mb-11 ${hidden && 'hidden'}`}>
          {isOnline ? (
            <div className="mt-3 px-5 w-full max-w-[430px]">
              {!loading ? (
                upcomingActivities.length <= 0 ? (
                  <div
                    className="grid place-content-center"
                    style={{ height: 'calc(100vh - 126px)' }}
                  >
                    <p className="text-peduly-subtitle">Belum ada aktivitas</p>
                  </div>
                ) : (
                  upcomingActivities.slice().reverse().map((value) => (
                    <div key={value.id}>
                      <CardAktivitas value={value} />
                    </div>
                  ))
                )
              ) : (
                <div>
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i}>
                      <SkeletonAktivitas />
                    </div>
                  ))}
                  <span className="opacity-0 cursor-default">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero, consequuntur!
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-3 px-5 w-full max-w-[430px]">
              <Offline />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Aktivitas
