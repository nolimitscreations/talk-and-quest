export function loadSettings(){
  if (typeof window === 'undefined') return { profile:'Samuel', quiet:false };
  try {
    const raw = localStorage.getItem('tq_settings');
    return raw ? JSON.parse(raw) : { profile:'Samuel', quiet:false };
  } catch {
    return { profile:'Samuel', quiet:false };
  }
}
