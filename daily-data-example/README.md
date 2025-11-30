# Kelimo Günlük Veri API Rehberi

## 🎯 Nasıl Çalışır?

Kelimo uygulaması günlük kelime oyunu için dış bir kaynaktan veri çekebilir. Bu sayede her gün farklı kelimeler sunabilirsin.

## 📁 Veri Formatı

Her günün verisi ayrı bir JSON dosyasında tutulur. Dosya adı `YYYY-MM-DD.json` formatındadır.

### Örnek: `2025-12-01.json`
```json
{
  "date": "2025-12-01",
  "words": {
    "A": { "word": "ANAHTAR", "meaning": "Kapıları açmak için kullanılan metal alet" },
    "B": { "word": "BAHÇE", "meaning": "Ev çevresinde çiçek ve bitki yetiştirilen alan" },
    ...
    "Z": { "word": "ZAMAN", "meaning": "Olayların sırasını belirleyen kavram" }
  }
}
```

## 🌐 Hosting Seçenekleri

### 1. GitHub Repository (Önerilen - Ücretsiz)
1. `kelimo-data` adında yeni bir GitHub repo oluştur
2. `daily/` klasörü altına günlük JSON dosyalarını yükle
3. URL formatı: `https://raw.githubusercontent.com/USERNAME/kelimo-data/main/daily/2025-12-01.json`

### 2. GitHub Gist
1. Her gün için yeni bir Gist oluştur
2. Raw URL'i kullan

### 3. Kendi Sunucun
Herhangi bir web sunucusunda JSON dosyalarını host edebilirsin.

## ⚙️ Uygulama Ayarları

`app/services/dailyWords.ts` dosyasında API URL'ini güncelle:

```typescript
const API_BASE_URL = 'https://raw.githubusercontent.com/SENIN_USERNAME/kelimo-data/main/daily';
```

## 🔄 Fallback Mekanizması

Eğer API'den veri çekilemezse (internet yok, dosya eksik vs.), uygulama otomatik olarak local veritabanından (`app/assets/data/words.json`) kelime seçer.

## 📅 Günlük Veri Hazırlama Scripti

Birden fazla gün için veri hazırlamak istersen:

```javascript
// generateDaily.js
const fs = require('fs');

const words = require('./words.json'); // Tam kelime havuzu

function generateDailyData(date) {
  const dailyWords = {};
  const alphabet = ['A','B','C','Ç','D','E','F','G','H','İ','K','L','M','N','O','Ö','P','R','S','Ş','T','U','Ü','V','Y','Z'];
  
  // Her harf için rastgele bir kelime seç
  const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
  
  alphabet.forEach(letter => {
    const letterWords = words[letter];
    if (letterWords && letterWords.length > 0) {
      const index = (dayOfYear + letter.charCodeAt(0)) % letterWords.length;
      dailyWords[letter] = letterWords[index];
    }
  });
  
  return {
    date: date.toISOString().split('T')[0],
    words: dailyWords
  };
}

// Önümüzdeki 30 gün için veri oluştur
for (let i = 0; i < 30; i++) {
  const date = new Date();
  date.setDate(date.getDate() + i);
  const dateStr = date.toISOString().split('T')[0];
  const data = generateDailyData(date);
  fs.writeFileSync(`daily/${dateStr}.json`, JSON.stringify(data, null, 2));
  console.log(`✓ ${dateStr}.json oluşturuldu`);
}
```

## 🚀 Hızlı Başlangıç

1. GitHub'da `kelimo-data` repo oluştur
2. `daily/` klasörü ekle
3. `daily-data-example/` içindeki örnek dosyayı kopyala
4. `dailyWords.ts`'de URL'i güncelle
5. APK'yı yeniden derle

---

**Not:** Günlük veri yoksa uygulama otomatik olarak local kelimelerden seçim yapar, bu yüzden her gün için veri hazırlaman zorunlu değil.
