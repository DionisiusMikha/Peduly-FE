import React from 'react'

function FloatingButton({ hamburger, setHamburger }) {
  return (
    <button
      onClick={() => setHamburger((prev) => !prev)}
      className={[
        'bg-gray-400 rounded-full right-4 block md:hidden',
        hamburger ? 'hamburger-active' : '',
      ].join(' ')}
      id="hamburger"
      name="hamburger"
      type="button"
    >
      <span className="hamburger-line origin-top-left transition duration-300 ease-in-out"></span>
      <span className="hamburger-line transition duration-300 ease-in-out"></span>
      <span className="hamburger-line origin-bottom-left transition duration-300 ease-in-out"></span>
    </button>
  )
}

export default FloatingButton
