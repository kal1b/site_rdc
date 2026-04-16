import './globals.css';
import { Header } from '@/components/header';
import { getCamps } from '@/lib/api';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const camps = await getCamps();
  return (
    <html lang="ru"><body>
      <Header camps={camps} />
      <main className="max-w-6xl mx-auto p-6 space-y-6">{children}</main>
      <footer className="max-w-6xl mx-auto p-6 text-sm text-slate-500">© РДЦ Восток-28</footer>
    </body></html>
  );
}
