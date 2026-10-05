import client from '../../tina/__generated__/client';
import type { ServiceCard } from '../components/ServiceCards';

// All services from the Services collection, in their set order. Used by the homepage, the Services page and the mega menu.
export async function getServices(): Promise<ServiceCard[]> {
  const result = await client.queries.serviceConnection({ first: 1000 });
  return (result.data.serviceConnection.edges ?? [])
    .map((edge) => edge?.node)
    .filter((s) => s !== null && s !== undefined)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.title.localeCompare(b.title))
    .map((s) => ({ title: s.title, summary: s.summary, link: `/services/${s._sys.filename}` }));
}
