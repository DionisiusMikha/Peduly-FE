import CarouselMain from 'components/Landing/Carousel'
import NavLink from '../../components/Navbar'
import { Category } from 'components/Landing/Category'
import Header from 'components/Landing/Header'
import Greeting from 'components/Landing/Greeting/Greeting'
import IconButton from 'components/Landing/IconButton/IconButton'
import { useEffect, useState } from 'react'
import { DampakBaik } from 'components/Landing/DampakBaik'

import '../../styles/landing.css'
import { getToken } from 'utils/cookiesHooks'
import WarningModal from './WarningModal'

const Landing = () => {
  const [showDampakBaik] = useState(false)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }, [])

  return (
    <div
      style={{ maxWidth: '430px' }}
      className="mx-auto overflow-hidden overflow-y-auto mb-[55px]"
    >
      {/* NAVBAWAH */}
      <NavLink />
      <div>
        {/* HEADER */}
        <Header />

        {/* GREETING */}
        {getToken() ? <Greeting /> : <></>}

        {/* ICON BUTTON TODO*/}
        {/* <IconButton /> */}

        {/* COROUSEL */}
        <div className="mt-[30px]">
          <CarouselMain />
        </div>

        {/* KATEGORI */}
        <Category />

        {/* Dampak baik */}
        {showDampakBaik && (
          <>
            <hr className="hr-bold my-6" />
            <DampakBaik />
          </>
        )}
      </div>
    </div>
  )
}

export default Landing
