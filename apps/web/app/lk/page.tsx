'use client';
import { useState } from 'react';
const API=process.env.NEXT_PUBLIC_API_URL||'http://localhost:3001';
export default function Lk(){const [res,setRes]=useState('');return <div className='card'><h1 className='text-xl mb-3'>Личный кабинет</h1><button className='px-3 py-2 rounded-xl bg-slate-900 text-white' onClick={async()=>{const r=await fetch(`${API}/payments/test/succeed`,{method:'POST',headers:{'content-type':'application/json','authorization':'Bearer test'},body:JSON.stringify({paymentId:'demo'})});setRes(String(r.status));}}>Оплатить (dev)</button><p>{res}</p></div>}
