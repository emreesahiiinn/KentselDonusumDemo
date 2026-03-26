import React, { useState } from 'react';

// Renk paleti
const colors = {
  primary: '#1A365D',
  secondary: '#3182CE',
  accent: '#D69E2E',
  success: '#38A169',
  danger: '#E53E3E',
  bg: '#F7FAFC',
  card: '#FFFFFF',
  text: '#2D3748',
  muted: '#718096',
  border: '#E2E8F0'
};

// ===== ÖRNEK VERİLER =====

// Apartman ve daire bilgileri (Mülk Sahibi perspektifinden)
const apartmanVerisi = {
  id: 'APT-001',
  adres: 'Kadıköy, Caferağa Mah. Moda Cad. No:45',
  toplamDaire: 10,
  toplamM2: 1200,
  binaYasi: 35,
  katSayisi: 5,
  imarDurumu: 'Konut - Max 7 kat, Emsal: 2.50',
  ada: '1234',
  parsel: '56',
  daireler: [
    { no: 1, kat: 'Zemin', m2: 120, sahip: 'Ahmet Yılmaz', telefon: '0532 XXX XX XX', mutabakat: true, oran: 100 },
    { no: 2, kat: 'Zemin', m2: 120, sahip: 'Mehmet Demir', telefon: '0533 XXX XX XX', mutabakat: true, oran: 100 },
    { no: 3, kat: '1. Kat', m2: 120, sahip: 'Ayşe Kaya', telefon: '0534 XXX XX XX', mutabakat: true, oran: 100 },
    { no: 4, kat: '1. Kat', m2: 120, sahip: 'Fatma Öz', telefon: '0535 XXX XX XX', mutabakat: false, oran: 0 },
    { no: 5, kat: '2. Kat', m2: 120, sahip: 'Ali Yıldız', telefon: '0536 XXX XX XX', mutabakat: true, oran: 100 },
    { no: 6, kat: '2. Kat', m2: 120, sahip: 'Hasan Çelik', telefon: '0537 XXX XX XX', mutabakat: true, oran: 100 },
    { no: 7, kat: '3. Kat', m2: 120, sahip: 'Zeynep Arslan', telefon: '0538 XXX XX XX', mutabakat: 'bekliyor', oran: 0 },
    { no: 8, kat: '3. Kat', m2: 120, sahip: 'Mustafa Kara', telefon: '0539 XXX XX XX', mutabakat: true, oran: 100 },
    { no: 9, kat: '4. Kat', m2: 120, sahip: 'Elif Tan', telefon: '0540 XXX XX XX', mutabakat: true, oran: 100 },
    { no: 10, kat: '4. Kat', m2: 120, sahip: 'Can Doğan', telefon: '0541 XXX XX XX', mutabakat: true, oran: 100 },
  ]
};

// Mesajlar verisi
const mesajlarVerisi = [
  { id: 1, gonderen: 'ABC İnşaat Ltd.', tip: 'muteahhit', konu: 'Teklif Hakkında', mesaj: 'Sayın Ahmet Bey, teklifimiz hakkında görüşmek isteriz...', tarih: '28.01.2026 10:30', okundu: false },
  { id: 2, gonderen: 'Enstitü', tip: 'enstitu', konu: 'Belge Onayı', mesaj: 'Yüklediğiniz tapu belgesi onaylanmıştır.', tarih: '27.01.2026 15:45', okundu: true },
  { id: 3, gonderen: 'XYZ Yapı A.Ş.', tip: 'muteahhit', konu: 'Randevu Talebi', mesaj: 'Mülkünüzü yerinde görmek için randevu talep ediyoruz...', tarih: '26.01.2026 09:15', okundu: true },
  { id: 4, gonderen: 'Enstitü', tip: 'enstitu', konu: 'İmar Durumu Hazır', mesaj: 'Mülkünüze ait imar durumu belgesi hazırlanmıştır.', tarih: '25.01.2026 14:00', okundu: true },
];

// Ödemeler verisi
const odemelerVerisi = [
  { id: 1, tip: 'Ön Kayıt Ücreti', tutar: 5000, durum: 'Ödendi', tarih: '15.01.2026', aciklama: 'Platform kayıt ücreti' },
  { id: 2, tip: 'İmar Belgesi Ücreti', tutar: 2500, durum: 'Ödendi', tarih: '18.01.2026', aciklama: 'Enstitü tarafından hazırlanan imar belgesi' },
  { id: 3, tip: 'Ekspertiz Ücreti', tutar: 3500, durum: 'Bekliyor', tarih: '-', aciklama: 'Mülk değerleme raporu' },
];

// Randevular verisi
const randevularVerisi = [
  { id: 1, tarih: '30.01.2026', saat: '10:00', muteahhit: 'ABC İnşaat Ltd.', yer: 'Enstitü Toplantı Odası 1', durum: 'Onaylandı', tip: 'Yüz yüze görüşme' },
  { id: 2, tarih: '02.02.2026', saat: '14:30', muteahhit: 'XYZ Yapı A.Ş.', yer: 'Online - Zoom', durum: 'Bekliyor', tip: 'Online görüşme' },
];

// Müteahhit projeleri
const muteahhitProjeleri = [
  { id: 1, ad: 'Kartal Residence', konum: 'Kartal, İstanbul', durum: 'Tamamlandı', yil: 2024, daireSayisi: 48, puan: 4.8 },
  { id: 2, ad: 'Pendik Tower', konum: 'Pendik, İstanbul', durum: 'Tamamlandı', yil: 2023, daireSayisi: 72, puan: 4.6 },
  { id: 3, ad: 'Maltepe Park', konum: 'Maltepe, İstanbul', durum: 'Devam Ediyor', yil: 2025, daireSayisi: 36, puan: null },
];

// İkonlar (basit SVG)
const Icons = {
  home: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>,
  users: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/></svg>,
  doc: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"/></svg>,
  chat: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" clipRule="evenodd"/></svg>,
  calendar: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z" clipRule="evenodd"/></svg>,
  alert: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>,
  check: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>,
  money: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"/></svg>,
  building: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/></svg>,
  search: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/></svg>,
  settings: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>,
  logout: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd"/></svg>,
  map: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/></svg>,
  close: <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>,
  info: <svg width="16" height="16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/></svg>,
};

// ===== TOOLTIP BİLEŞENİ =====
const Tooltip = ({ children, text, position = 'top', fullWidth = false }) => {
  const [show, setShow] = useState(false);
  
  const positions = {
    top: { bottom: '100%', left: '50%', transform: 'translateX(-50%)', marginBottom: 8 },
    bottom: { top: '100%', left: '50%', transform: 'translateX(-50%)', marginTop: 8 },
    left: { right: '100%', top: '50%', transform: 'translateY(-50%)', marginRight: 8 },
    right: { left: '100%', top: '50%', transform: 'translateY(-50%)', marginLeft: 8 },
  };
  
  return (
    <div 
      style={{ position: 'relative', display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : 'auto' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && text && (
        <div style={{
          position: 'absolute',
          ...positions[position],
          background: colors.primary,
          color: '#fff',
          padding: '8px 12px',
          borderRadius: 6,
          fontSize: 12,
          whiteSpace: 'nowrap',
          maxWidth: 300,
          zIndex: 1000,
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
          lineHeight: 1.4
        }}>
          {text}
          <div style={{
            position: 'absolute',
            width: 0,
            height: 0,
            borderLeft: '6px solid transparent',
            borderRight: '6px solid transparent',
            borderTop: position === 'top' ? `6px solid ${colors.primary}` : 'none',
            borderBottom: position === 'bottom' ? `6px solid ${colors.primary}` : 'none',
            ...(position === 'top' ? { top: '100%', left: '50%', transform: 'translateX(-50%)' } : {}),
            ...(position === 'bottom' ? { bottom: '100%', left: '50%', transform: 'translateX(-50%)' } : {}),
          }} />
        </div>
      )}
    </div>
  );
};

// ===== MODAL BİLEŞENİ =====
const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;
  
  const sizes = {
    sm: 400,
    md: 600,
    lg: 800,
    xl: 1000
  };
  
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: 20
    }} onClick={onClose}>
      <div style={{
        background: '#fff',
        borderRadius: 12,
        width: '100%',
        maxWidth: sizes[size],
        maxHeight: '90vh',
        overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }} onClick={e => e.stopPropagation()}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '16px 24px',
          borderBottom: '1px solid ' + colors.border,
          background: colors.primary
        }}>
          <h2 style={{ margin: 0, fontSize: 18, color: '#fff' }}>{title}</h2>
          <button 
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              borderRadius: 6,
              padding: 6,
              cursor: 'pointer',
              display: 'flex',
              color: '#fff'
            }}
          >
            {Icons.close}
          </button>
        </div>
        <div style={{ padding: 24, overflowY: 'auto', maxHeight: 'calc(90vh - 60px)' }}>
          {children}
        </div>
      </div>
    </div>
  );
};

// ===== INFO CARD WITH TOOLTIP =====
// eslint-disable-next-line no-unused-vars
const InfoCard = ({ children, tooltip, style }) => (
  <Tooltip text={tooltip} position="top">
    <div style={{
      background: colors.card,
      borderRadius: 8,
      padding: 20,
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      cursor: tooltip ? 'help' : 'default',
      border: tooltip ? '1px dashed transparent' : 'none',
      transition: 'border-color 0.2s',
      ...style
    }}>
      {children}
    </div>
  </Tooltip>
);

