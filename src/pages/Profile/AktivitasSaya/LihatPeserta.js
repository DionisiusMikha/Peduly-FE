import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { API_URL } from 'config/api'
import { useHistory, useParams, Link, Redirect } from 'react-router-dom'
import { getToken } from 'utils/cookiesHooks'
import { UserContext } from 'context/UserContext'
import Spinner from 'components/Spinner'
// import splitInDots from 'utils/splitDots'

const TABLE_HEAD = ["Nama", "Nominal", "Kontak", "ID Transaksi", "Tanggal", "Status"];

const LihatPeserta = ({ location }) => {
  const [transactionData, setTransactionData] = useState([]);
  const [dataAktivitas, setDataAktivitas] = useState(null);
  const [loading, setLoading] = useState(true)
  const [ownerActivity, setOwnerActivity] = useState(false)

  const { slug } = useParams()
  const user = useContext(UserContext)
  const history = useHistory()



  useEffect(() => {
    getData()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  const getData = async () => {
    setLoading(true);
    const token = getToken();
    try {
      const response = await axios.get(`${API_URL}/api/aktivitas/peserta/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const responseDataAktivitas = await axios.get(`${API_URL}/api/aktivitas/byslug/${slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTransactionData(response.data);
      setDataAktivitas(responseDataAktivitas.data.data);
      // console.log(responseDataAktivitas.data.data.activity.user_id);
      // console.log(user.user.id);
      // if (parseInt(user.user.id) === parseInt(responseDataAktivitas.data.data.activity.user_id)) {
      //   setOwnerActivity(true)
      //   console.log(ownerActivity);
      // }else{
      //   // setOwnerActivity(false)
      //   history.push(`/`)
      // }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (user && dataAktivitas) {
      if (parseInt(user.user.id) === parseInt(dataAktivitas.activity.user_id)) {
        setOwnerActivity(true);
        console.log('anda adalah pemilik aktivitas');
      } else {
        console.log('anda bukan pemilik aktivitas');
        history.push(`/`);
      }
    }
  }, [user, dataAktivitas, history]);


  // useEffect(() => {
  //   if (user?.user?.id === location.state.user_id) {
  //     setOwnerActivity(true)
  //   }else{
  //     setOwnerActivity(false)
  //     history.push(`/`)
  //   }
  // }, [dataAktivitas]) // eslint-disable-line react-hooks/exhaustive-deps

  // console.log(ownerActivity);
  // console.log(location);
  // console.log(location.state.user_id);
  // console.log(user.user.id);
  // useEffect(() => {
  //   // Log data only if it exists
  //   if (dataAktivitas?.user?.[0]?.photo) {
  //     // console.log(dataAktivitas.user[0].photo);
  //   }else{
  //     // console.log('NOT AVAILABLE');
  //   }
  // }, [dataAktivitas]);

  const splitInDots = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const splitInDotsString = (numberString) => {
    if (typeof numberString === 'string') {
      return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }
    // Handle the case where numberString is not a string (or undefined)
    return "";
  };

  if (!getToken()) {
    return <Redirect to="/" />
  }

  const formatDate = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return !loading ? (
    <div>
      {ownerActivity ? (
        <div className='bg-[#F8F8F8]'>
          <header className="header sticky top-0 bg-white shadow-md flex items-center justify-between px-[67px] py-2 z-10">
            <h1 className="">
              <Link to={{ pathname: '/aktivitas-saya' }}>
                <svg width="121" height="20" viewBox="0 0 121 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.9" d="M16.3634 8.26811H16.5757C16.9827 7.6134 17.5313 7.10023 18.2214 6.72863C18.9115 6.33934 19.6989 6.14469 20.5837 6.14469C21.3977 6.14469 22.1143 6.2774 22.7337 6.54283C23.353 6.80826 23.8573 7.18871 24.2466 7.68417C24.6536 8.16194 24.9544 8.74588 25.1491 9.43599C25.3614 10.1084 25.4676 10.8604 25.4676 11.6921V19.5753H21.9905V12.1168C21.9905 11.179 21.7781 10.4888 21.3534 10.0465C20.9464 9.58639 20.3448 9.35636 19.5485 9.35636C19.0708 9.35636 18.6461 9.46253 18.2745 9.67488C17.9206 9.86953 17.6109 10.1438 17.3455 10.4977C17.0977 10.8339 16.9031 11.2409 16.7615 11.7187C16.6377 12.1788 16.5757 12.6742 16.5757 13.2051V19.5753H13.0986V6.56937H16.3634V8.26811ZM26.4414 6.56937H30.3962L33.6344 14.8507H33.8202L37.085 6.56937H41.0133L35.4128 19.5753H31.9888L26.4414 6.56937ZM48.3654 6.14469C49.374 6.14469 50.2944 6.32163 51.1258 6.67554C51.9752 7.01174 52.7008 7.48951 53.3023 8.10885C53.9218 8.71048 54.3995 9.43599 54.7356 10.2854C55.0896 11.1347 55.2665 12.0637 55.2665 13.0724C55.2665 14.081 55.0896 15.01 54.7356 15.8593C54.3995 16.7087 53.9218 17.4431 53.3023 18.0624C52.7008 18.664 51.9752 19.1418 51.1258 19.4957C50.2944 19.8319 49.374 20 48.3654 20C47.3567 20 46.4277 19.8319 45.5784 19.4957C44.7469 19.1418 44.0213 18.664 43.4019 18.0624C42.8003 17.4431 42.3226 16.7087 41.9686 15.8593C41.6325 15.01 41.4642 14.081 41.4642 13.0724C41.4642 12.0637 41.6325 11.1347 41.9686 10.2854C42.3226 9.43599 42.8003 8.71048 43.4019 8.10885C44.0213 7.48951 44.7469 7.01174 45.5784 6.67554C46.4277 6.32163 47.3567 6.14469 48.3654 6.14469ZM48.3654 16.7883C48.808 16.7883 49.2326 16.7087 49.6394 16.5495C50.0641 16.3725 50.4357 16.1248 50.7542 15.8063C51.0727 15.4877 51.3206 15.0985 51.4974 14.6384C51.6922 14.1783 51.7894 13.6563 51.7894 13.0724C51.7894 12.4884 51.6922 11.9664 51.4974 11.5063C51.3206 11.0462 51.0727 10.657 50.7542 10.3384C50.4357 10.0199 50.0641 9.78105 49.6394 9.62179C49.2326 9.44485 48.808 9.35636 48.3654 9.35636C47.9055 9.35636 47.4719 9.44485 47.0648 9.62179C46.658 9.78105 46.295 10.0199 45.9765 10.3384C45.658 10.657 45.4015 11.0462 45.2068 11.5063C45.0299 11.9664 44.9413 12.4884 44.9413 13.0724C44.9413 13.6563 45.0299 14.1783 45.2068 14.6384C45.4015 15.0985 45.658 15.4877 45.9765 15.8063C46.295 16.1248 46.658 16.3725 47.0648 16.5495C47.4719 16.7087 47.9055 16.7883 48.3654 16.7883ZM57.3713 19.5753V0.570703H60.8484V19.5753H57.3713ZM72.8235 17.8766H72.6112C72.2041 18.5313 71.6557 19.0533 70.9655 19.4426C70.2754 19.8142 69.4878 20 68.6032 20C66.9576 20 65.7277 19.4957 64.9138 18.4871C64.1175 17.4785 63.7194 16.1336 63.7194 14.4526V6.56937H67.1965V14.0279C67.1965 14.9657 67.3998 15.6647 67.8069 16.1248C68.2316 16.5671 68.8421 16.7883 69.6384 16.7883C70.1162 16.7883 70.5319 16.691 70.8859 16.4964C71.2575 16.284 71.5671 16.0097 71.8149 15.6735C72.0803 15.3196 72.2748 14.9127 72.3988 14.4526C72.5402 13.9748 72.6112 13.4705 72.6112 12.9396V6.56937H76.0883V19.5753H72.8235V17.8766ZM82.3315 8.26811H82.5438C82.9509 7.6134 83.4994 7.10023 84.1895 6.72863C84.8796 6.33934 85.6669 6.14469 86.5518 6.14469C87.3657 6.14469 88.0823 6.2774 88.7018 6.54283C89.3212 6.80826 89.8255 7.18871 90.2147 7.68417C90.6218 8.16194 90.9224 8.74588 91.1171 9.43599C91.3295 10.1084 91.4357 10.8604 91.4357 11.6921V19.5753H87.9586V12.1168C87.9586 11.179 87.7462 10.4888 87.3215 10.0465C86.9144 9.58639 86.3129 9.35636 85.5166 9.35636C85.0388 9.35636 84.6142 9.46253 84.2426 9.67488C83.8886 9.86953 83.579 10.1438 83.3136 10.4977C83.0657 10.8339 82.8713 11.2409 82.7296 11.7187C82.6059 12.1788 82.5438 12.6742 82.5438 13.2051V19.5753H79.0667V6.56937H82.3315V8.26811ZM95.0674 9.54216H92.7847V6.56937H95.0674V2.58795H98.5445V6.56937H101.73V9.54216H98.5445V14.5853C98.5445 14.8861 98.571 15.1692 98.6241 15.4347C98.6951 15.6824 98.8189 15.8947 98.9957 16.0717C99.2435 16.3548 99.5976 16.4964 100.057 16.4964C100.358 16.4964 100.597 16.4698 100.774 16.4167C100.951 16.346 101.119 16.2575 101.278 16.1513L102.26 19.2037C101.854 19.3984 101.411 19.5399 100.933 19.6284C100.473 19.7346 99.9602 19.7877 99.3938 19.7877C98.7392 19.7877 98.1463 19.6904 97.6155 19.4957C97.1025 19.2834 96.6689 19.0002 96.3149 18.6463C95.4834 17.85 95.0674 16.7176 95.0674 15.2489V9.54216ZM106.355 4.68483C106.054 4.68483 105.762 4.63175 105.479 4.52558C105.213 4.40172 104.974 4.24247 104.762 4.04781C104.568 3.83546 104.408 3.59658 104.284 3.33115C104.178 3.06572 104.125 2.77375 104.125 2.45524C104.125 2.13673 104.178 1.84476 104.284 1.57933C104.408 1.3139 104.568 1.08387 104.762 0.889216C104.974 0.676874 105.213 0.517617 105.479 0.411446C105.762 0.287591 106.054 0.225647 106.355 0.225647C106.974 0.225647 107.505 0.446848 107.947 0.889216C108.39 1.3139 108.611 1.8359 108.611 2.45524C108.611 3.07458 108.39 3.60544 107.947 4.04781C107.505 4.47249 106.974 4.68483 106.355 4.68483ZM104.629 19.5753V6.56937H108.107V19.5753H104.629ZM111.286 6.56937H114.551V8.37428H114.763C114.923 8.05577 115.135 7.7638 115.4 7.49837C115.666 7.23294 115.958 7.00291 116.276 6.80826C116.612 6.6136 116.966 6.4632 117.338 6.35703C117.727 6.25086 118.108 6.19777 118.479 6.19777C118.939 6.19777 119.329 6.242 119.647 6.33049C119.983 6.41897 120.266 6.53397 120.497 6.67554L119.568 9.83413C119.355 9.72796 119.116 9.64833 118.851 9.59525C118.603 9.52448 118.294 9.48908 117.922 9.48908C117.444 9.48908 117.011 9.58639 116.621 9.78105C116.232 9.95799 115.896 10.2146 115.613 10.5508C115.347 10.887 115.135 11.2851 114.976 11.7452C114.834 12.1876 114.763 12.6742 114.763 13.2051V19.5753H111.286V6.56937Z" fill="#212121" />
                  <path opacity="0.9" d="M4.64499 10.2853L9.28997 19.5753H0L4.64499 10.2853Z" fill="#212121" />
                  <path d="M4.64499 9.28997C7.21034 9.28997 9.28997 7.21034 9.28997 4.64499C9.28997 2.07963 7.21034 0 4.64499 0C2.07963 0 0 2.07963 0 4.64499C0 7.21034 2.07963 9.28997 4.64499 9.28997Z" fill="#c41230" />
                </svg>
              </Link>
            </h1>
            <nav className="nav font-semibold text-lg mx-auto">
              <ul className="flex items-center">
                <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer active">
                  <Link href="">Dashboard</Link>
                </li>
                <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                  <Link className="text-blue-500 text-right font-inter text-14 font-semibold leading-18" href="">Aktivitas</Link>
                </li>
                <li className="p-4 border-b-2 border-blue-500 border-opacity-0 hover:border-opacity-100 hover:text-blue-500 duration-200 cursor-pointer">
                  <Link href="">Pusat Bantuan</Link>
                </li>
              </ul>
            </nav>
            <div className="w-[121px] flex justify-end">
              <div className="flex flex-row">
                {dataAktivitas.user && dataAktivitas.user.length > 0 ? (
                  <div>
                    <img
                      className="object-cover w-[40px] h-[40px] rounded-full"
                      src={user.user.photo
                        ? (user.user.photo.slice(0, 4) === 'http'
                          ? user.user.photo
                          : user.user.photo.slice(0, 7) === '/images'
                            ? `${API_URL}${user.user.photo}`
                            : `${API_URL}/images/images_profile/${user.user.photo}`)
                        : '/images/no-avatar.png'}
                      alt=""
                      title={user.user.username}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/no-avatar.png';
                      }}
                    />
                  </div>
                ) : (
                  <img
                    className="object-cover w-[40px] h-[40px] rounded-full"
                    src="/images/no-avatar.png"
                    alt=""
                    title='penyelenggara'
                  />
                )}
              </div>
            </div>
          </header>
          <div className='ms-[60px] mt-[40px] text-black-400 font-inter text-28 font-normal text-[28px]'>
            <h1>Semua Peserta</h1>
            <div className='flex md:flex-row flex-col gap-8 items-center'>
              <Link href="#" className="flex flex-row w-[247px] rounded-2xl mt-[37px] py-5 px-[30px] bg-white border border-gray-200 shadow hover:bg-gray-100">
                <div className='me-[18px]'>
                  <p className="font-inter text-sm font-normal text-gray-700 ">Peserta Terdaftar</p>
                  <h5 className="mb-2 text-[32px] font-semibold tracking-tight text-peduly-primary">
                    {transactionData.total_volunteer}
                  </h5>
                </div>
                <svg className='my-auto' xmlns="http://www.w3.org/2000/svg" width="53" height="53" viewBox="0 0 53 53" fill="none">
                  <path d="M26.2952 26.2952C32.3461 26.2952 37.2514 21.3899 37.2514 15.3389C37.2514 9.28795 32.3461 4.38266 26.2952 4.38266C20.2442 4.38266 15.3389 9.28795 15.3389 15.3389C15.3389 21.3899 20.2442 26.2952 26.2952 26.2952Z" stroke="#717171" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                  <path d="M45.1184 48.2076C45.1184 39.7275 36.6821 32.8688 26.2955 32.8688C15.909 32.8688 7.47266 39.7275 7.47266 48.2076" stroke="#717171" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </Link>
              <Link href="#" className="block w-[247px] rounded-2xl mt-[37px] py-5 px-[30px] bg-white border border-gray-200 shadow hover:bg-gray-100">
                <p className="font-inter text-sm font-normal text-gray-700 ">Jumlah Nominal</p>
                <h5 className="mb-2 text-[32px] font-semibold tracking-tight text-peduly-primary">
                  Rp {transactionData ? splitInDotsString(transactionData.total_donation) : '-'}
                </h5>
              </Link>
            </div>
          </div>
          <div className="relative overflow-x-auto mt-[37px] shadow-md sm:rounded-lg mx-[60px]">
            <table className="w-full text-sm text-left rounded-[15px] rtl:text-right text-gray-500">
              <thead className="text-[14px] text-black-60 bg-white border-b-2">
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="px-6 py-3">
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              {/* <hr className='px-3' style={{ border: '2px solid #F4F4F4' }} /> */}

              <tbody>
                {transactionData && transactionData.data && transactionData.data.slice().reverse().map((item, id) => (
                  <tr key={id} className="bg-white border-box">
                    <td className="px-6 py-4 text-gray-900 whitespace-nowra">{item.name}</td>
                    <td className="px-6 py-4">{item.nominal ? 'Rp' + splitInDots(item.nominal) : '0'}</td>
                    <td className="px-6 py-4">
                      <a href={`https://wa.me/${item.nomor_telp}`} className='underline' target='__blank'>{item.nomor_telp}</a></td>
                    <td className="px-6 py-4">{item.kode_donasi}</td>
                    <td className="px-6 py-4">{formatDate(item.date)}</td>
                    <td className="px-6 py-4">
                      {item.status_donasi === 'Approved' && (
                        <span className="inline-block bg-[#34A85333] text-[#34A853] px-3 py-1 rounded-full">
                          Berhasil
                        </span>
                      )}
                      {item.status_donasi === 'Pending' && (
                        <span className="inline-block bg-[#FCAE0333] text-[#FCAE03] px-3 py-1 rounded-full">
                          Pending
                        </span>
                      )}
                      {item.status_donasi === 'Rejected' && (
                        <span className="inline-block bg-[#E7513B33] text-[#C41230] px-3 py-1 rounded-full">
                          Dibatalkan
                        </span>
                      )}
                    </td>
                    {/* <hr style={{ border: '0.5px solid #E4E4E480' }} /> */}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div></div>
      )}

    </div>
  ) : (
    <div className="mx-auto max-w-[430px] h-screen flex items-center justify-center">
      <Spinner color="#c41230" />
    </div>
  )
};

export default LihatPeserta;
