import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown, type Components } from 'tinacms/dist/rich-text';
import type { LegalDocQuery, LegalDocQueryVariables } from '../../tina/__generated__/types';

type Props = { query: string; variables: LegalDocQueryVariables; data: LegalDocQuery };

// HTML kept from the live pages (roman-numeral lists, the complaints table, button links) is rendered as-is
const components: Components<{}> = {
  html: (props) => <div dangerouslySetInnerHTML={{ __html: props?.value ?? '' }} />,
  html_inline: (props) => <span dangerouslySetInnerHTML={{ __html: props?.value ?? '' }} />,
};

// A legal page (e.g. /legal-regulatory/privacy-policy). Styles: .callin-terms in callin.css
export default function LegalDocView(props: Props) {
  const { data } = useTina(props);
  return (
    <div className="callin-legal-doc" data-tina-field={tinaField(data.legalDoc, 'body')}>
      <TinaMarkdown content={data.legalDoc.body} components={components} />
    </div>
  );
}
