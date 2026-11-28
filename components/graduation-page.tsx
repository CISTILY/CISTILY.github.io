import type { Locale } from '@/lib/locale';

const copy = {
  vi: {
    title: 'Lễ tốt nghiệp của mình',
    intro: 'Mình rất vui nếu bạn có thể đến chung vui trong ngày đặc biệt này.',
    invitationAlt: 'Thiệp mời dự lễ tốt nghiệp',
    parking: 'Gửi xe: bãi tầng hầm nhà I hoặc khu nhà B – C; vui lòng hỏi bảo vệ về chỗ dành cho khách trong ngày.',
    map: 'Mở địa chỉ trên bản đồ',
    locations: [
      { name: 'NOWZONE', address: '235 Nguyễn Văn Cừ, Thành phố Hồ Chí Minh', query: 'NOWZONE 235 Nguyen Van Cu Ho Chi Minh City', image: 'https://alltop.vn/backend/media/images/posts/695/NOWZONE_Fashion_Mall-210669.jpg' },
      { name: 'Trường THPT chuyên Lê Hồng Phong', address: '235 Nguyễn Văn Cừ, Phường Chợ Quán, Thành phố Hồ Chí Minh', query: 'Trường THPT chuyên Lê Hồng Phong 235 Nguyễn Văn Cừ', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Tr%C6%B0%E1%BB%9Dng_Trung_H%E1%BB%8Dc_Petrus_K%C3%BD.jpg' },
      { name: 'Trường Đại học Khoa học tự nhiên, ĐHQG-HCM', address: '227 Nguyễn Văn Cừ, Phường Chợ Quán, Thành phố Hồ Chí Minh', query: 'Trường Đại học Khoa học Tự nhiên 227 Nguyễn Văn Cừ', image: 'https://congchungnguyenhue.com/Uploaded/Images/Original/2023/11/29/dai_hoc_khoa_hoc_tu_nhien_tp_hcm_2911111309.jpg' },
      { name: 'Trường Đại học Sư phạm Thành phố Hồ Chí Minh', address: '280 An Dương Vương, Phường Chợ Quán, Thành phố Hồ Chí Minh', query: 'Trường Đại học Sư phạm Thành phố Hồ Chí Minh 280 An Dương Vương', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/C_HCMUE.jpg' },
    ],
  },
  en: {
    title: 'My graduation',
    intro: "I'd be delighted if you could join me for this special milestone.",
    invitationAlt: 'Graduation ceremony invitation',
    parking: 'Parking: basement of Building I or the Buildings B–C area. Please ask campus security about guest access and availability.',
    map: 'Open address in Maps',
    locations: [
      { name: 'NOWZONE', address: '235 Nguyen Van Cu Street, Ho Chi Minh City, Vietnam', query: 'NOWZONE 235 Nguyen Van Cu Ho Chi Minh City', image: 'https://alltop.vn/backend/media/images/posts/695/NOWZONE_Fashion_Mall-210669.jpg' },
      { name: 'Le Hong Phong High School for the Gifted', address: '235 Nguyen Van Cu Street, Cho Quan Ward, Ho Chi Minh City, Vietnam', query: 'Le Hong Phong High School 235 Nguyen Van Cu', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Tr%C6%B0%E1%BB%9Dng_Trung_H%E1%BB%8Dc_Petrus_K%C3%BD.jpg' },
      { name: 'University of Science, VNU-HCM', address: '227 Nguyen Van Cu Street, Cho Quan Ward, Ho Chi Minh City, Vietnam', query: 'University of Science 227 Nguyen Van Cu Ho Chi Minh City', image: 'https://congchungnguyenhue.com/Uploaded/Images/Original/2023/11/29/dai_hoc_khoa_hoc_tu_nhien_tp_hcm_2911111309.jpg' },
      { name: 'Ho Chi Minh City University of Education', address: '280 An Duong Vuong Street, Cho Quan Ward, Ho Chi Minh City, Vietnam', query: 'Ho Chi Minh City University of Education 280 An Duong Vuong', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8a/C_HCMUE.jpg' },
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
                style={{ backgroundImage: `linear-gradient(rgba(255,255,255,.8), rgba(255,255,255,.8)), url("${location.image}")` }}
              >
                <div className="address-pin" aria-hidden="true">0{index + 1}</div>
                <div>
                  <h3>{location.name}</h3>
                  <p>{location.address}</p>
                  {index === 2 && <p className="parking-note">{t.parking}</p>}
                  <a className="inline-link" href={`https://maps.google.com/?q=${encodeURIComponent(location.query)}`} target="_blank" rel="noreferrer">{t.map} <span aria-hidden="true">↗</span></a>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
