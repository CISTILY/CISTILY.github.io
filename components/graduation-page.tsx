import type { Locale } from '@/lib/locale';

const copy = {
  vi: {
    kicker: 'MỘT CỘT MỐC ĐÁNG NHỚ',
    title: 'Lễ tốt nghiệp của mình',
    intro: 'Mình rất vui nếu bạn có thể đến chung vui trong ngày đặc biệt này.',
    invitation: 'Thiệp mời',
    address: 'Địa chỉ',
    invitationText: 'Trân trọng mời bạn đến tham dự lễ tốt nghiệp và cùng mình lưu lại khoảnh khắc đáng nhớ này.',
    time: 'Thời gian',
    datePlaceholder: '[Ngày, tháng, năm]',
    timePlaceholder: '[Giờ bắt đầu]',
    venue: 'Địa điểm',
    school: 'Trường Đại học Khoa học tự nhiên, ĐHQG-HCM · Cơ sở 1',
    imagePlaceholder: 'Đặt ảnh thiệp mời tại /images/graduation-invitation.jpg',
    addressTitle: 'Trường Đại học Khoa học tự nhiên, ĐHQG-HCM',
    street: '227 đường Nguyễn Văn Cừ, Phường Chợ Quán, Thành phố Hồ Chí Minh',
    parking: 'Địa điểm gửi xe',
    parkingNote: 'Trong khuôn viên trường có bãi xe tầng hầm nhà I và bãi xe nhà B – C. Việc tiếp nhận khách và chỗ trống có thể thay đổi theo ngày; bạn vui lòng hỏi bảo vệ khi đến hoặc kiểm tra thông báo của trường trước buổi lễ.',
    map: 'Mở địa chỉ trên bản đồ',
    parkingSource: 'Thông tin bãi xe theo thông báo dịch vụ giữ xe của HCMUS',
  },
  en: {
    kicker: 'A DAY TO REMEMBER',
    title: 'My graduation',
    intro: "I'd be delighted if you could join me for this special milestone.",
    invitation: 'Invitation',
    address: 'Address',
    invitationText: 'You are warmly invited to my graduation ceremony. I hope we can celebrate this memorable moment together.',
    time: 'Date and time',
    datePlaceholder: '[Date, month, year]',
    timePlaceholder: '[Start time]',
    venue: 'Venue',
    school: 'University of Science, VNU-HCM · Campus 1',
    imagePlaceholder: 'Add the invitation image at /images/graduation-invitation.jpg',
    addressTitle: 'University of Science, VNU-HCM',
    street: '227 Nguyen Van Cu Street, Cho Quan Ward, Ho Chi Minh City, Vietnam',
    parking: 'Parking',
    parkingNote: 'The campus lists parking at the basement of Building I and near Buildings B–C. Guest access and availability may vary on the day; please check with campus security or the university before the ceremony.',
    map: 'Open address in Maps',
    parkingSource: 'Parking details from the university parking service notice',
  },
} as const;

export function GraduationPage({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const maps = 'https://maps.google.com/?q=227+Nguyen+Van+Cu+HCMUS';
  return (
    <>
      <header className="page-heading">
        <span className="page-kicker">{t.kicker}</span>
        <h1>{t.title}</h1>
        <p>{t.intro}</p>
      </header>
      <nav className="graduation-sections" aria-label={locale === 'vi' ? 'Các phần' : 'Page sections'}>
        <a href="#invitation">{t.invitation}</a>
        <a href="#address">{t.address}</a>
      </nav>
      <div className="graduation-content">
        <section className="graduation-section" id="invitation">
          <span className="page-kicker">01</span>
          <h2>{t.invitation}</h2>
          <figure className="invitation-placeholder">
            <div className="placeholder-mark" aria-hidden="true">✳</div>
            <figcaption>{t.imagePlaceholder}</figcaption>
          </figure>
          <p className="invitation-message">{t.invitationText}</p>
          <dl className="invitation-details">
            <div><dt>{t.time}</dt><dd>{t.datePlaceholder}<br />{t.timePlaceholder}</dd></div>
            <div><dt>{t.venue}</dt><dd>{t.school}</dd></div>
          </dl>
        </section>
        <section className="graduation-section" id="address">
          <span className="page-kicker">02</span>
          <h2>{t.address}</h2>
          <div className="address-card">
            <div className="address-pin" aria-hidden="true">⌖</div>
            <div>
              <h3>{t.addressTitle}</h3>
              <p>{t.street}</p>
              <a className="inline-link" href={maps} target="_blank" rel="noreferrer">{t.map} <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="parking-card">
            <h3>{t.parking}</h3>
            <p>{t.parkingNote}</p>
            <a href="https://hcmus.edu.vn/moi-bao-gia-cung-cap-dich-vu-giu-xe-phuc-vu-vien-chuc-nguoi-lao-dong-thuoc-truong-dai-hoc-khoa-hoc-tu-nhien-dhqg-hcm/" target="_blank" rel="noreferrer">{t.parkingSource} ↗</a>
          </div>
        </section>
      </div>
    </>
  );
}
