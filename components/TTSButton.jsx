import { useApp } from '@/context/AppContext';

export default function TTSButton({ text, label='🔊 Hear it' }){
  const { quiet } = useApp();
  const speak = () => {
    if (typeof window === 'undefined') return;
    const u = new SpeechSynthesisUtterance(text);
    u.rate = quiet ? 0.85 : 0.95;
    u.pitch = 1.0;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  };
  return <button className="btn ghost" onClick={speak}>{label}</button>;
}
