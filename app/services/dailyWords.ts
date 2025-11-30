// Günlük Kelime Servisi - Uzak sunucudan veri çeker
import { WORDS_DATABASE, TURKISH_ALPHABET, type WordData } from '~/utils/words';

// API endpoint - GitHub Gist, kendi sunucun veya başka bir kaynak kullanabilirsin
// Format: Her gün için YYYY-MM-DD.json dosyası
const API_BASE_URL = 'https://raw.githubusercontent.com/USER/kelimo-data/main/daily';

// Cache key for localStorage
const CACHE_KEY = 'kelimo_daily_words';
const CACHE_DATE_KEY = 'kelimo_daily_date';

export interface DailyWordsResponse {
  date: string;
  words: Record<string, WordData>;
}

// Bugünün tarihini YYYY-MM-DD formatında al
export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Cache'den günlük kelimeleri al
function getCachedWords(): DailyWordsResponse | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const cachedDate = localStorage.getItem(CACHE_DATE_KEY);
    const today = getTodayDateString();
    
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
function cacheWords(data: DailyWordsResponse): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    localStorage.setItem(CACHE_DATE_KEY, data.date);
  } catch (e) {
    console.warn('Cache yazma hatası:', e);
  }
}

// Local fallback - Eğer API yoksa veya hata olursa local veritabanından seç
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

// Ana fonksiyon: Günlük kelimeleri al (önce cache, sonra API, fallback local)
export async function fetchDailyWords(): Promise<Record<string, WordData>> {
  const today = getTodayDateString();
  
  // 1. Önce cache kontrol et
  const cached = getCachedWords();
  if (cached && cached.date === today) {
    console.log('📦 Günlük kelimeler cache\'den yüklendi');
    return cached.words;
  }
  
  // 2. API'den çekmeyi dene
  try {
    const response = await fetch(`${API_BASE_URL}/${today}.json`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // 5 saniye timeout
      signal: AbortSignal.timeout(5000)
    });
    
    if (response.ok) {
      const data: DailyWordsResponse = await response.json();
      
      // Veri geçerliliğini kontrol et
      if (data.words && Object.keys(data.words).length > 0) {
        cacheWords(data);
        console.log('🌐 Günlük kelimeler API\'den yüklendi');
        return data.words;
      }
    }
  } catch (error) {
    console.warn('API\'den veri çekilemedi:', error);
  }
  
  // 3. Fallback: Local veritabanından al
  console.log('📱 Günlük kelimeler local veritabanından yüklendi (fallback)');
  const fallbackWords = getLocalFallbackWords();
  
  // Fallback'i de cache'le
  cacheWords({
    date: today,
    words: fallbackWords
  });
  
  return fallbackWords;
}

// API URL'ini değiştirmek için (ayarlardan vs.)
export function setApiBaseUrl(url: string): void {
  // Bu fonksiyon ileride ayarlar ekranından URL değiştirmek için kullanılabilir
  console.log('API URL güncellendi:', url);
}
