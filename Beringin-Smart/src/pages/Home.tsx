import React, { useState, useContext, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCardContent,
  IonInput,
  IonTextarea,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  IonList,
  IonChip,
  IonButtons,
  IonSearchbar,
  IonSpinner,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from '@ionic/react';
import {
  layersOutline,
  sendOutline,
  businessOutline,
  personOutline,
  locationOutline,
  listOutline,
  timeOutline,
  chevronForwardOutline,
  logOutOutline,
  funnelOutline,
  sparklesOutline,
  addCircleOutline,
  handRightOutline,
  checkmarkDoneCircleOutline,
  chatboxEllipsesOutline,
  shieldCheckmarkOutline,
} from 'ionicons/icons';
import { useIonRouter } from '@ionic/react';
import { LaporanContext } from '../context/LaporanContext';
import './Home.css';

const Home: React.FC = () => {
  const router = useIonRouter();
  const { laporanList, tambahLaporan, refreshLaporan } = useContext(LaporanContext);

  // Local State Form
  const [nama, setNama] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [kategori, setKategori] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastColor, setToastColor] = useState('dark');

  // Mobile View Switcher (Daftar Laporan vs Ajukan Laporan)
  const [activeTab, setActiveTab] = useState<'daftar' | 'buat'>('daftar');

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');

  // User Info & Role
  const userJson = localStorage.getItem('user');
  const currentUser = userJson ? JSON.parse(userJson) : null;
  const userRole = localStorage.getItem('role') === 'petugas' || currentUser?.role === 'petugas' ? 'petugas' : 'siswa';

  // Handler Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  // Auth Guard: Arahkan ke /login jika belum ada token
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    }
  }, []);

  // Statistik Laporan dengan proteksi array
  const list = Array.isArray(laporanList) ? laporanList : [];
  const totalLaporan = list.length;
  const laporanSelesai = list.filter((item) => item && item.status === 'Selesai').length;
  const laporanPending = totalLaporan - laporanSelesai;

  // Filter List Data berdasarkan Search & Kategori secara aman
  const filteredList = list.filter((item) => {
    if (!item) return false;
    const matchesCategory = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const query = (searchQuery || '').toLowerCase();
    const lokasiStr = (item.lokasi || '').toLowerCase();
    const namaPelaporStr = (item.nama_pelapor || item.nama || '').toLowerCase();
    const deskripsiStr = (item.deskripsi || '').toLowerCase();
    const matchesSearch = lokasiStr.includes(query) || namaPelaporStr.includes(query) || deskripsiStr.includes(query);
    return matchesCategory && matchesSearch;
  });

  // Handler Submit Form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nama || !lokasi || !kategori || !deskripsi) {
      setToastMessage('Mohon lengkapi seluruh formulir pengaduan!');
      setToastColor('danger');
      setShowToast(true);
      return;
    }

    setSubmitting(true);
    const success = await tambahLaporan({ nama, lokasi, kategori, deskripsi });
    setSubmitting(false);

    if (success) {
      setNama('');
      setLokasi('');
      setKategori('');
      setDeskripsi('');
      setToastMessage('Laporan berhasil dikirim ke tim Sarpras!');
      setToastColor('success');
      setShowToast(true);
      setActiveTab('daftar'); // Alihkan ke tab daftar agar user langsung melihat tiket barunya
    } else {
      setToastMessage('Gagal mengirim laporan! Periksa koneksi backend.');
      setToastColor('danger');
      setShowToast(true);
    }
  };

  const categories = ['Semua', 'Fasilitas Kelas', 'Laboratorium', 'Lingkungan/Taman'];

  return (
    <IonPage>
      {/* Mobile-Friendly Responsive Header */}
      <IonHeader className="ion-no-border">
        <IonToolbar className="home-header-toolbar">
          {/* Brand & App Info */}
          <div slot="start" className="mobile-header-brand">
            <div className="mobile-logo-box">
              <IonIcon icon={shieldCheckmarkOutline} />
            </div>

            <div className="mobile-brand-text">
              <h1 className="mobile-brand-title">Beringin Smart</h1>
              <div className="mobile-brand-subtitle">
                <span>SMKN 1</span>
                <span>•</span>
                <span
                  style={{
                    color: userRole === 'petugas' ? '#c084fc' : '#e9d5ff',
                    fontWeight: 700,
                  }}
                >
                  {userRole === 'petugas' ? 'Petugas Sarpras' : 'Siswa'}
                </span>
              </div>
            </div>
          </div>

          {/* User Avatar & Logout Button */}
          <IonButtons slot="end" className="mobile-header-end">
            <div className="mobile-avatar-pill">
              <div
                className="mobile-avatar-circle"
                style={{ background: userRole === 'petugas' ? '#b91c1c' : '#dc2626' }}
              >
                {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'A'}
              </div>
              <span className="mobile-user-name">
                {currentUser?.name ? currentUser.name.split(' ')[0] : 'User'}
              </span>
            </div>

            <IonButton
              color="light"
              fill="clear"
              size="small"
              onClick={handleLogout}
              className="mobile-logout-btn"
              title="Keluar / Logout"
            >
              <IonIcon slot="icon-only" icon={logOutOutline} style={{ fontSize: '1.25rem' }} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#fff5f5' } as React.CSSProperties}>
        <IonGrid fixed style={{ maxWidth: '1200px', padding: 0 }}>
          {/* Hero Greeting Banner */}
          <div className="home-hero-greeting">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.2rem',
                    fontWeight: 800,
                    color: '#4c1d95',
                    display: 'flex',
                    alignItems: 'center',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Halo, {currentUser?.name ? currentUser.name.split(' ')[0] : 'Pengguna'}
                  <IonIcon icon={handRightOutline} style={{ color: '#f59e0b', fontSize: '1.2rem', marginLeft: '6px' }} />
                </h2>
                <p style={{ margin: '2px 0 0 0', fontSize: '0.8rem', color: '#64748b' }}>
                  {userRole === 'petugas' ? 'Pantau & verifikasi kendala sarana prasarana sekolah.' : 'Laporkan kendala fasilitas sekolah untuk tindak lanjut cepat.'}
                </p>
              </div>

              <IonButton
                size="small"
                fill="outline"
                color="primary"
                onClick={() => refreshLaporan()}
                style={{ height: '32px', fontWeight: 700, fontSize: '0.75rem', '--border-radius': '9999px' }}
              >
                <IonIcon slot="icon-only" icon={sparklesOutline} />
              </IonButton>
            </div>
          </div>

          {/* Compact 3-Column Mobile Stats Grid */}
          <IonRow className="mobile-stats-row" style={{ marginBottom: '14px' }}>
            {/* Total Laporan */}
            <IonCol size="4">
              <div
                className="bs-metric-card"
                style={{
                  background: 'var(--bg-gradient-card-teal)',
                  padding: '12px 8px',
                  textAlign: 'center',
                  border: '1px solid #ccfbf1',
                }}
              >
                <div style={{ fontSize: '1.35rem', color: '#0d9488' }}>
                  <IonIcon icon={layersOutline} />
                </div>
                <div
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#115e59',
                    lineHeight: 1.1,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {totalLaporan}
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0f766e', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Total
                </div>
              </div>
            </IonCol>

            {/* Menunggu / Proses */}
            <IonCol size="4">
              <div
                className="bs-metric-card"
                style={{
                  background: 'var(--bg-gradient-card-amber)',
                  padding: '12px 8px',
                  textAlign: 'center',
                  border: '1px solid #fde68a',
                }}
              >
                <div style={{ fontSize: '1.35rem', color: '#d97706' }}>
                  <IonIcon icon={timeOutline} />
                </div>
                <div
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#92400e',
                    lineHeight: 1.1,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {laporanPending}
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#b45309', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Proses
                </div>
              </div>
            </IonCol>

            {/* Selesai */}
            <IonCol size="4">
              <div
                className="bs-metric-card"
                style={{
                  background: 'var(--bg-gradient-card-emerald)',
                  padding: '12px 8px',
                  textAlign: 'center',
                  border: '1px solid #e9d5ff',
                }}
              >
                <div style={{ fontSize: '1.35rem', color: '#dc2626' }}>
                  <IonIcon icon={checkmarkDoneCircleOutline} />
                </div>
                <div
                  style={{
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#4c1d95',
                    lineHeight: 1.1,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {laporanSelesai}
                </div>
                <div style={{ fontSize: '0.68rem', fontWeight: 700, color: '#b91c1c', textTransform: 'uppercase', letterSpacing: '0.3px' }}>
                  Selesai
                </div>
              </div>
            </IonCol>
          </IonRow>

          {/* Mobile Segment Switcher (Hanya tampil di layar kecil < 992px) */}
          <div className="ion-hide-lg-up">
            <IonSegment
              value={activeTab}
              onIonChange={(e) => setActiveTab(e.detail.value as 'daftar' | 'buat')}
              className="mobile-view-segment"
            >
              <IonSegmentButton value="daftar">
                <IonLabel>
                  <IonIcon icon={listOutline} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  Riwayat ({filteredList.length})
                </IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="buat">
                <IonLabel>
                  <IonIcon icon={addCircleOutline} style={{ verticalAlign: 'middle', marginRight: '5px' }} />
                  Ajukan Laporan
                </IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </div>

          {/* Main Layout: Responsive Grid */}
          <IonRow>
            {/* Form Pelaporan (Desktop: Selalu Tampil; Mobile: Tampil jika activeTab === 'buat') */}
            <IonCol
              size="12"
              sizeLg="5"
              className={activeTab !== 'buat' ? 'ion-hide-lg-down' : ''}
              style={{ marginBottom: '16px' }}
            >
              <IonCard className="bs-form-card" style={{ margin: 0 }}>
                <IonCardHeader style={{ borderBottom: '1px solid #f1f5f9', padding: '16px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div
                      style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '10px',
                        background: '#fef2f2',
                        color: '#dc2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                      }}
                    >
                      <IonIcon icon={chatboxEllipsesOutline} />
                    </div>
                    <div>
                      <IonCardSubtitle style={{ color: '#dc2626', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        LAYANAN SARPRAS
                      </IonCardSubtitle>
                      <IonCardTitle
                        style={{
                          fontSize: '1.15rem',
                          fontWeight: 800,
                          color: '#4c1d95',
                          fontFamily: "'Outfit', sans-serif",
                        }}
                      >
                        Formulir Pelaporan Sarana
                      </IonCardTitle>
                    </div>
                  </div>
                </IonCardHeader>

                <IonCardContent style={{ padding: '18px' }}>
                  <form onSubmit={handleSubmit}>
                    {/* Nama Pelapor */}
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                        Nama Pelapor
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0 12px', background: '#fff5f5' }}>
                        <IonIcon icon={personOutline} style={{ color: '#dc2626', marginRight: '8px' }} />
                        <IonInput
                          placeholder="Masukkan nama lengkap Anda"
                          value={nama}
                          onIonInput={(e) => setNama(e.detail.value!)}
                          style={{ fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    {/* Lokasi / Ruangan */}
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                        Lokasi / Ruangan
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0 12px', background: '#fff5f5' }}>
                        <IonIcon icon={locationOutline} style={{ color: '#dc2626', marginRight: '8px' }} />
                        <IonInput
                          placeholder="Contoh: Lab Multimedia 2"
                          value={lokasi}
                          onIonInput={(e) => setLokasi(e.detail.value!)}
                          style={{ fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    {/* Kategori Fasilitas */}
                    <div style={{ marginBottom: '14px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                        Kategori Fasilitas
                      </label>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '0 12px', background: '#fff5f5' }}>
                        <IonIcon icon={listOutline} style={{ color: '#dc2626', marginRight: '8px' }} />
                        <IonSelect
                          value={kategori}
                          placeholder="Pilih kategori fasilitas"
                          onIonChange={(e) => setKategori(e.detail.value)}
                          style={{ width: '100%', fontSize: '0.88rem' }}
                        >
                          <IonSelectOption value="Fasilitas Kelas">Fasilitas Kelas</IonSelectOption>
                          <IonSelectOption value="Laboratorium">Laboratorium</IonSelectOption>
                          <IonSelectOption value="Lingkungan/Taman">Lingkungan/Taman</IonSelectOption>
                        </IonSelect>
                      </div>
                    </div>

                    {/* Deskripsi Masalah */}
                    <div style={{ marginBottom: '20px' }}>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                        Detail Kerusakan
                      </label>
                      <div style={{ border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '4px 12px', background: '#fff5f5' }}>
                        <IonTextarea
                          rows={3}
                          placeholder="Jelaskan secara rinci kendala fasilitas yang ditemukan..."
                          value={deskripsi}
                          onIonInput={(e) => setDeskripsi(e.detail.value!)}
                          style={{ fontSize: '0.88rem' }}
                        />
                      </div>
                    </div>

                    {/* Tombol Kirim */}
                    <IonButton
                      expand="block"
                      type="submit"
                      disabled={submitting}
                      style={{
                        height: '46px',
                        margin: 0,
                        '--background': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        '--border-radius': '9999px',
                        '--box-shadow': '0 6px 18px rgba(5, 150, 105, 0.35)',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                      }}
                    >
                      {submitting ? (
                        <IonSpinner name="crescent" color="light" />
                      ) : (
                        <>
                          <IonIcon slot="start" icon={sendOutline} /> Kirim Laporan Sarpras
                        </>
                      )}
                    </IonButton>
                  </form>
                </IonCardContent>
              </IonCard>
            </IonCol>

            {/* List Tiket Laporan (Desktop: Selalu Tampil; Mobile: Tampil jika activeTab === 'daftar') */}
            <IonCol
              size="12"
              sizeLg="7"
              className={activeTab !== 'daftar' ? 'ion-hide-lg-down' : ''}
            >
              {/* Header Feed + Searchbar */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: '1.15rem',
                        fontWeight: 800,
                        color: '#4c1d95',
                        fontFamily: "'Outfit', sans-serif",
                      }}
                    >
                      Riwayat Pengaduan Masuk
                    </h3>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
                      Menampilkan {filteredList.length} dari {totalLaporan} pengaduan
                    </span>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      background: '#fef2f2',
                      border: '1px solid #e9d5ff',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#dc2626',
                    }}
                  >
                    <span className="bs-pulse-dot" style={{ backgroundColor: '#a78bfa' }} />
                    Live Sync
                  </div>
                </div>

                {/* Search Bar */}
                <IonSearchbar
                  value={searchQuery}
                  onIonInput={(e) => setSearchQuery(e.detail.value!)}
                  placeholder="Cari riwayat laporan atau sarana..."
                  style={{
                    padding: 0,
                    '--background': '#ffffff',
                    '--border-radius': '14px',
                    '--box-shadow': '0 2px 8px rgba(0,0,0,0.03)',
                  } as React.CSSProperties}
                />

                {/* Filter Kategori Scrollable */}
                <div className="category-filter-scroll">
                  {categories.map((cat) => (
                    <IonChip
                      key={cat}
                      className={selectedCategory === cat ? 'filter-chip-active' : 'filter-chip-inactive'}
                      onClick={() => setSelectedCategory(cat)}
                      style={{ cursor: 'pointer', fontSize: '0.76rem', height: '30px' }}
                    >
                      {cat === 'Semua' && <IonIcon icon={funnelOutline} style={{ marginRight: '3px' }} />}
                      {cat}
                    </IonChip>
                  ))}
                </div>
              </div>

              {/* Feed List Items */}
              {filteredList.length === 0 ? (
                <div className="empty-state-box">
                  <IonIcon icon={businessOutline} style={{ fontSize: '2.6rem', color: '#dc2626', opacity: 0.4, marginBottom: '6px' }} />
                  <p style={{ margin: 0, fontWeight: 700, fontSize: '0.9rem', color: '#334155' }}>Belum ada pengaduan terkait</p>
                  <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                    Coba ubah kata kunci pencarian atau kategori fasilitas
                  </span>
                </div>
              ) : (
                <IonList style={{ background: 'transparent', padding: 0 }}>
                  {filteredList.map((item) => (
                    <div
                      key={item.id}
                      className={`ticket-card-hover ${item.status === 'Selesai' ? 'completed' : 'pending'}`}
                      onClick={() => router.push(`/detail/${item.id}`)}
                      style={{
                        background: '#ffffff',
                        padding: '16px',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                        <div style={{ minWidth: 0, flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                            <span
                              style={{
                                background: '#fef2f2',
                                color: '#b91c1c',
                                fontSize: '0.72rem',
                                fontWeight: 700,
                                padding: '3px 8px',
                                borderRadius: '9999px',
                                border: '1px solid #e9d5ff',
                              }}
                            >
                              {item.kategori}
                            </span>
                            <span style={{ fontSize: '0.72rem', color: '#94a3b8' }}>
                              #{item.id}
                            </span>
                          </div>

                          <h4
                            style={{
                              margin: '0 0 4px 0',
                              fontSize: '1rem',
                              fontWeight: 800,
                              color: '#4c1d95',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              fontFamily: "'Outfit', sans-serif",
                            }}
                          >
                            {item.lokasi}
                          </h4>
                        </div>

                        {/* Status Badge */}
                        {item.status === 'Selesai' ? (
                          <div className="bs-badge-completed">
                            <IonIcon icon={checkmarkDoneCircleOutline} /> Selesai
                          </div>
                        ) : (
                          <div className="bs-badge-pending">
                            <span className="bs-pulse-dot" /> {item.status || 'Menunggu'}
                          </div>
                        )}
                      </div>

                      <p style={{ margin: '4px 0 12px 0', fontSize: '0.84rem', color: '#475569', lineHeight: '1.45' }}>
                        {item.deskripsi.length > 80 ? `${item.deskripsi.substring(0, 80)}...` : item.deskripsi}
                      </p>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          borderTop: '1px solid #f1f5f9',
                          paddingTop: '10px',
                          fontSize: '0.76rem',
                          color: '#64748b',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', minWidth: 0 }}>
                          <IonIcon icon={personOutline} style={{ color: '#dc2626', flexShrink: 0 }} />
                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            Pelapor: <strong style={{ color: '#1e293b' }}>{item.nama_pelapor || item.nama}</strong>
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                          <span>
                            {item.created_at
                              ? new Date(item.created_at).toLocaleDateString('id-ID', {
                                  day: 'numeric',
                                  month: 'short',
                                })
                              : item.tanggal || '-'}
                          </span>
                          <IonIcon icon={chevronForwardOutline} style={{ color: '#dc2626' }} />
                        </div>
                      </div>
                    </div>
                  ))}
                </IonList>
              )}
            </IonCol>
          </IonRow>
        </IonGrid>

        {/* Notifikasi Toast */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color={toastColor}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Home;
