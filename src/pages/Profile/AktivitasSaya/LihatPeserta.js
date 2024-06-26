import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { API_URL } from 'config/api'
import { useHistory, useParams, Link, Redirect } from 'react-router-dom'
import { getToken } from 'utils/cookiesHooks'
import { UserContext } from 'context/UserContext'
import Spinner from 'components/Spinner'
// import splitInDots from 'utils/splitDots'

const TABLE_HEAD = ["Nama", "Nominal", "Kontak", "ID Transaksi", "Tanggal", "Status", "Metode", "Pembayaran"];

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
      const response = await axios.get(`${API_URL}/api/aktivitas/pesertaTanpaAdmin/${slug}`, {
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
                <img src="/icon/peduly_icon.svg" alt="" />
              </Link>
            </h1>
            <nav className="nav font-semibold text-lg mx-auto">
              <ul className="flex items-center">
                <li className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer active">
                  Dashboard
                </li>
                <li className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer">
                  <div className="text-red-500 text-right font-inter text-14 font-semibold leading-18">Aktivitas</div>
                </li>
                <li className="p-4 border-b-2 border-red-500 border-opacity-0 hover:border-opacity-100 hover:text-red-500 duration-200 cursor-pointer">
                  Pusat Bantuan
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
              <div className="flex flex-row w-[247px] rounded-2xl mt-[37px] py-5 px-[30px] bg-white border border-gray-200 shadow hover:bg-gray-100">
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
              </div>
              <div className="block w-[247px] rounded-2xl mt-[37px] py-5 px-[30px] bg-white border border-gray-200 shadow hover:bg-gray-100">
                <p className="font-inter text-sm font-normal text-gray-700 ">Jumlah Nominal</p>
                <h5 className="mb-2 text-[32px] font-semibold tracking-tight text-peduly-primary">
                  Rp {transactionData ? splitInDotsString(transactionData.total_donation) : '-'}
                </h5>
              </div>
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
                    <td className="px-6 py-4 text-gray-900 whitespace-nowra">{item.metode_pembayaran}</td>
                    <td className="px-6 py-4 text-gray-900 whitespace-nowra uppercase">{item.emoney_name || item.bank_name}</td>
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
