import React, { useState } from 'react'
import { getToken } from 'utils/cookiesHooks'
import { API_URL } from 'config/api'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, Redirect } from 'react-router-dom'
import NavLink from 'components/Navbar'
import TabProfile from 'components/Profile/TabProfile'
import scooter from 'assets/img/Scooter.jpg'
import RiwayatAktivitas from 'components/Profile/RiwayatAktivitas'

const Profile = () => {
  const user = useContext(UserContext)

  function socialsCheck(socialName) {
    if (user?.user?.socials) {
      const social = user?.user?.socials.find(
        (social) => social.name === socialName
      )
      if (social && (social.url !== '' || social.url !== null)) {
        return social.url
      }
    }
    return null
  }

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [user]);
  

  if (!getToken()) {
    return <Redirect to="/" />
  }

  return (
    <div
      style={{ maxWidth: '430px' }}
      className="mx-auto overflow-hidden overflow-y-auto min-h-screen"
    >
      {/* NAVBAWAH */}
      <NavLink />
      <div>
      <div className="w-full max-w-[430] h-[138px]">
        {user?.user?.banner ? (
          <img
            src={`${API_URL}${user?.user?.banner}`}
            alt="banner"
            className="w-full max-w-[430] h-[138px] object-cover"
          />
        ) : (
          <div className="w-full max-w-[430] h-[138px] bg-gradient-to-r from-[#36D1DC] to-[#5B86E5]"></div>
        )}
      </div>


        {console.log("user photo" + user?.user?.photo)}
        <div>
          {user?.user?.photo ? (
            <img
              src={`${API_URL}${user?.user?.photo}`}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/no-avatar.png';
              }}
              style={{
                marginTop: '-43px',
              }}
              alt=""
              className="relative w-[86px] h-[86px] border-4 border-white rounded-full ml-5 object-cover"
            />
          ) : (
            <img
              src="/images/no-avatar.png"
              style={{
                marginTop: '-43px',
              }}
              alt=""
              className="relative w-[86px] h-[86px] border-4 border-white rounded-full ml-5 object-cover"
            />
          )}
        </div>

        <div className="px-5 flex flex-col mt-3">
          <div className="flex justify-between">
            <h1 className="text-lg text-peduly-dark font-semibold self-center">
              {user?.user?.name ? user?.user?.name : 'username'}
            </h1>
            <Link to={'/pengaturan'}>
              <button className="px-[15px] py-[10px] text-sm text-peduly-primary font-semibold border border-solid border-peduly-primary rounded-full">
                Ubah
              </button>
            </Link>
          </div>
          {user?.user?.username && (
            <h2
              className="text-sm text-peduly-subtitle font-normal"
              style={{
                marginTop: '-8px',
              }}
            >
              @{user?.user?.username}
            </h2>
          )}
          {user?.user?.description !== '' || user?.user?.description !== null ? (
            <p className="text-sm text-peduly-dark font-normal mt-[14px]">
              {user?.user?.description}
            </p>
          ) : null}
          {/* SOCIALS */}
          <div className="flex mt-[20px]">
            {socialsCheck('tiktok') !== null ? (
              <Link
                to={{ pathname: `${socialsCheck('tiktok')}` }}
                target="_blank"
                className="ml-0 w-6 h-6 mr-[12px]"
              >
                <img
                  src="/icon/sosial-media/tiktok.svg"
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
              </Link>
            ) : (
              ''
            )}
            {socialsCheck('instagram') !== null ? (
              <Link
                to={{ pathname: `${socialsCheck('instagram')}` }}
                target="_blank"
                className="ml-0 w-6 h-6 mr-[12px]"
              >
                <img
                  src="/icon/sosial-media/instagram.svg"
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
              </Link>
            ) : (
              ''
            )}
            {socialsCheck('twitter') !== null ? (
              <Link
                to={{ pathname: `${socialsCheck('twitter')}` }}
                target="_blank"
                className="ml-0 w-6 h-6 mr-[12px]"
              >
                <img
                  src="/icon/sosial-media/twitter.svg"
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
              </Link>
            ) : (
              ''
            )}
            {socialsCheck('twitter') !== null ? (
              <Link
                to={{ pathname: `${socialsCheck('linkedin')}` }}
                target="_blank"
                className="ml-0 w-6 h-6 mr-[12px]"
              >
                <img
                  src="/icon/sosial-media/linkedin.svg"
                  alt=""
                  className="w-6 h-6 rounded-full object-cover"
                />
              </Link>
            ) : (
              ''
            )}
          </div>
          <div className='mt-8'>
            {user.user.tipe === 'Organisasi' && (
              <div className="flex flex-col">
                <Link to={'/aktivitas-saya'}>
                  <div className="flex py-[18px] pl-6 rounded-full w-full items-center border border-solid border-peduly-light mt-[14px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#c41230" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M15.75 9H8.25" stroke="#c41230" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M15.75 15H8.25" stroke="#c41230" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                    <h1 className="text-base text-peduly-dark font-semibold ml-4 ">
                      Aktivitas Saya
                    </h1>
                  </div>
                </Link>
              </div>
            )}
            <div className="flex flex-col">
              <Link to={'/'}>
                <div className="flex py-[18px] pl-6 rounded-full w-full items-center border border-solid border-peduly-light mt-[14px]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.75 2.44995C11.44 1.85995 12.57 1.85995 13.27 2.44995L14.85 3.81005C15.15 4.07005 15.71 4.28002 16.11 4.28002H17.81C18.87 4.28002 19.74 5.14996 19.74 6.20996V7.91003C19.74 8.30003 19.95 8.87004 20.21 9.17004L21.57 10.75C22.16 11.44 22.16 12.57 21.57 13.27L20.21 14.85C19.95 15.15 19.74 15.71 19.74 16.11V17.8101C19.74 18.8701 18.87 19.74 17.81 19.74H16.11C15.72 19.74 15.15 19.95 14.85 20.21L13.27 21.5699C12.58 22.1599 11.45 22.1599 10.75 21.5699L9.17002 20.21C8.87002 19.95 8.31001 19.74 7.91001 19.74H6.18C5.12 19.74 4.25 18.8701 4.25 17.8101V16.1C4.25 15.71 4.04001 15.15 3.79001 14.85L2.44 13.26C1.86 12.57 1.86 11.45 2.44 10.76L3.79001 9.17004C4.04001 8.87004 4.25 8.31004 4.25 7.92004V6.20996C4.25 5.14996 5.12 4.28002 6.18 4.28002H7.91001C8.30001 4.28002 8.87002 4.07005 9.17002 3.81005L10.75 2.44995Z"
                      stroke="#c41230"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.89001 14.82L11.34 15.94C11.53 16.13 11.95 16.22 12.23 16.22H14C14.56 16.22 15.17 15.8 15.31 15.24L16.43 11.82C16.66 11.17 16.24 10.6 15.54 10.6H13.67C13.39 10.6 13.16 10.3701 13.2 10.0401L13.43 8.54008C13.52 8.12008 13.24 7.65005 12.82 7.51005C12.45 7.37005 11.98 7.56 11.79 7.84L9.87 10.69"
                      stroke="#c41230"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M7.5 14.8199V10.24C7.5 9.57999 7.78 9.34998 8.44 9.34998H8.91C9.56 9.34998 9.85001 9.57999 9.85001 10.24V14.8199C9.85001 15.4699 9.57 15.71 8.91 15.71H8.44C7.78 15.71 7.5 15.4799 7.5 14.8199Z"
                      stroke="#c41230"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h1 className="text-base text-peduly-dark font-semibold ml-4 ">
                    Dukung Kami
                  </h1>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-3">
          <TabProfile />
          {/* <RiwayatAktivitas/> */}

        </div>
      </div>
    </div>
  )
}

export default Profile
