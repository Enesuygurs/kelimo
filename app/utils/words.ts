import wordsData from '~/assets/data/words.json';

// Türkçe Kelime Veritabanı - Parolla Tarzı
export interface WordData {
  word: string;
  meaning: string; // Kelimenin anlamı (soru olarak gösterilecek)
}

export const WORDS_DATABASE: Record<string, WordData[]> = wordsData as Record<string, WordData[]>;

// Türkçe alfabe (Parolla'daki gibi 26 harf)
export const TURKISH_ALPHABET = [
  'A', 'B', 'C', 'Ç', 'D', 'E', 'F', 'G', 'H', 'İ', 
  'K', 'L', 'M', 'N', 'O', 'Ö', 'P', 'R', 'S', 'Ş', 
  'T', 'U', 'Ü', 'V', 'Y', 'Z'
];

// Günün tarihine göre kelime seç
export function getTodaysWords(): Record<string, WordData> {
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

// Rastgele kelimeler seç (Limitsiz mod için)
export function getRandomWords(): Record<string, WordData> {
  const randomWords: Record<string, WordData> = {};
  
  TURKISH_ALPHABET.forEach(letter => {
    const words = WORDS_DATABASE[letter];
    
    if (words && words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const word = words[randomIndex];
      if (word) {
        randomWords[letter] = word;
      }
    }
  });
  
  return randomWords;
}

// Kelimeyi normalize et (Türkçe karakterleri dönüştür)
export function normalizeWord(word: string): string {
  return word.toUpperCase()
    .replace(/İ/g, 'I')
    .replace(/Ş/g, 'S')
    .replace(/Ğ/g, 'G')
    .replace(/Ü/g, 'U')
    .replace(/Ö/g, 'O')
    .replace(/Ç/g, 'C')
    .replace(/ı/g, 'I')
    .replace(/ş/g, 'S')
    .replace(/ğ/g, 'G')
    .replace(/ü/g, 'U')
    .replace(/ö/g, 'O')
    .replace(/ç/g, 'C');
}
