const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export async function getCamps() { return fetch(`${API}/camps`, { cache: 'no-store' }).then(r => r.json()); }
export async function getShifts(params = '') { return fetch(`${API}/shifts${params}`, { cache: 'no-store' }).then(r => r.json()); }
