import { AdMob, BannerAdSize, BannerAdPosition } from '@capacitor-community/admob';

// Test Ad Unit IDs (Google'ın resmi test ID'leri)
// Gerçek yayına geçerken bunları kendi AdMob ID'lerinle değiştir!
const TEST_BANNER_ID = 'ca-app-pub-3940256099942544/6300978111';
const TEST_REWARDED_ID = 'ca-app-pub-3940256099942544/5224354917';

let isAdMobInitialized = false;
let isBannerVisible = false;

/**
 * AdMob'u başlat
 */
export async function initAdMob(): Promise<void> {
  if (isAdMobInitialized) return;
  
  try {
    await AdMob.initialize({
      initializeForTesting: true, // Yayına geçerken false yap
    });
    isAdMobInitialized = true;
    console.log('AdMob initialized successfully');
  } catch (error) {
    console.error('AdMob initialization failed:', error);
  }
}

/**
 * Banner reklam göster (sayfanın altında)
 */
export async function showBannerAd(): Promise<void> {
  try {
    // Önce mevcut banner'ı kaldır
    try {
      await AdMob.removeBanner();
    } catch (e) {
      // Banner yoksa hata verir, sorun değil
    }
    
    const options = {
      adId: TEST_BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true, // Yayına geçerken false yap
    };
    
    await AdMob.showBanner(options);
    isBannerVisible = true;
    console.log('Banner ad shown');
  } catch (error) {
    console.error('Failed to show banner ad:', error);
  }
}

/**
 * Banner reklamı gizle
 */
export async function hideBannerAd(): Promise<void> {
  try {
    await AdMob.removeBanner();
    isBannerVisible = false;
    console.log('Banner ad removed');
  } catch (error) {
    console.error('Failed to remove banner ad:', error);
  }
}

/**
 * Ödüllü reklam göster
 * @returns Promise<boolean> - Reklam izlendi mi?
 */
export async function showRewardedAd(): Promise<boolean> {
  try {
    const options = {
      adId: TEST_REWARDED_ID,
      isTesting: true, // Yayına geçerken false yap
    };
    
    // Reklamı yükle
    await AdMob.prepareRewardVideoAd(options);
    console.log('Rewarded ad loaded');
    
    // Ödül event listener
    let rewardReceived = false;
    
    const rewardListener = AdMob.addListener('onRewardedVideoAdReward', (reward: any) => {
      console.log('Reward received:', reward);
      rewardReceived = true;
    });
    
    // Reklamı göster
    await AdMob.showRewardVideoAd();
    
    // Listener'ı temizle
    rewardListener.remove();
    
    return rewardReceived;
  } catch (error) {
    console.error('Failed to show rewarded ad:', error);
    return false;
  }
}

/**
 * Ödüllü reklamı önceden yükle (daha hızlı gösterim için)
 */
export async function preloadRewardedAd(): Promise<void> {
  try {
    const options = {
      adId: TEST_REWARDED_ID,
      isTesting: true,
    };
    await AdMob.prepareRewardVideoAd(options);
    console.log('Rewarded ad preloaded');
  } catch (error) {
    console.error('Failed to preload rewarded ad:', error);
  }
}
