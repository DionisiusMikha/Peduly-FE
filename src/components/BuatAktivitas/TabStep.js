import { useEffect } from 'react'

function TabStep({ step }) {
  useEffect(() => {
    const tabStep = document.querySelector('.tab-step')
    if (step === 'relawan') {
      tabStep.scrollLeft = 0
    } else if (step === 'detail') {
      tabStep.scrollLeft = 66
    } else if (step === 'tipe') {
      tabStep.scrollLeft = 132
    }
  }, [step])

  return (
    <div className="tab-step flex flex-row overflow-x-scroll scroll-smooth px-[20px] cursor-move no-scrollbar">
      {/* Aktivitas */}
      <div className=" flex flex-col items-center mr-[6px]">
        <p className={'text-base mb-[9px] text-peduly-primary'}>Aktivitas</p>
        <hr className="w-[100px] h-[4px] bg-peduly-primary rounded" />
      </div>
      {/* Relawan */}
      <div className=" flex flex-col items-center mr-[6px]">
        <p
          className={
            'text-base mb-[9px] ' +
            (step === 'relawan' || step === 'detail' || step === 'tipe'
              ? 'text-peduly-primary'
              : 'text-[#717171]')
          }
        >
          Relawan
        </p>
        <hr
          className={
            'w-[100px] h-[4px] rounded ' +
            (step === 'relawan' || step === 'detail' || step === 'tipe'
              ? 'bg-peduly-primary'
              : 'bg-[#E4E4E4]')
          }
        />
      </div>
      {/* Detail */}
      <div className=" flex flex-col items-center mr-[6px]">
        <p
          className={
            'text-base mb-[9px] ' +
            (step === 'detail' || step === 'tipe'
              ? 'text-peduly-primary'
              : 'text-[#717171]')
          }
        >
          Detail
        </p>
        <hr
          className={
            'w-[100px] h-[4px] rounded ' +
            (step === 'detail' || step === 'tipe'
              ? 'bg-peduly-primary'
              : 'bg-[#E4E4E4]')
          }
        />
      </div>
      {/* Tipe */}
      <div className=" flex flex-col items-center mr-[6px]">
        <p
          className={
            'text-base mb-[9px] ' +
            (step === 'tipe' ? 'text-peduly-primary' : 'text-[#717171]')
          }
        >
          Tipe
        </p>
        <hr
          className={
            'w-[100px] h-[4px] rounded ' +
            (step === 'tipe' ? 'bg-peduly-primary' : 'bg-[#E4E4E4]')
          }
        />
      </div>
      {/* Tautan */}
      <div className=" flex flex-col items-center mr-[6px]">
        <p
          className={
            'text-base mb-[9px] ' +
            (step === 'tautan' ? 'text-peduly-primary' : 'text-[#717171]')
          }
        >
          Tautan
        </p>
        <hr
          className={
            'w-[100px] h-[4px] rounded ' +
            (step === 'tautan' ? 'bg-peduly-primary' : 'bg-[#E4E4E4]')
          }
        />
      </div>
    </div>
  )
}

export default TabStep
