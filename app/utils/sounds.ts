// Ses efektleri - şimdilik devre dışı (ses dosyaları eklenince aktif edilebilir)

let soundsEnabled = false;

export function initSounds() {
  // Ses dosyaları public/sounds/ klasörüne eklenince
  // bu fonksiyon Howler.js ile sesleri yükleyecek
  if (typeof window === 'undefined') return;
  
  // Ses dosyaları mevcut değilse sessiz çalış
  soundsEnabled = false;
}

export function playSound(name: 'correct' | 'wrong' | 'tick' | 'gameOver' | 'hint') {
  if (!soundsEnabled) return;
  
  // Ses dosyaları eklenince:
  // sounds[name]?.play();
  console.log(`Sound: ${name}`);
}
