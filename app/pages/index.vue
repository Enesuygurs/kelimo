<template>
  <div class="layout">
    <!-- Header -->
    <header class="app-header">
      <div class="app-logo">
        <div class="logo-icon">
          <span class="logo-letter">kelimo</span>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="layout-main">
      <!-- Başlangıç Ekranı -->
      <StartScreen 
        v-if="currentScreen === 'start'"
        @start-daily="handleStartDaily"
        @start-unlimited="handleStartUnlimited"
      />

      <!-- Oyun Ekranı -->
      <GameScreen
        v-else-if="currentScreen === 'game'"
        ref="gameScreenRef"
        :current-letter="currentLetter"
        :current-letter-index="currentLetterIndex"
        :current-meaning="currentMeaning"
        :formatted-time="formattedTime"
        :timer-class="timerClass"
        :is-shaking="isShaking"
        :TURKISH_ALPHABET="TURKISH_ALPHABET"
        :get-letter-status="getLetterStatus"
        :passed-letters="passedLetters"
        v-model:user-answer="userAnswer"
        @submit="handleSubmit"
        @pass="handlePass"
        @skip="handleSkip"
        @finish="showConfirmDialog"
        @go-to-letter="handleGoToLetter"
      />

      <!-- Sonuç Ekranı -->
      <ResultScreen
        v-else-if="currentScreen === 'result'"
        :title="resultTitle"
        :correct-count="correctCount"
        :wrong-count="wrongCount"
        :passed-count="passedCount"
        :results="results"
        @play-again="handlePlayAgain"
      />
    </main>

    <!-- Onay Dialogu -->
    <div v-if="showConfirm" class="confirm-overlay" @click="cancelFinish">
      <div class="confirm-dialog" @click.stop>
        <div class="confirm-icon">⚠️</div>
        <h3 class="confirm-title">Oyunu Bitir</h3>
        <p class="confirm-message">Oyunu bitirmek istediğinize emin misiniz?</p>
        <div class="confirm-buttons">
          <button class="confirm-btn cancel" @click="cancelFinish">İptal</button>
          <button class="confirm-btn confirm" @click="confirmFinish">Bitir</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { App } from '@capacitor/app';
import { initSounds, playSound } from '~/utils/sounds';
import { initAdMob, showBannerAd, hideBannerAd, showRewardedAd } from '~/services/admob';

const {
  currentScreen,
  currentLetterIndex,
  currentLetter,
  currentMeaning,
  correctCount,
  wrongCount,
  passedCount,
  formattedTime,
  timerClass,
  results,
  userAnswer,
  resultTitle,
  isShaking,
  passedLetters,
  initGame,
  startGame,
  submitAnswer,
  passLetter,
  skipLetter,
  goToLetter,
  finishGame,
  resetGame,
  getLetterStatus,
  TURKISH_ALPHABET
} = useGame();

const gameScreenRef = ref(null);
const showingAd = ref(false);
const showConfirm = ref(false);
let backButtonListener: any = null;

onMounted(async () => {
  initGame();
  initSounds();
  
  // AdMob'u başlat ve banner göster
  await initAdMob();
  await showBannerAd();
  
  // Android geri tuşunu yakala
  backButtonListener = await App.addListener('backButton', () => {
    if (showConfirm.value) {
      // Dialog açıksa kapat
      cancelFinish();
    } else if (currentScreen.value === 'game') {
      // Oyun ekranındaysa onay dialogu göster
      showConfirmDialog();
    } else if (currentScreen.value === 'result') {
      // Sonuç ekranındaysa ana sayfaya dön
      handlePlayAgain();
    }
    // Ana sayfadaysa varsayılan davranış (uygulama kapanır)
  });
});

onUnmounted(() => {
  if (backButtonListener) {
    backButtonListener.remove();
  }
});

// Onay dialogu fonksiyonları
function showConfirmDialog() {
  showConfirm.value = true;
}

function cancelFinish() {
  showConfirm.value = false;
}

async function confirmFinish() {
  showConfirm.value = false;
  await handleFinish();
}

