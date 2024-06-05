import React from 'react'
import { useHistory } from 'react-router-dom'
import { useContext, useState, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import DonasiInvolunter from 'components/Donasi/Donasi'
import BackButton from 'components/BackButton'

import axios from 'axios'
import { API_URL } from 'config/api'
import { useParams } from 'react-router'
import { UserContext } from '../../context/UserContext'
import { TitleNameContext } from 'context/TitleNameContext'

import 'index.css'
import KonfirmasiFullyFunded from 'components/Konfirmasi/KonfirmasiFullyFunded'
import KonfirmasiSelfFunded from 'components/Konfirmasi/KonfirmasiSelfFunded'
import { bool } from 'prop-types'
import LengkapiConfirmation from 'components/NavAktivitas/LengkapiConfirmation'


// const TabCarousel = ({ children, activeIndex, setActiveIndex }) => {
//   const updateIndex = (newIndex) => {
//     if (newIndex >= 0 && newIndex < React.Children.count(children)) {
//       setActiveIndex(newIndex)
//     }
//   }

//   const handlers = useSwipeable({
//     onSwipedLeft: () => updateIndex(activeIndex + 1),
//     onSwipedRight: () => updateIndex(activeIndex - 1),
//   })

//   return (
//     <div {...handlers} className="mt-[72px] py-0 tab-details-wrapper">
//       <div
//         className="whitespace-nowrap tab-inner"
//         style={{
//           transform: `translateX(-${activeIndex * 100}%)`,
//           transition: 'transform 300ms',
//         }}
//       >
//         {React.Children.map(children, (child, index) => {
//           return React.cloneElement(child, { width: '100%' })
//         })}
//       </div>
//     </div>
//   )
// }

// export const TabItem = ({ children, width }) => {
//   return (
//     <div
//       className={`inline-block w-full py-6 text-peduly-dark leading-[22px] `}
//       style={{ marginTop: '-25px' }}
//       width={width}
//     >
//       {children}
//     </div>
//   )
// }

const Konfirmasi = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [pilihMetodeActive, setPilihMetodeActive] = useState(false)
  const history = useHistory()
  const [selfFunded, setSelfFunded] = useState(true)

  const [loading, setLoading] = useState(true)
  const [dataAktivitas, setDataAktivitas] = useState({})
  const [tautan, setTautan] = useState()
  const [ownerActivity, setOwnerActivity] = useState(false)
  const { handleSetTitle } = useContext(TitleNameContext)
  const [popUp, setPopUp] = useState(false);


  const user = useContext(UserContext)
  const { slug } = useParams()

  const getData = async () => {
    setLoading(true)
    let gettingData = await axios.get(`${API_URL}/api/aktivitas/byslug/${slug}`)
    let response = await gettingData.data
    // console.log(response)
    // console.log(response.data.activity.jenis_activity)
    setDataAktivitas(response)
    // console.log(response)
    setTautan(response.data.activity.tautan)
    if (user?.user?.username === response?.data?.user[0]?.username) {
      setOwnerActivity(true)
    }
    setLoading(false)

    // setData(data)
  }

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
    if (user.user.no_telp !== null && user.user.provinsi !== null && user.user.kabupaten !== null && user.user.kecamatan !== null) {
      setPopUp(false)
      return true;
    } else {
      setPopUp(true)
      return false;
    }
  }, [user])

  console.log(popUp);

  return (
    <>
      {popUp && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 z-50"
        ></div>
      )}
      {/* Pop-up */}
      <LengkapiConfirmation
        status={popUp}
        onClickOutside={() => (popUp && setPopUp(true))}
        source={slug}
      />
      <div className='mx-auto' style={{ maxWidth: '430px' }}>
        <BackButton hrf={'1'} txt="Jadi Volunteer" />
        <div className='px-[20px]'>
          {dataAktivitas.data && dataAktivitas.data && dataAktivitas.data.activity && dataAktivitas.data.activity.jenis_activity === "paid" ? (
            <KonfirmasiSelfFunded />
          ) : dataAktivitas.data && dataAktivitas.data && dataAktivitas.data.activity && dataAktivitas.data.activity.jenis_activity === "free" ? (
            <KonfirmasiFullyFunded />
          ) : ""}

        </div>
      </div>
    </>
  )
}

export default Konfirmasi
