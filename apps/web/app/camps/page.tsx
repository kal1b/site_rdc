import { getCamps } from '@/lib/api';
export default async function CampsPage(){const camps=await getCamps();return <div className="grid md:grid-cols-3 gap-4">{camps.map((c:any)=><div key={c.id} className="card">{c.name}</div>)}</div>}
