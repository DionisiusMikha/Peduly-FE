import axios from 'axios'
import { API_URL } from 'config/api'
import React, { useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DeleteConfirmation from './DeleteConfirmation'
import EndConfirmation from './EndConfirmation'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { getToken } from 'utils/cookiesHooks'

const useClickOutside = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }
  React.useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => {
      document.removeEventListener('click', handleClick)
    }
  })
}


const MenuEditAktivitas = ({ onClickOutside, status, data, }) => {
  const [popUp, setPopUp] = useState(false)
  const [expired, setExpired] = useState(false)
  const [operationType, setOperationType] = useState()
  const { slug } = useParams()
  const history = useHistory()
  const clickRef = React.useRef()
  const [click, setClick] = useState(false)
  const [copy, setCopy] = useState(false)
  useClickOutside(clickRef, onClickOutside)

  const handleLinkClick = () => {
    history.push(`/aktivitas/${slug}/peserta`);
    // history.push({
    //   pathname: `/aktivitas/${slug}/peserta`,
    //   state: {user_id : data.activity.user_id},
    // })
  };

  const dataSend = new FormData()
  dataSend.append('activity_id', data.activity.id || '')
  dataSend.append('batas_waktu', 0)

  function removeTags(str) {
    if (str === null || str === '') return false
    else str = str.toString()

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    return str.replace(/(<([^>]+)>)/gi, '')
  }
  const webOrigin = encodeURI('https://peduly.com')
  // const webOrigin = encodeURI('https://isnvoluntir.com')
  const JudulEncoded = encodeURI(removeTags(data.activity.judul_activity))
  const DetailsEncoded = encodeURI(removeTags(data.activity.detail_activity)).replace('#', '%23')

  const handleCopy = () => {
    setCopy(!copy)
    setTimeout(() => {
      setCopy(false)
    }, 3000)
  }

  function dayToGo() {
    const firstDate = new Date(data.activity.batas_waktu)
    const secondDate = new Date();

    const timeDiff = firstDate - secondDate;
    if (timeDiff <= 0) {
      return 'Berakhir';
    }
    return 'masih'
  }

  const dayStatus = dayToGo();

  return (
    <>
      <ToastContainer />
      {popUp && (
        <div
          className="mx-auto w-full h-full fixed z-50"
          style={{ background: 'rgb(111, 111, 111, 0.5)' }}
        ></div>
      )}
      {click && (
        <div className="w-full h-full fixed bg-white z-50 max-w-[430px] overflow-x-hidden overflow-y-auto no-scrollbar  left-1/2 transform -translate-x-1/2">
          <div
            onClick={() => {
              setClick(!click)
            }}
            className="absolute right-[24px] top-[24px] cursor-pointer"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1L15 15"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M15 1L1 15"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="mt-[10vh] mx-[20px]">
            <h1 className="text-lg font-medium">Bagikan</h1>
            <p className="text-sm font-normal text-[#717171] mt-[16px]">
              Bantu bagikan penggalangan dana ini ke sosial media berpotensi
              lebih cepat mendapatkan donasi dari orang baik seperti kamu.
            </p>
          </div>
          <div className="mx-[20px] mt-[2vh]">
            <hr />
            {/* <a
              href={`https://wa.me/?text=Hi%2C%0A%0ASaya%20akan%20sangat%20menghargai%20jika%20Anda%20mau%20membagikan%20atau%20mendaftar%20disini.%0A%0A%2A${JudulEncoded}%2A%0A%0A%0A${DetailsEncoded}%0A%0AYuk%20daftar%20dengan%20klik%20${webOrigin}/${slug}%20%0A%0ATeruskan%20pesan%20ini%20ke%20kontak%20Anda%20untuk%20mengajak%20teman%20anda%20untuk%20bergabung%20dengan%20komunitas%20kami%21`}
              target="_blank"
              rel="noreferrer"
            > */}
            <a
              href={`https://wa.me/?text=Hi%2C%0A%0ASaya%20akan%20sangat%20menghargai%20jika%20Anda%20mau%20membagikan%20atau%20mendaftar%20disini.%0A%0A%2A${JudulEncoded}%2A%0A%0A%0A${DetailsEncoded}%0A%0AYuk%20daftar%20dengan%20klik%20${webOrigin}/${slug}%20%0A%0ATeruskan%20pesan%20ini%20ke%20kontak%20Anda%20untuk%20mengajak%20teman%20anda%20untuk%20bergabung%20dengan%20komunitas%20kami%21`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="grid items-center grid-cols-12 cursor-pointer">
                <span className="col-span-1 py-[26px] ml-[4px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 0.507812C4.75781 0.507812 0.507812 4.75781 0.507812 10C0.507812 11.918 1.07813 13.707 2.05859 15.1992L0.835937 19.3398L5.13672 18.1484C6.55859 19 8.22266 19.4883 10 19.4883C15.2422 19.4883 19.4922 15.2383 19.4922 9.99609C19.4922 4.75781 15.2422 0.507812 10 0.507812Z"
                      fill="#25D366"
                    />
                    <path
                      d="M15.2147 12.6054C15.203 12.4804 15.1288 12.3711 15.0155 12.3203C14.2499 11.9687 13.4804 11.6172 12.7147 11.2656C12.6288 11.2265 12.5233 11.2461 12.4608 11.3203L11.4218 12.4922C11.3397 12.5859 11.2108 12.6172 11.0976 12.5703C10.5585 12.3476 9.83192 11.9726 9.09755 11.3398C8.21864 10.5859 7.70302 9.77732 7.41396 9.24997C7.55849 9.15232 7.95302 8.85935 8.1288 8.31638C8.1288 8.31247 8.13271 8.30857 8.13271 8.30857C8.24208 7.97263 8.21864 7.60935 8.09755 7.27732C7.89052 6.72654 7.47646 5.66013 7.3163 5.49607C7.28896 5.46872 7.25771 5.44138 7.25771 5.44138C7.14052 5.33591 6.98817 5.27732 6.82802 5.2695C6.77333 5.2656 6.71474 5.2656 6.65224 5.2656C6.47255 5.26169 6.31239 5.26169 6.19521 5.27732C5.86317 5.32419 5.62099 5.54685 5.46864 5.73435C5.28505 5.957 5.0663 6.28904 4.92177 6.72654C4.91005 6.7656 4.89833 6.80075 4.88661 6.83982C4.72646 7.3945 4.75771 7.98825 4.94911 8.53513C5.1288 9.04685 5.39052 9.65622 5.78505 10.3008C6.45302 11.3984 7.17958 12.0781 7.67177 12.5273C8.22646 13.039 8.91396 13.6679 10.0038 14.1914C11.0116 14.6758 11.9257 14.8554 12.539 14.9297C12.789 14.9531 13.2499 14.957 13.7772 14.7578C14.0194 14.664 14.2225 14.5508 14.3866 14.4297C14.8202 14.1211 15.1249 13.6562 15.203 13.1328C15.203 13.1289 15.203 13.125 15.203 13.1211C15.2304 12.9218 15.2265 12.75 15.2147 12.6054Z"
                      fill="white"
                    />
                  </svg>
                </span>
                <span className="col-span-11 text-sm font-medium ml-[6px]">
                  Whatsapp
                </span>
              </div>
            </a>
            <hr />
            <a
              href={`https://twitter.com/intent/tweet?lang=en&text=%2A${JudulEncoded}%2A%0A%0A${DetailsEncoded}%0A%0ADaftar%20dengan%20klik%20${webOrigin}/${slug}%20`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="grid items-center grid-cols-12 cursor-pointer">
                <span className="col-span-1 py-[26px] ml-[4px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.28961 18.1255C13.8368 18.1255 17.9648 11.8728 17.9648 6.45033C17.9648 6.27275 17.9648 6.09596 17.9528 5.91994C18.7559 5.33904 19.4491 4.61986 20 3.79596C19.2511 4.12779 18.4566 4.34537 17.6432 4.44154C18.4996 3.92889 19.141 3.12193 19.4472 2.17193C18.6418 2.64986 17.7605 2.98674 16.8416 3.16795C16.0657 2.34291 14.9821 1.87451 13.8497 1.87451C11.5965 1.87451 9.74246 3.72857 9.74246 5.9817C9.74246 6.29428 9.77816 6.60588 9.84879 6.91033C6.55121 6.74506 3.47457 5.18529 1.39199 2.62314C0.309023 4.48744 0.869375 6.90346 2.66238 8.10072C2.00945 8.08139 1.37055 7.90521 0.8 7.58713V7.63912C0.800547 9.58498 2.18465 11.2763 4.09199 11.6615C3.48793 11.8263 2.85398 11.8503 2.23922 11.7319C2.77543 13.3993 4.32168 14.5487 6.07281 14.5815C4.62008 15.7232 2.82449 16.3434 0.976797 16.3415C0.650313 16.3409 0.324141 16.3212 0 16.2823C1.87633 17.4864 4.06016 18.1253 6.28961 18.1223"
                      fill="#1DA1F2"
                    />
                  </svg>
                </span>
                <span className="col-span-11 text-sm font-medium ml-[6px]">
                  Twitter
                </span>
              </div>
            </a>
            <hr />
            <a
              href={`https://www.facebook.com/dialog/share?app_id=407682420960&display=popup&href=https%3A%2F%2Fwww.peduly.com/${slug}`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="grid items-center grid-cols-12 cursor-pointer">
                <span className="col-span-1 py-[26px] ml-[4px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.9618 19.9999L9.97074 20H9.96766L9.9618 19.9999ZM10.0323 20H10.0293L10.0382 19.9999L10.0323 20ZM9.93125 19.9998L9.9409 19.9998H9.93535L9.93125 19.9998V19.9998ZM10.0646 19.9998H10.0591L10.0688 19.9998L10.0646 19.9998ZM9.9018 19.9995L9.90824 19.9996L9.90309 19.9995H9.9018ZM10.0969 19.9995L10.0918 19.9996L10.0982 19.9995H10.0969ZM10.1292 19.9992L10.1269 19.9992L10.1356 19.9991L10.1292 19.9992ZM9.86437 19.9991L9.87309 19.9992L9.87082 19.9992L9.86437 19.9991V19.9991ZM10.1614 19.9987L10.1561 19.9988L10.1669 19.9986L10.1614 19.9987ZM9.83312 19.9986L9.84387 19.9988L9.83859 19.9987L9.83312 19.9986V19.9986ZM10.1936 19.9982L10.1865 19.9983L10.1964 19.9981L10.1936 19.9982ZM9.80359 19.9981L9.81352 19.9983L9.80641 19.9982L9.80359 19.9981ZM9.76699 19.9973L9.77578 19.9975L9.77422 19.9975L9.76699 19.9973ZM10.2258 19.9975L10.2242 19.9975L10.233 19.9973L10.2258 19.9975ZM9.73488 19.9965L9.74695 19.9968L9.74207 19.9967L9.73488 19.9965ZM10.2579 19.9967L10.253 19.9968L10.2651 19.9965L10.2579 19.9967ZM10.2901 19.9959L10.2822 19.9961L10.2946 19.9957L10.2901 19.9959V19.9959ZM9.70543 19.9957L9.71777 19.9961L9.70992 19.9959L9.70543 19.9957V19.9957ZM9.6773 19.9949L9.68609 19.9952L9.67781 19.9949L9.67023 19.9946L9.6773 19.9949V19.9949ZM10.3222 19.9949L10.3139 19.9952L10.3227 19.9949L10.3298 19.9946L10.3222 19.9949ZM10.3543 19.9938L10.3499 19.994L10.3634 19.9935L10.3543 19.9938ZM9.63664 19.9935L9.65012 19.994L9.64574 19.9938L9.63664 19.9935ZM9.60738 19.9924L9.62152 19.9929L9.61367 19.9927L9.60738 19.9924ZM10.3863 19.9927L10.3785 19.9929L10.3926 19.9924L10.3863 19.9927ZM9.57867 19.9913L9.5925 19.9918L9.58168 19.9914L9.57867 19.9913V19.9913ZM10.4183 19.9914L10.4075 19.9918L10.4213 19.9913L10.4183 19.9914V19.9914ZM9.53844 19.9895L9.55328 19.9902L9.54965 19.99L9.53844 19.9895ZM10.4504 19.99L10.4467 19.9902L10.4616 19.9895L10.4504 19.99ZM9.50957 19.9882L9.52496 19.9889L9.5177 19.9886L9.50957 19.9882ZM10.4823 19.9886L10.475 19.9889L10.4904 19.9882L10.4823 19.9886ZM9.48113 19.9867L9.49664 19.9875L9.48574 19.987L9.48113 19.9867ZM10.5143 19.987L10.5034 19.9875L10.5189 19.9867L10.5143 19.987ZM10.5462 19.9853L10.5321 19.9861L10.5446 19.9854L10.5594 19.9846L10.5462 19.9853ZM9.45539 19.9854L9.46793 19.9861L9.45379 19.9853L9.44062 19.9846L9.45539 19.9854ZM10.5781 19.9835L10.5718 19.9839L10.5877 19.983L10.5781 19.9835ZM9.4123 19.983L9.42816 19.9839L9.42191 19.9835L9.4123 19.983ZM9.3841 19.9813L9.39992 19.9822L9.39004 19.9817L9.3841 19.9813V19.9813ZM10.61 19.9817L10.6001 19.9822L10.6159 19.9813L10.61 19.9817ZM9.35719 19.9796L9.37145 19.9805L9.35816 19.9797L9.3448 19.9788L9.35719 19.9796ZM10.6418 19.9797L10.6286 19.9805L10.6428 19.9796L10.6552 19.9788L10.6418 19.9797V19.9797ZM10.6736 19.9776L10.6689 19.9779L10.684 19.9769L10.6736 19.9776V19.9776ZM9.31602 19.9769L9.33113 19.9779L9.32637 19.9776L9.31602 19.9769V19.9769ZM9.28785 19.975L9.3027 19.976L9.29457 19.9755L9.28785 19.975ZM10.7054 19.9755L10.6973 19.976L10.7121 19.975L10.7054 19.9755V19.9755ZM9.25977 19.973L9.2734 19.9739L9.26281 19.9732L9.25977 19.973ZM10.7372 19.9732L10.7266 19.9739L10.7402 19.973L10.7372 19.9732ZM9.22199 19.9701L9.23395 19.971L9.23105 19.9708L9.22199 19.9701V19.9701ZM10.7689 19.9708L10.7661 19.971L10.778 19.9701L10.7689 19.9708V19.9708ZM10.8006 19.9684L10.7949 19.9688L10.8071 19.9678L10.8006 19.9684V19.9684ZM9.19293 19.9678L9.20508 19.9688L9.19937 19.9684L9.19293 19.9678V19.9678ZM9.16461 19.9655L9.17492 19.9664L9.16766 19.9658L9.16461 19.9655ZM10.8323 19.9658L10.8251 19.9664L10.8354 19.9655L10.8323 19.9658V19.9658ZM9.13344 19.9629L9.13652 19.9632L9.13602 19.9631L9.13344 19.9629V19.9629ZM10.864 19.9631L10.8635 19.9632L10.8666 19.9629L10.864 19.9631V19.9631ZM10.8956 19.9604L10.8928 19.9606L10.8999 19.96L10.8956 19.9604V19.9604ZM9.10012 19.96L9.10719 19.9606L9.10438 19.9604L9.10012 19.96V19.96ZM9.07082 19.9573L9.07609 19.9578L9.07281 19.9575L9.07082 19.9573ZM10.9272 19.9575L10.9239 19.9578L10.9292 19.9573L10.9272 19.9575ZM8.4375 19.8784C3.65941 19.1274 0 14.9877 0 10C0 4.48086 4.48086 0 10 0C15.5191 0 20 4.48086 20 10C20 14.9877 16.3406 19.1274 11.5625 19.8784V12.8906H13.8926L14.3359 10H11.5625V8.12418C11.5625 7.33336 11.9499 6.5625 13.1921 6.5625H14.4531V4.10156C14.4531 4.10156 13.3088 3.90625 12.2146 3.90625C9.93043 3.90625 8.4375 5.29063 8.4375 7.79688V10H5.89844V12.8906H8.4375V19.8784Z"
                      fill="#1876F3"
                    />
                  </svg>
                </span>
                <span className="col-span-11 text-sm font-medium ml-[6px]">
                  Facebook
                </span>
              </div>
            </a>
            <hr />
            <a
              href={`mailto:?subject=Pernahkah%20anda%20melihat%20%22${JudulEncoded}%22&body=Halo%2C%0A%0ASaya%20pikir%20Anda%20mungkin%20tertarik%20untuk%20mendaftar%20kegiatan%20voluntir%20ini%2C%20${webOrigin}%2F${slug}.%0A%0A${DetailsEncoded}%0A%0ATerima%20kasih%20telah%20melihatnya%21%0A%0A%0A`}
              target="_blank"
              rel="noreferrer"
            >
              <div className="grid items-center grid-cols-12 cursor-pointer">
                <span className="col-span-1 py-[26px] ml-[4px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.602 10.2397C19.602 9.56436 19.5367 8.86721 19.4278 8.21362H9.99438V12.0698H15.3973C15.1795 13.3116 14.4605 14.4009 13.393 15.098L16.6174 17.6034C18.5127 15.8388 19.602 13.268 19.602 10.2397Z"
                      fill="#4280EF"
                    />
                    <path
                      d="M9.9943 20.0001C12.6958 20.0001 14.9615 19.1068 16.6173 17.5818L13.3929 15.0982C12.4997 15.7082 11.345 16.0568 9.9943 16.0568C7.37997 16.0568 5.17958 14.2921 4.3735 11.9392L1.06201 14.4882C2.76133 17.865 6.20353 20.0001 9.9943 20.0001Z"
                      fill="#34A353"
                    />
                    <path
                      d="M4.37355 11.9173C3.95962 10.6755 3.95962 9.32477 4.37355 8.08296L1.06207 5.51221C-0.354024 8.3444 -0.354024 11.6777 1.06207 14.4881L4.37355 11.9173Z"
                      fill="#F6B704"
                    />
                    <path
                      d="M9.9943 3.96545C11.4104 3.94366 12.8047 4.48831 13.8287 5.46869L16.6826 2.59292C14.8744 0.893609 12.4779 -0.0214058 9.9943 0.00038023C6.20353 0.00038023 2.76133 2.13542 1.06201 5.51226L4.3735 8.08301C5.17958 5.70833 7.37997 3.96545 9.9943 3.96545Z"
                      fill="#E54335"
                    />
                  </svg>
                </span>
                <span className="col-span-11 text-sm font-medium ml-[6px]">
                  Gmail
                </span>
              </div>
            </a>
            <hr />
          </div>
          <div className="mx-[20px] mt-[2vh]">
            <p className="ml-[10px] text-sm font-medium">Copy link</p>
            <div className="flex justify-between items-center w-full border-2 rounded-full h-[60px] px-[20px] mt-[16px]">
              <span className="truncate">peduly.com/{slug}</span>
              <div className="cursor-pointer">
                <CopyToClipboard
                  text={`peduly.com/${slug}`}
                  onCopy={handleCopy}
                >
                  <svg
                    width={25}
                    height={24}
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M17.0972 13.4V16.4C17.0972 20.4 15.488 22 11.4652 22H7.64347C3.62062 22 2.01147 20.4 2.01147 16.4V12.6C2.01147 8.6 3.62062 7 7.64347 7H10.6606"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.0972 13.4H13.8789C11.4652 13.4 10.6606 12.6 10.6606 10.2V7L17.0972 13.4Z"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M11.6663 2H15.6891"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.04004 5C7.04004 3.34 8.3877 2 10.0572 2H12.6922"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.1256 8V14.19C22.1256 15.74 20.8584 17 19.2996 17"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.1256 8H19.1085C16.8456 8 16.0913 7.25 16.0913 5V2L22.1256 8Z"
                      stroke="#212121"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </CopyToClipboard>
              </div>
            </div>
            {copy && (
              <div className="text-center text-peduly-primary">
                <p className="mt-2 text-sm">Copied to cliboard!</p>
              </div>
            )}
          </div>
          <div className="bg-[#f2f2f2] bg-opacity-50 rounded-[15px] mt-[2vh] mx-[20px] mb-[24px]">
            <p className="mx-[20px] text-sm font-normal mt-[20px]">
              Tips: Salin link kemudian tempel dimana saja.
            </p>
            <div className="flex mx-[20px] py-[15px] space-x-3">
              <span>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M19.8456 5.59444C19.8456 6.38981 19.2008 7.03444 18.4056 7.03444C17.6104 7.03444 16.9656 6.38981 16.9656 5.59444C16.9656 4.79906 17.6104 4.15444 18.4056 4.15444C19.2009 4.15444 19.8456 4.79906 19.8456 5.59444ZM12 15.9999C9.79088 15.9999 8.00006 14.2091 8.00006 12C8.00006 9.79088 9.79088 8.00006 12 8.00006C14.2091 8.00006 15.9999 9.79088 15.9999 12C15.9999 14.2091 14.2091 15.9999 12 15.9999ZM12 5.83781C8.59669 5.83781 5.83781 8.59669 5.83781 12C5.83781 15.4033 8.59669 18.1622 12 18.1622C15.4033 18.1622 18.1622 15.4033 18.1622 12C18.1622 8.59669 15.4033 5.83781 12 5.83781ZM12 2.16225C15.2042 2.16225 15.5837 2.17444 16.8489 2.23219C18.0189 2.28562 18.6544 2.481 19.0772 2.64544C19.6373 2.86313 20.037 3.12319 20.457 3.54319C20.877 3.963 21.1371 4.36275 21.3547 4.923C21.519 5.34581 21.7146 5.98125 21.768 7.15125C21.8258 8.41669 21.8379 8.79619 21.8379 12.0004C21.8379 15.2046 21.8258 15.5841 21.768 16.8493C21.7146 18.0193 21.5192 18.6548 21.3547 19.0776C21.1371 19.6376 20.877 20.0374 20.457 20.4574C20.0372 20.8774 19.6374 21.1374 19.0772 21.3551C18.6544 21.5194 18.0189 21.7149 16.8489 21.7684C15.5837 21.8261 15.2042 21.8383 12 21.8383C8.79562 21.8383 8.41613 21.8261 7.15088 21.7684C5.98088 21.7149 5.34544 21.5196 4.92262 21.3551C4.36256 21.1374 3.96281 20.8774 3.54281 20.4574C3.123 20.0376 2.86275 19.6378 2.64506 19.0776C2.48081 18.6548 2.28525 18.0193 2.23181 16.8493C2.17406 15.5839 2.16187 15.2044 2.16187 12.0004C2.16187 8.79619 2.17406 8.41669 2.23181 7.15125C2.28525 5.98125 2.48063 5.34581 2.64506 4.923C2.86275 4.36294 3.12281 3.96319 3.54281 3.54319C3.96263 3.12319 4.36237 2.86313 4.92262 2.64544C5.34544 2.48119 5.98088 2.28562 7.15088 2.23219C8.41631 2.17444 8.79581 2.16225 12 2.16225ZM12 0C8.74106 0 8.33231 0.013875 7.05244 0.0721875C5.77519 0.1305 4.90275 0.333375 4.13962 0.63C3.35044 0.936562 2.68125 1.347 2.01412 2.01412C1.347 2.68125 0.936562 3.35044 0.63 4.13962C0.333375 4.90294 0.1305 5.77519 0.0721875 7.05244C0.013875 8.33231 0 8.74106 0 12C0 15.2589 0.013875 15.6677 0.0721875 16.9476C0.1305 18.2248 0.333375 19.0971 0.63 19.8604C0.936562 20.6496 1.347 21.3188 2.01412 21.9859C2.68125 22.653 3.35044 23.0632 4.13962 23.37C4.90294 23.6666 5.77519 23.8695 7.05244 23.9278C8.33231 23.9861 8.74106 24 12 24C15.2589 24 15.6677 23.9861 16.9476 23.9278C18.2248 23.8695 19.0971 23.6666 19.8604 23.37C20.6496 23.0632 21.3188 22.653 21.9859 21.9859C22.653 21.3188 23.0632 20.6496 23.37 19.8604C23.6666 19.0971 23.8695 18.2248 23.9278 16.9476C23.9861 15.6677 24 15.2589 24 12C24 8.74106 23.9861 8.33231 23.9278 7.05244C23.8695 5.77519 23.6666 4.90294 23.37 4.13962C23.0632 3.35044 22.653 2.68125 21.9859 2.01412C21.3188 1.347 20.6496 0.93675 19.8604 0.63C19.0971 0.333375 18.2248 0.1305 16.9476 0.0721875C15.6677 0.013875 15.2589 0 12 0Z"
                    fill="url(#paint0_radial_5132_19574)"
                  />
                  <defs>
                    <radialGradient
                      id="paint0_radial_5132_19574"
                      cx={0}
                      cy={0}
                      r={1}
                      gradientUnits="userSpaceOnUse"
                      gradientTransform="translate(3.58333 24.0833) scale(30.666)"
                    >
                      <stop stopColor="#FFB140" />
                      <stop offset="0.2559" stopColor="#FF5445" />
                      <stop offset="0.599" stopColor="#FC2B82" />
                      <stop offset={1} stopColor="#8E40B7" />
                    </radialGradient>
                  </defs>
                </svg>
              </span>
              <span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M23.76 7.16694C23.76 7.16694 23.5253 5.50138 22.806 4.76806C21.8933 3.80506 20.8703 3.80056 20.4015 3.74469C17.043 3.5 12.0052 3.5 12.0052 3.5H11.9948C11.9948 3.5 6.957 3.5 3.5985 3.74469C3.129 3.80056 2.10675 3.80506 1.19325 4.76806C0.474 5.50156 0.24 7.16694 0.24 7.16694C0.24 7.16694 0 9.12331 0 11.0788V12.9127C0 14.8689 0.24 16.8245 0.24 16.8245C0.24 16.8245 0.474 18.4901 1.19325 19.2234C2.10675 20.1864 3.306 20.1562 3.84 20.2567C5.76 20.4425 12 20.4999 12 20.4999C12 20.4999 17.043 20.4924 20.4015 20.2477C20.8703 20.1911 21.8933 20.1866 22.806 19.2236C23.5253 18.4901 23.76 16.8247 23.76 16.8247C23.76 16.8247 24 14.8691 24 12.9127V11.0788C24 9.12331 23.76 7.16694 23.76 7.16694ZM9.522 15.1349L9.52125 8.34388L16.0057 11.7511L9.522 15.1349Z"
                    fill="#CE1312"
                  />
                </svg>
              </span>
              <span>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM18.0759 10.8929C16.8017 10.8929 15.5618 10.4794 14.6072 9.77962L14.5996 14.5374C14.5988 15.419 14.3292 16.2794 13.8267 17.0038C13.3242 17.7282 12.6127 18.2821 11.7872 18.5916C10.9617 18.9011 10.0615 18.9515 9.20663 18.7361C8.35176 18.5207 7.58291 18.0496 7.00269 17.3859C6.42247 16.7221 6.05848 15.8972 5.95928 15.0212C5.86008 14.1452 6.03039 13.2598 6.44749 12.4831C6.86459 11.7064 7.50863 11.0754 8.29369 10.6743C9.07874 10.2731 9.96746 10.1209 10.8412 10.238V12.5745C10.4291 12.4527 9.98901 12.4638 9.58348 12.6062C9.17796 12.7486 8.82756 13.0151 8.58198 13.3678C8.33641 13.7205 8.20812 14.1416 8.21532 14.5713C8.22252 15.0011 8.36483 15.4176 8.62208 15.7619C8.87933 16.1062 9.23846 16.3608 9.64852 16.4895C10.0586 16.6183 10.4988 16.6146 10.9066 16.4791C11.3145 16.3436 11.6694 16.0831 11.9209 15.7346C12.1724 15.3861 12.3078 14.9672 12.3079 14.5374V5.12498H14.7114C14.7114 5.5668 14.7984 6.00429 14.9675 6.41248C15.1366 6.82067 15.3844 7.19155 15.6968 7.50396C16.0092 7.81637 16.3801 8.06419 16.7883 8.23326C17.1965 8.40233 17.634 8.48935 18.0758 8.48934L18.0759 10.8929Z"
                    fill="black"
                  />
                </svg>
              </span>
              <span>
                <svg
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M23.9441 9.33591L23.9444 9.33582L23.9369 9.27431C23.9369 9.27326 23.9368 9.27245 23.9366 9.2714C23.9365 9.27051 23.9365 9.2697 23.9363 9.26881L23.9085 9.03749C23.9029 8.99103 23.8965 8.9381 23.8892 8.87772L23.8834 8.82965L23.8715 8.8311C23.5787 7.16615 22.7745 5.58611 21.529 4.23697C20.2893 2.89431 18.6786 1.83421 16.8712 1.17125C15.3227 0.603239 13.6796 0.315186 11.9878 0.315186C9.70374 0.315186 7.4855 0.852363 5.57297 1.8686C1.88493 3.82816 -0.290165 7.43001 0.0313151 11.0448C0.197721 12.9153 0.930522 14.6959 2.15056 16.1941C3.29889 17.6042 4.85231 18.7422 6.64279 19.485C7.74369 19.9416 8.83221 20.1568 9.98475 20.3847L10.1197 20.4114C10.437 20.4742 10.5223 20.5604 10.5443 20.5946C10.5851 20.6581 10.5638 20.7831 10.5474 20.852C10.5324 20.9155 10.5168 20.9789 10.5013 21.0423C10.3775 21.547 10.2496 22.0689 10.3501 22.6442C10.4657 23.3057 10.8787 23.685 11.4833 23.6851C11.4834 23.6851 11.4834 23.6851 11.4835 23.6851C12.1338 23.6851 12.8739 23.2488 13.3637 22.9602L13.4291 22.9218C14.5975 22.2356 15.6982 21.4616 16.5266 20.864C18.3394 19.5561 20.394 18.0737 21.9344 16.1559C23.4856 14.2243 24.2163 11.7422 23.9441 9.33591ZM7.47393 12.9954H5.40341C5.09051 12.9954 4.83685 12.7417 4.83685 12.4288V8.08284C4.83685 7.76994 5.09051 7.51629 5.40341 7.51629C5.71631 7.51629 5.96996 7.76994 5.96996 8.08284V11.8623H7.47385C7.78675 11.8623 8.04041 12.1159 8.04041 12.4288C8.04049 12.7417 7.78683 12.9954 7.47393 12.9954ZM9.63389 12.4134C9.63389 12.7263 9.38023 12.98 9.06733 12.98C8.75443 12.98 8.50077 12.7263 8.50077 12.4134V8.06747C8.50077 7.75456 8.75443 7.50091 9.06733 7.50091C9.38023 7.50091 9.63389 7.75456 9.63389 8.06747V12.4134ZM14.7551 12.4134C14.7551 12.6589 14.597 12.8765 14.3635 12.9523C14.3059 12.971 14.2469 12.9801 14.1886 12.9801C14.0106 12.9801 13.8387 12.896 13.73 12.7463L11.6898 9.93646V12.4135C11.6898 12.7264 11.4362 12.9801 11.1233 12.9801C10.8104 12.9801 10.5567 12.7264 10.5567 12.4135V8.19186C10.5567 7.94638 10.7148 7.72883 10.9483 7.65299C11.1819 7.57723 11.4376 7.66027 11.5818 7.85897L13.622 10.6689V8.06747C13.622 7.75456 13.8756 7.50091 14.1885 7.50091C14.5014 7.50091 14.7551 7.75456 14.7551 8.06747V12.4134ZM18.8834 12.8908H16.0794C15.7665 12.8908 15.5128 12.6372 15.5128 12.3243V10.1513V7.97827C15.5128 7.66537 15.7665 7.41172 16.0794 7.41172H18.7964C19.1093 7.41172 19.363 7.66537 19.363 7.97827C19.363 8.29117 19.1093 8.54483 18.7964 8.54483H16.6459V9.58479H18.3911C18.704 9.58479 18.9576 9.83844 18.9576 10.1513C18.9576 10.4642 18.704 10.7179 18.3911 10.7179H16.6459V11.7577H18.8834C19.1963 11.7577 19.45 12.0113 19.45 12.3243C19.45 12.6372 19.1963 12.8908 18.8834 12.8908Z"
                    fill="#00B900"
                  />
                </svg>
              </span>
              <span>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.19074 20.4749C2.0538 18.4418 0 15.0653 0 11.2466C0 5.03934 5.42692 0 12.1117 0C18.7965 0 24.2235 5.03934 24.2235 11.2466C24.2235 17.4539 18.7965 22.4932 12.1117 22.4932C11.2981 22.4932 10.5035 22.4184 9.73438 22.2761C9.73438 22.2761 7.02955 23.4353 5.79372 23.9652C5.66006 24.0223 5.50652 24.0085 5.3854 23.9284C5.26385 23.8484 5.19074 23.713 5.19074 23.5673C5.19074 22.4928 5.19074 20.4749 5.19074 20.4749Z"
                    fill="#57B7EB"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.46045 12.9769C3.46045 12.9769 8.6659 8.42202 10.0479 7.21301C10.1357 7.13601 10.2508 7.09795 10.3667 7.10703C10.4831 7.11612 10.5904 7.17192 10.6652 7.26146C11.6272 8.41596 14.7071 12.1118 14.7071 12.1118L20.7629 9.5164C20.7629 9.5164 15.5575 14.0713 14.1754 15.2803C14.0876 15.3573 13.9726 15.3953 13.8566 15.3863C13.7403 15.3772 13.633 15.3214 13.5582 15.2318C12.5961 14.0773 9.51631 10.3815 9.51631 10.3815L3.46045 12.9769Z"
                    fill="#F9F6F9"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.68023 3.17578C1.92317 5.12793 0.865123 7.64112 0.865123 10.3814C0.865123 16.5887 6.29204 21.628 12.9769 21.628C16.2531 21.628 19.2269 20.4177 21.4083 18.4521C19.1863 20.9212 15.8452 22.4931 12.1117 22.4931C11.2981 22.4931 10.5035 22.4183 9.73438 22.276C9.73438 22.276 7.02955 23.4352 5.79372 23.9651C5.66006 24.0222 5.50652 24.0084 5.3854 23.9284C5.26385 23.8483 5.19074 23.7129 5.19074 23.5672C5.19074 22.4927 5.19074 20.4748 5.19074 20.4748C2.0538 18.4417 0 15.0652 0 11.2465C0 8.08146 1.41101 5.22007 3.68023 3.17578Z"
                    fill="#4891D3"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}
      {operationType === 'delete' && (
        <DeleteConfirmation
          data={data}
          status={popUp}
          onClickOutside={() => (popUp ? setPopUp(!popUp) : null)}
        />
      )}
      {operationType === 'end' && (
        <EndConfirmation
          data={data}
          status={popUp}
          onClickOutside={() => (popUp ? setPopUp(!popUp) : null)}
        />
      )}
      <div className={(!status && 'hidden') + ''}>
        <div
          className="w-full  fixed  z-40 bottom-[94px] left-1/2 transform -translate-x-1/2"
          style={{ maxWidth: '430px' }}
        >
          <div className="flex  justify-end">
            <div className="w-[210px] space-y-4">
              <div className="flex items-center justify-end ">
                <h3 className="text-base font-normal text-right">Bagikan</h3>
                <button
                  className="flex items-center justify-center relative w-[56px] h-[56px] rounded-full bg-peduly-primary mx-[20px] cursor-pointer"
                  ref={clickRef}
                  onClick={() => {
                    setClick(!click)
                  }}
                >
                  <svg
                    width={20}
                    height={22}
                    viewBox="0 0 20 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 7.00002C17.6569 7.00002 19 5.65687 19 4.00001C19 2.34315 17.6569 1 16 1C14.3431 1 13 2.34315 13 4.00001C13 5.65687 14.3431 7.00002 16 7.00002Z"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.00001 13.5713C5.65687 13.5713 7.00002 12.2282 7.00002 10.5713C7.00002 8.91444 5.65687 7.57129 4.00001 7.57129C2.34315 7.57129 1 8.91444 1 10.5713C1 12.2282 2.34315 13.5713 4.00001 13.5713Z"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16 21C17.6569 21 19 19.6569 19 18C19 16.3431 17.6569 15 16 15C14.3431 15 13 16.3431 13 18C13 19.6569 14.3431 21 16 21Z"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.59009 12.51L13.4201 16.49"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M13.4101 5.50977L6.59009 9.48978"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div className="flex items-center justify-end ">
                <h3 className="text-base font-normal text-right">
                  Lihat Peserta
                </h3>
                <Link
                  className="flex items-center justify-center relative w-[56px] h-[56px] rounded-full bg-peduly-primary mx-[20px] cursor-pointer"
                  ref={clickRef}
                  onClick={handleLinkClick}
                  to={`/aktivitas/${slug}/peserta`}
                >
                  <svg
                    width={26}
                    height={26}
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.25654 11.7461C9.13539 11.734 8.99001 11.734 8.85674 11.7461C5.97335 11.6492 3.68359 9.28672 3.68359 6.3791C3.68359 3.4109 6.08238 1 9.0627 1C12.0309 1 14.4418 3.4109 14.4418 6.3791C14.4297 9.28672 12.1399 11.6492 9.25654 11.7461Z"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M18.0401 3.4231C20.3904 3.4231 22.2803 5.32517 22.2803 7.66338C22.2803 9.95313 20.4631 11.8189 18.1976 11.9037C18.1006 11.8915 17.9916 11.8915 17.8826 11.9037"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3.19889 16.2165C0.267037 18.1792 0.267037 21.3775 3.19889 23.3281C6.53054 25.5572 11.9944 25.5572 15.3261 23.3281C18.258 21.3654 18.258 18.167 15.3261 16.2165C12.0066 13.9994 6.54266 13.9994 3.19889 16.2165Z"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.3782 22.8071C21.2505 22.6254 22.0743 22.2741 22.7527 21.7531C24.6427 20.3357 24.6427 17.9974 22.7527 16.58C22.0864 16.0711 21.2747 15.7319 20.4145 15.5381"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              <div className="flex items-center justify-end ">
                <h3 className="text-base font-normal text-right">Edit</h3>
                <Link
                  className="flex items-center justify-center relative w-[56px] h-[56px] rounded-full bg-peduly-primary mx-[20px] cursor-pointer"
                  ref={clickRef}
                  to={{
                    pathname: `/aktivitas-saya/create`,
                    state: data,
                  }}
                >
                  <svg
                    width={26}
                    height={26}
                    viewBox="0 0 26 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.666 1.29761H9.29579C3.37023 1.29761 1 3.66783 1 9.5934V16.7041C1 22.6296 3.37023 24.9999 9.29579 24.9999H16.4065C22.332 24.9999 24.7023 22.6296 24.7023 16.7041V14.3339"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M17.6388 2.50655L8.30012 11.8452C7.94459 12.2008 7.58905 12.9 7.51794 13.4096L7.00835 16.9768C6.81873 18.2686 7.73127 19.1692 9.02304 18.9915L12.5902 18.4819C13.088 18.4108 13.7872 18.0552 14.1546 17.6997L23.4933 8.36101C25.105 6.74926 25.8635 4.87678 23.4933 2.50655C21.123 0.136324 19.2506 0.894797 17.6388 2.50655Z"
                      stroke="white"
                      strokeWidth={2}
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M16.2998 3.84546C17.0938 6.67788 19.31 8.89404 22.1543 9.69992"
                      stroke="white"
                      strokeWidth={2}
                      strokeMiterlimit={10}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
              {dayStatus === 'masih' && (
                <div className="flex items-center justify-end ">
                  <h3 className="text-base font-normal text-right">Tutup Aktivitas</h3>
                  <button
                    className="flex items-center justify-center relative w-[56px] h-[56px] rounded-full bg-peduly-primary mx-[20px] cursor-pointer"
                    ref={clickRef}
                    onClick={() => {
                      setOperationType('end')
                      setPopUp(true)
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.5299 9.47004L9.46992 14.53C8.81992 13.88 8.41992 12.99 8.41992 12C8.41992 10.02 10.0199 8.42004 11.9999 8.42004C12.9899 8.42004 13.8799 8.82004 14.5299 9.47004Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M17.8198 5.76998C16.0698 4.44998 14.0698 3.72998 11.9998 3.72998C8.46984 3.72998 5.17984 5.80998 2.88984 9.40998C1.98984 10.82 1.98984 13.19 2.88984 14.6C3.67984 15.84 4.59984 16.91 5.59984 17.77" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M8.41992 19.5301C9.55992 20.0101 10.7699 20.2701 11.9999 20.2701C15.5299 20.2701 18.8199 18.1901 21.1099 14.5901C22.0099 13.1801 22.0099 10.8101 21.1099 9.40005C20.7799 8.88005 20.4199 8.39005 20.0499 7.93005" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M15.5099 12.7C15.2499 14.11 14.0999 15.26 12.6899 15.52" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M9.47 14.53L2 22" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                      <path d="M21.9998 2L14.5298 9.47" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                  </button>
                </div>
              )}
              <div className="flex items-center justify-end"
                onClick={() => {
                  setOperationType('delete')
                  setPopUp(true)
                }}>
                <h3 className="text-base font-normal text-right">Hapus</h3>
                <button
                  className="flex items-center justify-center relative w-[56px] h-[56px] rounded-full bg-peduly-primary mx-[20px] cursor-pointer"
                >
                  <svg
                    width={24}
                    height={26}
                    viewBox="0 0 24 26"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.6 5.77603C18.604 5.38003 14.584 5.17603 10.576 5.17603C8.2 5.17603 5.824 5.29603 3.448 5.53603L1 5.77603"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.6001 4.564L7.8641 2.992C8.0561 1.852 8.2001 1 10.2281 1H13.3721C15.4001 1 15.5561 1.9 15.7361 3.004L16.0001 4.564"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20.0201 9.56787L19.2401 21.6519C19.1081 23.5359 19.0001 24.9999 15.6521 24.9999H7.94808C4.60008 24.9999 4.49208 23.5359 4.36008 21.6519L3.58008 9.56787"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M9.7959 18.3999H13.7919"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.7998 13.6001H14.7998"
                      stroke="white"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default MenuEditAktivitas
