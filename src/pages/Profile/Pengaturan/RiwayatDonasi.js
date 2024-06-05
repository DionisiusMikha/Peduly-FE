import React from 'react';
// import Arrow from '../../components/arrow';
import { Link } from 'react-router-dom';
// import Navbar from '../../components/Landing/navbar';

function riwayatDonasi() {
  return (
    <div
      className='w-screen h-screen flex justify-center overflow-x-hidden'
      style={{ marginBottom: '50px' }}>
      <div className='container top-y-10  mx-auto max-w-[414px]  h-screen  bg-white'>
        {/* <Navbar /> */}
        <div className='inline-flex w-full h-metode-bayar ml-[10px]   text-justify align-middle'>
          <Link to='/profile'>
            {/* <Arrow /> */}
          </Link>
          <span className='ml-nominal-atas relative top-arrow-space font-semibold'>
            Riwayat Donasi
          </span>
        </div>

        <div className='col-start-1 col-end-7'>
          {/* <div className='container text-center mt-5'>
            <span className='text-large font-semibold'>
              Donasimu minggu ini
            </span>
            <div className='flex mt-2'>
              <div className='ml-nominal-kiri mt-3'>
                <div className='flex ml-1 '>
                  <span className='text-peduly-primary text-sm text-center'>
                    SEN
                  </span>
                </div>
                <div className='rounded-full mt-2 border-2 p-4 w-3 h-3 text-peduly-primary border-peduly-primary flex items-center justify-center'>
                  18
                </div>
              </div>
              <div className='ml-nominal-kiri mt-3'>
                <div className='flex ml-1'>
                  <span className='text-sm text-center'>SEL</span>
                </div>
                <div className='rounded-full mx-auto text-white bg-gray-300 mt-2 border-2 p-4 w-3 h-3  flex items-center justify-center'>
                  19
                </div>
              </div>
              <div className='ml-nominal-kiri mt-3'>
                <div className='flex ml-1'>
                  <span className='text-sm text-center'>RAB</span>
                </div>
                <div className='rounded-full mx-auto text-white bg-gray-300 mt-2 border-2 p-4 w-3 h-3  flex items-center justify-center'>
                  20
                </div>
              </div>
              <div className='ml-nominal-kiri mt-3'>
                <div className='flex ml-1'>
                  <span className='text-sm text-center'>KAM</span>
                </div>
                <div className='rounded-full mx-auto text-white bg-gray-300 mt-2 border-2 p-4 w-3 h-3  flex items-center justify-center'>
                  21
                </div>
              </div>
              <div className='ml-nominal-kiri mt-3'>
                <div className='flex ml-1'>
                  <span className='text-sm text-center'>JUM</span>
                </div>
                <div className='rounded-full mx-auto text-white bg-gray-300 mt-2 border-2 p-4 w-3 h-3  flex items-center justify-center'>
                  22
                </div>
              </div>
              <div className='ml-nominal-kiri mt-3'>
                <div className='flex ml-1'>
                  <span className='text-sm text-center'>SAB</span>
                </div>
                <div className='rounded-full mx-auto text-white bg-gray-300 mt-2 border-2 p-4 w-3 h-3  flex items-center justify-center'>
                  23
                </div>
              </div>
              <div className='ml-nominal-kiri mt-3'>
                <div className='flex ml-1'>
                  <span className='text-sm text-center'>MIN</span>
                </div>
                <div className='rounded-full mx-auto text-center text-white bg-gray-300 mt-2 border-2 p-4 w-3 h-3  flex items-center justify-center'>
                  24
                </div>
              </div>
            </div>
          </div>
          <hr className='mt-7 w-[374px] mx-auto' /> */}
        </div>

        <div className='container ml-nominal-kiri'>
          <div
            style={{ marginTop: '19px', marginBottom: '22px' }}
            className='flex flex-row'>
            <div>
              <img
                src=''
                alt=''
                style={{
                  minWidth: '180px',
                  height: '121px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/images/no-picture.png';
                }}
              />
            </div>

            <div className='' style={{ marginLeft: '21px', width: '100%' }}>
              <Link>
                <p
                  style={{ fontSize: '14px' }}
                  className='overflow-ellipsis overflow-hidden font-semibold max-h-[42px]'>
                  Sekujur Tubuh Dek Bayu Melepuh
                </p>
              </Link>
              <div
                style={{ margin: '10px 0px 10px 0px' }}
                className='flex items-center'>
                <p
                  style={{
                    fontSize: '10px',
                    marginLeft: '4px',
                  }}>
                  18 September 2021
                </p>
                <p className='ml-2'>Rp 10.000</p>
              </div>

              <div
                className='flex justify-between'
                style={{ fontSize: '10px' }}>
                <div className='border-2 p-2 rounded-full '>
                  <span>Dibatalkan</span>
                </div>
              </div>
            </div>
          </div>
          <hr className='mt-8' />
        </div>
        <div className='container ml-nominal-kiri'>
          <div
            style={{ marginTop: '19px', marginBottom: '22px' }}
            className='flex flex-row'>
            <div>
              <img
                src=''
                alt=''
                style={{
                  minWidth: '180px',
                  height: '121px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/images/no-picture.png';
                }}
              />
            </div>

            <div className='' style={{ marginLeft: '21px', width: '100%' }}>
              <Link>
                <p
                  style={{ fontSize: '14px' }}
                  className='overflow-ellipsis overflow-hidden font-semibold max-h-[42px]'>
                  Sekujur Tubuh Dek Bayu Melepuh
                </p>
              </Link>
              <div
                style={{ margin: '10px 0px 10px 0px' }}
                className='flex items-center'>
                <p
                  style={{
                    fontSize: '10px',
                    marginLeft: '4px',
                  }}>
                  18 September 2021
                </p>
                <p className='ml-2'>Rp 10.000</p>
              </div>

              <div
                className='flex justify-between'
                style={{ fontSize: '10px' }}>
                <div className='border-2 p-2 rounded-full '>
                  <span>Dibatalkan</span>
                </div>
              </div>
            </div>
          </div>
          <hr className='mt-8' />
        </div>
        <div className='container ml-nominal-kiri'>
          <div
            style={{ marginTop: '19px', marginBottom: '22px' }}
            className='flex flex-row'>
            <div>
              <img
                src=''
                alt=''
                style={{
                  minWidth: '180px',
                  height: '121px',
                  objectFit: 'cover',
                  borderRadius: '15px',
                }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = '/images/no-picture.png';
                }}
              />
            </div>

            <div className='' style={{ marginLeft: '21px', width: '100%' }}>
              <Link>
                <p
                  style={{ fontSize: '14px' }}
                  className='overflow-ellipsis overflow-hidden font-semibold max-h-[42px]'>
                  Sekujur Tubuh Dek Bayu Melepuh
                </p>
              </Link>
              <div
                style={{ margin: '10px 0px 10px 0px' }}
                className='flex items-center'>
                <p
                  style={{
                    fontSize: '10px',
                    marginLeft: '4px',
                  }}>
                  18 September 2021
                </p>
                <p className='ml-2'>Rp 10.000</p>
              </div>

              <div
                className='flex justify-between'
                style={{ fontSize: '10px' }}>
                <div className='border-2 p-2 rounded-full '>
                  <span>Dibatalkan</span>
                </div>
              </div>
            </div>
          </div>
          <hr className='mt-8' />
        </div>
      </div>
    </div>
  );
}

export default riwayatDonasi
