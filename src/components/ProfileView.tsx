import { useEffect, useState } from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { ProfileQuery, ProfileQueryVariables } from '../../tina/__generated__/types';

type Props = { query: string; variables: ProfileQueryVariables; data: ProfileQuery };

const FIRM_PHONE = '+44 (0) 1624 623195';
const FIRM_EMAIL = 'mail@callinwild.com';

const formatDate = (d?: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }) : '';

function downloadVCard(name: string, role?: string | null, phone?: string | null, email?: string | null) {
  const [first, ...rest] = name.split(' ');
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${rest.join(' ')};${first};;;`,
    `FN:${name}`,
    'ORG:Callin Wild',
    role ? `TITLE:${role}` : '',
    phone ? `TEL;TYPE=WORK,VOICE:${phone.replace(/[^\d+]/g, '')}` : '',
    email ? `EMAIL;TYPE=WORK:${email}` : '',
    'URL:https://www.callinwild.com',
    'END:VCARD',
  ].filter(Boolean);
  const blob = new Blob([lines.join('\r\n')], { type: 'text/vcard' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.vcf`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function ProfileView(props: Props) {
  const { data } = useTina(props);
  const p = data.profile;
  const firstName = p.name.split(' ')[0];

  const instructions = (p.instructions ?? []).filter(Boolean);
  const recognition = (p.recognition ?? []).filter(Boolean);
  const expertise = (p.expertise ?? []).filter(Boolean);
  const news = (p.relatedNews ?? []).map((n) => n?.post).filter((post) => post && post.__typename === 'Post');
  const hasOverview = Boolean(p.body?.children?.length);

  // Jump links only for sections that have content
  const sections = [
    { id: 'sec-overview', label: 'Overview', show: hasOverview },
    { id: 'sec-expertise', label: 'Expertise', show: expertise.length > 0 },
    { id: 'sec-instructions', label: 'Notable instructions', show: instructions.length > 0 },
    { id: 'sec-recognition', label: 'Recognition', show: recognition.length > 0 },
    { id: 'sec-news', label: 'News', show: news.length > 0 },
  ].filter((s) => s.show);

  const [open, setOpen] = useState<number[]>([0]);
  const toggle = (i: number) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  const [current, setCurrent] = useState<string | null>(null);
  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 220;
      let found: string | null = null;
      sections.forEach((s) => {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= pos) found = s.id;
      });
      setCurrent(found);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [sections.map((s) => s.id).join()]);

  return (
    <div id="screen-profile">
      <div className="frame">
        <div className="p-hero">
          <div className="p-photo" data-tina-field={tinaField(p, 'photo')}>
            {p.photo && <img src={p.photo} alt={p.name} />}
          </div>
          <div className="p-info">
            <h1 data-tina-field={tinaField(p, 'name')}>{p.name}</h1>
            {p.role && <div className="p-role" data-tina-field={tinaField(p, 'role')}>{p.role}</div>}
            {p.callDetails && <div className="p-call" data-tina-field={tinaField(p, 'callDetails')}>{p.callDetails}</div>}
            <div className="p-contact">
              <span data-tina-field={tinaField(p, 'phone')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.7a2 2 0 0 1-.5 2.1L8 9.7a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.5 2.7.6a2 2 0 0 1 1.7 2z" /></svg>
                {p.phone || FIRM_PHONE}
              </span>
              <span data-tina-field={tinaField(p, 'email')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m2 7 10 6 10-6" /></svg>
                {p.email || FIRM_EMAIL}
              </span>
            </div>
            <div className="p-cta">
              <a className="btn-solid" href={`mailto:${p.email || FIRM_EMAIL}`}>Email {firstName}</a>
              <button
                className="btn-ghost"
                type="button"
                onClick={() => downloadVCard(p.name, p.role, p.phone || FIRM_PHONE, p.email || FIRM_EMAIL)}
              >
                Download vCard
              </button>
            </div>
          </div>
        </div>
      </div>

      {sections.length > 0 && (
        <nav className="jump">
          <div className="frame jump-in">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={current === s.id ? 'is-current' : undefined}>{s.label}</a>
            ))}
          </div>
        </nav>
      )}

      <div className="frame">
        {hasOverview && (
          <div className="p-section" id="sec-overview" data-tina-field={tinaField(p, 'body')}>
            <h3>Overview</h3>
            <TinaMarkdown content={p.body} />
          </div>
        )}

        {expertise.length > 0 && (
          <div className="p-section" id="sec-expertise">
            <h3>Areas of expertise</h3>
            <div className="tag-row" data-tina-field={tinaField(p, 'expertise')}>
              {expertise.map((tag, i) => <span className="tag" key={i}>{tag}</span>)}
            </div>
          </div>
        )}

        {instructions.length > 0 && (
          <div className="p-section" id="sec-instructions">
            <h3>Notable instructions</h3>
            <div className="accordion">
              {instructions.map((item, i) => (
                <div className={`acc-item${open.includes(i) ? ' is-open' : ''}`} key={i} data-tina-field={tinaField(item!)}>
                  <button className="acc-trigger" type="button" onClick={() => toggle(i)} aria-expanded={open.includes(i)}>
                    <h4>{item!.title}</h4>
                    <span className="acc-icon"></span>
                  </button>
                  <div className="acc-panel">
                    <div className="acc-panel-in">{item!.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {recognition.length > 0 && (
          <div className="p-section" id="sec-recognition">
            <h3>Recognition</h3>
            <ul className="rec-list">
              {recognition.map((item, i) => (
                <li key={i} data-tina-field={tinaField(item!)}>
                  <span><strong>{item!.title}</strong>{item!.detail && <> &mdash; {item!.detail}</>}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {news.length > 0 && (
          <div className="p-section" id="sec-news">
            <h3>Related news &amp; insights</h3>
            <div className="news-grid" data-tina-field={tinaField(p, 'relatedNews')}>
              {news.map((post) =>
                post && post.__typename === 'Post' ? (
                  <div className="news-card" key={post._sys.filename}>
                    <span className="news-date">{formatDate(post.date)}</span>
                    <h5>{post.title}</h5>
                    <a href={`/news/${post._sys.filename}`}>Read more</a>
                  </div>
                ) : null,
              )}
            </div>
          </div>
        )}
      </div>

      <div className="p-foot">
        <div className="frame p-foot-in">
          <span>Not sure where to start? <strong>{FIRM_PHONE}</strong></span>
          <a href={`mailto:${FIRM_EMAIL}`}>{FIRM_EMAIL}</a>
        </div>
      </div>
    </div>
  );
}
