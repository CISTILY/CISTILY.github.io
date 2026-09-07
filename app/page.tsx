import { getAbout } from '@/lib/content';
const sections = [
  ['research-interests', 'Research Interests'],
  ['background', 'Background'],
  ['contact', 'Contact'],
] as const;
export default function AboutPage() {
  return (
    <>
      <header className="page-heading">
        <span className="page-kicker">A LITTLE ABOUT ME</span>
        <h1>About</h1>
      </header>
      <div className="about-sections">
        {sections.map(([id, title]) => (
          <section className="about-section" id={id} key={id}>
            <h2>{title}</h2>
            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: getAbout(id) }}
            />
            {id === 'research-interests' && (
              <a className="inline-link" href="/research/">
                Khám phá các nghiên cứu <span aria-hidden="true">→</span>
              </a>
            )}
          </section>
        ))}
      </div>
    </>
  );
}
