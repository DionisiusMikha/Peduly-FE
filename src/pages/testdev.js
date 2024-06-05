import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { useHistory } from 'react-router-dom'
import Lottie from 'lottie-react';
import ArrowTop from '../components/arrow-top.json'

const TestDev = () => {
  const [devMode, setDevMode] = useState(true) //untuk eksperimen developer
  const [formData, setFormData] = useState({
    judul_activity: "Tanam 1000 Pohon Apel",
    judul_slug: "seribu-bakaukulah",
    category_id: 1,
    detail_activity: "Tanam bakau untuk mencegah abrasi pantai dan untuk meningkatkan pariwisata indonesia",
    batas_waktu: -5,
    // foto_activity: "",  // Ganti dengan nama file gambar yang valid
    lokasi: "KABUPATEN GRESIK",
    waktu_activity: "Fleksibel",
    status_publish: "Published",
    tipe_activity: "In-Person",
    kuota: 50,
    tautan: "https://chat.whatsapp.com/LUddfUdLPGEGXNOlJvygf0",
    link_guidebook: "https://drive.google.com/file/d/1pSpeBlrUO22b_a3kLtC3eGtiW-Bk5ww2/view",
    jenis_activity: "paid",
    biaya_activity: [
      {
        per: 1,
        price: 2
      }
    ]
  });

  const history = useHistory()


  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  useEffect(() => {
    if (!devMode) {
      history.push(`/`)
    }
  }, [])

  const handleEdit = async () => {
    try {
      const response = await axios.put('https://api.peduly.com/api/aktivitas/620/update', formData);
      console.log('Data berhasil diubah:', response.data);
      // Tambahkan logika atau notifikasi berhasil diubah jika diperlukan
    } catch (error) {
      console.error('Gagal mengubah data:', error);
      // Tambahkan logika atau notifikasi gagal diubah jika diperlukan
    }
  };

  return (
    <div>
      {/* Render form atau komponen lain sesuai kebutuhan */}
      {/* <button onClick={handleEdit}>Simpan Perubahan</button> */}
      {/* <Select 
        options={options}
      /> */}
      <p>asdasdsd</p>
    </div>
  )
};

export default TestDev;
