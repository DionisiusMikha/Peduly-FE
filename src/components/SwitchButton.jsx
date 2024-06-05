import React, { useEffect } from 'react'

const SwitchButton = ({ activeLabel, inactiveLabel = '', state, setState }) => {
  return (
    <div className=''>

      <input
        type="checkbox"
        class="appearance-none w-[38px] focus:outline-none checked:bg-peduly-primary h-[22px] bg-peduly-light rounded-full before:inline-block before:rounded-full before:bg-peduly-primary  before:h-4 before:w-4 checked:before:translate-x-full shadow-inner transition-all duration-300 before:ml-0.5"
        role="switch"
        id="flexSwitchCheckDefault"
        defaultChecked={state}
        onChange={() => {
          setState(!state)
        }}
      />
      <label
        className={"inline-block pl-6 hover:cursor-pointer " + (state ? 'text-peduly-primary' : 'text-peduly-dark')}
        htmlFor="flexSwitchCheckDefault"
      >{state ? activeLabel : (inactiveLabel || activeLabel)}</label>
    </div>
  )
}

export default SwitchButton
