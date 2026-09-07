import { MapPin, Mail, FileText, ArrowUpRight, Building2 } from 'lucide-react';
import { getSite, getUI } from '@/lib/i18n';
import { localePath, type Locale } from '@/lib/locale';
import { safeLink } from '@/lib/content';
import { SocialIcon } from '@/components/social-icon';
export function ProfileSidebar({ locale }: { locale: Locale }) {
  const site = getSite(locale),
    ui = getUI(locale);
  const avatar = safeLink(site.avatar);
  return (
    <aside className="profile-sidebar" aria-label={ui.profile}>
      <div className="profile-identity">
        {avatar ? (
          <img
            className="profile-photo"
            src={avatar}
            alt={site.avatarAlt || site.name}
            width={176}
            height={176}
          />
        ) : (
          <div className="profile-initials" aria-hidden="true">
            {site.name.slice(0, 2)}
          </div>
        )}
        <div>
          <a className="profile-name" href={localePath(locale)}>
            {site.name}
          </a>
          {site.role && <p className="profile-role">{site.role}</p>}
          {site.affiliation && (
            <p className="profile-affiliation">
              <Building2 size={15} />
              {site.affiliation}
            </p>
          )}
        </div>
      </div>
      <ul className="profile-links">
        {site.location && (
          <li>
            <MapPin size={16} />
            <span>{site.location}</span>
          </li>
        )}
        {site.cv && safeLink(site.cv) && (
          <li>
            <FileText size={16} />
            <a href={safeLink(site.cv)} target="_blank" rel="noreferrer">
              {ui.cv} <ArrowUpRight size={12} />
            </a>
          </li>
        )}
        {site.socials
          .filter((link) => safeLink(link.url))
          .map((link) => (
            <li key={link.label}>
              <SocialIcon url={link.url} />
              <a href={safeLink(link.url)} target="_blank" rel="noreferrer">
                {link.label}
              </a>
            </li>
          ))}
        {site.email && (
          <li>
            <Mail size={16} />
            <a href={`mailto:${site.email}`}>{ui.email}</a>
          </li>
        )}
      </ul>
    </aside>
  );
}
