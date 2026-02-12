'use client';
import { useState } from 'react';
export default function ApplicationPage(){const [msg,setMsg]=useState('Шаг 1: выбор смены');return <div className='card space-y-2'><h1 className='text-xl'>Мастер заявки</h1><p>{msg}</p><button className='px-3 py-2 rounded-xl bg-slate-900 text-white' onClick={()=>setMsg('Шаг 2: данные и документы')}>Далее</button></div>}
