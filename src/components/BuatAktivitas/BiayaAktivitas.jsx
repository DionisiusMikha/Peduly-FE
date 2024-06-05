import SwitchButton from 'components/SwitchButton';
import React, { useEffect, useState } from 'react'

function BiayaAktivitas({
  setStep,
  dataBiaya,
  setVouchers,
  state,
  setisVouchers,
}) {
  console.log(state.activity)
  const [costs, setCosts] = useState({})
  const [voucherList, setVoucherList] = useState(state?.vouchers ? state.vouchers.map(v => ({
    name: v.name_voucher,
    quota: parseInt(v.kuota_voucher),
    minVolunteer: parseInt(v.minimum_donated),
    discount: parseInt(v.presentase_diskon)
  })) : [{
    name: '',
    quota: 1,
    minVolunteer: 1,
    discount: null
  }])
  const [isVoucherActive, setIsVoucherActive] = useState(state?.vouchers)
  const [error, setError] = useState('')

  useEffect(() => {
    if (state.biaya && state.biaya[0]) {
      const { price, ...rest } = state.biaya[0];
      setCosts({
        ...rest,
        biaya: price,
      });
    } else {
      setCosts({
        id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
        per_orang: 1,
        biaya: null,
      });
    }
  }, [state.biaya]);

  const formatRupiah = (value) => {
    if (!value) return '';
    const formatted = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(value).replace('Rp', '').trim();
    return formatted;
  }

  const updateCost = (e) => {
    const value = e.target.value.replace(/\./g, '');
    const numericValue = Number(value);
    setCosts({
      ...costs,
      biaya: numericValue,
    });
    if (numericValue < 100000) {
      setError('Biaya harus lebih dari Rp. 100.000');
    } else {
      setError('');
    }
  }

  const handleDiscount = (e, index) => {
    let inputValue = parseInt(e.target.value, 10)
    const newVoucherList = [...voucherList]
    let newValue = inputValue
    if (isNaN(inputValue) || inputValue < 0) {
      newValue = 0
    } else if (inputValue > 100) {
      newValue = 100
    }
    newVoucherList[index].discount = newValue
    e.target.value = newValue
    setVoucherList(newVoucherList)
  }

  const handleAddVoucher = () => {
    if (voucherList.length < 3) {
      const newVoucherList = [...voucherList]
      newVoucherList[voucherList.length] = {
        name: '',
        discount: 0,
        minVolunteer: 1,
        quota: 1
      }
      setVoucherList(newVoucherList)
      console.log(voucherList)
    }
  }

  const handleOnNext = () => {
    if (costs.biaya >= 100000) {
      setStep('tautan')
      dataBiaya(costs)
      setisVouchers(isVoucherActive)
      setVouchers(voucherList)
    } else {
      setError('Biaya harus lebih dari 100.000')
    }
  }

  function validator() {
    return costs && costs.biaya >= 100000;
  }

  const handleClick = (value, index, key, dom) => {
    const newVoucherList = [...voucherList]
    const count = newVoucherList[index][key]
    if (isNaN(count)) return
    if (count + value < 1) return
    newVoucherList[index][key] = count + value
    setVoucherList(newVoucherList)
    document.getElementById(dom + index).value = count + value
  }

  return (
    <div className="py-6 bg-white rounded-t-[30px] mt-6">
      <div className="mx-[20px]">
        <div>
          <p className='mt-[12px]'>Harga Aktivitas</p>
          <input
            type="text"
            className="outline-none border-[#E4E4E4] focus:ring-0 focus:border-[#E4E4E4] w-full border-[1px] rounded-[30px] p-[20px] text-large font-normal placeholder-[#C4C4C4] mt-[14px]"
            placeholder="Masukkan Nominal (cth: 100.000)"
            value={formatRupiah(costs.biaya) || ''}
            onChange={updateCost}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
        <div className='my-6'>
          <hr />
        </div>
        <div className=''>
          <SwitchButton
            activeLabel={'Voucher aktif'}
            inactiveLabel={'Voucher tidak aktif'}
            state={isVoucherActive}
            setState={setIsVoucherActive}
          />
        </div>
        {isVoucherActive && (<>
          {voucherList.map((voucher, index) => (
            <div key={index}>
              <div className='mt-[30px] font-semibold'>
                Voucher ke-{index + 1}
              </div>
              <textarea className='mt-3 border-[#E4E4E4] border-[1px] rounded-[30px] p-[20px] outline-none focus:ring-0 focus:border-[#E4E4E4] w-full text-large font-normal placeholder-[#C4C4C4]' rows="2" placeholder='Masukkan Judul Voucher' value={voucher.name} onChange={e => {
                const newVoucherList = [...voucherList]
                newVoucherList[index].name = e.target.value
                setVoucherList(newVoucherList)
              }} />
              <div>
                <div className='mt-3 font-semibold'>Potongan Diskon (persentase)</div>
                <div className='flex w-full border-[#E4E4E4] border-[1px] rounded-[30px] p-[20px] mt-[14px]'>
                  <input
                    type="number"
                    className="outline-none p-0 border-none focus:ring-0 focus:border-[#E4E4E4] w-full text-large font-normal placeholder-[#C4C4C4] "
                    placeholder="Masukkan Nominal (cth: 20)"
                    min={1}
                    max={100}
                    value={voucher.discount || undefined}
                    onChange={e => {
                      handleDiscount(e, index)
                    }}
                  />
                  <div className='w-8 font-bold text-peduly-primary text-large'>
                    %
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='flex items-center justify-between'>
                    <p className=''>Min. pernah jadi volunteer</p>
                    <div className='flex items-center gap-2 flex-nowrap'>
                      <div className='hover:cursor-pointer' onClick={() => handleClick(-1, index, "minVolunteer", "volunteer_")}>
                        <img src="/icon/minus-circle.svg" alt="minus" width={24} />
                      </div>
                      <div className='w-[24px]'>
                        <input
                          id={'volunteer_' + index}
                          type="number"
                          className='outline-none border-none focus:ring-0 w-[24px] text-[16px] p-0 text-center'
                          value={voucher.minVolunteer}
                          disabled
                        />
                      </div>
                      <div className='hover:cursor-pointer' onClick={() => handleClick(1, index, "minVolunteer", "volunteer_")}>
                        <img src="/icon/add-circle.svg" alt="minus" width={24} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-4'>
                  <div className='flex items-center justify-between'>
                    <p className=''>Kuota voucher</p>
                    <div className='flex items-center gap-2 flex-nowrap'>
                      <div className='hover:cursor-pointer' onClick={() => handleClick(-1, index, "quota", "quota_")}>
                        <img src="/icon/minus-circle.svg" alt="minus" width={24} />
                      </div>
                      <div className='w-[24px]'>
                        <input
                          id={'quota_' + index}
                          type="number"
                          className='outline-none border-none focus:ring-0 w-[24px] text-[16px] p-0 text-center'
                          value={voucher.quota}
                          disabled
                        />
                      </div>
                      <div className='hover:cursor-pointer' onClick={() => handleClick(1, index, "quota", "quota_")}>
                        <img src="/icon/add-circle.svg" alt="minus" width={24} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {voucherList.length !== 1 && (
                <>
                  <button className='text-peduly-danger py-4 mt-3'
                    onClick={() => {
                      setVoucherList(voucherList.filter((_, idx) => idx !== index))
                    }}
                  >Hapus voucher</button>
                  <hr className='mt-[30px]' />
                </>
              )}
            </div>)
          )}
          {voucherList.length < 3 && (
            <button className='mt-[30px] w-full text-center border-peduly-primary border text-peduly-primary rounded-full h-[60px]' onClick={handleAddVoucher}>+ Tambah voucher (max 3)</button>
          )}
        </>)}
      </div>
      <div className="mt-32 mx-[20px]">
        <div className="flex items-center justify-center text-base font-normal mt-[8px]">
          <button
            className="bg-[#E4E4E4] text-[#717171] rounded-full w-full h-[60px] mr-[12px]"
            onClick={() => setStep('tipe')}
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
      </div>
    </div>
  )
}

export default BiayaAktivitas
