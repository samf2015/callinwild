import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown, type Components } from 'tinacms/dist/rich-text';
import type { ServiceQuery, ServiceQueryVariables } from '../../tina/__generated__/types';

type Props = { query: string; variables: ServiceQueryVariables; data: ServiceQuery };

const components: Components<{}> = {
  html: (props) => <div dangerouslySetInnerHTML={{ __html: props?.value ?? '' }} />,
  html_inline: (props) => <span dangerouslySetInnerHTML={{ __html: props?.value ?? '' }} />,
};

// A service's own page (e.g. /services/dispute-resolution). Markup mirrors the callinwild.com service pages;
// the team grid uses Team Profiles, linking to each person's profile page.
export default function ServicePageView(props: Props) {
  const { data } = useTina(props);
  const s = data.service;
  const team = (s.team ?? [])
    .map((t) => t?.profile)
    .filter((p) => p && p.__typename === 'Profile');

  return (
    <div className="callin-service-page">
      <div data-tina-field={tinaField(s, 'body')}>
        <TinaMarkdown content={s.body} components={components} />
      </div>

      {team.length > 0 && (
        <>
          {s.teamHeading && <h2 data-tina-field={tinaField(s, 'teamHeading')}>{s.teamHeading}</h2>}
          <div className="team" data-tina-field={tinaField(s, 'team')}>
            {team.map((person) =>
              person && person.__typename === 'Profile' ? (
                <div className="team-member" key={person._sys.filename}>
                  <a href={`/team/${person._sys.filename}`}>
                    <div
                      className="team-member-photo"
                      style={person.photo ? { background: `url(${person.photo})` } : undefined}
                    ></div>
                    <h3>{person.name}</h3>
                  </a>
                </div>
              ) : null,
            )}
          </div>
        </>
      )}
    </div>
  );
}
