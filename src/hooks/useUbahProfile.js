import { useEffect, useState } from 'react'
import { fetcher } from '../config/axiosHooks'

export const useOptionPekerjaan = (ubahData) => {
  const [optionPekerjaan, setOptionPekerjaan] = useState([])

  const getListPekejaan = async () => {
    await fetcher(`/api/pekerjaan`, {
      method: 'GET',
    })
      .then((res) => {
        setOptionPekerjaan(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (ubahData) getListPekejaan()
  }, [ubahData])

  return optionPekerjaan.map((c) => ({
    value: c.id,
    label: c.pekerjaan,
  }))
}

export const useOptionJenisOrganisasi = (ubahData) => {
  const [optionJenisOrganisasi, setOptionJenisOrganisasi] = useState([])

  const getListJenisOrganisasi = async () => {
    await fetcher(`/api/organisasi`, {
      method: 'GET',
    })
      .then((res) => {
        setOptionJenisOrganisasi(res.data)
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (ubahData) getListJenisOrganisasi()
  }, [ubahData])

  return optionJenisOrganisasi.map((c) => ({
    value: c.id,
    label: c.jenis_lembaga,
  }))
}

export const useOptionProvinsi = () => {
  const [optionProvinsi, setOptionProvinsi] = useState([])

  const getListProvinsi = async () => {
    await fetcher(`/api/prov`, {
      method: 'GET',
    })
      .then((res) => {
        setOptionProvinsi(res.data)
        // console.log('prov', res)
      })
      .catch((err) => {
        // console.error(err)
      })
  }

  useEffect(() => {
    getListProvinsi()
  }, [])

  return optionProvinsi.map((c) => ({
    value: c.id,
    label: c.name,
  }))
}

export const useOptionKabupaten = (idProvinsi) => {
  const [optionKabupaten, setOptionKabupaten] = useState([])

  const getListKabupaten = async () => {
    await fetcher(`/api/kabupaten/${idProvinsi}`, {
      method: 'GET',
    })
      .then((res) => {
        console.log("res", res)
        setOptionKabupaten(res.data.length > 0 ? res.data : [])
      })
      .catch((err) => {
        console.error(err)
      })
  }

  useEffect(() => {
    if (idProvinsi) getListKabupaten()
  }, [idProvinsi]) // eslint-disable-line react-hooks/exhaustive-deps

  return optionKabupaten?.map((c) => ({
    value: c.id,
    label: c.name,
  }))
}

export const useOptionKecamatan = (idKabupaten) => {
  const [optionKecamatan, setOptionKecamatan] = useState([])

  const getListKecamatan = async () => {
    await fetcher(`/api/kecamatan/${idKabupaten}`, {
      method: 'GET',
    })
      .then((res) => {
        setOptionKecamatan(res.data.length > 0 ? res.data : [])
      })
      .catch((err) => {
        // console.error(err)
      })
  }

  useEffect(() => {
    if (idKabupaten) getListKecamatan()
  }, [idKabupaten]) // eslint-disable-line react-hooks/exhaustive-deps

  return optionKecamatan.map((c) => ({
    value: c.id,
    label: c.name,
  }))
}
