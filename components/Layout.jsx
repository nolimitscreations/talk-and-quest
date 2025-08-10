import Link from 'next/link';
import { useApp } from '@/context/AppContext';

export default function Layout({ children }) {
  const { profile, setProfile, quiet, setQuiet } = useApp();

  return (
    <div className="container">
      <div className="header">
        <div className="flex">
          <Link href="/"><span style={{fontWeight:800, fontSize:18, cursor:'pointer'}}>Talk & Quest</span></Link>
          <span className="badge">{quiet ? 'quiet mode' : 'gentle practice'}</span>
        </div>
        <div className="flex" style={{gap:8}}>
          <select value={profile} onChange={e=>setProfile(e.target.value)}>
            <option>Samuel</option>
            <option>Spencer</option>
            <option>Guest</option>
          </select>
          <button className="btn ghost" onClick={()=>setQuiet(!quiet)}>{quiet ? '🔕 Quiet' : '🔔 Normal'}</button>
          <Link href="/dashboard"><button className="btn">Dashboard</button></Link>
        </div>
      </div>
      {children}
      <footer>Made with calm vibes for Samuel & Spencer • Local-first • No pressure</footer>
    </div>
  );
}
