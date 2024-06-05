import React, { useRef } from 'react'
import '../../styles/OTPForm.css'

function OTPForm({ otpValues, onOtpChange }) {
  const inputRefs = useRef([])
  const totalInputs = 4

  const handleInputChange = (index, e) => {
    let value = e.target.value

    // Memastikan input hanya berisi satu angka
    if (value.length > 1) {
      value = value.slice(0, 1)
    }

    // Mengupdate nilai input di komponen induk
    onOtpChange(index, value)

    if (value.length >= 1 && index < totalInputs - 1) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleInputKeyDown = (index, e) => {
    const input = e.target
    const value = input.value

    if (e.key === 'Backspace' && value.length === 0 && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  return (
    <>
      {Array.from({ length: totalInputs }).map((_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type={index === totalInputs - 1 ? 'text' : 'number'}
          className="input-otp w-[67.35px] h-12 text-center text-3xl font-semibold border-0"
          maxLength="1"
          value={otpValues[index]}
          onChange={(e) => handleInputChange(index, e)}
          onKeyDown={(e) => handleInputKeyDown(index, e)}
        />
      ))}
    </>
  )
}

export default OTPForm
