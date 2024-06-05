import { createContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { fetcher } from '../config/axiosHooks'
import { USER_API } from '../service/API'
import { getToken, getUbahProfileBerhasil } from '../utils/cookiesHooks'

const initialState = {
  isLoggedIn: false,
  token: null,
}

export const UserContext = createContext(initialState)

export const UserProvider = ({ children }) => {
  const [data, setData] = useState([])
  const [isError, setIsError] = useState(false)

  const getUser = async () => {
    await fetcher(USER_API, {
      method: 'GET',
    })
      .then((res) => {
        setData(res.data.user)
      })
      .catch(() => {
        setIsError(true)
      })
  }

  useEffect(() => {
    if (getToken()) getUser()
  }, [getUbahProfileBerhasil()]) // eslint-disable-line react-hooks/exhaustive-deps

  if (isError) {
    // Clear all cookies
    document.cookie.split(';').forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/')
    })

    // Clear Local Storage
    localStorage.clear()
  }

  const user = data

  if (user?.id) window.localStorage.setItem('uid_', user.id)

  return (
    <UserContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
