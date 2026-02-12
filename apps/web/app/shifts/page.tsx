import { getShifts } from '@/lib/api';
export default async function Shifts({ searchParams }: { searchParams: any }) {
  const q = new URLSearchParams();
  if (searchParams.campSlug) q.set('campSlug', searchParams.campSlug);
  if (searchParams.age) q.set('age', searchParams.age);
  const shifts = await getShifts(q.toString() ? `?${q.toString()}` : '');
  return <div className="space-y-3">{shifts.map((s:any)=><div className="card" key={s.id}>{s.title} | {s.camp.slug} | {s.ageMin}-{s.ageMax}</div>)}</div>;
}
