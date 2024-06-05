import { useState, useContext } from 'react'
import BackButton from 'components/BackButton'
import LogoutConfirmation from 'components/Akun/LogoutConfirmation'
import { Link } from 'react-router-dom'
import 'styles/Profile.css'
import { UserContext } from 'context/UserContext'

function Ubah() {
  const [popUp, setPopUp] = useState(false)
  const { user } = useContext(UserContext)
  return (
    <div>
      {popUp && (
        <div
          className="mx-auto w-full h-full fixed z-50"
          style={{ background: 'rgb(111, 111, 111, 0.5)' }}
        ></div>
      )}
      <div className="mx-auto" style={{ maxWidth: '430px' }}>
        <LogoutConfirmation
          status={popUp}
          onClickOutside={() => (popUp ? setPopUp(!popUp) : null)}
        />
        <BackButton hrf={'1'} txt="Pengaturan" />
        <Link to={`/send-otp`}>
          <div
            style={{ paddingTop: '100px' }}
            className="grid grid-cols-6 py-[25px] w-full  align-middle"
          >
            <div className="xs:ml-[30px] ml-[15px] ">
            </div>
            <div className="col-span-3 ">
              <span>Ubah Kata Sandi</span>
            </div>
          </div>
        </Link>
        <hr style={{ width: '90%', margin: 'auto' }} />
        <Link
          to={{
            pathname: `https://docs.google.com/forms/d/e/1FAIpQLSefXjt4BiqSLX8kpolWzDAki9-1E4vAQdO8ZYjyKAFS_scWHQ/viewform?usp=sf_link`,
          }}
          target="_blank"
        >
          <div className="grid grid-cols-6 py-[25px] w-full  align-middle">
            <div className="xs:ml-[30px] ml-[15px] ">
            </div>
            <div className="col-span-3 ">
              <span>Alihkan Ke Akun Organisasi</span>
            </div>
          </div>
        </Link>
        <hr style={{ width: '90%', margin: 'auto' }} />
        <div className="cursor-pointer" onClick={() => setPopUp(true)}>
          <div
            // style={{ marginLeft: '40px', marginRight: '40px' }}
            className="py-[25px] m-but-ex"
          >
            <button className="rounded-full border-[1px] border-peduly-primary text-base font-normal text-peduly-primary w-full py-[18px] ">
              Keluar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ubah
