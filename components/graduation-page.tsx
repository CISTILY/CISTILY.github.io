import type { Locale } from '@/lib/locale';

const googleMapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

const copy = {
  vi: {
    title: 'Lễ tốt nghiệp của mình',
    intro: 'Mình rất vui nếu bạn có thể đến chung vui trong ngày đặc biệt này.',
    invitationAlt: 'Thiệp mời dự lễ tốt nghiệp',
    parking: 'Gửi xe: bãi tầng hầm nhà I hoặc khu nhà B – C; vui lòng hỏi bảo vệ về chỗ dành cho khách trong ngày.',
    map: 'Mở địa chỉ trên bản đồ',
    locations: [
      { name: 'NOWZONE', address: '235 Nguyễn Văn Cừ, Phường Cầu Ông Lãnh, Thành phố Hồ Chí Minh', query: 'NOWZONE Fashion Mall', mapUrl: 'https://www.google.com/maps/place/NOWZONE+Fashion+Mall/@10.7637631,106.6826491,1154m/data=!3m2!1e3!4b1!4m6!3m5!1s0x31752f194dae00e5:0x4b90c5d0bd96fe63!8m2!3d10.7637631!4d106.6826491!16s%2Fm%2F0glpxzh?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D', image: 'https://www.vietnamonline.com/media/uploads/froala_editor/images/NowZone.jpg' },
      { name: 'Trường THPT chuyên Lê Hồng Phong', address: '235 Nguyễn Văn Cừ, Phường Chợ Quán, Thành phố Hồ Chí Minh', query: 'Trường THPT chuyên Lê Hồng Phong, 235 Nguyễn Văn Cừ, Thành phố Hồ Chí Minh', mapUrl: 'https://www.google.com/maps/place/Le+Hong+Phong+High+School+for+The+Gifted/@10.7638558,106.6791178,1154m/data=!3m2!1e3!4b1!4m6!3m5!1s0x31752df3a79ac42d:0xdf0d6b3bb10223b2!8m2!3d10.7638505!4d106.6816981!16s%2Fm%2F027fqrl?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Tr%C6%B0%E1%BB%9Dng_Trung_H%E1%BB%8Dc_Petrus_K%C3%BD.jpg' },
      { name: 'Trường Đại học Khoa học tự nhiên, ĐHQG-HCM', address: '227 Nguyễn Văn Cừ, Phường Chợ Quán, Thành phố Hồ Chí Minh', query: 'Trường Đại học Khoa học Tự nhiên, ĐHQG-HCM, 227 Nguyễn Văn Cừ', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Trường+Đại+học+Khoa+học+Tự+nhiên%2C+ĐHQG-HCM%2C+227+Nguyễn+Văn+Cừ', image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/T%C3%B2a_nh%C3%A0_I_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_T%E1%BB%B1_nhi%C3%AAn_%28C%C6%A1_s%E1%BB%9F_227_Nguy%E1%BB%85n_V%C4%83n_C%E1%BB%AB%29.jpg' },
      { name: 'Trường Đại học Sư phạm Thành phố Hồ Chí Minh', address: '280 An Dương Vương, Phường Chợ Quán, Thành phố Hồ Chí Minh', query: 'Trường Đại học Sư phạm Thành phố Hồ Chí Minh, 280 An Dương Vương', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Trường+Đại+học+Sư+phạm+Thành+phố+Hồ+Chí+Minh%2C+280+An+Dương+Vương', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/C_HCMUE.jpg' },
    ],
  },
  en: {
    title: 'My graduation',
    intro: "I'd be delighted if you could join me for this special milestone.",
    invitationAlt: 'Graduation ceremony invitation',
    parking: 'Parking: basement of Building I or the Buildings B–C area. Please ask campus security about guest access and availability.',
    map: 'Open address in Maps',
    locations: [
      { name: 'NOWZONE', address: '235 Nguyen Van Cu Street, Ho Chi Minh City, Vietnam', query: 'NOWZONE Fashion Mall', mapUrl: 'https://www.google.com/maps/place/NOWZONE+Fashion+Mall/@10.7637631,106.6826491,1154m/data=!3m2!1e3!4b1!4m6!3m5!1s0x31752f194dae00e5:0x4b90c5d0bd96fe63!8m2!3d10.7637631!4d106.6826491!16s%2Fm%2F0glpxzh?entry=ttu&g_ep=EgoyMDI2MTEyMy4wIKXMDSoASAFQAw%3D%3D', image: 'https://www.vietnamonline.com/media/uploads/froala_editor/images/NowZone.jpg' },
      { name: 'Le Hong Phong High School for the Gifted', address: '235 Nguyen Van Cu Street, Cho Quan Ward, Ho Chi Minh City, Vietnam', query: 'Le Hong Phong High School for the Gifted, 235 Nguyen Van Cu, Ho Chi Minh City', mapUrl: googleMapsSearch('Le Hong Phong High School for the Gifted, 235 Nguyen Van Cu, Ho Chi Minh City'), image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Tr%C6%B0%E1%BB%9Dng_Trung_H%E1%BB%8Dc_Petrus_K%C3%BD.jpg' },
      { name: 'University of Science, VNU-HCM', address: '227 Nguyen Van Cu Street, Cho Quan Ward, Ho Chi Minh City, Vietnam', query: 'University of Science, VNU-HCM, 227 Nguyen Van Cu, Ho Chi Minh City', mapUrl: googleMapsSearch('University of Science, VNU-HCM, 227 Nguyen Van Cu, Ho Chi Minh City'), image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/T%C3%B2a_nh%C3%A0_I_Tr%C6%B0%E1%BB%9Dng_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_Khoa_h%E1%BB%8Dc_T%E1%BB%B1_nhi%C3%AAn_%28C%C6%A1_s%E1%BB%9F_227_Nguy%E1%BB%85n_V%C4%83n_C%E1%BB%AB%29.jpg' },
      { name: 'Ho Chi Minh City University of Education', address: '280 An Duong Vuong Street, Cho Quan Ward, Ho Chi Minh City, Vietnam', query: 'Ho Chi Minh City University of Education, 280 An Duong Vuong, Ho Chi Minh City', mapUrl: googleMapsSearch('Ho Chi Minh City University of Education, 280 An Duong Vuong, Ho Chi Minh City'), image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/C_HCMUE.jpg' },
    ],
  },
} as const;

export function GraduationPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <div className="graduation-page">
      <header className="page-heading">
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>
      <div className="graduation-content">
        <section className="graduation-section">
          <figure className="invitation-placeholder">
            <img src="/images/graduation-invitation.jpg" alt={t.invitationAlt} />
          </figure>
        </section>
        <section className="graduation-section">
          <div className="location-grid">
            {t.locations.map((location, index) => (
              <article
                className="address-card"
                key={location.name}
                style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.92), rgba(255,255,255,.92)), url("${location.image}")` }}
              >
                <div className="address-pin" aria-hidden="true">0{index + 1}</div>
                <div>
                  <h3>{location.name}</h3>
                  <p>{location.address}</p>
                  {index === 2 && <p className="parking-note">{t.parking}</p>}
                  <a className="inline-link" href={location.mapUrl} target="_blank" rel="noreferrer">{t.map} <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
