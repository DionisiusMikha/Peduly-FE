import { Route, Switch } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import Landing from 'pages/Landing'
import Login from './pages/Auth/Login'
import LupaPassword from './pages/Auth/LupaPassword/LupaPassword'
import Daftar from './pages/Auth/Daftar/Daftar'
import CekEmail from './pages/Auth/LupaPassword/cekEmail'
import PasswordReset from './pages/Auth/LupaPassword/PasswordReset'
import ubahProfile from './pages/Profile/UbahProfile'
import pengaturan from './pages/Profile/Pengaturan/Pengaturan'
import pengingatDonasi from './pages/Profile/pengingatDonasi'
import Simpan from 'pages/Landing/Simpan'
import Notifikasi from 'pages/Notifikasi'
import VerifikasiEmail from './pages/Auth/Daftar/VerifikasiEmail'
import VerifikasiBerhasil from './pages/Auth/Daftar/verifikasiBerhasil'
import NotFound from './pages/NotFound'
import GoogleCallback from 'pages/GoogleCallback'
import DetailPembayaran from 'pages/Profile/Donasi/DetailPembayaran'
import Biaya from 'pages/Profile/AktivitasSaya/Biaya'
import TentangKami from 'pages/Profile/TentangKami'
import Rekening from 'pages/Profile/Pengaturan/Rekening'
import Laporkan from 'pages/Aktivitas/Laporkan'
import Bantuan from 'pages/Profile/Bantuan'
import Panduan from 'pages/Profile/AktivitasSaya/Panduan'
import UbahKataSandi from 'pages/Profile/Pengaturan/UbahKataSandi'
import useAnalyticsEventTracker from 'hooks/useAnalyticsEventTracker'
import Berhasil from 'components/Akun/Berhasil'
import Gagal from 'components/Akun/Gagal'
import AdaYangBaru from 'pages/Profile/AdaYangBaru'
import VerifikasiAkun from 'pages/Profile/Pengaturan/VerifikasiAkun'
import DonasiBalanceBerhasil from 'pages/Profile/Donasi/DonasiBalanceBerhasil'
import Search from 'pages/Landing/Search'
import ProfileDonasi from 'pages/Profile/Donasi/Donasi'
import Aktivitas from 'pages/Aktivitas'
import DetailAktivitas from 'pages/Aktivitas/Detail'
import Profile from 'pages/Profile/Profile'
import NewPengaturan from 'pages/Profile/Pengaturan/NewPengaturan'
import BuatAktivitas from 'pages/Profile/AktivitasSaya/BuatAktivitas'
import BuatAktivitasBerhasil from 'components/BuatAktivitas/BuatAktivitasBerhasil'
import Partisipasi from 'components/Partisipasi'
import PartisipasiBerhasil from 'components/Partisipasi/PartisipasiBerhasil'
import AktivitasSaya from 'pages/Profile/AktivitasSaya'
import AkunOrganisasi from 'pages/Aktivitas/AkunOrganisasi'
import SendOtp from 'pages/Profile/Pengaturan/SendOtp'
import VerifikasiOtp from 'pages/Profile/Pengaturan/VerifikasiOtp'
import Ubah from 'pages/Profile/Pengaturan/Ubah'
import Konfirmasi from 'pages/Aktivitas/Konfirmasi'
import BayarBerhasil from 'components/Partisipasi/BayarBerhasil'
import LihatPeserta from 'pages/Profile/AktivitasSaya/LihatPeserta'
import riwayatDonasi from 'pages/Profile/Pengaturan/RiwayatDonasi'
import DetailRiwayat from 'pages/Profile/Pengaturan/DetailRiwayat'
import DeleteBerhasil from 'components/NavAktivitas/DeleteBerhasil'
import BuatAktivitasError from 'components/BuatAktivitas/BuatAktivitasError'
import TestDev from 'pages/testdev'
import TestUI from 'pages/TestUI'

