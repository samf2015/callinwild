import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.GITHUB_BRANCH || 'main',
  // Tina Cloud project (app.tina.io). The client ID is public by design; the token is secret and is only
  // provided at build time via the TINA_TOKEN environment variable (a GitHub Actions secret), never committed.
  // `npm run dev` still uses local mode (no login, edits saved to these files).
  clientId: process.env.TINA_CLIENT_ID || '9b3a026a-9dcf-433b-81d8-bf8fabbfd40c',
  token: process.env.TINA_TOKEN || null,

  build: { outputFolder: 'admin', publicFolder: 'public' },
  media: { tina: { mediaRoot: 'images', publicFolder: 'public' } },

  schema: {
    collections: [
      {
        name: 'post',
        label: 'News',
        path: 'src/content/news',
        format: 'md',
        ui: {
          router: ({ document }) => `/news/${document._sys.filename}`,
          // New posts get a filename from the title, e.g. "Our New Office" -> our-new-office.md
          filename: {
            slugify: (values) =>
              (values?.title || 'new-post').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          },
          defaultItem: () => ({ date: new Date().toISOString() }),
        },
        fields: [
          { type: 'string', name: 'title', label: 'Headline', isTitle: true, required: true },
          { type: 'datetime', name: 'date', label: 'Publish Date', required: true },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Summary',
            description: 'Used for search engines and social sharing. Not shown on the page.',
            ui: { component: 'textarea' },
          },
          { type: 'rich-text', name: 'body', label: 'Article', isBody: true },
        ],
      },
      {
        name: 'profile',
        label: 'Team Profiles',
        path: 'src/content/team',
        format: 'md',
        ui: {
          router: ({ document }) => `/team/${document._sys.filename}`,
          filename: {
            slugify: (values) =>
              (values?.name || 'new-profile').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          },
        },
        fields: [
          { type: 'string', name: 'name', label: 'Name', isTitle: true, required: true },
          { type: 'string', name: 'role', label: 'Role', description: 'e.g. Senior Partner, or Advocate, Litigation' },
          {
            type: 'string',
            name: 'department',
            label: 'Department',
            description: 'Used for the filter buttons on the Our People page.',
            options: [
              { value: 'litigation', label: 'Dispute Resolution' },
              { value: 'commercial', label: 'Corporate & Commercial' },
              { value: 'private-client', label: 'Wills, Probate & Private Client' },
              { value: 'property', label: 'Property & Conveyancing' },
              { value: 'corporate-services', label: 'Corporate Services' },
              { value: 'support', label: 'Support' },
              { value: 'trainees', label: 'Trainees' },
            ],
          },
          {
            type: 'number',
            name: 'order',
            label: 'Order on Our People page',
            description: 'Lower numbers appear first.',
          },
          { type: 'image', name: 'photo', label: 'Photo' },
          { type: 'string', name: 'callDetails', label: 'Call to the Bar', description: 'e.g. Called to the Manx Bar · April 1988' },
          { type: 'string', name: 'phone', label: 'Phone' },
          { type: 'string', name: 'email', label: 'Email' },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Overview',
            isBody: true,
          },
          {
            type: 'string',
            name: 'expertise',
            label: 'Areas of expertise',
            list: true,
          },
          {
            type: 'object',
            name: 'instructions',
            label: 'Notable instructions',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Title' },
              { type: 'string', name: 'detail', label: 'Detail', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'recognition',
            label: 'Recognition',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Title', description: 'Shown in bold' },
              { type: 'string', name: 'detail', label: 'Detail' },
            ],
          },
          {
            type: 'object',
            name: 'relatedNews',
            label: 'Related news & insights',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.post?.split('/').pop()?.replace('.md', '') }) },
            fields: [{ type: 'reference', name: 'post', label: 'News story', collections: ['post'] }],
          },
        ],
      },
      {
        name: 'service',
        label: 'Services',
        path: 'src/content/services',
        format: 'md',
        ui: {
          // Each service has its own page at /services/<filename>; cards and the mega menu link to it
          router: ({ document }) => `/services/${document._sys.filename}`,
          filename: {
            slugify: (values) =>
              (values?.title || 'new-service').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
            description: 'Used on the service cards and in the mega menu.',
          },
          {
            type: 'string',
            name: 'summary',
            label: 'Summary',
            description: 'Shown on the service cards (homepage and Services page).',
            ui: { component: 'textarea' },
          },
          { type: 'number', name: 'order', label: 'Order', description: 'Lower numbers appear first.' },
          { type: 'string', name: 'pageTitle', label: 'Page banner title', description: 'Heading on this service\'s own page. Leave empty to use the Title.' },
          { type: 'image', name: 'bannerImage', label: 'Page banner image' },
          { type: 'rich-text', name: 'body', label: 'Page content', isBody: true },
          { type: 'string', name: 'teamHeading', label: 'Team heading', description: 'e.g. Our dispute resolution team' },
          {
            type: 'object',
            name: 'team',
            label: 'Team members',
            description: 'Picked from Team Profiles, so photos and names stay in sync with Our People.',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.profile?.split('/').pop()?.replace('.md', '') }) },
            fields: [{ type: 'reference', name: 'profile', label: 'Team member', collections: ['profile'] }],
          },
        ],
      },
      {
        name: 'servicesPage',
        label: 'Services Page',
        path: 'src/content/settings',
        format: 'md',
        match: { include: 'services-page' },
        ui: { allowedActions: { create: false, delete: false }, router: () => '/services' },
        fields: [
          { type: 'string', name: 'title', label: 'Banner title', required: true, isTitle: true },
          { type: 'rich-text', name: 'body', label: 'Introduction', isBody: true },
        ],
      },
      {
        name: 'megaMenu',
        label: 'Services Mega Menu',
        path: 'src/content/settings',
        format: 'md',
        match: { include: 'mega-menu' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Heading', isTitle: true, required: true, description: 'e.g. Legal' },
          { type: 'string', name: 'headingAccent', label: 'Heading (orange italic)', description: 'e.g. Services' },
          { type: 'string', name: 'intro', label: 'Introduction', ui: { component: 'textarea' } },
          { type: 'string', name: 'buttonLabel', label: 'Button label' },
          { type: 'string', name: 'buttonLink', label: 'Button link' },
          { type: 'string', name: 'practiceAreasHeading', label: 'Practice areas heading' },
          {
            type: 'object',
            name: 'practiceAreas',
            label: 'Practice areas',
            description:
              'In menu order (filling left to right). Names and links come from the Services collection. Hovering an area shows its own contacts.',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.service?.split('/').pop()?.replace('.md', '') }) },
            fields: [
              { type: 'reference', name: 'service', label: 'Service', collections: ['service'] },
              { type: 'string', name: 'contactsHeading', label: 'Contacts heading on hover', description: 'e.g. Key contacts Dispute Resolution' },
              {
                type: 'object',
                name: 'contacts',
                label: 'Contacts on hover',
                list: true,
                ui: { itemProps: (item) => ({ label: item?.profile?.split('/').pop()?.replace('.md', '') }) },
                fields: [{ type: 'reference', name: 'profile', label: 'Team member', collections: ['profile'] }],
              },
            ],
          },
          { type: 'string', name: 'contactsHeading', label: 'Default contacts heading', description: 'Shown when no practice area is hovered, e.g. Key contacts' },
          {
            type: 'object',
            name: 'contacts',
            label: 'Default contacts',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.profile?.split('/').pop()?.replace('.md', '') }) },
            fields: [{ type: 'reference', name: 'profile', label: 'Team member', collections: ['profile'] }],
          },
          { type: 'string', name: 'footerText', label: 'Footer text', description: 'e.g. Not sure where to start?' },
          { type: 'string', name: 'footerPhone', label: 'Footer phone' },
          { type: 'string', name: 'footerEmail', label: 'Footer email' },
        ],
      },
      {
        name: 'legalPage',
        label: 'Legal & Regulatory Page',
        path: 'src/content/settings',
        format: 'md',
        match: { include: 'legal-page' },
        ui: { allowedActions: { create: false, delete: false }, router: () => '/legal-regulatory' },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Banner title',
            isTitle: true,
            required: true,
            description: 'Press Enter to break the line in the banner.',
            ui: { component: 'textarea' },
          },
          { type: 'image', name: 'bannerImage', label: 'Banner image' },
          {
            type: 'object',
            name: 'links',
            label: 'Buttons',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.label }) },
            fields: [
              { type: 'string', name: 'label', label: 'Label' },
              { type: 'string', name: 'link', label: 'Link' },
            ],
          },
        ],
      },
      {
        name: 'legalDoc',
        label: 'Legal Pages',
        path: 'src/content/legal',
        format: 'md',
        ui: {
          // Each legal page lives at /legal-regulatory/<filename>
          router: ({ document }) => `/legal-regulatory/${document._sys.filename}`,
          filename: {
            slugify: (values) =>
              (values?.title || 'new-page').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Banner title',
            isTitle: true,
            required: true,
            description: 'Press Enter to break the line in the banner.',
            ui: { component: 'textarea' },
          },
          { type: 'image', name: 'bannerImage', label: 'Banner image' },
          { type: 'rich-text', name: 'body', label: 'Page content', isBody: true },
        ],
      },
      {
        name: 'contactPage',
        label: 'Contact Page',
        path: 'src/content/settings',
        format: 'md',
        match: { include: 'contact-page' },
        ui: { allowedActions: { create: false, delete: false }, router: () => '/contact' },
        fields: [
          { type: 'string', name: 'title', label: 'Banner title', isTitle: true, required: true },
          { type: 'image', name: 'bannerImage', label: 'Banner image' },
          { type: 'string', name: 'address', label: 'Address', description: 'One line per row.', ui: { component: 'textarea' } },
          { type: 'string', name: 'phone', label: 'Phone' },
          { type: 'string', name: 'email', label: 'Email' },
          { type: 'string', name: 'faxes', label: 'Fax numbers', list: true },
          { type: 'image', name: 'badgeImage', label: 'Badge image', description: 'e.g. the FraudNet logo' },
          { type: 'string', name: 'badgeLink', label: 'Badge link' },
          {
            type: 'string',
            name: 'mapUrl',
            label: 'Google Maps embed link',
            description: 'In Google Maps: Share → Embed a map → copy the src="…" address.',
          },
        ],
      },
      {
        name: 'homePage',
        label: 'Homepage',
        path: 'src/content/settings',
        format: 'md',
        match: { include: 'home-page' },
        ui: { allowedActions: { create: false, delete: false }, router: () => '/' },
        fields: [
          { type: 'string', name: 'heroHeading', label: 'Banner heading', isTitle: true, required: true },
          { type: 'image', name: 'heroImage', label: 'Banner image' },
          { type: 'string', name: 'welcomeHeading', label: 'Welcome heading' },
          { type: 'rich-text', name: 'body', label: 'Welcome text', isBody: true },
          {
            type: 'string',
            name: 'servicesHeading',
            label: 'Services heading',
            description: 'Heading above the service cards, here and on the Services page. The cards come from the Services collection.',
          },
          { type: 'string', name: 'peopleHeading', label: 'People heading' },
          {
            type: 'object',
            name: 'people',
            label: 'Featured people',
            description: 'Picked from Team Profiles, so photo, name and role stay in sync with Our People.',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.profile?.split('/').pop()?.replace('.md', '') }) },
            fields: [{ type: 'reference', name: 'profile', label: 'Team member', collections: ['profile'] }],
          },
          { type: 'string', name: 'peopleButtonLabel', label: 'People button label' },
        ],
      },
      {
        name: 'teamPage',
        label: 'Our People Page',
        path: 'src/content/settings',
        format: 'md',
        match: { include: 'team-page' },
        ui: { allowedActions: { create: false, delete: false } },
        fields: [
          { type: 'string', name: 'heading', label: 'Heading' },
          { type: 'string', name: 'intro', label: 'Introduction', description: 'Optional. Shown under the heading.', ui: { component: 'textarea' } },
        ],
      },
    ],
  },
});