async function handleStartDaily() {
  await hideBannerAd(); // Oyun başlarken banner'ı gizle
  startGame('daily');
}

async function handleStartUnlimited() {
  await hideBannerAd(); // Oyun başlarken banner'ı gizle
  startGame('unlimited');
}

function handleSubmit() {
  const result = submitAnswer();
  if (result.success && result.message) {
    if (result.message.includes('Doğru')) {
      playSound('correct');
    }
  } else if (!result.success) {
    playSound('wrong');
  }
}

function handlePass() {
  const result = passLetter();
}

function handleSkip() {
  const result = skipLetter();
  playSound('wrong');
}

function handleGoToLetter(index: number) {
  goToLetter(index);
}

async function handleFinish() {
  // Önce ödüllü reklam göster
  showingAd.value = true;
  try {
    await showRewardedAd();
  } catch (e) {
    console.log('Ad skipped or failed');
  }
  showingAd.value = false;
  
  // Sonra sonuçları göster
  finishGame();
}

async function handlePlayAgain() {
  // Önce oyunu sıfırla
  resetGame();
  // Sonra banner'ı göstermeye çalış
  try {
    await showBannerAd();
  } catch (e) {
    console.log('Banner ad failed');
  }
}
</script>

<style scoped>
.layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 20px;
  background: var(--bg);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  position: relative;
  z-index: 100;
}

.app-logo {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-letter {
  font-size: 1.5rem;
  font-weight: 800;
  color: white;
  letter-spacing: -0.5px;
}

.app-logo-title {
  font-size: 1.6rem;
  font-weight: 800;
  letter-spacing: -0.5px;
  background: linear-gradient(135deg, #ffffff, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.header-stats {
  display: flex;
  gap: 10px;
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
}

.stat-badge {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: var(--radius-lg);
  font-weight: 700;
  font-size: 1rem;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.3s ease;
}

.stat-badge.correct {
  background: rgba(34, 197, 94, 0.15);
  border: 1px solid rgba(34, 197, 94, 0.3);
  color: var(--success);
}

.stat-badge.wrong {
  background: rgba(239, 68, 68, 0.15);
  border: 1px solid rgba(239, 68, 68, 0.3);
  color: var(--danger);
}

.stat-icon {
  width: 16px;
  height: 16px;
}

.stat-badge:hover {
  transform: translateY(-2px);
}

.stat-badge.correct:hover {
  box-shadow: 0 4px 15px rgba(34, 197, 94, 0.3);
}

.stat-badge.wrong:hover {
  box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
}

.layout-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Mobile Responsive */
@media (max-width: 480px) {
  .app-header {
    padding: 10px 16px;
  }
  
  .logo-icon {
    width: 100px;
    height: 34px;
    border-radius: var(--radius-sm);
  }
  
  .logo-letter {
    font-size: 1.1rem;
  }
}

@media (max-width: 360px) {
  .app-header {
    padding: 8px 12px;
  }
  
  .logo-icon {
    width: 90px;
    height: 30px;
    border-radius: var(--radius-sm);
  }
  
  .logo-letter {
    font-size: 1rem;
  }
}

/* Confirm Dialog */
.confirm-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  animation: fadeIn 0.2s ease;
}

.confirm-dialog {
  background: #1E1E2D;
  border-radius: var(--radius-lg);
  padding: 28px 24px;
  max-width: 320px;
  width: 100%;
  text-align: center;
  animation: slideUp 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.confirm-icon {
  font-size: 3rem;
  margin-bottom: 16px;
}

.confirm-title {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 8px;
}

.confirm-message {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 24px;
  line-height: 1.5;
}

.confirm-buttons {
  display: flex;
  gap: 12px;
}

.confirm-btn {
  flex: 1;
  padding: 14px 20px;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.confirm-btn.cancel {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text);
}

.confirm-btn.cancel:active {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(0.98);
}

.confirm-btn.confirm {
  background: linear-gradient(135deg, var(--danger), var(--danger-light));
  color: white;
}

.confirm-btn.confirm:active {
  transform: scale(0.98);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
