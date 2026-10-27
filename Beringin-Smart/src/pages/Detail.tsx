import React, { useContext, useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonIcon,
  IonButtons,
  IonBackButton,
  IonToast,
  IonSpinner,
} from '@ionic/react';
import {
  checkmarkCircleOutline,
  timeOutline,
  personOutline,
  calendarOutline,
  locationOutline,
  businessOutline,
  alertCircleOutline,
  informationCircleOutline,
  checkmarkDoneCircleOutline,
} from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { LaporanContext } from '../context/LaporanContext';
import { Laporan } from '../types/laporan';
import api from '../services/api';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const idLaporan = id || '';
  const { getLaporanById, ubahStatusLaporan, laporanList } = useContext(LaporanContext);
  const [laporan, setLaporan] = useState<Laporan | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] = useState('dark');

  const userJson = localStorage.getItem('user');
  const currentUser = userJson ? JSON.parse(userJson) : null;
  const role = localStorage.getItem('role') === 'petugas' || currentUser?.role === 'petugas' ? 'petugas' : 'siswa';

  // Auth Guard: Arahkan ke /login jika belum ada token
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    }
  }, []);

  // Fetch / Retrieve Laporan reliably even on direct link or full refresh
  useEffect(() => {
    let isMounted = true;
    const item = getLaporanById(idLaporan);
    if (item) {
      setLaporan(item);
      setFetching(false);
    } else {
      setFetching(true);
      api
        .get('/laporan')
        .then((res) => {
          if (!isMounted) return;
          const list: Laporan[] = res.data?.data || res.data || [];
          const found = list.find((it) => String(it.id) === String(idLaporan));
          if (found) {
            setLaporan(found);
          }
        })
        .catch((err) => console.error('Gagal mengambil detail laporan:', err))
        .finally(() => {
          if (isMounted) setFetching(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [idLaporan, laporanList]);

  const handleSelesai = async () => {
    if (!idLaporan) return;
    setLoading(true);
    const success = await ubahStatusLaporan(idLaporan, 'Selesai');
    setLoading(false);

    if (success) {
      setLaporan((prev) => (prev ? { ...prev, status: 'Selesai' } : null));
      setToastMsg('Status laporan berhasil diperbarui menjadi Selesai!');
      setToastColor('success');
      setShowToast(true);
    } else {
      setToastMsg('Gagal memperbarui status. Periksa hak akses atau koneksi backend!');
      setToastColor('danger');
      setShowToast(true);
    }
  };

  if (fetching) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar
            style={
              {
                '--background': 'linear-gradient(135deg, #450a0a 0%, #4c1d95 55%, #b91c1c 100%)',
                '--color': '#ffffff',
              } as React.CSSProperties
            }
          >
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="KEMBALI" color="light" />
            </IonButtons>
            <IonTitle style={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              Memuat Rincian...
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className="ion-padding ion-text-center"
          style={{ '--background': '#fff5f5' } as React.CSSProperties}
        >
          <div style={{ padding: '80px 20px' }}>
            <IonSpinner name="crescent" color="primary" style={{ width: '42px', height: '42px' }} />
            <p style={{ marginTop: '14px', color: '#4c1d95', fontWeight: 700, fontSize: '0.92rem' }}>
              Memuat data tiket pengaduan sarpras...
            </p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  if (!laporan) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar
            style={
              {
                '--background': 'linear-gradient(135deg, #450a0a 0%, #4c1d95 55%, #b91c1c 100%)',
                '--color': '#ffffff',
              } as React.CSSProperties
            }
          >
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="KEMBALI" color="light" />
            </IonButtons>
            <IonTitle style={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              Rincian Pengaduan
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent
          className="ion-padding ion-text-center"
          style={{ '--background': '#fff5f5' } as React.CSSProperties}
        >
          <div
            style={{
              maxWidth: '400px',
              margin: '60px auto',
              padding: '32px',
              background: '#ffffff',
              borderRadius: '20px',
              border: '1px solid #fecaca',
              boxShadow: '0 8px 24px rgba(225,29,72,0.06)',
            }}
          >
            <IonIcon icon={alertCircleOutline} style={{ fontSize: '3.2rem', color: '#f59e0b', marginBottom: '14px' }} />
            <h3 style={{ margin: '0 0 6px 0', fontWeight: 800, color: '#4c1d95', fontFamily: "'Outfit', sans-serif" }}>
              Data Tidak Ditemukan
            </h3>
            <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>
              Tiket pengaduan yang Anda cari tidak tersedia atau telah dihapus.
            </p>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  const isCompleted = laporan.status === 'Selesai';

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar
          style={
            {
              '--background': 'linear-gradient(135deg, #450a0a 0%, #4c1d95 55%, #b91c1c 100%)',
              '--color': '#ffffff',
            } as React.CSSProperties
          }
        >
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="KEMBALI" color="light" />
          </IonButtons>
          <IonTitle
            style={{
              fontWeight: 800,
              letterSpacing: '-0.2px',
              fontSize: '1.05rem',
              fontFamily: "'Outfit', sans-serif",
            }}
          >
            Rincian Tiket #{laporan.id}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#fff5f5' } as React.CSSProperties}>
        <div style={{ maxWidth: '640px', margin: '24px auto' }}>
          {/* Main Detail Card */}
          <IonCard
            style={{
              margin: 0,
              borderRadius: '22px',
              boxShadow: '0 12px 32px -6px rgba(225, 29, 72, 0.12)',
              border: '1px solid #fecaca',
              overflow: 'hidden',
              background: '#ffffff',
            }}
          >
            {/* Top Status Banner */}
            <div
              style={{
                background: isCompleted
                  ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
                  : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
                padding: '16px 22px',
                borderBottom: `1px solid ${isCompleted ? '#a7f3d0' : '#fde68a'}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    background: '#ffffff',
                    color: '#b91c1c',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    border: '1px solid #e9d5ff',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.03)',
                  }}
                >
                  <IonIcon icon={businessOutline} style={{ marginRight: '5px', verticalAlign: 'middle' }} />
                  {laporan.kategori}
                </span>
              </div>

              {isCompleted ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#059669',
                    color: '#ffffff',
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 10px rgba(5, 150, 105, 0.3)',
                  }}
                >
                  <IonIcon icon={checkmarkDoneCircleOutline} /> Selesai Ditangani
                </div>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: '#d97706',
                    color: '#ffffff',
                    padding: '5px 14px',
                    borderRadius: '9999px',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    boxShadow: '0 4px 10px rgba(217, 119, 6, 0.3)',
                  }}
                >
                  <IonIcon icon={timeOutline} /> Sedang Diproses
                </div>
              )}
            </div>

            <IonCardContent style={{ padding: '24px' }}>
              {/* Lokasi Ruangan */}
              <div style={{ marginBottom: '22px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', marginBottom: '6px' }}>
                  <IonIcon icon={locationOutline} style={{ fontSize: '1.2rem' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Lokasi / Ruangan
                  </span>
                </div>
                <h2
                  style={{
                    margin: 0,
                    fontSize: '1.45rem',
                    fontWeight: 800,
                    color: '#4c1d95',
                    letterSpacing: '-0.2px',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {laporan.lokasi}
                </h2>
              </div>

              {/* Rincian Masalah */}
              <div style={{ marginBottom: '24px' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px',
                  }}
                >
                  Deskripsi Kerusakan
                </label>
                <div
                  style={{
                    background: '#fff5f5',
                    padding: '16px',
                    borderRadius: '14px',
                    border: '1px solid #fecaca',
                    color: '#1e1b4b',
                    fontSize: '0.94rem',
                    lineHeight: '1.6',
                  }}
                >
                  {laporan.deskripsi}
                </div>
              </div>

              {/* Info Pelapor & Waktu */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  background: '#fef2f2',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  border: '1px solid #fecaca',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#b91c1c',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    <IonIcon icon={personOutline} /> Pelapor
                  </div>
                  <div style={{ fontWeight: 800, color: '#4c1d95', fontSize: '0.92rem', marginTop: '2px' }}>
                    {laporan.nama_pelapor || laporan.nama || 'Anonim'}
                  </div>
                </div>

                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '5px',
                      color: '#b91c1c',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                    }}
                  >
                    <IonIcon icon={calendarOutline} /> Tanggal Masuk
                  </div>
                  <div style={{ fontWeight: 800, color: '#4c1d95', fontSize: '0.92rem', marginTop: '2px' }}>
                    {laporan.created_at
                      ? new Date(laporan.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : laporan.tanggal || '-'}
                  </div>
                </div>
              </div>

              {/* Action Buttons for Sarpras / Petugas */}
              {role === 'petugas' ? (
                <div>
                  {!isCompleted ? (
                    <IonButton
                      expand="block"
                      onClick={handleSelesai}
                      disabled={loading}
                      style={{
                        height: '48px',
                        '--background': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                        '--border-radius': '9999px',
                        '--box-shadow': '0 8px 20px rgba(225, 29, 72, 0.35)',
                        fontWeight: 700,
                        fontSize: '0.92rem',
                      }}
                    >
                      {loading ? (
                        <IonSpinner name="crescent" color="light" />
                      ) : (
                        <>
                          <IonIcon slot="start" icon={checkmarkCircleOutline} />
                          Tandai Penanganan Selesai
                        </>
                      )}
                    </IonButton>
                  ) : (
                    <div
                      style={{
                        textAlign: 'center',
                        padding: '12px',
                        background: '#f0fdf4',
                        borderRadius: '9999px',
                        color: '#047857',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1px solid #a7f3d0',
                      }}
                    >
                      <IonIcon icon={informationCircleOutline} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
                      Laporan ini telah selesai diverifikasi oleh Petugas Sarpras
                    </div>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '12px',
                    background: '#fff5f5',
                    borderRadius: '9999px',
                    color: '#4c1d95',
                    fontSize: '0.82rem',
                    border: '1px solid #e9d5ff',
                  }}
                >
                  Status penanganan dipantau secara langsung oleh Petugas Sarpras
                </div>
              )}
            </IonCardContent>
          </IonCard>
        </div>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMsg}
          duration={3000}
          color={toastColor}
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Detail;
