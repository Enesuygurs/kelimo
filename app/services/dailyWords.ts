// Günlük Kelime Servisi - Uzak sunucudan veri çeker
import { WORDS_DATABASE, TURKISH_ALPHABET, type WordData } from '~/utils/words';

// API endpoint - GitHub raw URL veya kendi sunucun
const API_URL = 'https://raw.githubusercontent.com/USER/kelimo-data/main/gunluk.json';

// Cache key for localStorage
const CACHE_KEY = 'kelimo_daily_words';
const CACHE_DATE_KEY = 'kelimo_daily_date';

// Bugünün tarihini YYYY-MM-DD formatında al (cache için)
function getTodayDateString(): string {
  const today = new Date();
  return `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
}

// Cache'den günlük kelimeleri al
function getCachedWords(): Record<string, WordData> | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
    const today = getTodayDateString();
    
    // Aynı gün içinde cache'i kullan
    if (cachedDate === today) {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        return JSON.parse(cached);
      }
    }
  } catch (e) {
    console.warn('Cache okuma hatası:', e);
  }
  
  return null;
}

// Cache'e kaydet
function cacheWords(words: Record<string, WordData>): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(words));
    localStorage.setItem(CACHE_DATE_KEY, getTodayDateString());
  } catch (e) {
    console.warn('Cache yazma hatası:', e);
  }
}

// Local fallback - Eğer API yoksa local veritabanından seç
function getLocalFallbackWords(): Record<string, WordData> {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  
  const todaysWords: Record<string, WordData> = {};
  
  TURKISH_ALPHABET.forEach(letter => {
    const words = WORDS_DATABASE[letter];
    
    if (words && words.length > 0) {
      const index = dayOfYear % words.length;
      const word = words[index];
      if (word) {
        todaysWords[letter] = word;
      }
    }
  });
  
  return todaysWords;
}

// Ana fonksiyon: Günlük kelimeleri al
export async function fetchDailyWords(): Promise<Record<string, WordData>> {
  // 1. Önce cache kontrol et (aynı gün tekrar çekme)
  const cached = getCachedWords();
  if (cached) {
    console.log('📦 Günlük kelimeler cache\'den yüklendi');
    return cached;
  }
  
  // 2. API'den çekmeyi dene
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      const words: Record<string, WordData> = await response.json();
      
      // Veri geçerliliğini kontrol et
      if (words && Object.keys(words).length > 0) {
        cacheWords(words);
        console.log('🌐 Günlük kelimeler API\'den yüklendi');
        return words;
      }
    }
  } catch (error) {
    console.warn('API\'den veri çekilemedi:', error);
  }
  
  // 3. Fallback: Local veritabanından al
  console.log('📱 Günlük kelimeler local veritabanından yüklendi');
  const fallbackWords = getLocalFallbackWords();
  cacheWords(fallbackWords);
  
  return fallbackWords;
}
