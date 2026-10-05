import { useTina, tinaField } from 'tinacms/dist/react';
import type { LegalPageQuery, LegalPageQueryVariables } from '../../tina/__generated__/types';

type Props = { query: string; variables: LegalPageQueryVariables; data: LegalPageQuery };

// Markup mirrors callinwild.com/legal-regulatory.html (styles: .link-list and a.btn in callin.css)
export default function LegalView(props: Props) {
  const { data } = useTina(props);
  const links = (data.legalPage.links ?? []).filter(Boolean);

  return (
    <ul className="link-list" data-tina-field={tinaField(data.legalPage, 'links')}>
      {links.map((item, i) => (
        <li key={i}>
          <a className="btn" href={item!.link ?? '#'}>{item!.label}</a>
        </li>
      ))}
    </ul>
  );
}
