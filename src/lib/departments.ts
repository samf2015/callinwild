// Departments for team profiles (matches the options in tina/config.ts).
// `filter` controls which ones get a button on the Our People page; the V2 design shows the first five.
export const DEPARTMENTS = [
  { id: 'litigation', label: 'Dispute Resolution', filter: true },
  { id: 'commercial', label: 'Corporate & Commercial', filter: true },
  { id: 'private-client', label: 'Wills, Probate & Private Client', filter: true },
  { id: 'property', label: 'Property & Conveyancing', filter: true },
  { id: 'corporate-services', label: 'Corporate Services', filter: true },
  { id: 'support', label: 'Support', filter: false },
  { id: 'trainees', label: 'Trainees', filter: false },
];
