import { useTina, tinaField } from 'tinacms/dist/react';
import { TinaMarkdown } from 'tinacms/dist/rich-text';
import type { HomePageQuery, HomePageQueryVariables } from '../../tina/__generated__/types';
import ServiceCards, { type ServiceCard } from './ServiceCards';

type Props = { query: string; variables: HomePageQueryVariables; data: HomePageQuery; services: ServiceCard[] };

// Markup mirrors the V2 homepage proof (callin-wild-homepage.html)
export default function HomeView(props: Props) {
  const { data } = useTina(props);
  const home = data.homePage;
  const people = (home.people ?? [])
    .map((p) => p?.profile)
    .filter((p) => p && p.__typename === 'Profile');

  return (
    <>
      <section className="callin-section home-banner">
        <div className="container">
          <div className="home-banner-left">
            <div
              className="home-banner-img"
              style={home.heroImage ? { backgroundImage: `url(${home.heroImage})` } : undefined}
              data-tina-field={tinaField(home, 'heroImage')}
            ></div>
          </div>
          <div className="home-banner-right">
            <div className="home-banner-content">
              <h1 data-tina-field={tinaField(home, 'heroHeading')}>{home.heroHeading}</h1>
            </div>
          </div>
        </div>
      </section>

      <section className="callin-section calling-gradient-golden">
        <div className="container">
          <div className="welcome-intro">
            {home.welcomeHeading && <h2 data-tina-field={tinaField(home, 'welcomeHeading')}>{home.welcomeHeading}</h2>}
            <div data-tina-field={tinaField(home, 'body')}>
              <TinaMarkdown content={home.body} />
            </div>
          </div>
        </div>
      </section>

      <ServiceCards heading={home.servicesHeading} services={props.services} headingField={tinaField(home, 'servicesHeading')} />

      {people.length > 0 && (
        <section className="callin-section featured-people-section">
          <div className="container">
            <div className="featured-people-head">
              <div>
                <h2 data-tina-field={tinaField(home, 'peopleHeading')}>{home.peopleHeading}</h2>
              </div>
            </div>
            <div className="people-strip" data-tina-field={tinaField(home, 'people')}>
              {people.map((person) =>
                person && person.__typename === 'Profile' ? (
                  <a className="people-card" href={`/team/${person._sys.filename}`} key={person._sys.filename}>
                    <div className="people-photo">
                      {person.photo && <img src={person.photo} alt={person.name} />}
                      <span className="people-view">View profile &#8594;</span>
                    </div>
                    <h4>{person.name}</h4>
                    {person.role && <div className="people-title">{person.role}</div>}
                  </a>
                ) : null,
              )}
            </div>
            <div className="people-cta">
              <a className="btn" href="/team" data-tina-field={tinaField(home, 'peopleButtonLabel')}>
                {home.peopleButtonLabel || 'Meet the full team'}
              </a>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
