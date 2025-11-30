// Türkçe Kelime Veritabanı - Parolla Tarzı
export interface WordData {
  word: string;
  meaning: string; // Kelimenin anlamı (soru olarak gösterilecek)
}

export const WORDS_DATABASE: Record<string, WordData[]> = {
  A: [
    { word: "AVARE", meaning: "Yapacak bir işi olmayan, boş duran kimse" },
    { word: "ADAPTE", meaning: "Bir şeyi uygun hale getirmek, uyarlamak" },
    { word: "ALFABE", meaning: "Bir dildeki harflerin tümü" },
    { word: "ALERJI", meaning: "Bazı maddelere karşı vücudun aşırı tepki göstermesi" },
    { word: "ATLAS", meaning: "Haritalar topluluğu içeren kitap" },
    { word: "AVUKAT", meaning: "Hukuk işlerinde danışmanlık yapan kişi" },
    { word: "ANTIKA", meaning: "Eski ve değerli eşya" },
    { word: "ARITMA", meaning: "Suyu temizleme işlemi" },
    { word: "AKUSTIK", meaning: "Ses bilimiyle veya ses yalıtımıyla ilgili" },
    { word: "AYDIN", meaning: "Bilgili, kültürlü kimse" }
  ],
  B: [
    { word: "BARO", meaning: "Bir şehir veya bölge avukatlarının bağlı oldukları meslek kuruluşu" },
    { word: "BULVAR", meaning: "Geniş ve ağaçlıklı cadde" },
    { word: "BUTIK", meaning: "Özel tasarım ürünler satan küçük mağaza" },
    { word: "BRONZ", meaning: "Bakır ve kalay alaşımından yapılan metal" },
    { word: "BALKON", meaning: "Binanın dışına çıkıntı yapan açık alan" },
    { word: "BISTURI", meaning: "Ameliyatlarda kullanılan kesici alet" },
    { word: "BUFET", meaning: "Yiyecek ve içeceklerin sergilendiği masa" },
    { word: "BONUS", meaning: "Ek ödül veya prim" },
    { word: "BAYRAK", meaning: "Bir milleti veya kurumu simgeleyen bez" },
    { word: "BEREKET", meaning: "Bol ve verimli olma durumu" }
  ],
  C: [
    { word: "CIPS", meaning: "İnce, yuvarlak kesilerek kızartılmış patates" },
    { word: "CETVEL", meaning: "Düz çizgi çizmek için kullanılan alet" },
    { word: "CIKIS", meaning: "Bir yerden ayrılma noktası" },
    { word: "CAMI", meaning: "Müslümanların ibadet ettiği yer" },
    { word: "CAZIBE", meaning: "Çekim gücü, albenisi olan" },
    { word: "CENAZE", meaning: "Ölmüş kişinin bedeni" },
    { word: "CEZVE", meaning: "Türk kahvesi pişirilen kap" },
    { word: "CUMLE", meaning: "Anlam taşıyan söz dizisi" },
    { word: "CEVIZ", meaning: "Kabuklu bir ağaç meyvesi" },
    { word: "CANLI", meaning: "Yaşayan varlık" }
  ],
  Ç: [
    { word: "ÇATAPAT", meaning: "Ayakla çiğnendiğinde ya da duvara sürtüldüğünde patlayan eğlence fişeği" },
    { word: "ÇEVIRMEN", meaning: "Bir dilden diğerine çeviri yapan kişi" },
    { word: "ÇIZGI", meaning: "İnce uzun işaret" },
    { word: "ÇÖZÜM", meaning: "Problemi ortadan kaldırma" },
    { word: "ÇEKIM", meaning: "Kamera ile görüntü alma" },
    { word: "ÇIRAK", meaning: "Bir ustanın yanında öğrenen kişi" },
    { word: "ÇIPLAK", meaning: "Üzerinde giysi olmayan" },
    { word: "ÇERÇEVE", meaning: "Resim veya ayna kenarı" },
    { word: "ÇATAL", meaning: "Yemek yerken kullanılan iki uçlu araç" },
    { word: "ÇAPRAZ", meaning: "Birbirini kesen veya çapraz duran durum" }
  ],
  D: [
    { word: "DIVAN", meaning: "Osmanlı'da hem devletin karar meclisi, hem de şairlerin şiir hazinesi anlamlarındaki söz" },
    { word: "DAMGA", meaning: "Bir şeyin üzerine basılan işaret" },
    { word: "DENGE", meaning: "Kararlı durma hali" },
    { word: "DOZAJ", meaning: "İlaç miktarının ayarlanması" },
    { word: "DOSYA", meaning: "Belgelerin konulduğu kap" },
    { word: "DUVAR", meaning: "Yapıları bölen dikey yapı elemanı" },
    { word: "DENEME", meaning: "Bir şeyi test etme" },
    { word: "DERGI", meaning: "Periyodik olarak yayınlanan basılı materyal" },
    { word: "DURAK", meaning: "Toplu taşıma araçlarının durduğu yer" },
    { word: "DIYAR", meaning: "Ülke, memleket" }
  ],
  E: [
    { word: "ERGONOMIK", meaning: "Çok rahat ya da kullanımı kolay tasarlanmış ürün" },
    { word: "EPEY", meaning: "Oldukça fazla miktarda" },
    { word: "EFSANE", meaning: "Kuşaktan kuşağa aktarılan hikaye" },
    { word: "ETAP", meaning: "Bir işin bölümleri" },
    { word: "EZBER", meaning: "Akılda tutarak öğrenme" },
    { word: "ENFES", meaning: "Çok lezzetli, harika" },
    { word: "EKSEN", meaning: "Dönen bir cismin ortasından geçen çizgi" },
    { word: "ESINTI", meaning: "Hafif rüzgar" },
    { word: "EKIP", meaning: "Bir işi birlikte yapan kişiler topluluğu" },
    { word: "ESAS", meaning: "Temel, ana kural" }
  ],
  F: [
    { word: "FAZLA", meaning: "Ölçüyü aşan, aşırı, çok fazla" },
    { word: "FATURA", meaning: "Satın alınan ürünün belgesi" },
    { word: "FERMUAR", meaning: "Giysileri kapatmaya yarayan alet" },
    { word: "FESTIVAL", meaning: "Şenlik, eğlence etkinliği" },
    { word: "FILTRE", meaning: "Süzgeç görevi gören alet" },
    { word: "FIRTINA", meaning: "Şiddetli rüzgar ve yağış" },
    { word: "FOSIL", meaning: "Taşlaşmış canlı kalıntısı" },
    { word: "FREN", meaning: "Aracı durduran sistem" },
    { word: "FARK", meaning: "İki şey arasındaki ayrılık" },
    { word: "FIKIR", meaning: "Düşünce, görüş" }
  ],
  G: [
    { word: "GIDON", meaning: "Bisiklet direksiyonu" },
    { word: "GALERI", meaning: "Sanat eserlerinin sergilendiği yer" },
    { word: "GEZGIN", meaning: "Sürekli seyahat eden kişi" },
    { word: "GURUP", meaning: "Güneşin batışı" },
    { word: "GRAFIK", meaning: "Verilerin görsel gösterimi" },
    { word: "GURME", meaning: "Yemek konusunda uzman kişi" },
    { word: "GOREV", meaning: "Yapılması gereken iş" },
    { word: "GIZEM", meaning: "Sır, esrar" },
    { word: "GEMI", meaning: "Denizde yol alan araç" },
    { word: "GIRIS", meaning: "Bir yere ilk adım atılan bölüm" }
  ],
  H: [
    { word: "HIPOTERMI", meaning: "Merkezi vücut sıcaklığının 35°C altına düşmesi" },
    { word: "HAKEM", meaning: "Spor müsabakalarını yöneten kişi" },
    { word: "HEYECAN", meaning: "Güçlü duygusal durum" },
    { word: "HASRET", meaning: "Özlem, ayrılık acısı" },
    { word: "HAVALE", meaning: "Para transferi" },
    { word: "HESAP", meaning: "Matematiksel işlem" },
    { word: "HOROZ", meaning: "Erkek tavuk" },
    { word: "HUTBE", meaning: "Cuma namazında okunan konuşma" },
    { word: "HIKAYE", meaning: "Anlatı, öykü" },
    { word: "HIZMET", meaning: "Birine yapılan iş, servis" }
  ],
  İ: [
    { word: "ISTATISTIK", meaning: "Bir sonuç çıkarmak için verileri yöntemli bir biçimde toplayıp sayı olarak belirtme" },
    { word: "IMZA", meaning: "Kişinin kendine özgü el yazısı" },
    { word: "INDIRIM", meaning: "Fiyat düşürme" },
    { word: "ISIM", meaning: "Bir şeyin adı" },
    { word: "ITIRAZ", meaning: "Karşı çıkma" },
    { word: "IZIN", meaning: "Müsaade" },
    { word: "ILAC", meaning: "Hastalığı iyileştiren madde" },
    { word: "ICAT", meaning: "Yeni bir şey bulma" },
    { word: "ILHAM", meaning: "Yaratıcı sezgi, esin" },
    { word: "ISIK", meaning: "Görmeyi sağlayan enerji" }
  ],
  K: [
    { word: "KAFI", meaning: "Yeterli, yetecek ölçüde olan" },
    { word: "KANAL", meaning: "Su veya yayın geçiş yolu" },
    { word: "KARGO", meaning: "Paket taşıma hizmeti" },
    { word: "KAVRAM", meaning: "Soyut düşünce, fikir" },
    { word: "KIMLIK", meaning: "Kişiyi tanıtan belge" },
    { word: "KOPYA", meaning: "Aynısından yapılmış örnek" },
    { word: "KREDI", meaning: "Bankadan alınan borç" },
    { word: "KUPON", meaning: "İndirim belgesi" },
    { word: "KAYNAK", meaning: "Bir şeyin çıktığı yer" },
    { word: "KUTUP", meaning: "Dünyanın en uç noktalarından her biri" }
  ],
  L: [
    { word: "LOGO", meaning: "Bir ürün, firma ya da hizmet ismini, harf ve resimsel olarak belirten görsel öge" },
    { word: "LAZER", meaning: "Yoğun ışık demeti" },
    { word: "LEVHA", meaning: "Üzerinde yazı olan tabela" },
    { word: "LIRIK", meaning: "Duygusal, şiirsel" },
    { word: "LOKUM", meaning: "Türk tatlısı" },
    { word: "LIMAN", meaning: "Gemilerin yanaştığı yer" },
    { word: "LUGAT", meaning: "Sözlük" },
    { word: "LIMIT", meaning: "Üst sınır" },
    { word: "LEZZET", meaning: "Tat, lezzetli olma hali" },
    { word: "LABIRENT", meaning: "Karmaşık yol ağı" }
  ],
  M: [
    { word: "MEMUR", meaning: "Devlet hizmetinde aylıkla çalışan kimse, görevli" },
    { word: "MARKA", meaning: "Ürünün ticari ismi" },
    { word: "MAKET", meaning: "Küçültülmüş model" },
    { word: "MESAJ", meaning: "İletilen haber" },
    { word: "MIZAH", meaning: "Güldürü, espri" },
    { word: "MOLOZ", meaning: "Yıkıntı parçaları" },
    { word: "MUZIP", meaning: "Şakacı, muzır" },
    { word: "MUTLU", meaning: "Sevinçli, neşeli" },
    { word: "MAHAL", meaning: "Yer, mevki" },
    { word: "MOTOR", meaning: "Enerjiyi harekete çeviren makine" }
  ],
  N: [
    { word: "NACAK", meaning: "Tek ağızlı balta" },
    { word: "NAKIL", meaning: "Bir yerden başka yere taşıma" },
    { word: "NESIL", meaning: "Kuşak, jenerasyon" },
    { word: "NIYET", meaning: "Maksat, gaye" },
    { word: "NORM", meaning: "Standart, ölçüt" },
    { word: "NOTER", meaning: "Resmi belgeleri onaylayan kişi" },
    { word: "NUFUS", meaning: "Bir yerdeki insan sayısı" },
    { word: "NUANS", meaning: "İnce fark" },
    { word: "NABIZ", meaning: "Kalp atışının damarlarda hissedilmesi" },
    { word: "NOSTALJI", meaning: "Geçmişe duyulan özlem" }
  ],
  O: [
    { word: "OTOMAT", meaning: "Yiyecek, içecek gibi şeylerin alınabildiği mekanik veya elektrikli araç" },
    { word: "ODAK", meaning: "Merkez, konsantrasyon noktası" },
    { word: "OLASI", meaning: "Muhtemel, mümkün" },
    { word: "ORGAN", meaning: "Vücudun bir bölümü" },
    { word: "ORTAM", meaning: "Çevre, atmosfer" },
    { word: "OZGUN", meaning: "Orijinal, kendine has" },
    { word: "OLMAZ", meaning: "Kabul edilemez, imkansız" },
    { word: "OPERA", meaning: "Müzikli tiyatro eseri" },
    { word: "OYUNCU", meaning: "Bir oyunda veya tiyatroda rol alan kişi" },
    { word: "OTURUM", meaning: "Belirli süreli toplantı bölümü" }
  ],
  Ö: [
    { word: "ÖRDEK", meaning: "Perdeayaklılardan evcil ve yabanisi de bulunan su kuşu" },
    { word: "ÖZLEM", meaning: "Hasret, arzu" },
    { word: "ÖZEL", meaning: "Kendine has, hususi" },
    { word: "ÖZET", meaning: "Kısa anlatım" },
    { word: "ÖĞÜT", meaning: "Tavsiye, nasihat" },
    { word: "ÖRNEK", meaning: "Model, numune" },
    { word: "ÖNCE", meaning: "Daha evvel" },
    { word: "ÖLÇÜT", meaning: "Ölçü, kriter" },
    { word: "ÖYKÜ", meaning: "Kısa anlatı, hikaye" },
    { word: "ÖNCELIK", meaning: "Önde tutulma durumu" }
  ],
  P: [
    { word: "PELIKAN", meaning: "Perdeayaklılardan evcil ve yabanisi de bulunan su kuşu" },
    { word: "PAKET", meaning: "Sarılmış eşya" },
    { word: "PANKART", meaning: "Üzerinde slogan yazılı afiş" },
    { word: "PASAJ", meaning: "İçinden geçilen alışveriş yeri" },
    { word: "PERGEL", meaning: "Daire çizmeye yarayan alet" },
    { word: "PINTI", meaning: "Çok tutumlu, cimri" },
    { word: "PLAKA", meaning: "Araç kimlik belgesi" },
    { word: "POSTA", meaning: "Mektup gönderme hizmeti" },
    { word: "PUSULA", meaning: "Yön bulmaya yarayan alet" },
    { word: "PIRLANTA", meaning: "Değerli taş" }
  ],
  R: [
    { word: "RADYAN", meaning: "Bir dairede yarıçap uzunluğundaki yay parçasını gören merkez açıya, eşit açı ölçme birimi" },
    { word: "RAFINE", meaning: "İşlenmiş, arıtılmış" },
    { word: "RANDEVU", meaning: "Önceden belirlenen buluşma" },
    { word: "RECEL", meaning: "Meyveden yapılan tatlı" },
    { word: "RETRO", meaning: "Eski tarz, nostaljik" },
    { word: "RITIM", meaning: "Müzikte tempo" },
    { word: "ROBOT", meaning: "Otomatik çalışan makine" },
    { word: "RUTIN", meaning: "Alışılmış düzen" },
    { word: "RAPOR", meaning: "Bir durumun yazılı olarak açıklanması" },
    { word: "REVIZYON", meaning: "Gözden geçirme ve düzeltme" }
  ],
  S: [
    { word: "SAVSAK", meaning: "İşlerine önem vermeyen, ihmalkar" },
    { word: "SATIN", meaning: "Parlak ipek kumaş" },
    { word: "SENARYO", meaning: "Film veya dizi metni" },
    { word: "SLOGAN", meaning: "Kısa ve akılda kalıcı söz" },
    { word: "SPONSOR", meaning: "Maddi destek veren kişi veya kurum" },
    { word: "STATIK", meaning: "Hareketsiz, durağan" },
    { word: "STRATEJI", meaning: "Uzun vadeli plan" },
    { word: "SISTEM", meaning: "Düzenli işleyiş" },
    { word: "SEMBOL", meaning: "Bir kavramı temsil eden işaret" },
    { word: "SAGLAM", meaning: "Dayanıklı, güçlü" }
  ],
  Ş: [
    { word: "ŞARBON", meaning: "İnce ve yarı saydam bir tür kağıt" },
    { word: "ŞABLON", meaning: "Kalıp, şekil" },
    { word: "ŞEHIR", meaning: "Kent, büyük yerleşim yeri" },
    { word: "ŞIIR", meaning: "Manzume, nazım" },
    { word: "ŞIFRE", meaning: "Gizli kod" },
    { word: "ŞOFOR", meaning: "Araç kullanan kişi" },
    { word: "ŞAPKA", meaning: "Başa giyilen aksesuar" },
    { word: "ŞEKER", meaning: "Tatlı madde" },
    { word: "ŞANLI", meaning: "Onurlu, şerefli" },
    { word: "ŞEFTALI", meaning: "Sulu bir yaz meyvesi" }
  ],
  T: [
    { word: "SULTAN", meaning: "İnce yufkaların içine kaymak konulup üstüne dövülmüş fıstık serpilerek yapılan bir tür baklava" },
    { word: "TABLET", meaning: "Taşınabilir dokunmatik bilgisayar" },
    { word: "TAKTIK", meaning: "Kısa vadeli plan" },
    { word: "TERAPI", meaning: "Tedavi yöntemi" },
    { word: "TIRAJ", meaning: "Basılan kopya sayısı" },
    { word: "TRAFIK", meaning: "Yol üzerindeki araç akışı" },
    { word: "TREND", meaning: "Moda akım" },
    { word: "TURIST", meaning: "Gezgin, seyahat eden kişi" },
    { word: "TALEP", meaning: "İstek, arz" },
    { word: "TARTI", meaning: "Ağırlık ölçmeye yarayan alet" }
  ],
  U: [
    { word: "UFO", meaning: "Gökyüzünde tanımlanamayan cisim" },
    { word: "ULASIM", meaning: "Bir yerden başka yere gitme" },
    { word: "UNIVERSITE", meaning: "Yüksek öğretim kurumu" },
    { word: "URETIM", meaning: "Mal veya hizmet yapma" },
    { word: "UYARI", meaning: "Dikkat çekme, ihtar" },
    { word: "UZANTI", meaning: "Devam eden bölüm" },
    { word: "UZMAN", meaning: "Alanında bilgili kişi" },
    { word: "UCRET", meaning: "Hizmet karşılığı ödenen para" },
    { word: "UYDU", meaning: "Bir gezegenin çevresinde dönen gök cismi" },
    { word: "UZAY", meaning: "Dünya atmosferi dışındaki alan" }
  ],
  Ü: [
    { word: "ÜZÜM", meaning: "En fazla çeşide sahip olan meyve türü" },
    { word: "ÜLKE", meaning: "Devlet, vatan" },
    { word: "ÜMIT", meaning: "Beklenti, temenni" },
    { word: "ÜNLÜ", meaning: "Tanınmış, meşhur" },
    { word: "ÜRETIM", meaning: "Yapım, imalat" },
    { word: "ÜSLUP", meaning: "Tarz, biçim" },
    { word: "ÜCRET", meaning: "Ödeme, bedel" },
    { word: "ÜNVAN", meaning: "Meslek veya makam adı" },
    { word: "ÜÇGEN", meaning: "Üç kenarlı geometrik şekil" },
    { word: "ÜSTAD", meaning: "Usta, uzman kişi" }
  ],
  V: [
    { word: "VERIM", meaning: "Bir işten elde edilen iyi sonuç, fayda" },
    { word: "VALIZ", meaning: "Seyahat çantası" },
    { word: "VANTILATÖR", meaning: "Hava sirkülasyonu sağlayan alet" },
    { word: "VEKTOR", meaning: "Yönü ve büyüklüğü olan nicelik" },
    { word: "VERGI", meaning: "Devlete ödenen zorunlu para" },
    { word: "VIDEO", meaning: "Hareketli görüntü kaydı" },
    { word: "VIRAJ", meaning: "Yolun kıvrımı" },
    { word: "VIZYON", meaning: "Gelecek görüşü" },
    { word: "VITRIN", meaning: "Mağaza ürünlerinin sergilendiği cam bölme" },
    { word: "VURGUN", meaning: "Ani büyük kazanç veya beklenmedik darbe" }
  ],
  Y: [
    { word: "YARAR", meaning: "Bir işten elde edilen iyi sonuç, fayda" },
    { word: "YALAN", meaning: "Gerçek olmayan söz" },
    { word: "YASAK", meaning: "İzin verilmeyen şey" },
    { word: "YELPAZE", meaning: "El ile sallanan serinletici" },
    { word: "YILDIZ", meaning: "Gökyüzünde parlayan gök cismi" },
    { word: "YOGUN", meaning: "Sıkışık, kalabalık" },
    { word: "YUREK", meaning: "Kalp, gönül" },
    { word: "YUZEY", meaning: "Bir şeyin dış kısmı" },
    { word: "YANKI", meaning: "Sesin engelden yansıyarak geri dönmesi" },
    { word: "YORUM", meaning: "Bir konuya ilişkin değerlendirme" }
  ],
  Z: [
    { word: "ZAT", meaning: "Kimse, kişi" },
    { word: "ZEMIN", meaning: "Taban, alt yüzey" },
    { word: "ZEYTIN", meaning: "Akdeniz meyvesi" },
    { word: "ZIRH", meaning: "Koruyucu metal giysi" },
    { word: "ZONE", meaning: "Bölge, alan" },
    { word: "ZURNA", meaning: "Nefesli çalgı" },
    { word: "ZUMBA", meaning: "Dans sporu türü" },
    { word: "ZIRVE", meaning: "En yüksek nokta" },
    { word: "ZAFER", meaning: "Galibiyet, başarı" },
    { word: "ZENGIN", meaning: "Maddi varlığı fazla olan" }
  ]
};

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
