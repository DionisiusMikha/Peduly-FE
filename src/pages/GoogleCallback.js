import { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import jwt from 'jwt-decode'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from 'config/api.js'
import { getSlug, removeSlug } from 'utils/cookiesHooks'

function GoogleCallback() {
  const history = useHistory()
  // const [tautan, setTautan] = useState('')
  const location = useLocation()

  if(getSlug()){
    axios
        .get(`${API_URL}/api/aktivitas/byslug/${getSlug()}`)
        .then((response) => {
          // console.log(response.data.data.activity)
          let tautan = response.data.data.activity.tautan
          axios
            .get(`${API_URL}/api/auth/google/callback${location.search}`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
              },
            })
            .then((res) => {
              history.push('/');
              sessionStorage.setItem('isLoggedIn', true)
              const token = res.data.token
              const decode = jwt(token)
              const exp = decode.exp * 1000
  
              Cookies.set('token', token)
              // Cookies.set('expireAt', new Date(exp))
  
              if (getSlug()) {
                window.location.pathname = `/aktivitas/${getSlug()}/Konfirmasi`
                removeSlug()
              } else {
                window.location.pathname = '/'
              }
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((error) => {
          console.log(error)
        })
  } else {
    axios
    .get(`${API_URL}/api/auth/google/callback${location.search}`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then((res) => {
      sessionStorage.setItem('isLoggedIn', true)
      const token = res.data.token
      const decode = jwt(token)
      const exp = decode.exp * 1000

      const currentDate = new Date();
      const expireDate = new Date(currentDate);
      expireDate.setFullYear(expireDate.getFullYear() + 1);

      // localStorage.setItem('token',token)
      Cookies.set('token', token, {expires: 7})
      // Cookies.set('expireAt', expireDate)

      if (getSlug()) {
        window.location.pathname = `/aktivitas/${getSlug()}`
        removeSlug()
      } else {
        window.location.pathname = '/'
      }

    })
    .catch((err) => {
      console.log(err)
    })
  }

  // const history = useHistory()
  return <div>Loading...</div>
}

export default GoogleCallback
