import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { ServicesPageQuery, ServicesPageQueryVariables } from '../../tina/__generated__/types';

type Props = { query: string; variables: ServicesPageQueryVariables; data: ServicesPageQuery };

// Services page introduction. The service cards below it are the shared ServiceCards section.
export default function ServicesView(props: Props) {
  const { data } = useTina(props);
  const page = data.servicesPage;

  return (
    <div data-tina-field={tinaField(page, 'body')}>
      <TinaMarkdown content={page.body} />
    </div>
  );
}
