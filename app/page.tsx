import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  GitBranch as Github,
  GraduationCap,
  Compass,
  Mail,
  ArrowRight,
} from 'lucide-react';
import { profile, projects, posts } from '@/content/portfolio';
import { ReadingCard } from '@/components/reading-card';

const navigation = [
  ['gioi-thieu', 'Giới thiệu'],
  ['dinh-huong', 'Định hướng'],
  ['hoc-van', 'Học vấn'],
  ['projects', 'Projects'],
  ['blog', 'Blog'],
];
export default function Home() {
  const selected = projects.filter((p) => p.published);
  const articles = posts.filter((p) => p.published);
  return (
    <>
      <a className="skip-link" href="#main">
        Đi đến nội dung
      </a>
      <header className="header">
        <a className="wordmark" href="#">
          {profile.name}
          <span>.</span>
        </a>
        <nav aria-label="Điều hướng chính">
          {navigation.map(([id, label]) => (
            <a key={id} href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>
        <a
          className="github-link"
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label="Mở GitHub"
        >
          <Github size={19} />
          <span>GitHub</span>
          <ArrowUpRight size={15} />
        </a>
      </header>
      <main id="main">
        <section className="hero section" id="gioi-thieu">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> MỘT GÓC NHỎ TRÊN INTERNET
            </p>
            <h1>
              Xin chào,
              <br />
              mình là <span>{profile.name}.</span>
            </h1>
            <p className="hero-intro">{profile.intro}</p>
            <div className="hero-actions">
              <a className="button primary" href="#projects">
                Khám phá projects <ArrowUpRight size={18} />
              </a>
              <a className="text-link" href="#blog">
                Đọc blog <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-note">
              <span>Học hỏi.</span>
              <span>Thử nghiệm.</span>
              <span>Chia sẻ.</span>
            </div>
          </div>
          <aside className="profile-panel" aria-label="Đôi nét về mình">
            <div className="panel-top">
              <span>PERSONAL SPACE</span>
              <Code2 size={20} />
            </div>
            <div className="monogram" aria-hidden="true">
              {profile.name.slice(0, 2)}
              <span>↗</span>
            </div>
            <div className="panel-bottom">
              <p>{profile.tagline}</p>
              <div>
                <span>Luôn trong quá trình học hỏi</span>
                <span className="status-dot" />
              </div>
            </div>
          </aside>
          <a className="scroll-note" href="#dinh-huong">
            <ArrowDown size={15} /> Còn nhiều điều ở phía dưới
          </a>
        </section>
        <section className="about-grid section" id="dinh-huong">
          <div className="section-caption">
            <span className="section-number">01 / VỀ MÌNH</span>
            <h2>
              Đi từng bước.
              <br />
              Học thêm mỗi ngày.
            </h2>
          </div>
          <div>
            <p className="lead">{profile.about}</p>
            <div className="direction">
              <Compass size={23} />
              <div>
                <h3>Điều mình hướng đến</h3>
                <p>{profile.direction}</p>
              </div>
            </div>
            <div className="interests">
              {profile.interests.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </section>
        <section className="education-section section" id="hoc-van">
          <div className="section-caption">
            <span className="section-number">02 / HỌC VẤN</span>
            <h2>Nền tảng & hành trình</h2>
          </div>
          <div>
            {profile.education.map((item) => (
              <article className="education-item" key={item.school}>
                <div className="education-icon">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <p className="small-label">{item.period}</p>
                  <h3>{item.school}</h3>
                  <p>{item.major}</p>
                  <p className="education-note">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="projects-section section" id="projects">
          <div className="section-heading">
            <div>
              <span className="section-number">03 / PROJECTS</span>
              <h2>
                Từ ý tưởng đến thực tế<span className="green-dot">.</span>
              </h2>
            </div>
            <span className="section-aside">Một vài điều mình đã xây dựng</span>
          </div>
          <div className="project-grid">
            {selected.map((project, index) => (
              <article
                className={`project-card project-tone-${index % 3}`}
                key={project.id}
              >
                <div className="project-cover">
                  <span className="project-index">
                    PROJECT / {String(index + 1).padStart(2, '0')}
                  </span>
                  <Code2 size={26} />
                  <p>{project.coverLabel}</p>
                  <span className="cover-meta">{project.category}</span>
                </div>
                <div className="project-content">
                  <div className="project-title">
                    <h3>{project.title}</h3>
                    {project.example && (
                      <span className="sample-label">Mẫu</span>
                    )}
                  </div>
                  <p>{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <ReadingCard
                    title={project.title}
                    description={project.description}
                    paragraphs={project.content}
                    url={project.url}
                    label="Khám phá project"
                  />
                </div>
              </article>
            ))}
          </div>
          {!selected.length && (
            <p className="empty-state">
              Các project sẽ được chia sẻ tại đây khi sẵn sàng.
            </p>
          )}
        </section>
        <section className="blog-section section" id="blog">
          <div className="section-heading">
            <div>
              <span className="section-number">04 / BLOG</span>
              <h2>
                Ghi lại để hiểu sâu hơn<span className="green-dot">.</span>
              </h2>
            </div>
            <span className="section-aside">
              Những ghi chép trên hành trình học hỏi
            </span>
          </div>
          <div className="post-list">
            {articles.map((post, index) => (
              <article className="post-row" key={post.id}>
                <span className="post-number">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="post-copy">
                  <div className="post-meta">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.readingTime}</span>
                    {post.example && (
                      <span className="sample-label">Bài mẫu</span>
                    )}
                  </div>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </div>
                <ReadingCard
                  title={post.title}
                  description={post.description}
                  paragraphs={post.content}
                  label="Đọc bài viết"
                  compact
                />
              </article>
            ))}
          </div>
          {!articles.length && (
            <p className="empty-state">
              Những bài viết đầu tiên đang được chuẩn bị.
            </p>
          )}
        </section>
        <section className="contact section">
          <div>
            <p className="eyebrow">KẾT NỐI</p>
            <h2>
              Một cuộc trò chuyện,
              <br />
              một ý tưởng mới.
            </h2>
            <p>Mình luôn sẵn lòng trao đổi và học hỏi cùng bạn.</p>
          </div>
          <a
            className="button primary"
            href={profile.email ? `mailto:${profile.email}` : profile.github}
            target={profile.email ? undefined : '_blank'}
            rel="noreferrer"
          >
            {profile.email ? <Mail size={18} /> : <Github size={18} />}{' '}
            {profile.email ? 'Gửi lời chào' : 'Gặp nhau trên GitHub'}
            <ArrowUpRight size={18} />
          </a>
        </section>
      </main>
      <footer className="footer">
        <a className="wordmark" href="#">
          {profile.name}
          <span>.</span>
        </a>
        <span>
          © {new Date().getFullYear()} {profile.name}. Học hỏi và chia sẻ.
        </span>
        <a href="#">Về đầu trang ↑</a>
      </footer>
    </>
  );
}
