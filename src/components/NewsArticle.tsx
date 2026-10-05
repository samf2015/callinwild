import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown, type Components } from 'tinacms/dist/rich-text';
import type { PostQuery, PostQueryVariables } from '../../tina/__generated__/types';

type Props = { query: string; variables: PostQueryVariables; data: PostQuery; url: string };

// Raw HTML kept from the old site (e.g. the circular team photos) is rendered as-is
const components: Components<{}> = {
  html: (props) => <div dangerouslySetInnerHTML={{ __html: props?.value ?? '' }} />,
  html_inline: (props) => <span dangerouslySetInnerHTML={{ __html: props?.value ?? '' }} />,
};

export default function NewsArticle(props: Props) {
  const { data } = useTina(props);
  const post = data.post;
  const date = post.date
    ? new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : '';
  const url = encodeURIComponent(props.url);
  const title = encodeURIComponent(post.title);

  return (
    <>
      <div className="callin-news-details">
        <a href="/news" className="callin-news-details-back">Back to News &amp; Insights</a>
        <div className="callin-news-details-date" data-tina-field={tinaField(post, 'date')}>{date}</div>
        <h3 className="callin-news-details-title" data-tina-field={tinaField(post, 'title')}>{post.title}</h3>
        <div data-tina-field={tinaField(post, 'body')}>
          <TinaMarkdown content={post.body} components={components} />
        </div>
      </div>
      <div className="callin-news-social">
        <h4 className="callin-news-social-title">Share</h4>
        <a href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`} target="_blank" rel="noopener" className="share-twitter" aria-label="Share on X"></a>
        <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`} target="_blank" rel="noopener" className="share-linkedin" aria-label="Share on LinkedIn"></a>
        <a href={`mailto:?subject=${title}&body=${url}`} className="share-email" aria-label="Share by email"></a>
      </div>
    </>
  );
}
