import { Fragment } from 'react';
import { useTina, tinaField } from 'tinacms/dist/react';
import type { ContactPageQuery, ContactPageQueryVariables } from '../../tina/__generated__/types';

type Props = { query: string; variables: ContactPageQueryVariables; data: ContactPageQuery };

// Markup mirrors callinwild.com/contact.html (styles: .callin-contact in callin.css)
export default function ContactView(props: Props) {
  const { data } = useTina(props);
  const c = data.contactPage;
  const lines = (c.address ?? '').split('\n').filter((l) => l.trim());
  const faxes = (c.faxes ?? []).filter(Boolean);

  return (
    <div className="callin-contact-inner">
      <div className="callin-contact-left">
        {lines.length > 0 && (
          <p data-tina-field={tinaField(c, 'address')}>
            {lines.map((line, i) => (
              <Fragment key={i}>{i > 0 && <br />}{line}</Fragment>
            ))}
          </p>
        )}
        {c.phone && (
          <p>
            <a href={`tel:${c.phone.replace(/\(0\)|[^\d+]/g, '')}`} className="call" data-tina-field={tinaField(c, 'phone')}>{c.phone}</a>
          </p>
        )}
        {c.email && (
          <p>
            <a href={`mailto:${c.email}`} className="email" data-tina-field={tinaField(c, 'email')}>{c.email}</a>
          </p>
        )}
        {faxes.map((fax, i) => (
          <p key={i}>
            <a className="fax" data-tina-field={tinaField(c, 'faxes', i)}>{fax}</a>
          </p>
        ))}
        {c.badgeImage && (
          <p data-tina-field={tinaField(c, 'badgeImage')}>
            <a href={c.badgeLink ?? undefined} target="_blank" rel="noopener">
              <img src={c.badgeImage} alt="Report fraud to FraudNet" width={195} />
            </a>
          </p>
        )}
      </div>
      <div className="callin-contact-right" data-tina-field={tinaField(c, 'mapUrl')}>
        {c.mapUrl && (
          <iframe
            src={c.mapUrl}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Map showing Callin Wild's office"
          ></iframe>
        )}
      </div>
    </div>
  );
}
