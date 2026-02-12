import Link from 'next/link';
import { getCamps, getShifts } from '@/lib/api';

export default async function Home() {
  const [camps, shifts] = await Promise.all([getCamps(), getShifts()]);
  return <div className="space-y-6">
    <section className="card"><h1 className="text-3xl font-semibold">Региональный детский центр Благовещенского округа</h1></section>
    <section className="grid md:grid-cols-3 gap-4">{camps.map((c:any)=><Link key={c.id} href={`/camps/${c.slug}`} className="card">{c.name}</Link>)}</section>
    <section className="space-y-3"><h2 className="text-xl">Ближайшие смены</h2>{shifts.map((s:any)=><div className="card" key={s.id}>{s.title} — {s.camp.name}</div>)}</section>
  </div>;
}
