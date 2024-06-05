import React from 'react'

function IconButton() {
  return (
    <div className="mx-[30px] mt-[32px]">
      <div className="flex">
        <div
          className="w-[60px] cursor-pointer"
          style={{ marginLeft: '15px', marginRight: '15px' }}
        >
          <a href="/aktivitas">
            <div
              style={{ boxShadow: '0px 1px 16px 0px rgba(0, 0, 0, 0.08)' }}
              className="flex justify-center items-center rounded-[15px] w-[60px] h-[60px]"
            >
              <img src="/icon/landing-page/hands-up.svg" alt="icon button" />
            </div>
            <span className="flex flex-col items-center text-[12px] mt-[8px] text-[#717171]">
              Aktivitas
            </span>
          </a>
        </div>

        <div
          className="w-[60px] cursor-pointer"
          style={{ marginLeft: '15px', marginRight: '15px' }}
        >
          <a href="/organisasi">
            <div
              style={{ boxShadow: '0px 1px 16px 0px rgba(0, 0, 0, 0.08)' }}
              className="flex justify-center items-center rounded-[15px] w-[60px] h-[60px]"
            >
              <img src="/icon/landing-page/solidarity.svg" alt="icon button" />
            </div>
            <span className="flex flex-col items-center text-[12px] mt-[8px] text-[#717171]">
              Organisasi
            </span>
          </a>
        </div>

        <div
          className="w-[60px] cursor-pointer"
          style={{ marginLeft: '15px', marginRight: '15px' }}
        >
          <a href="https://peduly.com">
            <div
              style={{ boxShadow: '0px 1px 16px 0px rgba(0, 0, 0, 0.08)' }}
              className="flex justify-center items-center rounded-[15px] w-[60px] h-[60px]"
            >
              <img src="/icon/landing-page/box.svg" alt="icon button" />
            </div>
            <span className="flex flex-col items-center text-[12px] mt-[8px] text-[#717171]">
              Donasi
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}

export default IconButton
