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
        @finish="handleFinish"
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
        @play-again="resetGame"
      />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { initSounds, playSound } from '~/utils/sounds';

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

const gameScreenRef = ref<{ showNotification: (message: string, type: 'success' | 'error' | 'info') => void } | null>(null);

onMounted(() => {
  initGame();
  initSounds();
});

function handleStartDaily() {
  startGame('daily');
}

function handleStartUnlimited() {
  startGame('unlimited');
}

function handleSubmit() {
  const result = submitAnswer();
  if (result.success && result.message) {
    if (result.message.includes('Doğru')) {
      playSound('correct');
      gameScreenRef.value?.showNotification(result.message, 'success');
    } else {
      gameScreenRef.value?.showNotification(result.message, 'info');
    }
  } else if (!result.success) {
    playSound('wrong');
    gameScreenRef.value?.showNotification(result.message, 'error');
  }
}

function handlePass() {
  const result = passLetter();
  gameScreenRef.value?.showNotification(result.message, 'info');
}

function handleSkip() {
  const result = skipLetter();
  playSound('wrong');
  if (result.correctAnswer) {
    gameScreenRef.value?.showNotification(`Doğru cevap: ${result.correctAnswer}`, 'error');
  }
}

function handleGoToLetter(index: number) {
  goToLetter(index);
}

function handleFinish() {
  finishGame();
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
</style>
