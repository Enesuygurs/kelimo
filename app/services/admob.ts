import { AdMob, BannerAdSize, BannerAdPosition, RewardAdPluginEvents } from '@capacitor-community/admob';

// Production Ad Unit IDs
const BANNER_ID = 'ca-app-pub-3202065698022430/8508076790';
const REWARDED_ID = 'ca-app-pub-3202065698022430/9629586779';

let isAdMobInitialized = false;
let isBannerVisible = false;

/**
 * AdMob'u başlat
 */
export async function initAdMob(): Promise<void> {
  if (isAdMobInitialized) return;
  
  try {
    await AdMob.initialize({
      initializeForTesting: false,
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
      adId: BANNER_ID,
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: false,
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
      adId: REWARDED_ID,
      isTesting: false,
    };
    
    // Ödül event listener
    let rewardReceived = false;
    
    const rewardListener = await AdMob.addListener(RewardAdPluginEvents.Rewarded, () => {
      console.log('Reward received');
      rewardReceived = true;
    });
    
    // Reklamı yükle
    await AdMob.prepareRewardVideoAd(options);
    console.log('Rewarded ad loaded');
    
    // Reklamı göster
    await AdMob.showRewardVideoAd();
    
    // Listener'ı temizle
    await rewardListener.remove();
    
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
      adId: REWARDED_ID,
      isTesting: false,
    };
    await AdMob.prepareRewardVideoAd(options);
    console.log('Rewarded ad preloaded');
  } catch (error) {
    console.error('Failed to preload rewarded ad:', error);
  }
}
