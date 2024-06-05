import { UserContext } from 'context/UserContext'
import React, { useContext } from 'react'

export default function Greeting() {
  const user = useContext(UserContext)
  return (
    <div className="mx-[30px]">
      <div className="greeting">
        <h2 className="text-[20px] font-semibold text-[#212121]">
          Hai, {user?.user?.name ? user?.user?.name : 'kamu'}
        </h2>
        <p className="text-[14px] font-normal text-[#717171] mt-[6px]">
          Bersama untuk kebaikan
        </p>
      </div>
    </div>
  )
}
