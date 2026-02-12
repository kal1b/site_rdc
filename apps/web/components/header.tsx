import Link from 'next/link';

const sections = ['О площадке','Программы и смены','Цены/Путёвки','Документы','Сотрудники/Преподаватели','Инфраструктура','Фото и видео','Как добраться/Контакты','FAQ'];

export function Header({ camps }: { camps: any[] }) {
  const visible = camps.slice(0, 4);
  const extra = camps.slice(4);
  return (
    <header className="sticky top-0 bg-white/95 border-b z-10">
      <div className="max-w-6xl mx-auto p-4 flex items-center gap-4">
        <Link href="/" className="font-semibold">РДЦ Восток-28</Link>
        <nav className="flex-1 flex gap-3 text-sm">
          {visible.map((camp) => (
            <div key={camp.id} className="group relative">
              <Link href={`/camps/${camp.slug}`} className="px-3 py-2 hover:bg-slate-100 rounded-xl">{camp.name}</Link>
              <div className="hidden group-hover:grid absolute top-full left-0 bg-white shadow rounded-2xl p-4 grid-cols-2 w-[420px] gap-2">
                {sections.map((s) => <Link key={s} href={`/camps/${camp.slug}#${encodeURIComponent(s)}`} className="text-sm hover:underline">{s}</Link>)}
              </div>
            </div>
          ))}
          {extra.length > 0 && <span className="px-3 py-2">Ещё ({extra.length})</span>}
        </nav>
        <div className="flex gap-2 text-sm">
          <Link href="/shifts">Выбрать смену</Link>
          <Link href="/application">Подать заявку</Link>
          <Link href="/lk">Личный кабинет</Link>
        </div>
      </div>
    </header>
  );
}