// Sidebar Bileşeni
const Sidebar = ({ userType, activeMenu, setActiveMenu, menuItems }) => (
  <div style={{
    width: 240,
    background: colors.primary,
    minHeight: '100vh',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column'
  }}>
    <div style={{ padding: '0 20px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
      <h2 style={{ color: '#fff', fontSize: 16, margin: 0 }}>Kentsel Dönüşüm</h2>
      <p style={{ color: colors.secondary, fontSize: 12, margin: '4px 0 0' }}>{userType}</p>
    </div>
    <nav style={{ flex: 1, padding: '20px 0' }}>
      {menuItems.map(item => (
        <Tooltip key={item.id} text={item.tooltip} position="right">
          <div
            onClick={() => setActiveMenu(item.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 20px',
              color: activeMenu === item.id ? '#fff' : 'rgba(255,255,255,0.6)',
              background: activeMenu === item.id ? 'rgba(49,130,206,0.3)' : 'transparent',
              cursor: 'pointer',
              borderLeft: activeMenu === item.id ? '3px solid ' + colors.secondary : '3px solid transparent',
              fontSize: 14
            }}
          >
            {item.icon}
            {item.label}
          </div>
        </Tooltip>
      ))}
    </nav>
    <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.6)', fontSize: 14, cursor: 'pointer' }}>
        {Icons.logout}
        Çıkış Yap
      </div>
    </div>
  </div>
);

// Header Bileşeni
const Header = ({ title, subtitle }) => (
  <div style={{ marginBottom: 24 }}>
    <h1 style={{ fontSize: 24, fontWeight: 700, color: colors.primary, margin: 0 }}>{title}</h1>
    {subtitle && <p style={{ color: colors.muted, margin: '4px 0 0', fontSize: 14 }}>{subtitle}</p>}
  </div>
);

// Kart Bileşeni
const Card = ({ children, style }) => (
  <div style={{
    background: colors.card,
    borderRadius: 8,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    ...style
  }}>
    {children}
  </div>
);

// Stat Kartı
const StatCard = ({ icon, label, value, color }) => (
  <Card style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
    <div style={{
      width: 48,
      height: 48,
      borderRadius: 8,
      background: color + '20',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: color
    }}>
      {icon}
    </div>
    <div>
      <p style={{ color: colors.muted, fontSize: 12, margin: 0 }}>{label}</p>
      <p style={{ fontSize: 24, fontWeight: 700, color: colors.text, margin: '4px 0 0' }}>{value}</p>
    </div>
  </Card>
);

// Badge
const Badge = ({ children, color }) => (
  <span style={{
    display: 'inline-block',
    padding: '4px 8px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600,
    background: color + '20',
    color: color
  }}>
    {children}
  </span>
);

// Button
const Button = ({ children, variant = 'primary', size = 'md', onClick, style }) => {
  const variants = {
    primary: { background: colors.secondary, color: '#fff' },
    success: { background: colors.success, color: '#fff' },
    danger: { background: colors.danger, color: '#fff' },
    outline: { background: 'transparent', color: colors.secondary, border: '1px solid ' + colors.secondary }
  };
  const sizes = {
    sm: { padding: '6px 12px', fontSize: 12 },
    md: { padding: '10px 16px', fontSize: 14 },
    lg: { padding: '12px 24px', fontSize: 16 }
  };
  return (
    <button
      onClick={onClick}
      style={{
        ...variants[variant],
        ...sizes[size],
        borderRadius: 6,
        border: variant === 'outline' ? '1px solid ' + colors.secondary : 'none',
        cursor: 'pointer',
        fontWeight: 500,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        ...style
      }}
    >
      {children}
    </button>
  );
};

// Tablo
const Table = ({ columns, data }) => (
  <div style={{ overflowX: 'auto' }}>
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr style={{ borderBottom: '2px solid ' + colors.border }}>
          {columns.map(col => (
            <th key={col.key} style={{ padding: '12px 16px', textAlign: 'left', fontSize: 12, color: colors.muted, fontWeight: 600 }}>
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} style={{ borderBottom: '1px solid ' + colors.border }}>
            {columns.map(col => (
              <td key={col.key} style={{ padding: '12px 16px', fontSize: 14, color: colors.text }}>
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// ===== ENSTİTÜ PANELİ =====
const EnstituPanel = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);
  
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };
  
  const menuItems = [
    { id: 'dashboard', label: 'Gösterge Paneli', icon: Icons.home, tooltip: 'Sistem genelindeki istatistikleri ve özet bilgileri görüntüleyin' },
    { id: 'muteahhitler', label: 'Müteahhitler', icon: Icons.building, tooltip: 'Kayıtlı müteahhitleri yönetin, başvuruları onaylayın veya reddedin' },
    { id: 'mulksahipleri', label: 'Mülk Sahipleri', icon: Icons.users, tooltip: 'Mülk sahiplerinin kayıtlarını ve belgelerini yönetin' },
    { id: 'eslesme', label: 'Eşleşmeler', icon: Icons.check, tooltip: 'Mülk sahibi-müteahhit eşleşmelerini ve mutabakat oranlarını takip edin' },
    { id: 'randevular', label: 'Randevular', icon: Icons.calendar, tooltip: 'Fiziksel görüşme randevularını planlayın ve yönetin' },
    { id: 'sikayetler', label: 'Şikayetler', icon: Icons.alert, tooltip: 'Kullanıcı şikayetlerini inceleyin ve çözümleyin' },
    { id: 'odemeler', label: 'Ödemeler', icon: Icons.money, tooltip: 'Platform ödemelerini ve finansal işlemleri takip edin' },
    { id: 'ayarlar', label: 'Ayarlar', icon: Icons.settings, tooltip: 'Platform yapılandırması ve sistem ayarları' },
  ];

  // Müteahhit Detay Modal İçeriği
  const MuteahhitDetayModal = ({ firma }) => (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div>
          <h4 style={{ color: colors.primary, margin: '0 0 16px' }}>Firma Bilgileri</h4>
          {[
            { label: 'Firma Adı', value: firma.firma },
            { label: 'Yetkili', value: firma.yetkili },
            { label: 'Vergi No', value: '1234567890' },
            { label: 'Telefon', value: '0212 XXX XX XX' },
            { label: 'E-posta', value: 'info@firma.com' },
          ].map((item, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>{item.label}</p>
              <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: '2px 0 0' }}>{item.value}</p>
            </div>
          ))}
        </div>
        <div>
          <h4 style={{ color: colors.primary, margin: '0 0 16px' }}>Başvuru Durumu</h4>
          <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
            <Badge color={firma.durum === 'Onaylı' ? colors.success : firma.durum === 'Bekliyor' ? colors.accent : colors.danger}>{firma.durum}</Badge>
            <p style={{ fontSize: 13, color: colors.muted, margin: '12px 0 0' }}>Başvuru Tarihi: 15.01.2026</p>
            <p style={{ fontSize: 13, color: colors.muted, margin: '4px 0 0' }}>Çalışma Bölgesi: {firma.bolge}</p>
          </div>
          <h4 style={{ color: colors.primary, margin: '20px 0 12px' }}>Belgeler</h4>
          {['Ticaret Sicil', 'Vergi Levhası', 'İmza Sirküleri', 'Referans Listesi'].map((belge, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid ' + colors.border }}>
              <span style={{ fontSize: 13 }}>{belge}</span>
              <Badge color={colors.success}>✓ Yüklendi</Badge>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid ' + colors.border }}>
        {firma.durum === 'Bekliyor' && (
          <>
            <Button variant="success" onClick={() => setModalOpen(false)}>Onayla</Button>
            <Button variant="danger" onClick={() => setModalOpen(false)}>Reddet</Button>
          </>
        )}
        <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
      </div>
    </div>
  );

  // Şikayet Detay Modal İçeriği
  // eslint-disable-next-line no-unused-vars
  const SikayetDetayModal = ({ sikayet }) => (
    <div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <div>
          <h4 style={{ color: colors.primary, margin: '0 0 16px' }}>Şikayet Bilgileri</h4>
          <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
            <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Şikayet No</p>
            <p style={{ fontSize: 16, fontWeight: 600, color: colors.text, margin: '4px 0 16px' }}>{sikayet.no}</p>
            <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Konu</p>
            <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: '4px 0 16px' }}>{sikayet.konu}</p>
            <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Tarih</p>
            <p style={{ fontSize: 14, color: colors.text, margin: '4px 0 0' }}>{sikayet.tarih}</p>
          </div>
        </div>
        <div>
          <h4 style={{ color: colors.primary, margin: '0 0 16px' }}>Taraflar</h4>
          <div style={{ padding: 16, background: colors.success + '10', borderRadius: 8, marginBottom: 12 }}>
            <p style={{ fontSize: 12, color: colors.success, margin: 0, fontWeight: 600 }}>Şikayet Eden</p>
            <p style={{ fontSize: 14, color: colors.text, margin: '4px 0 0' }}>{sikayet.sikayet}</p>
          </div>
          <div style={{ padding: 16, background: colors.danger + '10', borderRadius: 8 }}>
            <p style={{ fontSize: 12, color: colors.danger, margin: 0, fontWeight: 600 }}>Şikayet Edilen</p>
            <p style={{ fontSize: 14, color: colors.text, margin: '4px 0 0' }}>{sikayet.sikayetEdilen}</p>
          </div>
        </div>
      </div>
      <div style={{ marginBottom: 24 }}>
        <h4 style={{ color: colors.primary, margin: '0 0 12px' }}>Şikayet Detayı</h4>
        <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
          <p style={{ fontSize: 14, color: colors.text, margin: 0, lineHeight: 1.6 }}>
            Müteahhit firma ile yapılan sözleşmede belirtilen teslim tarihine uyulmamıştır. 
            Proje 3 ay gecikmiş olup, hala tamamlanmamıştır. Mülk sahibi mağdur durumda olup, 
            tazminat talep etmektedir.
          </p>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', paddingTop: 16, borderTop: '1px solid ' + colors.border }}>
        <Button variant="success" onClick={() => setModalOpen(false)}>Çözüldü Olarak İşaretle</Button>
        <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <>
            <Header title="Gösterge Paneli" subtitle="Sistem özeti ve son işlemler" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Platformda kayıtlı ve onaylanmış müteahhit sayısı">
                <StatCard icon={Icons.building} label="Onaylı Müteahhit" value="47" color={colors.secondary} />
              </Tooltip>
              <Tooltip text="Mülkünü dönüşüme açmış aktif kullanıcı sayısı">
                <StatCard icon={Icons.users} label="Aktif Mülk Sahibi" value="124" color={colors.success} />
              </Tooltip>
              <Tooltip text="Henüz sözleşmeye dönüşmemiş eşleşme sayısı">
                <StatCard icon={Icons.check} label="Bekleyen Eşleşme" value="18" color={colors.accent} />
              </Tooltip>
              <Tooltip text="Çözüm bekleyen şikayet sayısı - Acil ilgi gerektirir">
                <StatCard icon={Icons.alert} label="Açık Şikayet" value="3" color={colors.danger} />
              </Tooltip>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
              <Tooltip text="Son 7 gün içinde gelen müteahhit ve mülk sahibi başvuruları" position="bottom" fullWidth>
                <Card>
                  <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Son Başvurular</h3>
                  <Table
                    columns={[
                      { key: 'tip', label: 'Tip' },
                      { key: 'ad', label: 'Ad Soyad / Firma' },
                      { key: 'bolge', label: 'Bölge' },
                      { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Bekliyor' ? colors.accent : colors.success}>{v}</Badge> },
                    ]}
                    data={[
                      { tip: 'Müteahhit', ad: 'ABC İnşaat Ltd.', bolge: 'İstanbul', durum: 'Bekliyor' },
                      { tip: 'Mülk Sahibi', ad: 'Ahmet Yılmaz', bolge: 'Bursa', durum: 'Onaylandı' },
                      { tip: 'Müteahhit', ad: 'XYZ Yapı A.Ş.', bolge: 'Kocaeli', durum: 'Bekliyor' },
                    ]}
                  />
                </Card>
              </Tooltip>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Bugünkü Randevular</h3>
                {[
                  { saat: '10:00', taraflar: 'Mehmet Demir - Yapı A.Ş.' },
                  { saat: '14:30', taraflar: 'Ayşe Kaya - İnşaat Ltd.' },
                  { saat: '16:00', taraflar: 'Ali Öz - ABC Yapı' },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '12px 0', borderBottom: i < 2 ? '1px solid ' + colors.border : 'none' }}>
                    <div style={{ background: colors.secondary + '20', color: colors.secondary, padding: '4px 8px', borderRadius: 4, fontSize: 12, fontWeight: 600 }}>{r.saat}</div>
                    <span style={{ fontSize: 14, color: colors.text }}>{r.taraflar}</span>
                  </div>
                ))}
              </Card>
            </div>
          </>
        );
      
      case 'muteahhitler':
        const muteahhitData = [
          { firma: 'ABC İnşaat Ltd.', yetkili: 'Mehmet Demir', bolge: 'İstanbul - Avrupa', durum: 'Onaylı' },
          { firma: 'XYZ Yapı A.Ş.', yetkili: 'Ali Yıldız', bolge: 'Kocaeli - Gebze', durum: 'Bekliyor' },
          { firma: 'Güven İnşaat', yetkili: 'Hasan Kaya', bolge: 'Bursa - Merkez', durum: 'Onaylı' },
          { firma: 'Yeni Yapı Ltd.', yetkili: 'Can Özdemir', bolge: 'İstanbul - Anadolu', durum: 'Reddedildi' },
        ];
        return (
          <>
            <Header title="Müteahhit Yönetimi" subtitle="Kayıtlı müteahhitler ve başvurular" />
            <Tooltip text="Müteahhit başvurularını bu ekrandan inceleyebilir, onaylayabilir veya reddedebilirsiniz" position="bottom" fullWidth>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <Tooltip text="Firma adı veya yetkili kişiye göre arama yapın">
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input placeholder="Ara..." style={{ padding: '8px 12px', border: '1px solid ' + colors.border, borderRadius: 6, width: 250 }} />
                      <select style={{ padding: '8px 12px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                        <option>Tüm Bölgeler</option>
                        <option>İstanbul</option>
                        <option>Kocaeli</option>
                        <option>Bursa</option>
                      </select>
                    </div>
                  </Tooltip>
                </div>
                <Table
                  columns={[
                    { key: 'firma', label: 'Firma Adı' },
                    { key: 'yetkili', label: 'Yetkili' },
                    { key: 'bolge', label: 'Çalışma Bölgesi' },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Onaylı' ? colors.success : v === 'Bekliyor' ? colors.accent : colors.danger}>{v}</Badge> },
                    { key: 'islem', label: 'İşlem', render: (v, row) => (
                      <Tooltip text="Firma detaylarını görüntüle, belgelerini incele ve başvuruyu onayla/reddet">
                        <Button size="sm" variant="outline" onClick={() => openModal('Müteahhit Detayı - ' + row.firma, <MuteahhitDetayModal firma={row} />)}>İncele</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={muteahhitData}
                />
              </Card>
            </Tooltip>
          </>
        );
        
      case 'mulksahipleri':
        return (
          <>
            <Header title="Mülk Sahibi Yönetimi" subtitle="Kayıtlı mülk sahipleri ve başvurular" />
            <Tooltip text="Mülk sahiplerinin kayıtlarını, belgelerini ve mülk durumlarını bu ekrandan yönetebilirsiniz" position="bottom" fullWidth>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <Tooltip text="İsim veya konuma göre filtreleme yapın">
                    <div style={{ display: 'flex', gap: 8 }}>
                      <input placeholder="Ara..." style={{ padding: '8px 12px', border: '1px solid ' + colors.border, borderRadius: 6, width: 250 }} />
                      <select style={{ padding: '8px 12px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                        <option>Tüm Durumlar</option>
                        <option>Tapu Bekleniyor</option>
                        <option>İmar Hazırlanıyor</option>
                        <option>Aktif</option>
                      </select>
                    </div>
                  </Tooltip>
                </div>
                <Table
                  columns={[
                    { key: 'ad', label: 'Ad Soyad' },
                    { key: 'konum', label: 'Mülk Konumu' },
                    { key: 'tip', label: 'Mülk Tipi' },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Aktif' ? colors.success : colors.accent}>{v}</Badge> },
                    { key: 'islem', label: 'İşlem', render: (v, row) => (
                      <Tooltip text="Mülk sahibinin detaylarını, tapu bilgilerini ve belgelerini görüntüle">
                        <Button size="sm" variant="outline" onClick={() => openModal('Mülk Sahibi Detayı - ' + row.ad, 
                          <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
                              <div>
                                <h4 style={{ color: colors.primary, margin: '0 0 16px' }}>Kişisel Bilgiler</h4>
                                {[
                                  { label: 'Ad Soyad', value: row.ad },
                                  { label: 'TC Kimlik No', value: '12345678901' },
                                  { label: 'Telefon', value: '0532 XXX XX XX' },
                                  { label: 'E-posta', value: 'ahmet@email.com' },
                                ].map((item, i) => (
                                  <div key={i} style={{ marginBottom: 12 }}>
                                    <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>{item.label}</p>
                                    <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: '2px 0 0' }}>{item.value}</p>
                                  </div>
                                ))}
                              </div>
                              <div>
                                <h4 style={{ color: colors.primary, margin: '0 0 16px' }}>Mülk Bilgileri</h4>
                                {[
                                  { label: 'Konum', value: row.konum },
                                  { label: 'Mülk Tipi', value: row.tip },
                                  { label: 'Ada/Parsel', value: '1234/56' },
                                  { label: 'Durum', value: row.durum },
                                ].map((item, i) => (
                                  <div key={i} style={{ marginBottom: 12 }}>
                                    <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>{item.label}</p>
                                    <p style={{ fontSize: 14, fontWeight: 500, color: colors.text, margin: '2px 0 0' }}>{item.value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>İncele</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={[
                    { ad: 'Ahmet Yılmaz', konum: 'İstanbul - Kadıköy', tip: 'Bina', durum: 'Aktif' },
                    { ad: 'Ayşe Kaya', konum: 'Bursa - Nilüfer', tip: 'Arsa', durum: 'İmar Hazırlanıyor' },
                    { ad: 'Mehmet Öz', konum: 'Kocaeli - Gebze', tip: 'Bina', durum: 'Tapu Bekleniyor' },
                  ]}
                />
              </Card>
            </Tooltip>
          </>
        );
        
      case 'randevular':
        return (
          <>
            <Header title="Randevu Yönetimi" subtitle="Fiziksel buluşma randevuları" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Bekleyen Talepler</h3>
                {[
                  { tarih: '28 Ocak 2026', mulk: 'Ahmet Yılmaz', muteahhit: 'ABC İnşaat' },
                  { tarih: '29 Ocak 2026', mulk: 'Fatma Demir', muteahhit: 'XYZ Yapı' },
                ].map((r, i) => (
                  <div key={i} style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontWeight: 600, color: colors.text }}>{r.tarih}</span>
                      <Badge color={colors.accent}>Bekliyor</Badge>
                    </div>
                    <p style={{ fontSize: 14, color: colors.muted, margin: '0 0 12px' }}>{r.mulk} ↔ {r.muteahhit}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button size="sm" variant="success">Onayla</Button>
                      <Tooltip text="Randevu tarihini değiştir">
                        <Button size="sm" variant="outline">Tarih Değiştir</Button>
                      </Tooltip>
                    </div>
                  </div>
                ))}
              </Card>
              <Tooltip text="Onaylanmış ve planlanmış randevuları görüntüleyin" fullWidth>
                <Card>
                  <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Onaylanan Randevular</h3>
                  {[
                    { tarih: '28 Ocak 10:00', mulk: 'Mehmet Demir', muteahhit: 'Yapı A.Ş.', yer: 'Enstitü Toplantı Odası 1' },
                    { tarih: '28 Ocak 14:30', mulk: 'Ayşe Kaya', muteahhit: 'İnşaat Ltd.', yer: 'Enstitü Toplantı Odası 2' },
                  ].map((r, i) => (
                    <div key={i} style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 12 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <span style={{ fontWeight: 600, color: colors.text }}>{r.tarih}</span>
                        <Badge color={colors.success}>Onaylandı</Badge>
                      </div>
                      <p style={{ fontSize: 14, color: colors.muted, margin: 0 }}>{r.mulk} ↔ {r.muteahhit}</p>
                      <p style={{ fontSize: 12, color: colors.secondary, margin: '4px 0 0' }}>{r.yer}</p>
                    </div>
                  ))}
                </Card>
              </Tooltip>
            </div>
          </>
        );
        
      case 'sikayetler':
        const sikayetlerData = [
          { no: 'SK-001', sikayet: 'Ahmet Yılmaz', sikayetEdilen: 'ABC İnşaat', konu: 'Teslim gecikmesi', tarih: '25.01.2026', durum: 'Açık', aciklama: 'Sözleşmede belirtilen teslim tarihi 3 ay geçilmiş olmasına rağmen inşaat tamamlanmamıştır.', telefon: '0532 111 2233' },
          { no: 'SK-002', sikayet: 'XYZ Yapı', sikayetEdilen: 'Mehmet Kaya', konu: 'Ödeme sorunu', tarih: '22.01.2026', durum: 'İnceleniyor', aciklama: 'Mülk sahibi taksit ödemelerinde 2 aydır gecikme yaşamaktadır.', telefon: '0533 222 3344' },
          { no: 'SK-003', sikayet: 'Fatma Demir', sikayetEdilen: 'Güven İnşaat', konu: 'Sözleşme ihlali', tarih: '15.01.2026', durum: 'Çözüldü', aciklama: 'Sözleşmede belirtilen malzeme kalitesi sağlanmamıştır. Arabuluculuk ile çözüme kavuşturuldu.', telefon: '0534 333 4455' },
        ];
        return (
          <>
            <Header title="Şikayet Yönetimi" subtitle="Anlaşma sonrası şikayet ve uyuşmazlıklar" />
            <Tooltip text="Müteahhit ve mülk sahipleri arasındaki anlaşmazlıkları buradan yönetebilirsiniz" fullWidth>
              <Card>
                <Table
                  columns={[
                    { key: 'no', label: 'Şikayet No' },
                    { key: 'sikayet', label: 'Şikayet Eden' },
                    { key: 'sikayetEdilen', label: 'Şikayet Edilen' },
                    { key: 'konu', label: 'Konu' },
                    { key: 'tarih', label: 'Tarih' },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Açık' ? colors.danger : v === 'İnceleniyor' ? colors.accent : colors.success}>{v}</Badge> },
                    { key: 'islem', label: '', render: (v, row) => (
                      <Tooltip text="Şikayet detaylarını görüntüle ve işlem yap">
                        <Button size="sm" variant="outline" onClick={() => openModal(
                          'Şikayet Detayı - ' + row.no,
                          <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Şikayet Eden</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.sikayet}</p>
                                <p style={{ fontSize: 12, color: colors.secondary, margin: 0 }}>{row.telefon}</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Şikayet Edilen</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.sikayetEdilen}</p>
                              </div>
                            </div>
                            <div style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 20 }}>
                              <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Şikayet Konusu</p>
                              <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.konu}</p>
                              <p style={{ fontSize: 13, color: colors.muted, margin: '8px 0 0', lineHeight: 1.5 }}>{row.aciklama}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                              <div>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Şikayet Tarihi</p>
                                <p style={{ fontWeight: 500, color: colors.text, margin: '4px 0' }}>{row.tarih}</p>
                              </div>
                              <Badge color={row.durum === 'Açık' ? colors.danger : row.durum === 'İnceleniyor' ? colors.accent : colors.success}>{row.durum}</Badge>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              {row.durum !== 'Çözüldü' && <Button variant="success">Çözüldü Olarak İşaretle</Button>}
                              {row.durum === 'Açık' && <Button variant="primary">İncelemeye Al</Button>}
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>Detay</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={sikayetlerData}
                />
              </Card>
            </Tooltip>
          </>
        );
        
      case 'eslesme':
        const eslesmeData = [
          { mulk: 'Ahmet Yılmaz - Kadıköy Apt.', muteahhit: 'ABC İnşaat Ltd.', daireSayisi: 10, mutabakatOrani: 80, teklifOrani: '%45', durum: 'Görüşmede' },
          { mulk: 'Mehmet Kaya - Beşiktaş Apt.', muteahhit: 'XYZ Yapı A.Ş.', daireSayisi: 8, mutabakatOrani: 100, teklifOrani: '%48', durum: 'Sözleşme Hazır' },
          { mulk: 'Fatma Demir - Şişli Apt.', muteahhit: 'Güven İnşaat', daireSayisi: 12, mutabakatOrani: 66, teklifOrani: '%42', durum: 'Görüşmede' },
          { mulk: 'Ali Öz - Bakırköy Apt.', muteahhit: 'Yeni Yapı Ltd.', daireSayisi: 6, mutabakatOrani: 50, teklifOrani: '%50', durum: 'Beklemede' },
        ];
        return (
          <>
            <Header title="Eşleşme Yönetimi" subtitle="Mülk sahibi - müteahhit eşleşmeleri ve mutabakat oranları" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Şu anda aktif olarak devam eden mülk sahibi-müteahhit eşleşmeleri">
                <StatCard icon={Icons.check} label="Aktif Eşleşme" value="23" color={colors.success} />
              </Tooltip>
              <Tooltip text="Tarafların görüşme sürecinde olduğu eşleşmeler">
                <StatCard icon={Icons.calendar} label="Görüşme Aşamasında" value="12" color={colors.accent} />
              </Tooltip>
              <Tooltip text="Mutabakat sağlanmış, sözleşme imzası bekleyen eşleşmeler">
                <StatCard icon={Icons.doc} label="Sözleşme Bekleyen" value="5" color={colors.secondary} />
              </Tooltip>
            </div>
            <Tooltip text="Tüm aktif eşleşmeleri ve daire bazlı mutabakat durumlarını görüntüleyin" fullWidth>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Aktif Eşleşmeler ve Mutabakat Durumları</h3>
                <Table
                  columns={[
                    { key: 'mulk', label: 'Mülk Sahibi / Bina' },
                    { key: 'muteahhit', label: 'Müteahhit' },
                    { key: 'daireSayisi', label: 'Toplam Daire' },
                    { key: 'mutabakatOrani', label: 'Mutabakat Oranı', render: (v) => (
                      <Tooltip text={`${v >= 66.67 ? 'Yasal eşik sağlandı' : 'Yasal eşik: %66.67 (2/3)'}`}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 100, height: 8, background: colors.border, borderRadius: 4, overflow: 'hidden' }}>
                            <div style={{ width: v + '%', height: '100%', background: v >= 80 ? colors.success : v >= 60 ? colors.accent : colors.danger, borderRadius: 4 }}></div>
                          </div>
                          <span style={{ fontWeight: 600, color: v >= 80 ? colors.success : v >= 60 ? colors.accent : colors.danger }}>{v}%</span>
                        </div>
                      </Tooltip>
                    )},
                    { key: 'teklifOrani', label: 'Teklif Oranı' },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Sözleşme Hazır' ? colors.success : v === 'Görüşmede' ? colors.accent : colors.secondary}>{v}</Badge> },
                    { key: 'islem', label: '', render: (v, row) => (
                      <Tooltip text="Eşleşme detayını ve daire bazlı durumu görüntüle">
                        <Button size="sm" variant="outline" onClick={() => openModal(
                          'Eşleşme Detayı - ' + row.mulk.split(' - ')[1],
                          <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Mülk Sahibi / Bina</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.mulk}</p>
                                <p style={{ fontSize: 13, color: colors.secondary, margin: 0 }}>{row.daireSayisi} Daire</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Müteahhit</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.muteahhit}</p>
                                <p style={{ fontSize: 13, color: colors.secondary, margin: 0 }}>Teklif: {row.teklifOrani}</p>
                              </div>
                            </div>
                            <div style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 20 }}>
                              <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Mutabakat Durumu</p>
                              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
                                <div style={{ flex: 1, height: 12, background: colors.border, borderRadius: 6, overflow: 'hidden' }}>
                                  <div style={{ width: row.mutabakatOrani + '%', height: '100%', background: row.mutabakatOrani >= 80 ? colors.success : row.mutabakatOrani >= 60 ? colors.accent : colors.danger, borderRadius: 6 }}></div>
                                </div>
                                <span style={{ fontSize: 18, fontWeight: 700, color: row.mutabakatOrani >= 80 ? colors.success : row.mutabakatOrani >= 60 ? colors.accent : colors.danger }}>{row.mutabakatOrani}%</span>
                              </div>
                              <p style={{ fontSize: 12, color: colors.muted, margin: '8px 0 0' }}>
                                {row.mutabakatOrani >= 66.67 ? '✓ Yasal eşik (2/3) sağlandı' : '⚠ Yasal eşik için %66.67 gerekli'}
                              </p>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              <Badge color={row.durum === 'Sözleşme Hazır' ? colors.success : row.durum === 'Görüşmede' ? colors.accent : colors.secondary}>{row.durum}</Badge>
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>Detay</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={eslesmeData}
                />
              </Card>
            </Tooltip>
            
            {/* Detaylı Apartman Görünümü */}
            <Tooltip text="Seçili apartmanın daire bazlı mutabakat durumunu görsel olarak takip edin">
              <Card style={{ marginTop: 24 }}>
                <h3 style={{ fontSize: 16, margin: '0 0 8px', color: colors.primary }}>Kadıköy Apartmanı - Daire Bazlı Mutabakat Detayı</h3>
                <p style={{ color: colors.muted, fontSize: 13, margin: '0 0 16px' }}>Toplam 10 Daire • 8 Olumlu • 1 Olumsuz • 1 Bekliyor</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                  {apartmanVerisi.daireler.map((daire, i) => (
                    <Tooltip key={i} text={`${daire.sahip} - ${daire.mutabakat === true ? 'Dönüşümü onayladı' : daire.mutabakat === false ? 'Dönüşümü reddetti' : 'Henüz karar vermedi'}`}>
                      <div style={{
                        padding: 16,
                        background: daire.mutabakat === true ? colors.success + '15' : daire.mutabakat === false ? colors.danger + '15' : colors.accent + '15',
                        borderRadius: 8,
                        border: `2px solid ${daire.mutabakat === true ? colors.success : daire.mutabakat === false ? colors.danger : colors.accent}`,
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}>
                        <p style={{ fontSize: 18, fontWeight: 700, color: colors.text, margin: 0 }}>Daire {daire.no}</p>
                        <p style={{ fontSize: 12, color: colors.muted, margin: '4px 0' }}>{daire.kat}</p>
                        <p style={{ fontSize: 13, color: colors.text, margin: '4px 0', fontWeight: 500 }}>{daire.sahip}</p>
                        <Badge color={daire.mutabakat === true ? colors.success : daire.mutabakat === false ? colors.danger : colors.accent}>
                          {daire.mutabakat === true ? '✓ Onay' : daire.mutabakat === false ? '✗ Red' : '⏳ Bekliyor'}
                        </Badge>
                      </div>
                    </Tooltip>
                  ))}
                </div>
                
                <div style={{ marginTop: 20, padding: 16, background: colors.bg, borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, color: colors.text }}>Genel Mutabakat Durumu</p>
                      <p style={{ margin: '4px 0 0', fontSize: 13, color: colors.muted }}>Yasal olarak %66.67 (2/3) mutabakat gerekli</p>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontSize: 28, fontWeight: 700, color: colors.success }}>80%</p>
                      <Badge color={colors.success}>Yeterli Çoğunluk Sağlandı</Badge>
                    </div>
                  </div>
                </div>
              </Card>
            </Tooltip>
          </>
        );
        
      case 'odemeler':
        return (
          <>
            <Header title="Ödeme Yönetimi" subtitle="Platform ödemeleri ve finansal işlemler" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Platformun toplam gelir miktarı (tüm zamanlar)">
                <StatCard icon={Icons.money} label="Toplam Gelir" value="₺2.4M" color={colors.success} />
              </Tooltip>
              <Tooltip text="Başarıyla tahsil edilmiş ödemeler">
                <StatCard icon={Icons.check} label="Tahsil Edilen" value="₺1.8M" color={colors.secondary} />
              </Tooltip>
              <Tooltip text="Henüz ödenmemiş, vadesi gelmemiş tutarlar">
                <StatCard icon={Icons.calendar} label="Bekleyen" value="₺450K" color={colors.accent} />
              </Tooltip>
              <Tooltip text="Vadesi geçmiş tahsil edilmemiş ödemeler - takip gerekli">
                <StatCard icon={Icons.alert} label="Gecikmiş" value="₺150K" color={colors.danger} />
              </Tooltip>
            </div>
            <Tooltip text="Tüm ödeme hareketlerini görüntüleyin ve makbuz oluşturun" fullWidth>
              <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <h3 style={{ fontSize: 16, margin: 0, color: colors.primary }}>Ödeme Hareketleri</h3>
                  <Tooltip text="Tüm ödemeleri Excel formatında indirin">
                    <Button variant="outline" size="sm">Rapor İndir</Button>
                  </Tooltip>
                </div>
                <Table
                  columns={[
                    { key: 'tarih', label: 'Tarih' },
                    { key: 'odeyici', label: 'Ödeme Yapan' },
                    { key: 'tip', label: 'Ödeme Tipi' },
                    { key: 'tutar', label: 'Tutar', render: (v) => <span style={{ fontWeight: 600 }}>₺{v.toLocaleString()}</span> },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Ödendi' ? colors.success : v === 'Bekliyor' ? colors.accent : colors.danger}>{v}</Badge> },
                    { key: 'islem', label: '', render: (v, row) => (
                      <Tooltip text="Ödeme makbuzunu görüntüle ve yazdır">
                        <Button size="sm" variant="outline" onClick={() => openModal(
                          'Ödeme Makbuzu',
                          <div>
                            <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid ' + colors.border }}>
                              <p style={{ fontSize: 20, fontWeight: 700, color: colors.primary, margin: 0 }}>KENTSEL DÖNÜŞÜM PORTALI</p>
                              <p style={{ color: colors.muted, margin: '8px 0 0' }}>Ödeme Makbuzu</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                              <div>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Makbuz No</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>MKB-2026-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                              </div>
                              <div>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Tarih</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.tarih}</p>
                              </div>
                            </div>
                            <div style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 20 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ color: colors.muted }}>Ödeme Yapan</span>
                                <span style={{ fontWeight: 500, color: colors.text }}>{row.odeyici}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ color: colors.muted }}>Ödeme Tipi</span>
                                <span style={{ fontWeight: 500, color: colors.text }}>{row.tip}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px dashed ' + colors.border }}>
                                <span style={{ fontWeight: 600, color: colors.text }}>Tutar</span>
                                <span style={{ fontSize: 18, fontWeight: 700, color: colors.success }}>₺{row.tutar.toLocaleString()}</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              <Button variant="primary">Yazdır</Button>
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>Makbuz</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={[
                    { tarih: '28.01.2026', odeyici: 'ABC İnşaat Ltd.', tip: 'Yıllık Üyelik', tutar: 50000, durum: 'Ödendi' },
                    { tarih: '27.01.2026', odeyici: 'Ahmet Yılmaz', tip: 'Kayıt Ücreti', tutar: 5000, durum: 'Ödendi' },
                    { tarih: '26.01.2026', odeyici: 'XYZ Yapı A.Ş.', tip: 'Teklif Ücreti', tutar: 2500, durum: 'Bekliyor' },
                    { tarih: '25.01.2026', odeyici: 'Güven İnşaat', tip: 'Yıllık Üyelik', tutar: 50000, durum: 'Gecikmiş' },
                    { tarih: '24.01.2026', odeyici: 'Mehmet Kaya', tip: 'İmar Belgesi', tutar: 2500, durum: 'Ödendi' },
                  ]}
                />
              </Card>
            </Tooltip>
          </>
        );
        
      case 'ayarlar':
        return (
          <>
            <Header title="Sistem Ayarları" subtitle="Platform yapılandırması" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 20px', color: colors.primary }}>Genel Ayarlar</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Platform Adı</label>
                    <input defaultValue="Kentsel Dönüşüm Portalı" style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6, fontSize: 14 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>İletişim E-posta</label>
                    <input defaultValue="info@kentseldonusum.gov.tr" style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6, fontSize: 14 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Destek Telefon</label>
                    <input defaultValue="0850 XXX XX XX" style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6, fontSize: 14 }} />
                  </div>
                </div>
              </Card>
              
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 20px', color: colors.primary }}>Ücret Tarifeleri</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: colors.bg, borderRadius: 8 }}>
                    <span style={{ color: colors.text }}>Mülk Sahibi Kayıt Ücreti</span>
                    <input defaultValue="5.000" style={{ width: 100, padding: '8px', border: '1px solid ' + colors.border, borderRadius: 6, textAlign: 'right' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: colors.bg, borderRadius: 8 }}>
                    <span style={{ color: colors.text }}>İmar Belgesi Ücreti</span>
                    <input defaultValue="2.500" style={{ width: 100, padding: '8px', border: '1px solid ' + colors.border, borderRadius: 6, textAlign: 'right' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: colors.bg, borderRadius: 8 }}>
                    <span style={{ color: colors.text }}>Müteahhit Yıllık Üyelik</span>
                    <input defaultValue="50.000" style={{ width: 100, padding: '8px', border: '1px solid ' + colors.border, borderRadius: 6, textAlign: 'right' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', background: colors.bg, borderRadius: 8 }}>
                    <span style={{ color: colors.text }}>Minimum Mutabakat Oranı (%)</span>
                    <input defaultValue="66.67" style={{ width: 100, padding: '8px', border: '1px solid ' + colors.border, borderRadius: 6, textAlign: 'right' }} />
                  </div>
                </div>
              </Card>
              
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 20px', color: colors.primary }}>Bildirim Ayarları</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { label: 'Yeni başvuru bildirimi', checked: true },
                    { label: 'Ödeme hatırlatmaları', checked: true },
                    { label: 'Şikayet bildirimleri', checked: true },
                    { label: 'Randevu hatırlatmaları', checked: true },
                    { label: 'Haftalık özet raporu', checked: false },
                  ].map((item, i) => (
                    <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}>
                      <input type="checkbox" defaultChecked={item.checked} style={{ width: 18, height: 18 }} />
                      <span style={{ color: colors.text }}>{item.label}</span>
                    </label>
                  ))}
                </div>
              </Card>
              
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 20px', color: colors.primary }}>Çalışma Bölgeleri</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['İstanbul', 'Kocaeli', 'Bursa', 'Ankara', 'İzmir', 'Antalya'].map((sehir, i) => (
                    <Badge key={i} color={colors.secondary}>{sehir}</Badge>
                  ))}
                </div>
                <Button variant="outline" size="sm" style={{ marginTop: 16 }}>+ Bölge Ekle</Button>
              </Card>
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
              <Button variant="success">Değişiklikleri Kaydet</Button>
              <Button variant="outline">İptal</Button>
            </div>
          </>
        );
        
      default:
        return <Header title={menuItems.find(m => m.id === activeMenu)?.label} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>
      <Sidebar userType="Enstitü Paneli" activeMenu={activeMenu} setActiveMenu={setActiveMenu} menuItems={menuItems} />
      <div style={{ flex: 1, padding: 24 }}>
        {renderContent()}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

// ===== MÜTEAHHİT PANELİ =====
const MuteahhitPanel = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);
  
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };
  
  const menuItems = [
    { id: 'dashboard', label: 'Gösterge Paneli', icon: Icons.home, tooltip: 'Genel bakış ve özet istatistikler' },
    { id: 'firsatlar', label: 'Mülk Fırsatları', icon: Icons.search, tooltip: 'Bölgenizdeki kentsel dönüşüm fırsatları' },
    { id: 'teklifler', label: 'Tekliflerim', icon: Icons.doc, tooltip: 'Verdiğiniz teklifleri takip edin' },
    { id: 'mesajlar', label: 'Mesajlar', icon: Icons.chat, tooltip: 'Mülk sahipleri ile iletişim' },
    { id: 'randevular', label: 'Randevular', icon: Icons.calendar, tooltip: 'Fiziksel görüşme randevuları' },
    { id: 'profil', label: 'Firma Profili', icon: Icons.building, tooltip: 'Şirket bilgilerinizi düzenleyin' },
    { id: 'odemeler', label: 'Ödemeler', icon: Icons.money, tooltip: 'Platform ödemelerinizi görüntüleyin' },
  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <>
            <Header title="Hoş Geldiniz, ABC İnşaat" subtitle="Çalışma Bölgesi: İstanbul - Avrupa Yakası" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Çalışma bölgenizde kayıtlı ve aktif mülk sayısı">
                <StatCard icon={Icons.search} label="Bölgenizdeki Mülk" value="23" color={colors.secondary} />
              </Tooltip>
              <Tooltip text="Henüz sonuçlanmamış aktif teklif başvurularınız">
                <StatCard icon={Icons.doc} label="Aktif Teklif" value="5" color={colors.accent} />
              </Tooltip>
              <Tooltip text="Mülk sahiplerinden gelen okunmamış mesajlar">
                <StatCard icon={Icons.chat} label="Okunmamış Mesaj" value="3" color={colors.success} />
              </Tooltip>
              <Tooltip text="Önümüzdeki 7 gün içindeki randevularınız">
                <StatCard icon={Icons.calendar} label="Yaklaşan Randevu" value="1" color={colors.primary} />
              </Tooltip>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 16 }}>
              <Tooltip text="Bölgenizde yeni eklenen mülk fırsatları" fullWidth>
                <Card>
                  <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Yeni Mülk Fırsatları</h3>
                  {[
                    { baslik: 'Kadıköy 450m² Arsa', tip: 'Arsa', imar: 'Konut - 5 kat', tarih: '2 saat önce' },
                    { baslik: 'Beşiktaş 3 Katlı Bina', tip: 'Bina', imar: 'Konut - 7 kat', tarih: '1 gün önce' },
                    { baslik: 'Bakırköy 800m² Arsa', tip: 'Arsa', imar: 'Konut+Ticaret - 6 kat', tarih: '2 gün önce' },
                  ].map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid ' + colors.border : 'none' }}>
                      <div>
                        <p style={{ fontWeight: 600, color: colors.text, margin: 0 }}>{m.baslik}</p>
                        <p style={{ fontSize: 12, color: colors.muted, margin: '4px 0 0' }}>{m.tip} • {m.imar}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 12, color: colors.muted, margin: '0 0 8px' }}>{m.tarih}</p>
                        <Tooltip text="Mülk detaylarını görüntüle">
                          <Button size="sm" onClick={() => openModal(
                            m.baslik,
                            <div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                                <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                  <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Mülk Tipi</p>
                                  <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{m.tip}</p>
                                </div>
                                <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                  <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>İmar Durumu</p>
                                  <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{m.imar}</p>
                                </div>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 20 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Ekleme Tarihi</p>
                                <p style={{ fontWeight: 500, color: colors.text, margin: '4px 0' }}>{m.tarih}</p>
                              </div>
                              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                <Button variant="success">Teklif Ver</Button>
                                <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                              </div>
                            </div>
                          )}>İncele</Button>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </Card>
              </Tooltip>
              <Tooltip text="Verdiğiniz tekliflerin mevcut durumları" fullWidth>
                <Card>
                  <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Teklif Durumları</h3>
                  {[
                    { mulk: 'Şişli Arsa', durum: 'İnceleniyor', renk: colors.accent },
                    { mulk: 'Üsküdar Bina', durum: 'Kabul Edildi', renk: colors.success },
                    { mulk: 'Maltepe Arsa', durum: 'Görüşme Talebi', renk: colors.secondary },
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid ' + colors.border : 'none' }}>
                      <span style={{ color: colors.text }}>{t.mulk}</span>
                      <Badge color={t.renk}>{t.durum}</Badge>
                    </div>
                  ))}
                </Card>
              </Tooltip>
            </div>
          </>
        );
        
      case 'firsatlar':
        return (
          <>
            <Header title="Mülk Fırsatları" subtitle="Bölgenizdeki uygun mülkler ve mutabakat oranları" />
            <Card style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <input placeholder="Ara..." style={{ padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6, width: 200 }} />
                <select style={{ padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                  <option>Tüm İlçeler</option>
                  <option>Kadıköy</option>
                  <option>Beşiktaş</option>
                  <option>Şişli</option>
                </select>
                <select style={{ padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                  <option>Mülk Tipi</option>
                  <option>Arsa</option>
                  <option>Apartman</option>
                </select>
                <select style={{ padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                  <option>Mutabakat Durumu</option>
                  <option>%100 Onaylı</option>
                  <option>%67+ (Yeterli)</option>
                  <option>%67 Altı</option>
                </select>
              </div>
            </Card>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {[
                { baslik: 'Kadıköy Caferağa Apt.', tip: 'Apartman', daire: 10, mutabakat: 80, imar: 'Konut - Max 7 kat, Emsal: 2.50', konum: 'Kadıköy, İstanbul', beklenti: 'Kat Karşılığı', alan: '1200 m²' },
                { baslik: 'Beşiktaş 3 Katlı Bina', tip: 'Apartman', daire: 6, mutabakat: 100, imar: 'Konut - Max 7 kat, Emsal: 2.50', konum: 'Beşiktaş, İstanbul', beklenti: 'Kat Karşılığı', alan: '450 m²' },
                { baslik: 'Bakırköy 800m² Arsa', tip: 'Arsa', daire: null, mutabakat: 100, imar: 'Konut+Ticaret - Max 6 kat', konum: 'Bakırköy, İstanbul', beklenti: 'Satış', alan: '800 m²' },
                { baslik: 'Şişli Harbiye Apt.', tip: 'Apartman', daire: 12, mutabakat: 66, imar: 'Konut - Max 8 kat, Emsal: 3.00', konum: 'Şişli, İstanbul', beklenti: 'Kat Karşılığı', alan: '600 m²' },
                { baslik: 'Üsküdar 4 Katlı Bina', tip: 'Apartman', daire: 8, mutabakat: 50, imar: 'Konut - Max 6 kat, Emsal: 2.20', konum: 'Üsküdar, İstanbul', beklenti: 'Kat Karşılığı', alan: '520 m²' },
                { baslik: 'Maltepe Arsa', tip: 'Arsa', daire: null, mutabakat: 100, imar: 'Konut - Max 5 kat, Emsal: 2.00', konum: 'Maltepe, İstanbul', beklenti: 'Kat Karşılığı', alan: '650 m²' },
              ].map((m, i) => (
                <Tooltip key={i} text={m.mutabakat >= 67 ? 'Bu mülk için teklif verebilirsiniz' : 'Yetersiz mutabakat - henüz teklif verilemez'}>
                  <Card style={{ border: m.mutabakat >= 67 ? '2px solid ' + colors.success : '1px solid ' + colors.border }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <Badge color={m.tip === 'Arsa' ? colors.secondary : colors.accent}>{m.tip}</Badge>
                        {m.daire && <Badge color={colors.muted}>{m.daire} Daire</Badge>}
                      </div>
                      <Badge color={colors.success}>{m.beklenti}</Badge>
                    </div>
                    <h4 style={{ fontSize: 16, margin: '0 0 8px', color: colors.primary }}>{m.baslik}</h4>
                    <p style={{ fontSize: 13, color: colors.muted, margin: '0 0 4px' }}><strong>Alan:</strong> {m.alan}</p>
                    <p style={{ fontSize: 13, color: colors.muted, margin: '0 0 4px' }}><strong>İmar:</strong> {m.imar}</p>
                    <p style={{ fontSize: 13, color: colors.muted, margin: '0 0 12px' }}><strong>Konum:</strong> {m.konum}</p>
                    
                    {/* Mutabakat Göstergesi */}
                    {m.tip === 'Apartman' && (
                      <Tooltip text={`${Math.round(m.daire * m.mutabakat / 100)} daire onayladı, ${m.daire - Math.round(m.daire * m.mutabakat / 100)} daire kararını bekliyor veya reddetti`}>
                        <div style={{ background: colors.bg, borderRadius: 8, padding: 12, marginBottom: 16 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                            <span style={{ fontSize: 12, color: colors.muted }}>Daire Mutabakatı</span>
                            <span style={{ fontSize: 14, fontWeight: 700, color: m.mutabakat >= 67 ? colors.success : m.mutabakat >= 50 ? colors.accent : colors.danger }}>{m.mutabakat}%</span>
                          </div>
                          <div style={{ width: '100%', height: 8, background: colors.border, borderRadius: 4, overflow: 'hidden', position: 'relative' }}>
                            <div style={{ position: 'absolute', left: '66.67%', top: 0, bottom: 0, width: 2, background: colors.text, zIndex: 2, opacity: 0.3 }}></div>
                            <div style={{ width: m.mutabakat + '%', height: '100%', background: m.mutabakat >= 67 ? colors.success : m.mutabakat >= 50 ? colors.accent : colors.danger, borderRadius: 4 }}></div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
                            <span style={{ fontSize: 10, color: colors.muted }}>{Math.round(m.daire * m.mutabakat / 100)}/{m.daire} daire onayladı</span>
                            <Badge color={m.mutabakat >= 67 ? colors.success : colors.danger} style={{ fontSize: 9 }}>
                              {m.mutabakat >= 67 ? '✓ Yeterli' : '✗ Yetersiz'}
                            </Badge>
                          </div>
                        </div>
                      </Tooltip>
                    )}
                    
                    {m.tip === 'Arsa' && (
                      <Tooltip text="Tek malik olduğu için doğrudan teklif verebilirsiniz">
                        <div style={{ background: colors.success + '15', borderRadius: 8, padding: 12, marginBottom: 16, textAlign: 'center' }}>
                          <span style={{ color: colors.success, fontWeight: 600 }}>✓ Tek Malik - Mutabakat Gerekmiyor</span>
                        </div>
                      </Tooltip>
                    )}
                    
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Tooltip text={m.mutabakat >= 67 ? 'Mülkün tüm detaylarını görüntüle' : 'Mutabakat oranı yetersiz, teklif verilemez'}>
                        <Button style={{ flex: 1 }} disabled={m.mutabakat < 67} onClick={() => m.mutabakat >= 67 && openModal(
                          m.baslik + ' - Detay',
                          <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Mülk Tipi</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{m.tip}</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Alan</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{m.alan}</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>İmar Durumu</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{m.imar}</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Konum</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{m.konum}</p>
                              </div>
                            </div>
                            <div style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 20 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div>
                                  <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Mutabakat Durumu</p>
                                  <p style={{ fontSize: 24, fontWeight: 700, color: colors.success, margin: '4px 0' }}>{m.mutabakat}%</p>
                                </div>
                                <Badge color={colors.success}>Teklif Verilebilir</Badge>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              <Button variant="success">Teklif Ver</Button>
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>
                          {m.mutabakat >= 67 ? 'Detayları Gör' : 'Mutabakat Yetersiz'}
                        </Button>
                      </Tooltip>
                      {m.mutabakat >= 67 && (
                        <Tooltip text="Bu mülk için kat karşılığı teklifi verin">
                          <Button variant="outline" onClick={() => openModal(
                            'Teklif Ver - ' + m.baslik,
                            <div>
                              <p style={{ color: colors.muted, marginBottom: 20 }}>Bu mülk için kat karşılığı teklifinizi girin.</p>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 20 }}>
                                <div>
                                  <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Mülk Sahibi Payı (%)</label>
                                  <input defaultValue="45" style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }} />
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Tahmini Teslim Süresi</label>
                                  <select style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                                    <option>12 Ay</option>
                                    <option>18 Ay</option>
                                    <option>24 Ay</option>
                                    <option>30 Ay</option>
                                  </select>
                                </div>
                                <div>
                                  <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Açıklama</label>
                                  <textarea rows="3" placeholder="Teklif detaylarınız..." style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6, resize: 'none' }}></textarea>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                <Button variant="success">Teklifi Gönder</Button>
                                <Button variant="outline" onClick={() => setModalOpen(false)}>İptal</Button>
                              </div>
                            </div>
                          )}>Teklif Ver</Button>
                        </Tooltip>
                      )}
                    </div>
                  </Card>
                </Tooltip>
              ))}
            </div>
          </>
        );
        
      case 'teklifler':
        const tekliflerData = [
          { mulk: 'Kadıköy 450m² Arsa', tarih: '25.01.2026', oran: '%45 Mülk Sahibi', sure: '18 ay', durum: 'İnceleniyor', konum: 'Kadıköy, İstanbul' },
          { mulk: 'Üsküdar 2 Katlı Bina', tarih: '20.01.2026', oran: '%50 Mülk Sahibi', sure: '24 ay', durum: 'Kabul', konum: 'Üsküdar, İstanbul' },
          { mulk: 'Şişli Arsa', tarih: '18.01.2026', oran: '%48 Mülk Sahibi', sure: '20 ay', durum: 'Görüşme', konum: 'Şişli, İstanbul' },
          { mulk: 'Maltepe Bina', tarih: '10.01.2026', oran: '%42 Mülk Sahibi', sure: '16 ay', durum: 'Reddedildi', konum: 'Maltepe, İstanbul' },
        ];
        return (
          <>
            <Header title="Tekliflerim" subtitle="Verdiğiniz tekliflerin durumu" />
            <Tooltip text="Tüm teklif başvurularınızı buradan takip edebilirsiniz" fullWidth>
              <Card>
                <Table
                  columns={[
                    { key: 'mulk', label: 'Mülk' },
                    { key: 'tarih', label: 'Teklif Tarihi' },
                    { key: 'oran', label: 'Kat Karşılığı Oranı' },
                    { key: 'sure', label: 'Teslim Süresi' },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'İnceleniyor' ? colors.accent : v === 'Kabul' ? colors.success : v === 'Görüşme' ? colors.secondary : colors.danger}>{v}</Badge> },
                    { key: 'islem', label: '', render: (v, row) => (
                      <Tooltip text="Teklif detaylarını görüntüle">
                        <Button size="sm" variant="outline" onClick={() => openModal(
                          'Teklif Detayı - ' + row.mulk,
                          <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Mülk</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.mulk}</p>
                                <p style={{ fontSize: 12, color: colors.secondary, margin: 0 }}>{row.konum}</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Teklif Tarihi</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.tarih}</p>
                              </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Kat Karşılığı Oranı</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.oran}</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Teslim Süresi</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.sure}</p>
                              </div>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                              <span style={{ color: colors.muted }}>Durum</span>
                              <Badge color={row.durum === 'İnceleniyor' ? colors.accent : row.durum === 'Kabul' ? colors.success : row.durum === 'Görüşme' ? colors.secondary : colors.danger}>{row.durum}</Badge>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              {row.durum === 'Görüşme' && <Button variant="success">Randevu Talebi</Button>}
                              {row.durum === 'İnceleniyor' && <Button variant="primary">Teklifi Güncelle</Button>}
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>Detay</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={tekliflerData}
                />
              </Card>
            </Tooltip>
          </>
        );
        
      case 'mesajlar':
        return (
          <>
            <Header title="Mesajlar" subtitle="Mülk sahipleri ve enstitü ile iletişim" />
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
              <Card style={{ padding: 0 }}>
                <div style={{ padding: '16px', borderBottom: '1px solid ' + colors.border }}>
                  <input placeholder="Mesaj ara..." style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }} />
                </div>
                <div>
                  {[
                    { id: 1, ad: 'Ahmet Yılmaz', son: 'Teklifinizi inceledim...', tarih: '10:30', okunmamis: 2, tip: 'mulk' },
                    { id: 2, ad: 'Enstitü', son: 'Başvurunuz onaylandı.', tarih: 'Dün', okunmamis: 0, tip: 'enstitu' },
                    { id: 3, ad: 'Mehmet Kaya', son: 'Görüşme için uygun...', tarih: '25.01', okunmamis: 1, tip: 'mulk' },
                  ].map((m, i) => (
                    <div key={i} style={{ padding: 16, borderBottom: '1px solid ' + colors.border, cursor: 'pointer', background: i === 0 ? colors.secondary + '10' : 'transparent' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, color: colors.text }}>{m.ad}</span>
                        <span style={{ fontSize: 11, color: colors.muted }}>{m.tarih}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 13, color: colors.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{m.son}</span>
                        {m.okunmamis > 0 && <Badge color={colors.secondary}>{m.okunmamis}</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <div style={{ borderBottom: '1px solid ' + colors.border, paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: 0, color: colors.primary }}>Ahmet Yılmaz</h3>
                      <p style={{ margin: '4px 0 0', fontSize: 13, color: colors.muted }}>Kadıköy Apartmanı - Mülk Sahibi</p>
                    </div>
                    <Badge color={colors.success}>Aktif Görüşme</Badge>
                  </div>
                </div>
                <div style={{ height: 300, overflowY: 'auto', marginBottom: 16 }}>
                  {[
                    { ben: false, mesaj: 'Merhaba, teklifinizi aldım. Detayları görüşebilir miyiz?', saat: '09:15' },
                    { ben: true, mesaj: 'Merhaba Ahmet Bey, tabii ki. Size %45 kat karşılığı oranı sunduk. Bina 7 kat olarak planlanmaktadır.', saat: '09:30' },
                    { ben: false, mesaj: 'Oran biraz düşük gibi görünüyor. %48 mümkün olur mu?', saat: '10:00' },
                    { ben: true, mesaj: 'Değerlendirebiliriz. Yüz yüze görüşme için randevu alabilir miyiz?', saat: '10:15' },
                    { ben: false, mesaj: 'Evet, önümüzdeki hafta müsaitim. Enstitüde buluşabiliriz.', saat: '10:30' },
                  ].map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: m.ben ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                      <div style={{
                        maxWidth: '70%',
                        padding: 12,
                        borderRadius: 12,
                        background: m.ben ? colors.secondary : colors.bg,
                        color: m.ben ? '#fff' : colors.text
                      }}>
                        <p style={{ margin: 0, fontSize: 14 }}>{m.mesaj}</p>
                        <p style={{ margin: '4px 0 0', fontSize: 11, opacity: 0.7 }}>{m.saat}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input placeholder="Mesajınızı yazın..." style={{ flex: 1, padding: '12px 16px', border: '1px solid ' + colors.border, borderRadius: 8 }} />
                  <Button>Gönder</Button>
                </div>
              </Card>
            </div>
          </>
        );
        
      case 'randevular':
        return (
          <>
            <Header title="Randevularım" subtitle="Planlanan görüşmeler" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Yaklaşan Randevular</h3>
                {[
                  { tarih: '30.01.2026', saat: '10:00', mulkSahibi: 'Ahmet Yılmaz', yer: 'Enstitü Toplantı Odası 1', konu: 'Teklif Görüşmesi', durum: 'Onaylandı' },
                  { tarih: '02.02.2026', saat: '14:30', mulkSahibi: 'Mehmet Kaya', yer: 'Online - Zoom', konu: 'Proje Sunumu', durum: 'Bekliyor' },
                ].map((r, i) => (
                  <div key={i} style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <span style={{ fontWeight: 600, color: colors.text }}>{r.tarih}</span>
                        <span style={{ marginLeft: 8, color: colors.secondary, fontWeight: 600 }}>{r.saat}</span>
                      </div>
                      <Badge color={r.durum === 'Onaylandı' ? colors.success : colors.accent}>{r.durum}</Badge>
                    </div>
                    <p style={{ margin: '0 0 4px', color: colors.text }}><strong>Mülk Sahibi:</strong> {r.mulkSahibi}</p>
                    <p style={{ margin: '0 0 4px', fontSize: 13, color: colors.muted }}><strong>Yer:</strong> {r.yer}</p>
                    <p style={{ margin: 0, fontSize: 13, color: colors.muted }}><strong>Konu:</strong> {r.konu}</p>
                  </div>
                ))}
              </Card>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Randevu Geçmişi</h3>
                <Table
                  columns={[
                    { key: 'tarih', label: 'Tarih' },
                    { key: 'mulkSahibi', label: 'Mülk Sahibi' },
                    { key: 'sonuc', label: 'Sonuç', render: (v) => <Badge color={v === 'Başarılı' ? colors.success : v === 'Devam Ediyor' ? colors.accent : colors.muted}>{v}</Badge> },
                  ]}
                  data={[
                    { tarih: '20.01.2026', mulkSahibi: 'Fatma Demir', sonuc: 'Başarılı' },
                    { tarih: '15.01.2026', mulkSahibi: 'Ali Öz', sonuc: 'Devam Ediyor' },
                    { tarih: '10.01.2026', mulkSahibi: 'Can Yılmaz', sonuc: 'Başarılı' },
                  ]}
                />
              </Card>
            </div>
          </>
        );
        
      case 'profil':
        return (
          <>
            <Header title="Firma Profili" subtitle="Şirket bilgileri ve referanslar" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 20px', color: colors.primary }}>Firma Bilgileri</h3>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  {[
                    { label: 'Firma Adı', value: 'ABC İnşaat Ltd. Şti.' },
                    { label: 'Vergi No', value: '1234567890' },
                    { label: 'Kuruluş Yılı', value: '2005' },
                    { label: 'Çalışan Sayısı', value: '150+' },
                    { label: 'Merkez', value: 'İstanbul' },
                    { label: 'Yetkili', value: 'Mehmet Demir' },
                    { label: 'Telefon', value: '0212 XXX XX XX' },
                    { label: 'E-posta', value: 'info@abcinsaat.com' },
                  ].map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: '4px 0 0' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 20 }}>
                  <Button variant="outline">Bilgileri Düzenle</Button>
                </div>
              </Card>
              
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 20px', color: colors.primary }}>Çalışma Bölgeleri</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 16 }}>
                  {['İstanbul - Avrupa', 'İstanbul - Anadolu', 'Kocaeli'].map((bolge, i) => (
                    <Badge key={i} color={colors.secondary}>{bolge}</Badge>
                  ))}
                </div>
                <h3 style={{ fontSize: 16, margin: '20px 0 12px', color: colors.primary }}>Sertifikalar</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {['ISO 9001:2015', 'TSE Yetki Belgesi', 'İş Güvenliği Sertifikası'].map((sert, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ color: colors.success }}>{Icons.check}</span>
                      <span style={{ color: colors.text }}>{sert}</span>
                    </div>
                  ))}
                </div>
              </Card>
              
              <Card style={{ gridColumn: 'span 2' }}>
                <h3 style={{ fontSize: 16, margin: '0 0 20px', color: colors.primary }}>Tamamlanan Projeler</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                  {muteahhitProjeleri.map((proje, i) => (
                    <div key={i} style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                        <h4 style={{ margin: 0, color: colors.primary }}>{proje.ad}</h4>
                        <Badge color={proje.durum === 'Tamamlandı' ? colors.success : colors.accent}>{proje.durum}</Badge>
                      </div>
                      <p style={{ margin: '0 0 4px', fontSize: 13, color: colors.muted }}>{proje.konum}</p>
                      <p style={{ margin: '0 0 4px', fontSize: 13, color: colors.text }}>{proje.daireSayisi} Daire • {proje.yil}</p>
                      {proje.puan && <p style={{ margin: 0, fontSize: 13, color: colors.accent }}>⭐ {proje.puan}</p>}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </>
        );
        
      case 'odemeler':
        const muteahhitOdemeData = [
          { tarih: '01.01.2026', aciklama: 'Yıllık Üyelik - 2026', tutar: 50000, durum: 'Ödendi' },
          { tarih: '15.01.2026', aciklama: 'Teklif Ücreti - Kadıköy Mülk', tutar: 2500, durum: 'Ödendi' },
          { tarih: '20.01.2026', aciklama: 'Teklif Ücreti - Şişli Mülk', tutar: 2500, durum: 'Ödendi' },
          { tarih: '01.02.2026', aciklama: 'Eşleşme Başarı Primi', tutar: 25000, durum: 'Bekliyor' },
        ];
        return (
          <>
            <Header title="Ödemelerim" subtitle="Platform ödemeleri ve faturalar" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Platforma yaptığınız toplam ödemeler">
                <StatCard icon={Icons.money} label="Toplam Ödeme" value="₺75.000" color={colors.secondary} />
              </Tooltip>
              <Tooltip text="Bu yıl içinde yapılan ödemeler">
                <StatCard icon={Icons.check} label="Bu Yıl" value="₺50.000" color={colors.success} />
              </Tooltip>
              <Tooltip text="Bekleyen ödemenizin vadesi">
                <StatCard icon={Icons.calendar} label="Sonraki Ödeme" value="01.02.2026" color={colors.accent} />
              </Tooltip>
            </div>
            <Tooltip text="Tüm ödeme ve fatura geçmişiniz" fullWidth>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Ödeme Geçmişi</h3>
                <Table
                  columns={[
                    { key: 'tarih', label: 'Tarih' },
                    { key: 'aciklama', label: 'Açıklama' },
                    { key: 'tutar', label: 'Tutar', render: (v) => <span style={{ fontWeight: 600 }}>₺{v.toLocaleString()}</span> },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Ödendi' ? colors.success : colors.accent}>{v}</Badge> },
                    { key: 'islem', label: '', render: (v, row) => (
                      <Tooltip text="Fatura detayını görüntüle">
                        <Button size="sm" variant="outline" onClick={() => openModal(
                          'Fatura - ' + row.aciklama,
                          <div>
                            <div style={{ textAlign: 'center', marginBottom: 24, paddingBottom: 16, borderBottom: '2px solid ' + colors.border }}>
                              <p style={{ fontSize: 20, fontWeight: 700, color: colors.primary, margin: 0 }}>ABC İNŞAAT LTD. ŞTİ.</p>
                              <p style={{ color: colors.muted, margin: '8px 0 0' }}>Fatura</p>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                              <div>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Fatura No</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>FTR-2026-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}</p>
                              </div>
                              <div>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Tarih</p>
                                <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{row.tarih}</p>
                              </div>
                            </div>
                            <div style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 20 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ color: colors.muted }}>Açıklama</span>
                                <span style={{ fontWeight: 500, color: colors.text }}>{row.aciklama}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px dashed ' + colors.border }}>
                                <span style={{ fontWeight: 600, color: colors.text }}>Tutar</span>
                                <span style={{ fontSize: 18, fontWeight: 700, color: colors.success }}>₺{row.tutar.toLocaleString()}</span>
                              </div>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              <Button variant="primary">Yazdır</Button>
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>Fatura</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={muteahhitOdemeData}
                />
              </Card>
            </Tooltip>
          </>
        );
        
      default:
        return <Header title={menuItems.find(m => m.id === activeMenu)?.label} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>
      <Sidebar userType="Müteahhit Paneli" activeMenu={activeMenu} setActiveMenu={setActiveMenu} menuItems={menuItems} />
      <div style={{ flex: 1, padding: 24 }}>
        {renderContent()}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

// ===== MÜLK SAHİBİ PANELİ =====
const MulkSahibiPanel = () => {
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState(null);
  
  const openModal = (title, content) => {
    setModalTitle(title);
    setModalContent(content);
    setModalOpen(true);
  };
  
  const menuItems = [
    { id: 'dashboard', label: 'Gösterge Paneli', icon: Icons.home, tooltip: 'Genel bakış ve özet bilgiler' },
    { id: 'mulkum', label: 'Mülküm', icon: Icons.building, tooltip: 'Mülk detayları ve daire durumları' },
    { id: 'teklifler', label: 'Gelen Teklifler', icon: Icons.doc, tooltip: 'Müteahhitlerden gelen teklifler' },
    { id: 'mesajlar', label: 'Mesajlar', icon: Icons.chat, tooltip: 'Müteahhitlerle iletişim' },
    { id: 'randevular', label: 'Randevular', icon: Icons.calendar, tooltip: 'Fiziksel görüşme randevuları' },
    { id: 'belgeler', label: 'Belgelerim', icon: Icons.doc, tooltip: 'Tapu, imar ve diğer belgeler' },
    { id: 'odemeler', label: 'Ödemeler', icon: Icons.money, tooltip: 'Ödeme geçmişi ve borçlar' },
  ];

  const renderContent = () => {
    switch(activeMenu) {
      case 'dashboard':
        return (
          <>
            <Header title="Hoş Geldiniz, Ahmet Bey" subtitle="Mülk: Kadıköy, İstanbul" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Mülkünüz için gelen toplam teklif sayısı">
                <StatCard icon={Icons.doc} label="Gelen Teklif" value="4" color={colors.secondary} />
              </Tooltip>
              <Tooltip text="Müteahhitlerden gelen okunmamış mesajlar">
                <StatCard icon={Icons.chat} label="Okunmamış Mesaj" value="2" color={colors.success} />
              </Tooltip>
              <Tooltip text="Onay bekleyen randevu talepleri">
                <StatCard icon={Icons.calendar} label="Bekleyen Randevu" value="1" color={colors.accent} />
              </Tooltip>
              <Tooltip text="Mülkünüzün platformdaki durumu">
                <StatCard icon={Icons.check} label="Mülk Durumu" value="Aktif" color={colors.success} />
              </Tooltip>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Tooltip text="Mülkünüz için en son gelen teklifler" fullWidth>
                <Card>
                  <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Son Teklifler</h3>
                  {[
                    { firma: 'ABC İnşaat Ltd.', oran: '%45', sure: '18 ay', tarih: '2 saat önce' },
                    { firma: 'XYZ Yapı A.Ş.', oran: '%48', sure: '20 ay', tarih: '1 gün önce' },
                    { firma: 'Güven İnşaat', oran: '%42', sure: '16 ay', tarih: '2 gün önce' },
                  ].map((t, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i < 2 ? '1px solid ' + colors.border : 'none' }}>
                      <div>
                        <p style={{ fontWeight: 600, color: colors.text, margin: 0 }}>{t.firma}</p>
                        <p style={{ fontSize: 12, color: colors.muted, margin: '4px 0 0' }}>Oran: {t.oran} • Süre: {t.sure}</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: 12, color: colors.muted, margin: '0 0 8px' }}>{t.tarih}</p>
                        <Tooltip text="Teklif detaylarını görüntüle">
                          <Button size="sm" onClick={() => openModal(
                            'Teklif Detayı - ' + t.firma,
                            <div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                                <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                  <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Müteahhit</p>
                                  <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{t.firma}</p>
                                </div>
                                <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                  <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Teklif Tarihi</p>
                                  <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{t.tarih}</p>
                                </div>
                              </div>
                              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
                                <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                  <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Kat Karşılığı Oranı</p>
                                  <p style={{ fontSize: 24, fontWeight: 700, color: colors.success, margin: '4px 0' }}>{t.oran}</p>
                                </div>
                                <div style={{ padding: 16, background: colors.bg, borderRadius: 8 }}>
                                  <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Teslim Süresi</p>
                                  <p style={{ fontSize: 24, fontWeight: 700, color: colors.accent, margin: '4px 0' }}>{t.sure}</p>
                                </div>
                              </div>
                              <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                                <Button variant="success">Kabul Et</Button>
                                <Button variant="primary">Mesaj Gönder</Button>
                                <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                              </div>
                            </div>
                          )}>İncele</Button>
                        </Tooltip>
                      </div>
                    </div>
                  ))}
                </Card>
              </Tooltip>
              <Tooltip text="Mülkünüzün kayıt ve onay süreç durumu">
                <Card>
                  <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Mülk Durumu</h3>
                  <div style={{ background: colors.bg, borderRadius: 8, padding: 16 }}>
                    {[
                      { label: 'Ön Ödeme', durum: true },
                      { label: 'Tapu Kontrolü', durum: true },
                      { label: 'Kredi Sorgusu', durum: true },
                      { label: 'İmar Durumu', durum: true },
                      { label: 'Aktif Yayında', durum: true },
                    ].map((s, i) => (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: i < 4 ? '1px solid ' + colors.border : 'none' }}>
                        <span style={{ color: colors.text }}>{s.label}</span>
                        {s.durum ? (
                          <span style={{ color: colors.success, display: 'flex', alignItems: 'center', gap: 4 }}>{Icons.check} Tamamlandı</span>
                        ) : (
                          <Badge color={colors.accent}>Bekliyor</Badge>
                        )}
                      </div>
                    ))}
                  </div>
                </Card>
              </Tooltip>
            </div>
          </>
        );
        
      case 'mulkum':
        const olumluDaire = apartmanVerisi.daireler.filter(d => d.mutabakat === true).length;
        const olumsuzDaire = apartmanVerisi.daireler.filter(d => d.mutabakat === false).length;
        const bekleyenDaire = apartmanVerisi.daireler.filter(d => d.mutabakat === 'bekliyor').length;
        const mutabakatYuzdesi = Math.round((olumluDaire / apartmanVerisi.toplamDaire) * 100);
        
        return (
          <>
            <Header title="Mülk Bilgileri" subtitle="Apartman detayları, daire sahipleri ve mutabakat durumu" />
            
            {/* Özet Kartları */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Binada bulunan toplam daire sayısı">
                <StatCard icon={Icons.building} label="Toplam Daire" value={apartmanVerisi.toplamDaire} color={colors.secondary} />
              </Tooltip>
              <Tooltip text="Kentsel dönüşümü onaylayan daire sayısı">
                <StatCard icon={Icons.check} label="Olumlu Yanıt" value={olumluDaire} color={colors.success} />
              </Tooltip>
              <Tooltip text="Kentsel dönüşümü reddeden daire sayısı">
                <StatCard icon={Icons.alert} label="Olumsuz Yanıt" value={olumsuzDaire} color={colors.danger} />
              </Tooltip>
              <Tooltip text="Henüz karar vermemiş daire sayısı">
                <StatCard icon={Icons.calendar} label="Bekleyen" value={bekleyenDaire} color={colors.accent} />
              </Tooltip>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Mülkünüze ait temel bilgiler" fullWidth>
                <Card>
                  <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Bina Bilgileri</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    {[
                      { label: 'Adres', value: apartmanVerisi.adres },
                      { label: 'Ada / Parsel', value: `${apartmanVerisi.ada} / ${apartmanVerisi.parsel}` },
                      { label: 'Toplam Alan', value: `${apartmanVerisi.toplamM2} m²` },
                      { label: 'Bina Yaşı', value: `${apartmanVerisi.binaYasi} yıl` },
                      { label: 'Kat Sayısı', value: `${apartmanVerisi.katSayisi} Kat` },
                      { label: 'Toplam Daire', value: `${apartmanVerisi.toplamDaire} Daire` },
                    ].map((item, i) => (
                      <div key={i} style={{ gridColumn: i === 0 ? 'span 2' : 'auto' }}>
                        <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>{item.label}</p>
                        <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: '4px 0 0' }}>{item.value}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              </Tooltip>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>İmar Durumu</h3>
                <div style={{ background: colors.secondary + '10', borderRadius: 8, padding: 12, marginBottom: 16 }}>
                  <p style={{ fontSize: 12, color: colors.secondary, margin: 0, fontWeight: 600 }}>ENSTİTÜ TARAFINDAN HAZIRLANMIŞTIR</p>
                </div>
                <p style={{ fontSize: 14, color: colors.text, margin: '0 0 16px', fontWeight: 500 }}>{apartmanVerisi.imarDurumu}</p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {[
                    { label: 'Mevcut Kat', value: '5 Kat' },
                    { label: 'İzin Verilen', value: '7 Kat' },
                    { label: 'Emsal (KAKS)', value: '2.50' },
                    { label: 'TAKS', value: '0.35' },
                  ].map((item, i) => (
                    <div key={i}>
                      <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>{item.label}</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: colors.text, margin: '4px 0 0' }}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
            
            {/* Mutabakat Durumu */}
            <Tooltip text="Yasal olarak kentsel dönüşüm için daire maliklerinin 2/3 çoğunluğunun onayı gereklidir" fullWidth>
              <Card style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontSize: 16, margin: 0, color: colors.primary }}>Dönüşüm Mutabakat Durumu</h3>
                    <p style={{ fontSize: 13, color: colors.muted, margin: '4px 0 0' }}>Yasal olarak minimum %66.67 (2/3 çoğunluk) gereklidir</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 32, fontWeight: 700, color: mutabakatYuzdesi >= 67 ? colors.success : colors.danger, margin: 0 }}>{mutabakatYuzdesi}%</p>
                    <Badge color={mutabakatYuzdesi >= 67 ? colors.success : colors.danger}>
                      {mutabakatYuzdesi >= 67 ? '✓ Yeterli Çoğunluk' : '✗ Yetersiz'}
                    </Badge>
                  </div>
                </div>
                
                {/* İlerleme Çubuğu */}
                <Tooltip text="Dikey çizgi yasal eşiği (%66.67) gösterir - bu eşiği geçmek zorunludur">
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: colors.muted }}>Mutabakat İlerlemesi</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: colors.text }}>{olumluDaire}/{apartmanVerisi.toplamDaire} daire onayladı</span>
                    </div>
                    <div style={{ width: '100%', height: 12, background: colors.border, borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '66.67%', top: 0, bottom: 0, width: 2, background: colors.primary, zIndex: 2 }}></div>
                      <div style={{ width: mutabakatYuzdesi + '%', height: '100%', background: mutabakatYuzdesi >= 67 ? colors.success : colors.accent, borderRadius: 6 }}></div>
                    </div>
                    <p style={{ fontSize: 11, color: colors.muted, marginTop: 4, textAlign: 'center' }}>↑ Yasal eşik (%66.67)</p>
                  </div>
                </Tooltip>
                
                {/* Daire Detayları Grid */}
                <h4 style={{ fontSize: 14, margin: '0 0 12px', color: colors.primary }}>Daire Bazlı Mutabakat Detayı</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
                  {apartmanVerisi.daireler.map((daire, i) => (
                    <Tooltip key={i} text={`${daire.sahip} - Tel: ${daire.telefon}`}>
                      <div style={{
                        padding: 16,
                        background: daire.mutabakat === true ? colors.success + '15' : daire.mutabakat === false ? colors.danger + '15' : colors.accent + '15',
                        borderRadius: 8,
                        border: `2px solid ${daire.mutabakat === true ? colors.success : daire.mutabakat === false ? colors.danger : colors.accent}`,
                        textAlign: 'center',
                        cursor: 'pointer'
                      }}>
                        <p style={{ fontSize: 18, fontWeight: 700, color: colors.text, margin: 0 }}>Daire {daire.no}</p>
                        <p style={{ fontSize: 11, color: colors.muted, margin: '2px 0' }}>{daire.kat} • {daire.m2}m²</p>
                        <p style={{ fontSize: 13, color: colors.text, margin: '6px 0', fontWeight: 500 }}>{daire.sahip}</p>
                        <Badge color={daire.mutabakat === true ? colors.success : daire.mutabakat === false ? colors.danger : colors.accent}>
                          {daire.mutabakat === true ? '✓ Onay' : daire.mutabakat === false ? '✗ Red' : '⏳ Bekliyor'}
                        </Badge>
                      </div>
                    </Tooltip>
                  ))}
                </div>
              </Card>
            </Tooltip>
            
            {/* Daire Listesi Tablo */}
            <Tooltip text="Tüm daire sahiplerinin detaylı listesi ve iletişim bilgileri" fullWidth>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Daire Sahipleri Listesi</h3>
                <Table
                  columns={[
                    { key: 'no', label: 'Daire No' },
                    { key: 'kat', label: 'Kat' },
                    { key: 'm2', label: 'Alan (m²)' },
                    { key: 'sahip', label: 'Mal Sahibi' },
                    { key: 'telefon', label: 'Telefon' },
                    { key: 'mutabakat', label: 'Mutabakat', render: (v) => (
                      <Badge color={v === true ? colors.success : v === false ? colors.danger : colors.accent}>
                        {v === true ? 'Onayladı' : v === false ? 'Reddetti' : 'Bekliyor'}
                      </Badge>
                    )},
                  ]}
                  data={apartmanVerisi.daireler}
                />
              </Card>
            </Tooltip>
          </>
        );
        
      case 'teklifler':
        const gelenTeklifler = [
          { firma: 'ABC İnşaat Ltd.', puan: '4.8', proje: '12 proje', oran: '%45', sure: '18 ay', teminat: '500.000 TL', onay: true, telefon: '0212 111 2233' },
          { firma: 'XYZ Yapı A.Ş.', puan: '4.5', proje: '8 proje', oran: '%48', sure: '20 ay', teminat: '400.000 TL', onay: true, telefon: '0212 222 3344' },
          { firma: 'Güven İnşaat', puan: '4.2', proje: '15 proje', oran: '%42', sure: '16 ay', teminat: '350.000 TL', onay: true, telefon: '0212 333 4455' },
          { firma: 'Yeni Yapı Ltd.', puan: '3.9', proje: '5 proje', oran: '%50', sure: '24 ay', teminat: '300.000 TL', onay: false, telefon: '0212 444 5566' },
        ];
        return (
          <>
            <Header title="Gelen Teklifler" subtitle="Müteahhitlerden gelen teklifler" />
            <Tooltip text="Teklifleri yan yana karşılaştırarak en uygun seçimi yapın" fullWidth>
              <Card style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <p style={{ color: colors.muted, margin: 0 }}>Toplam 4 teklif aldınız</p>
                  <Button variant="outline">Teklifleri Karşılaştır</Button>
                </div>
              </Card>
            </Tooltip>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
              {gelenTeklifler.map((t, i) => (
                <Tooltip key={i} text={t.onay ? 'Enstitü tarafından onaylanmış güvenilir müteahhit' : 'Bu müteahhit henüz enstitü onayı almamış'}>
                  <Card style={{ border: t.onay ? '2px solid ' + colors.success : '1px solid ' + colors.border }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <div>
                        <h4 style={{ margin: 0, color: colors.primary }}>{t.firma}</h4>
                        <p style={{ fontSize: 12, color: colors.muted, margin: '4px 0 0' }}>⭐ {t.puan} • {t.proje}</p>
                      </div>
                      {t.onay && <Badge color={colors.success}>Enstitü Onaylı</Badge>}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 16 }}>
                      <Tooltip text="Size düşen daire yüzdesi">
                        <div style={{ background: colors.bg, padding: 12, borderRadius: 6, textAlign: 'center' }}>
                          <p style={{ fontSize: 11, color: colors.muted, margin: 0 }}>Kat Karşılığı</p>
                          <p style={{ fontSize: 18, fontWeight: 700, color: colors.secondary, margin: '4px 0 0' }}>{t.oran}</p>
                        </div>
                      </Tooltip>
                      <Tooltip text="İnşaatın tamamlanması için öngörülen süre">
                        <div style={{ background: colors.bg, padding: 12, borderRadius: 6, textAlign: 'center' }}>
                          <p style={{ fontSize: 11, color: colors.muted, margin: 0 }}>Teslim Süresi</p>
                          <p style={{ fontSize: 18, fontWeight: 700, color: colors.text, margin: '4px 0 0' }}>{t.sure}</p>
                        </div>
                      </Tooltip>
                      <Tooltip text="Müteahhitin yatırdığı güvence bedeli">
                        <div style={{ background: colors.bg, padding: 12, borderRadius: 6, textAlign: 'center' }}>
                          <p style={{ fontSize: 11, color: colors.muted, margin: 0 }}>Teminat</p>
                          <p style={{ fontSize: 14, fontWeight: 700, color: colors.text, margin: '4px 0 0' }}>{t.teminat}</p>
                        </div>
                      </Tooltip>
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Tooltip text="Teklif detaylarını ve firma bilgilerini görüntüle">
                        <Button style={{ flex: 1 }} onClick={() => openModal(
                          'Teklif Detayı - ' + t.firma,
                          <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                              <div>
                                <h3 style={{ margin: 0, color: colors.primary }}>{t.firma}</h3>
                                <p style={{ fontSize: 13, color: colors.muted, margin: '4px 0 0' }}>⭐ {t.puan} • {t.proje}</p>
                              </div>
                              {t.onay && <Badge color={colors.success}>Enstitü Onaylı</Badge>}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 20 }}>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8, textAlign: 'center' }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Kat Karşılığı</p>
                                <p style={{ fontSize: 28, fontWeight: 700, color: colors.success, margin: '4px 0' }}>{t.oran}</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8, textAlign: 'center' }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Teslim Süresi</p>
                                <p style={{ fontSize: 28, fontWeight: 700, color: colors.accent, margin: '4px 0' }}>{t.sure}</p>
                              </div>
                              <div style={{ padding: 16, background: colors.bg, borderRadius: 8, textAlign: 'center' }}>
                                <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>Teminat</p>
                                <p style={{ fontSize: 20, fontWeight: 700, color: colors.secondary, margin: '4px 0' }}>{t.teminat}</p>
                              </div>
                            </div>
                            <div style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 20 }}>
                              <p style={{ fontSize: 12, color: colors.muted, margin: 0 }}>İletişim</p>
                              <p style={{ fontWeight: 600, color: colors.text, margin: '4px 0' }}>{t.telefon}</p>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              <Button variant="success">Teklifi Kabul Et</Button>
                              <Button variant="primary">Randevu Talep Et</Button>
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>Detayları Gör</Button>
                      </Tooltip>
                      <Tooltip text="Müteahhit ile mesajlaşmaya başla">
                        <Button variant="outline">Mesaj Gönder</Button>
                      </Tooltip>
                    </div>
                  </Card>
                </Tooltip>
              ))}
            </div>
          </>
        );
        
      case 'belgeler':
        const belgelerData = [
          { belge: 'Tapu Senedi', yuklemeTarihi: '15.01.2026', durum: 'Onaylandı', onaylayan: 'Enstitü' },
          { belge: 'Kimlik Fotokopisi', yuklemeTarihi: '15.01.2026', durum: 'Onaylandı', onaylayan: 'Enstitü' },
          { belge: 'İmar Durumu', yuklemeTarihi: '18.01.2026', durum: 'Onaylandı', onaylayan: 'Enstitü (Hazırladı)' },
          { belge: 'Aplikasyon Krokisi', yuklemeTarihi: '20.01.2026', durum: 'Bekliyor', onaylayan: '-' },
        ];
        return (
          <>
            <Header title="Belgelerim" subtitle="Yüklenen ve onaylanan belgeler" />
            <Tooltip text="Mülkünüze ait yüklenmiş tüm belgeler ve onay durumları" fullWidth>
              <Card>
                <Table
                  columns={[
                    { key: 'belge', label: 'Belge Adı' },
                    { key: 'yuklemeTarihi', label: 'Yükleme Tarihi' },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Onaylandı' ? colors.success : colors.accent}>{v}</Badge> },
                    { key: 'onaylayan', label: 'Onaylayan' },
                    { key: 'islem', label: '', render: (v, row) => (
                      <Tooltip text="Belgeyi görüntüle veya indir">
                        <Button size="sm" variant="outline" onClick={() => openModal(
                          'Belge Görüntüle - ' + row.belge,
                          <div>
                            <div style={{ padding: 20, background: colors.bg, borderRadius: 8, marginBottom: 20, textAlign: 'center' }}>
                              <div style={{ width: 80, height: 100, background: colors.border, borderRadius: 8, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {Icons.doc}
                              </div>
                              <p style={{ fontWeight: 600, color: colors.text, margin: 0 }}>{row.belge}</p>
                              <p style={{ fontSize: 13, color: colors.muted, margin: '8px 0 0' }}>Yüklenme: {row.yuklemeTarihi}</p>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                              <span style={{ color: colors.muted }}>Durum</span>
                              <Badge color={row.durum === 'Onaylandı' ? colors.success : colors.accent}>{row.durum}</Badge>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              <Button variant="primary">İndir</Button>
                              <Button variant="outline" onClick={() => setModalOpen(false)}>Kapat</Button>
                            </div>
                          </div>
                        )}>Görüntüle</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={belgelerData}
                />
                <div style={{ marginTop: 16 }}>
                  <Tooltip text="Yeni belge yükleyerek mülk dosyanızı tamamlayın">
                    <Button>{Icons.doc} Yeni Belge Yükle</Button>
                  </Tooltip>
                </div>
              </Card>
            </Tooltip>
          </>
        );
        
      case 'mesajlar':
        return (
          <>
            <Header title="Mesajlarım" subtitle="Müteahhitler ve enstitü ile iletişim" />
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: 24 }}>
              <Card style={{ padding: 0 }}>
                <div style={{ padding: '16px', borderBottom: '1px solid ' + colors.border }}>
                  <input placeholder="Mesaj ara..." style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }} />
                </div>
                <div>
                  {mesajlarVerisi.map((m, i) => (
                    <div key={i} style={{ padding: 16, borderBottom: '1px solid ' + colors.border, cursor: 'pointer', background: i === 0 ? colors.secondary + '10' : 'transparent' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                        <span style={{ fontWeight: 600, color: colors.text }}>{m.gonderen}</span>
                        <span style={{ fontSize: 11, color: colors.muted }}>{m.tarih.split(' ')[0]}</span>
                      </div>
                      <p style={{ fontSize: 12, color: colors.secondary, margin: '0 0 4px' }}>{m.konu}</p>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: 13, color: colors.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 180 }}>{m.mesaj}</span>
                        {!m.okundu && <Badge color={colors.danger}>Yeni</Badge>}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <div style={{ borderBottom: '1px solid ' + colors.border, paddingBottom: 16, marginBottom: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <h3 style={{ margin: 0, color: colors.primary }}>ABC İnşaat Ltd.</h3>
                      <p style={{ margin: '4px 0 0', fontSize: 13, color: colors.muted }}>Teklif Hakkında</p>
                    </div>
                    <Badge color={colors.secondary}>Müteahhit</Badge>
                  </div>
                </div>
                <div style={{ height: 300, overflowY: 'auto', marginBottom: 16 }}>
                  {[
                    { ben: false, mesaj: 'Merhaba Ahmet Bey, mülkünüz için teklifimizi sunduk. %45 kat karşılığı oranı ve 18 ay teslim süresi önerdik.', saat: '09:00' },
                    { ben: true, mesaj: 'Merhaba, teklifi inceledim. Oran biraz düşük gibi görünüyor.', saat: '10:15' },
                    { ben: false, mesaj: 'Anladım, bölgedeki diğer projelere göre değerlendirme yaptık. Yüz yüze görüşmede detayları konuşabiliriz.', saat: '10:30' },
                    { ben: true, mesaj: 'Tamam, randevu için enstitüye başvuralım o zaman.', saat: '10:45' },
                  ].map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: m.ben ? 'flex-end' : 'flex-start', marginBottom: 12 }}>
                      <div style={{
                        maxWidth: '70%',
                        padding: 12,
                        borderRadius: 12,
                        background: m.ben ? colors.success : colors.bg,
                        color: m.ben ? '#fff' : colors.text
                      }}>
                        <p style={{ margin: 0, fontSize: 14 }}>{m.mesaj}</p>
                        <p style={{ margin: '4px 0 0', fontSize: 11, opacity: 0.7 }}>{m.saat}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input placeholder="Mesajınızı yazın..." style={{ flex: 1, padding: '12px 16px', border: '1px solid ' + colors.border, borderRadius: 8 }} />
                  <Button>Gönder</Button>
                </div>
              </Card>
            </div>
          </>
        );
        
      case 'randevular':
        return (
          <>
            <Header title="Randevularım" subtitle="Müteahhitlerle görüşme randevuları" />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Aktif Randevular</h3>
                {randevularVerisi.map((r, i) => (
                  <div key={i} style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <div>
                        <span style={{ fontWeight: 600, color: colors.text }}>{r.tarih}</span>
                        <span style={{ marginLeft: 8, color: colors.secondary, fontWeight: 600 }}>{r.saat}</span>
                      </div>
                      <Badge color={r.durum === 'Onaylandı' ? colors.success : colors.accent}>{r.durum}</Badge>
                    </div>
                    <p style={{ margin: '0 0 4px', color: colors.text }}><strong>Müteahhit:</strong> {r.muteahhit}</p>
                    <p style={{ margin: '0 0 4px', fontSize: 13, color: colors.muted }}><strong>Yer:</strong> {r.yer}</p>
                    <p style={{ margin: '0 0 12px', fontSize: 13, color: colors.muted }}><strong>Tip:</strong> {r.tip}</p>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <Button size="sm" variant="outline">Detay</Button>
                      {r.durum === 'Bekliyor' && <Button size="sm" variant="success">Onayla</Button>}
                    </div>
                  </div>
                ))}
              </Card>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Randevu Talebi Oluştur</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Müteahhit Seçin</label>
                    <select style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                      <option>ABC İnşaat Ltd.</option>
                      <option>XYZ Yapı A.Ş.</option>
                      <option>Güven İnşaat</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Tercih Edilen Tarih</label>
                    <input type="date" style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Görüşme Tipi</label>
                    <select style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                      <option>Yüz Yüze - Enstitüde</option>
                      <option>Online - Video Görüşme</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Not</label>
                    <textarea placeholder="Görüşme konusu hakkında not..." style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6, minHeight: 80 }} />
                  </div>
                  <Button>Randevu Talebi Gönder</Button>
                </div>
              </Card>
            </div>
          </>
        );
        
      case 'odemeler':
        return (
          <>
            <Header title="Ödemelerim" subtitle="Platform ödemeleri ve işlem geçmişi" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
              <Tooltip text="Platforma yapmanız gereken toplam ödeme tutarı">
                <StatCard icon={Icons.money} label="Toplam Ödeme" value="₺11.000" color={colors.secondary} />
              </Tooltip>
              <Tooltip text="Başarıyla tamamlanmış ödemeleriniz">
                <StatCard icon={Icons.check} label="Ödenen" value="₺7.500" color={colors.success} />
              </Tooltip>
              <Tooltip text="Ödenmesi gereken bekleyen tutarlar">
                <StatCard icon={Icons.calendar} label="Bekleyen" value="₺3.500" color={colors.accent} />
              </Tooltip>
            </div>
            <Tooltip text="Tüm ödeme geçmişinizi görüntüleyin" fullWidth>
              <Card>
                <h3 style={{ fontSize: 16, margin: '0 0 16px', color: colors.primary }}>Ödeme Geçmişi</h3>
                <Table
                  columns={[
                    { key: 'tarih', label: 'Tarih' },
                    { key: 'tip', label: 'Ödeme Tipi' },
                    { key: 'aciklama', label: 'Açıklama' },
                    { key: 'tutar', label: 'Tutar', render: (v) => <span style={{ fontWeight: 600 }}>₺{v.toLocaleString()}</span> },
                    { key: 'durum', label: 'Durum', render: (v) => <Badge color={v === 'Ödendi' ? colors.success : colors.accent}>{v}</Badge> },
                    { key: 'islem', label: '', render: (v, row) => row.durum === 'Bekliyor' ? (
                      <Tooltip text="Ödeme sayfasına git">
                        <Button size="sm" onClick={() => openModal(
                          'Ödeme Yap - ' + row.aciklama,
                          <div>
                            <div style={{ padding: 16, background: colors.bg, borderRadius: 8, marginBottom: 20 }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ color: colors.muted }}>Ödeme Tipi</span>
                                <span style={{ fontWeight: 500, color: colors.text }}>{row.tip}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                                <span style={{ color: colors.muted }}>Açıklama</span>
                                <span style={{ fontWeight: 500, color: colors.text }}>{row.aciklama}</span>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: 12, borderTop: '1px dashed ' + colors.border }}>
                                <span style={{ fontWeight: 600, color: colors.text }}>Ödenecek Tutar</span>
                                <span style={{ fontSize: 20, fontWeight: 700, color: colors.accent }}>₺{row.tutar.toLocaleString()}</span>
                              </div>
                            </div>
                            <div style={{ marginBottom: 20 }}>
                              <label style={{ display: 'block', fontSize: 13, color: colors.muted, marginBottom: 6 }}>Ödeme Yöntemi</label>
                              <select style={{ width: '100%', padding: '10px 14px', border: '1px solid ' + colors.border, borderRadius: 6 }}>
                                <option>Kredi Kartı</option>
                                <option>Banka Havalesi</option>
                              </select>
                            </div>
                            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                              <Button variant="success">Ödemeyi Tamamla</Button>
                              <Button variant="outline" onClick={() => setModalOpen(false)}>İptal</Button>
                            </div>
                          </div>
                        )}>Öde</Button>
                      </Tooltip>
                    ) : (
                      <Tooltip text="Ödeme makbuzunu görüntüle">
                        <Button size="sm" variant="outline">Makbuz</Button>
                      </Tooltip>
                    )},
                  ]}
                  data={odemelerVerisi}
                />
              </Card>
            </Tooltip>
          </>
        );
        
      default:
        return <Header title={menuItems.find(m => m.id === activeMenu)?.label} />;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: colors.bg }}>
      <Sidebar userType="Mülk Sahibi Paneli" activeMenu={activeMenu} setActiveMenu={setActiveMenu} menuItems={menuItems} />
      <div style={{ flex: 1, padding: 24 }}>
        {renderContent()}
        <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={modalTitle}>
          {modalContent}
        </Modal>
      </div>
    </div>
  );
};

