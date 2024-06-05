import React, { useEffect, useRef, useState } from 'react'
import { BottomSheet, BottomSheetRef } from 'react-spring-bottom-sheet'

import 'react-spring-bottom-sheet/dist/style.css'

function SelectSheet({ id, setValue, options, kategoriData, provinsiData, lokasiData, dateData }) {
  const [openSheet, setOpenSheet] = useState(false)
  const [selectedName, setSelectedName] = useState(null)

  const sheetRef = React.useRef()

  const placeholder = () => {
    if (selectedName === null) {
      if (id === 'kategori') setSelectedName('Kategori')
      else if (id === 'provinsi') setSelectedName('Provinsi')
      else if (id === 'kota') setSelectedName('Kota / Kabupaten')
    } else if (selectedName !== null) {
      setSelectedName(selectedName)
    }
  }

  const handleSelected = (idSelect, name) => {
    if (id === 'kota') {
      setValue(name)
    } else {
      setValue(idSelect)
    }
    setSelectedName(name)
    setOpenSheet(false)
  }

  function onDismiss() {
    setOpenSheet(false)
  }

  useEffect(() => {
    placeholder()
  }, [selectedName])

  return (
    <>
      <button
        onClick={() => setOpenSheet(true)}
        className={`w-full select-sheet-box flex justify-start p-[20px] ${
          (selectedName === 'Kategori' ||
            selectedName === 'Provinsi' ||
            selectedName === 'Kota / Kabupaten') &&
          !kategoriData && !lokasiData  &&!provinsiData
            ? 'text-gray-400'
            : 'text-black'
        }`}
      >
        {kategoriData
          ? options.find((item) => item.id === parseInt(kategoriData))?.name || ''
          : lokasiData
          ? lokasiData
          : options.find((item) => item.id === parseInt(provinsiData))?.name || ''
          ? provinsiData
          : selectedName}
      </button>
      <BottomSheet
        open={openSheet}
        onDismiss={onDismiss}
        snapPoints={({ maxHeight }) => maxHeight - 35}
        ref={sheetRef}
        className="mx-auto max-w-[430px]"
      >
        <ul className="px-[20px]">
          {options.map((option, i) => (
            <div key={i}>
              <li
                className="w-full px-0 py-[18px]"
                onClick={() => handleSelected(option.id, option.name)}
              >
                {option.name}
              </li>
              <hr className="text-[#f4f4f4]" />
            </div>
          ))}
        </ul>
      </BottomSheet>
    </>
  )
}

export default SelectSheet
