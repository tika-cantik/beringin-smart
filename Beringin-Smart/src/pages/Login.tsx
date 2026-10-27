import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonToast,
  IonSpinner,
  IonIcon,
} from '@ionic/react';
import {
  mailOutline,
  lockClosedOutline,
  shieldCheckmarkOutline,
  sparklesOutline,
  arrowForwardOutline,
} from 'ionicons/icons';
import API from '../services/api';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Jika sudah memiliki sesi login, langsung arahkan ke Home
  useEffect(() => {
    if (localStorage.getItem('token')) {
      window.location.href = '/home';
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await API.post('/login', {
        email,
        password,
      });

      if (response.data && response.data.token) {
        const resolvedRole = response.data.role || response.data.user?.role || 'siswa';
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', resolvedRole);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/home';
      } else {
        setErrorMessage('Gagal memproses sesi login!');
      }
      setLoading(false);
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage('Gagal terhubung ke server Laravel! Pastikan server aktif.');
      }
      setLoading(false);
    }
  };

  const setPresetUser = (presetEmail: string) => {
    setEmail(presetEmail);
    setPassword('password123');
  };

  return (
    <IonPage>
      <IonContent
        className="ion-padding"
        style={{
          '--background': 'linear-gradient(145deg, #450a0a 0%, #7f1d1d 45%, #991b1b 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        } as React.CSSProperties}
      >
        <div style={{ maxWidth: '440px', margin: '40px auto 20px auto' }}>
          {/* Logo & Hero Branding */}
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <div
              style={{
                width: '74px',
                height: '74px',
                margin: '0 auto 16px auto',
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                borderRadius: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 12px 28px rgba(124, 58, 237, 0.45)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
            >
              <IonIcon icon={sparklesOutline} style={{ fontSize: '2.4rem', color: '#ffffff' }} />
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '5px 16px',
                background: 'rgba(167, 139, 250, 0.18)',
                border: '1px solid rgba(233, 213, 255, 0.35)',
                borderRadius: '9999px',
                color: '#fecaca',
                fontSize: '0.78rem',
                fontWeight: 700,
                letterSpacing: '0.8px',
                textTransform: 'uppercase',
                marginBottom: '10px',
              }}
            >
              <IonIcon icon={shieldCheckmarkOutline} /> SMKN 1 BERINGIN • PPLG
            </div>

            <h1
              style={{
                margin: '0 0 6px 0',
                fontSize: '2rem',
                fontWeight: 900,
                color: '#ffffff',
                letterSpacing: '-0.4px',
                fontFamily: "'Outfit', sans-serif",
              }}
            >
              Beringin Smart
            </h1>
            <p style={{ margin: 0, color: '#fecaca', fontSize: '0.92rem', opacity: 0.95 }}>
              Portal Pengaduan Sarana & Prasarana • Tika Pratama Edition
            </p>
          </div>

          {/* Login Card */}
          <IonCard
            style={{
              margin: 0,
              borderRadius: '24px',
              background: 'rgba(255, 255, 255, 0.98)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              overflow: 'hidden',
            }}
          >
            <IonCardContent style={{ padding: '30px 24px' }}>
              <div style={{ marginBottom: '20px' }}>
                <h2
                  style={{
                    margin: '0 0 4px 0',
                    fontSize: '1.35rem',
                    fontWeight: 800,
                    color: '#7f1d1d',
                    fontFamily: "'Outfit', sans-serif",
                  }}
                >
                  Selamat Datang
                </h2>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b' }}>
                  Silakan masuk menggunakan akun terdaftar Anda
                </p>
              </div>

              {/* Quick Fill Demo Pills */}
              <div style={{ marginBottom: '18px' }}>
                <span style={{ fontSize: '0.74rem', color: '#b91c1c', fontWeight: 700, display: 'block', marginBottom: '6px' }}>
                  AKUN UJI COBA CEPAT:
                </span>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setPresetUser('tika@beringin.sch.id')}
                    style={{
                      background: '#fef2f2',
                      border: '1px solid #fecaca',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#b91c1c',
                      cursor: 'pointer',
                    }}
                  >
                    👤 Tika (Siswa)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresetUser('petugas@beringin.sch.id')}
                    style={{
                      background: '#fffbeb',
                      border: '1px solid #fde68a',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#b45309',
                      cursor: 'pointer',
                    }}
                  >
                    🛡️ Pak Hendra (Petugas)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPresetUser('siswa@beringin.sch.id')}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #e2e8f0',
                      borderRadius: '9999px',
                      padding: '4px 10px',
                      fontSize: '0.74rem',
                      fontWeight: 600,
                      color: '#475569',
                      cursor: 'pointer',
                    }}
                  >
                    👥 Dimas (Umum)
                  </button>
                </div>
              </div>

              <form onSubmit={handleLogin}>
                {/* Email Input */}
                <div style={{ marginBottom: '16px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    Alamat Email
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fff5f5',
                      border: '1.5px solid #fecaca',
                      borderRadius: '14px',
                      padding: '0 12px',
                    }}
                  >
                    <IonIcon icon={mailOutline} style={{ fontSize: '1.2rem', color: '#dc2626', marginRight: '8px' }} />
                    <IonInput
                      type="email"
                      value={email}
                      onIonInput={(e) => setEmail(e.detail.value!)}
                      placeholder="nama@beringin.sch.id"
                      required
                      style={{ fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div style={{ marginBottom: '24px' }}>
                  <label
                    style={{
                      display: 'block',
                      marginBottom: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      color: '#334155',
                    }}
                  >
                    Kata Sandi
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      background: '#fff5f5',
                      border: '1.5px solid #fecaca',
                      borderRadius: '14px',
                      padding: '0 12px',
                    }}
                  >
                    <IonIcon icon={lockClosedOutline} style={{ fontSize: '1.2rem', color: '#dc2626', marginRight: '8px' }} />
                    <IonInput
                      type="password"
                      value={password}
                      onIonInput={(e) => setPassword(e.detail.value!)}
                      placeholder="••••••••"
                      required
                      style={{ fontSize: '0.92rem' }}
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <IonButton
                  expand="block"
                  type="submit"
                  disabled={loading}
                  style={{
                    height: '50px',
                    margin: 0,
                    '--background': 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                    '--border-radius': '9999px',
                    '--box-shadow': '0 10px 20px rgba(124, 58, 237, 0.35)',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                  }}
                >
                  {loading ? (
                    <IonSpinner name="crescent" color="light" />
                  ) : (
                    <>
                      Masuk ke Sistem <IonIcon slot="end" icon={arrowForwardOutline} />
                    </>
                  )}
                </IonButton>
              </form>
            </IonCardContent>
          </IonCard>

          {/* Footer note */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <span style={{ fontSize: '0.78rem', color: '#fecaca', opacity: 0.9 }}>
              © 2026-2027 SMK Negeri 1 Beringin • Tika Pratama (XI PPLG 1) • SKKNI No. 282/2016
            </span>
          </div>
        </div>

        <IonToast
          isOpen={!!errorMessage}
          onDidDismiss={() => setErrorMessage('')}
          message={errorMessage}
          duration={3500}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