function App() {
  useAnalyticsEventTracker()
  return (
    <UserProvider>
      <Switch>
        {/* ROOT */}
        <Route exact path="/" component={Landing} />
        {/* LANDING */}
        <Route exact path="/simpan" component={Simpan} />
        <Route exact path="/notifikasi" component={Notifikasi} />
        <Route exact path="/search" component={Search} />
        {/* REGISTER */}
        <Route exact path="/register" component={Daftar} />
        <Route
          exact
          path="/register/verifikasi-email"
          component={VerifikasiEmail}
        />
        <Route
          exact
          path="/register/verifikasiBerhasil"
          component={VerifikasiBerhasil}
        />
        {/* LOGIN */}
        <Route exact path="/login" component={Login} />
        {/* LUPA PASSWORD */}
        <Route exact path="/password/lupa" component={LupaPassword} />
        <Route exact path="/password/cek-email" component={CekEmail} />
        <Route exact path="/password/reset" component={PasswordReset} />
        <Route exact path="/password/reset/berhasil" component={Berhasil} />
        {/* DONASI */}
        <Route exact path="/donasi" component={ProfileDonasi} />
        <Route
          exact
          path="/aktivitas/:slug/pembayaran/:idTransaksi"
          component={DetailPembayaran}
        />
        <Route
          exact
          path="/donasi/berhasil"
          component={DonasiBalanceBerhasil}
        />
        <Route exact path="/biaya" component={Biaya} />
        {/* Aktivitas */}
        <Route exact path="/panduan" component={Panduan} />
        <Route exact path="/aktivitas" component={Aktivitas} />
        <Route exact path="/aktivitas/:slug" component={DetailAktivitas} />
        <Route exact path="/aktivitas/:slug/konfirmasi" component={Konfirmasi} />
        <Route exact path="/aktivitas/:slug/laporkan" component={Laporkan} />
        <Route
          exact
          path="/aktivitas/:slug/partisipasi"
          component={Partisipasi}
        />
        <Route
          exact
          path="/aktivitas/:slug/partisipasi/berhasil"
          component={PartisipasiBerhasil}
        />
        <Route exact path="/aktivitas/:slug/berhasil" component={Berhasil} />
        {/* aktivitas saya */}
        <Route exact path="/aktivitas-saya" component={AktivitasSaya} />
        <Route exact path="/aktivitas-saya/create" component={BuatAktivitas} />
        <Route
          exact
          path="/aktivitas-saya/create/berhasil"
          component={BuatAktivitasBerhasil}
        />
        <Route
          exact
          path="/aktivitas-saya/create/error"
          component={BuatAktivitasError}
        />
        <Route exact path="/aktivitas/:slug/peserta" component={LihatPeserta} />
        <Route exact path="/akun-organisasi/test" component={AkunOrganisasi} />
        <Route exact
          path="/aktivitas/:slug/edit/berhasil"
          component={DeleteBerhasil}
        />
        {/* PROFILE/AKUN */}
        {/* <Route exact path="/profile/:id" component={Profile} /> */}
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/pengaturan" component={NewPengaturan} />
        <Route exact path="/pengaturan/ubah" component={Ubah} />
        <Route exact path="/bantuan" component={Bantuan} />
        <Route exact path="/tentang-kami" component={TentangKami} />
        <Route exact path="/terbaru" component={AdaYangBaru} />
        <Route exact path="/ubah-profile" component={ubahProfile} />
        <Route exact path="/ubah-profile/berhasil" component={Berhasil} />
        <Route exact path="/ubah-profile/error" component={Gagal} />
        <Route exact path="/oldpengaturan" component={pengaturan} />
        <Route exact path="/pengaturan/rekening" component={Rekening} />
        <Route exact path="/pengaturan/riwayat" component={riwayatDonasi} />
        <Route
          exact
          path="/aktivitas/:slug/pembayaran/status/:id"
          component={DetailRiwayat}
        />
        {/* <Route
          exact
          path="/profile/:id/aktivitas/detail/:slug"
          component={DetailRiwayat}
        /> */}
        <Route
          exact
          path="/pengaturan/rekening/berhasil"
          component={Berhasil}
        />
        <Route
          exact
          path="/pengaturan/verifikasi-akun"
          component={VerifikasiAkun}
        />
        <Route
          exact
          path="/pengaturan/verifikasi-akun/berhasil"
          component={Berhasil}
        />
        <Route exact path="/aktivitas/:slug/BayarBerhasil" component={BayarBerhasil} />
        <Route exact path="/send-otp" component={SendOtp} />
        <Route exact path="/verifikasi-otp" component={VerifikasiOtp} />
        <Route exact path="/ubah-kata-sandi" component={UbahKataSandi} />
        <Route exact path="/ubah-kata-sandi/berhasil" component={Berhasil} />
        <Route exact path="/pengingatDonasi" component={pengingatDonasi} />
        <Route exact path="/auth/google" component={GoogleCallback} />
        {/* AKUN ORGANISASI PAGE */}
        <Route exact path="/:slug(@[a-zA-Z0-9-]+)" component={AkunOrganisasi} />
        {/* Slug */}
        {/* <Route exact path="/testDev" component={TestDev} /> */}
        <Route exact path="/:slug" component={DetailAktivitas} />
        {/* Testing UI */}
        <Route exact path="/lorem" component={TestUI} />
        {/* 404 */}
        <Route path="*" component={NotFound} exact />
      </Switch>
    </UserProvider>
  )
}

export default App