// ===== ANA UYGULAMA =====
export default function App() {
  const [panel, setPanel] = useState('enstitu');
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Panel Seçici */}
      <div style={{
        position: 'fixed',
        top: 20,
        right: 20,
        zIndex: 1000,
        display: 'flex',
        gap: 8,
        background: '#fff',
        padding: 8,
        borderRadius: 8,
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
      }}>
        <Tooltip text="Kentsel Dönüşüm Enstitüsü yönetim paneli - Platform yöneticisi görünümü" position="bottom">
          <button
            onClick={() => setPanel('enstitu')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
              background: panel === 'enstitu' ? colors.primary : colors.bg,
              color: panel === 'enstitu' ? '#fff' : colors.text
            }}
          >
            Enstitü
          </button>
        </Tooltip>
        <Tooltip text="Müteahhit paneli - İnşaat firmaları için mülk fırsatları ve teklif yönetimi" position="bottom">
          <button
            onClick={() => setPanel('muteahhit')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
              background: panel === 'muteahhit' ? colors.secondary : colors.bg,
              color: panel === 'muteahhit' ? '#fff' : colors.text
            }}
          >
            Müteahhit
          </button>
        </Tooltip>
        <Tooltip text="Mülk Sahibi paneli - Daire sahipleri için teklif ve süreç takibi" position="bottom">
          <button
            onClick={() => setPanel('mulksahibi')}
            style={{
              padding: '8px 16px',
              border: 'none',
              borderRadius: 6,
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: 13,
              background: panel === 'mulksahibi' ? colors.success : colors.bg,
              color: panel === 'mulksahibi' ? '#fff' : colors.text
            }}
          >
            Mülk Sahibi
          </button>
        </Tooltip>
      </div>
      
      {/* Panel İçeriği */}
      {panel === 'enstitu' && <EnstituPanel />}
      {panel === 'muteahhit' && <MuteahhitPanel />}
      {panel === 'mulksahibi' && <MulkSahibiPanel />}
    </div>
  );
}
