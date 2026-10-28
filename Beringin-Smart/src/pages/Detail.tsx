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
  alertCircleOutline,
  informationCircleOutline,
  checkmarkDoneCircleOutline,
  arrowBackOutline,
  pricetagOutline,
} from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import { LaporanContext } from '../context/LaporanContext';
import { Laporan } from '../types/laporan';
import api from '../services/api';

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const idLaporan = id || '';
  const { getLaporanById, ubahStatusLaporan } = useContext(LaporanContext);
  const [laporan, setLaporan] = useState<Laporan | null>(null);
  const [fetching, setFetching] = useState<boolean>(true);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastColor, setToastColor] = useState('dark');

  const userJson = localStorage.getItem('user');
  const currentUser = userJson ? JSON.parse(userJson) : null;
  const role = localStorage.getItem('role') === 'petugas' || currentUser?.role === 'petugas' ? 'petugas' : 'siswa';

  // Auth Guard
  useEffect(() => {
    if (!localStorage.getItem('token')) {
      window.location.href = '/login';
    }
  }, []);

  // Fetch / Retrieve Laporan reliably with instant Context lookup + API fallback + timeout guard
  useEffect(() => {
    let isMounted = true;

    // 1. Check in Context immediately
    const foundInContext = getLaporanById(idLaporan);
    if (foundInContext) {
      setLaporan(foundInContext);
      setFetching(false);
      return;
    }

    // 2. Fetch from backend endpoint /laporan/{id}
    setFetching(true);
    api.get('/laporan/' + idLaporan)
      .then((res) => {
        if (!isMounted) return;
        const item = res.data?.data || res.data;
        if (item && item.id) {
          setLaporan(item);
        } else {
          const list = Array.isArray(item) ? item : [];
          const found = list.find((it: any) => String(it.id) === String(idLaporan));
          if (found) setLaporan(found);
        }
      })
      .catch((err) => {
        console.warn('Gagal ambil /laporan/:id, mencoba /laporan:', err);
        return api.get('/laporan').then((res) => {
          if (!isMounted) return;
          const list: Laporan[] = res.data?.data || res.data || [];
          const found = list.find((it) => String(it.id) === String(idLaporan));
          if (found) setLaporan(found);
        });
      })
      .finally(() => {
        if (isMounted) setFetching(false);
      });

    // Safety timeout: never leave user hanging more than 1200ms
    const safetyTimer = setTimeout(() => {
      if (isMounted) setFetching(false);
    }, 1200);

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
    };
  }, [idLaporan]);

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

  const isCompleted = laporan?.status === 'Selesai';

  if (fetching) {
    return (
      <IonPage>
        <IonHeader className="ion-no-border">
          <IonToolbar style={{ '--background': 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 60%, #b91c1c 100%)', '--color': '#ffffff' } as React.CSSProperties}>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="KEMBALI" color="light" />
            </IonButtons>
            <IonTitle style={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              Memuat Rincian...
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center" style={{ '--background': '#f8fafc' } as React.CSSProperties}>
          <div style={{ padding: '80px 20px' }}>
            <IonSpinner name="crescent" color="primary" style={{ width: '42px', height: '42px' }} />
            <p style={{ marginTop: '14px', color: '#450a0a', fontWeight: 700, fontSize: '0.92rem' }}>
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
          <IonToolbar style={{ '--background': 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 60%, #b91c1c 100%)', '--color': '#ffffff' } as React.CSSProperties}>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/home" text="KEMBALI" color="light" />
            </IonButtons>
            <IonTitle style={{ fontWeight: 800, fontFamily: "'Outfit', sans-serif" }}>
              Rincian Pengaduan
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center" style={{ '--background': '#f8fafc' } as React.CSSProperties}>
          <div
            style={{
              maxWidth: '440px',
              margin: '50px auto',
              padding: '32px 24px',
              background: '#ffffff',
              borderRadius: '18px',
              border: '1.5px solid #fee2e2',
              boxShadow: '0 8px 30px -4px rgba(69, 10, 10, 0.08)',
            }}
          >
            <IonIcon icon={alertCircleOutline} style={{ fontSize: '3.2rem', color: '#f59e0b', marginBottom: '14px' }} />
            <h3 style={{ margin: '0 0 8px 0', fontWeight: 800, color: '#450a0a', fontFamily: "'Outfit', sans-serif" }}>
              Data Tidak Ditemukan
            </h3>
            <p style={{ margin: '0 0 20px 0', color: '#64748b', fontSize: '0.9rem' }}>
              Tiket pengaduan yang Anda cari tidak tersedia atau belum terdaftar pada sistem.
            </p>
            <IonButton
              fill="solid"
              onClick={() => { window.location.href = '/home'; }}
              style={{
                '--background': '#dc2626',
                '--border-radius': '10px',
                fontWeight: 700,
              }}
            >
              <IonIcon slot="start" icon={arrowBackOutline} />
              Kembali ke Beranda
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      {/* Header Toolbar */}
      <IonHeader className="ion-no-border">
        <IonToolbar style={{ '--background': 'linear-gradient(135deg, #450a0a 0%, #7f1d1d 60%, #b91c1c 100%)', '--color': '#ffffff', padding: '4px 10px' } as React.CSSProperties}>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" text="KEMBALI" color="light" />
          </IonButtons>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                background: '#ffffff',
                borderRadius: '10px',
                padding: '3px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid #ef4444',
              }}
            >
              <img src="/logo-smkn1beringin.png" alt="Logo SMKN 1 Beringin" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
            <div>
              <IonTitle style={{ fontWeight: 800, fontSize: '1.15rem', color: '#ffffff', padding: 0, fontFamily: "'Outfit', sans-serif" }}>
                Rincian Tiket Sarpras
              </IonTitle>
              <div style={{ fontSize: '0.72rem', color: '#cbd5e1', fontWeight: 600 }}>
                SMK Negeri 1 Beringin • Tiket #{laporan.id}
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding" style={{ '--background': '#f8fafc' } as React.CSSProperties}>
        <div style={{ maxWidth: '640px', margin: '16px auto 40px auto' }}>
          <IonCard
            style={{
              margin: 0,
              borderRadius: '18px',
              background: '#ffffff',
              boxShadow: '0 8px 30px -4px rgba(69, 10, 10, 0.08)',
              border: '1.5px solid #fee2e2',
              overflow: 'hidden',
            }}
          >
            {/* Header Card Status Banner */}
            <div
              style={{
                padding: '16px 20px',
                background: '#f8fafc',
                borderBottom: '1px solid #fee2e2',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    background: '#f1f5f9',
                    color: '#450a0a',
                    border: '1px solid #cbd5e1',
                  }}
                >
                  <IonIcon icon={pricetagOutline} /> {laporan.kategori || 'Fasilitas'}
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>
                  ID #{laporan.id}
                </span>
              </div>

              {isCompleted ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: '#15803d',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    boxShadow: '0 2px 8px rgba(21, 128, 61, 0.35)',
                  }}
                >
                  <IonIcon icon={checkmarkDoneCircleOutline} /> Selesai
                </div>
              ) : laporan.status === 'Sedang Diproses' ? (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: '#0284c7',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    boxShadow: '0 2px 8px rgba(2, 132, 199, 0.35)',
                  }}
                >
                  <IonIcon icon={timeOutline} /> Sedang Diproses
                </div>
              ) : (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    background: '#d97706',
                    color: '#ffffff',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    fontSize: '0.76rem',
                    fontWeight: 800,
                    boxShadow: '0 2px 8px rgba(217, 119, 6, 0.35)',
                  }}
                >
                  <IonIcon icon={timeOutline} /> Menunggu
                </div>
              )}
            </div>

            <IonCardContent style={{ padding: '24px' }}>
              {/* Judul / Nama Kerusakan */}
              <div style={{ marginBottom: '20px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '4px' }}>
                  JUDUL LAPORAN KERUSAKAN
                </span>
                <h1
                  style={{
                    margin: 0,
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#450a0a',
                    lineHeight: 1.35,
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  {laporan.nama || 'Laporan Kerusakan Fasilitas'}
                </h1>
              </div>

              {/* Lokasi Ruangan */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', marginBottom: '6px' }}>
                  <IonIcon icon={locationOutline} style={{ fontSize: '1.1rem' }} />
                  <span style={{ fontSize: '0.76rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Lokasi / Ruangan
                  </span>
                </div>
                <div
                  style={{
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    color: '#450a0a',
                  }}
                >
                  {laporan.lokasi}
                </div>
              </div>

              {/* Deskripsi Masalah */}
              <div style={{ marginBottom: '22px' }}>
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.76rem',
                    fontWeight: 700,
                    color: '#64748b',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    marginBottom: '8px',
                  }}
                >
                  Rincian Kerusakan Fasilitas
                </span>
                <div
                  style={{
                    background: '#fef2f2',
                    padding: '16px',
                    borderRadius: '14px',
                    border: '1px solid #fecaca',
                    color: '#7f1d1d',
                    fontSize: '0.92rem',
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
                  padding: '14px 16px',
                  borderRadius: '14px',
                  border: '1px solid #fecaca',
                  marginBottom: '24px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#dc2626', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    <IonIcon icon={personOutline} /> Pelapor
                  </div>
                  <div style={{ fontWeight: 800, color: '#450a0a', fontSize: '0.88rem', marginTop: '2px' }}>
                    {laporan.nama_pelapor || laporan.nama || 'Siswa SMKN 1 Beringin'}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#dc2626', fontSize: '0.72rem', fontWeight: 700, textTransform: 'uppercase' }}>
                    <IonIcon icon={calendarOutline} /> Tanggal Masuk
                  </div>
                  <div style={{ fontWeight: 800, color: '#450a0a', fontSize: '0.88rem', marginTop: '2px' }}>
                    {laporan.created_at
                      ? new Date(laporan.created_at).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })
                      : '-'}
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
                        height: '46px',
                        '--background': 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
                        '--border-radius': '12px',
                        '--color': '#ffffff',
                        '--box-shadow': '0 4px 16px rgba(220, 38, 38, 0.35)',
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
                        borderRadius: '12px',
                        color: '#15803d',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        border: '1.5px solid #bbf7d0',
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
                    background: '#fef2f2',
                    borderRadius: '12px',
                    color: '#64748b',
                    fontSize: '0.82rem',
                    border: '1px solid #fecaca',
                  }}
                >
                  Status penanganan dipantau secara langsung oleh Petugas Sarpras SMKN 1 Beringin
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
