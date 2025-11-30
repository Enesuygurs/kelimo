<template>
  <div class="start-screen">
    <!-- Animated background orbs -->
    <div class="orb orb-1"></div>
    <div class="orb orb-2"></div>
    <div class="orb orb-3"></div>
    
    <!-- Logo Section -->
    <div class="logo-section">
      <div class="logo-container">
        <div class="logo-icon">
          <span class="logo-letter">K</span>
        </div>
        <h1 class="logo-text">kelimo</h1>
      </div>
    </div>
    
    <!-- Game Modes Section -->
    <div class="modes-section">
      <!-- Daily Mode Card -->
      <div class="mode-card daily-mode" :class="{ completed: dailyCompleted }">
        <div class="mode-badge">
          <span class="badge-icon">📅</span>
          <span class="badge-text">GÜNLÜK</span>
        </div>
        
        <div class="mode-info">
          <p class="mode-subtitle">{{ dailyCompleted ? 'Bugünün oyunu tamamlandı!' : 'Bugünün soru setini oyna' }}</p>
          <p class="mode-description">{{ dailyCompleted ? 'Yarın yeni sorular seni bekliyor' : 'Her gün yeni sorular, aynı kelimeler herkese' }}</p>
        </div>
        
        <button v-if="!dailyCompleted" class="play-button daily-button" @click="$emit('startDaily')">
          <svg viewBox="0 0 24 24" fill="currentColor" class="play-icon">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span class="btn-text">Oyna</span>
        </button>
        <div v-else class="completed-badge">
          <svg viewBox="0 0 24 24" fill="currentColor" class="check-icon">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
          <span>Tamamlandı</span>
        </div>
      </div>
      
      <!-- Unlimited Mode Card -->
      <div class="mode-card unlimited-mode">
        <div class="mode-badge unlimited">
          <span class="badge-icon">♾️</span>
          <span class="badge-text">LİMİTSİZ</span>
        </div>
        
        <div class="mode-info">
          <p class="mode-subtitle">Sınırsız soru seti</p>
          <p class="mode-description">Sonraki günü bekleme, istediğin kadar oyna</p>
        </div>
        
        <button class="play-button unlimited-button" @click="$emit('startUnlimited')">
          <svg viewBox="0 0 24 24" fill="currentColor" class="play-icon">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
          <span class="btn-text">Oyna</span>
        </button>
      </div>
    </div>
    
    <!-- How to Play Section -->
    <div class="how-to-play">
      <button type="button" class="section-header" @click.prevent="toggleRules" @touchend.prevent="toggleRules">
        <span class="section-icon">📖</span>
        <span class="section-title">Nasıl Oynanır?</span>
        <svg class="chevron" :class="{ open: showRules }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      <div v-show="showRules" class="rules-content">
        <div class="rule-item">
          <span class="rule-number">1</span>
          <p>Her harfe ait sorunun cevabını bul. Cevap o harf ile başlar.</p>
        </div>
        <div class="rule-item">
          <span class="rule-number">2</span>
          <p>Bilmiyorsan <span class="pass-badge">PAS</span> butonuna bas, sonra dönebilirsin.</p>
        </div>
        <div class="rule-item">
          <span class="rule-number">3</span>
          <p>Toplam süre <strong>5 dakika</strong>'dır. 26 harf için yarış!</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { isDailyCompleted } from '~/composables/useGame';

defineEmits<{
  startDaily: [];
  startUnlimited: [];
}>();

const showRules = ref(false);
const dailyCompleted = ref(false);

onMounted(() => {
  dailyCompleted.value = isDailyCompleted();
});

function toggleRules() {
  showRules.value = !showRules.value;
}
</script>

<style scoped>
.start-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  padding-bottom: 40px;
}

/* Animated orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.5;
  pointer-events: none;
  z-index: 0;
}

.orb-1 {
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.5), transparent 70%);
  top: -100px;
  right: -100px;
  animation: orbFloat 12s ease-in-out infinite;
}

.orb-2 {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.4), transparent 70%);
  bottom: 100px;
  left: -100px;
  animation: orbFloat 10s ease-in-out infinite reverse;
}

.orb-3 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.35), transparent 70%);
  top: 40%;
  right: -60px;
  animation: orbFloat 14s ease-in-out infinite 2s;
}

/* Logo Section */
.logo-section {
  position: relative;
  z-index: 1;
  padding: 30px 0;
  text-align: center;
}

.logo-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  animation: fadeIn 0.6s ease;
}

.logo-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primary), #8b5cf6, #a855f7);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
  animation: logoPulse 3s ease-in-out infinite;
}

.logo-letter {
  font-size: 1.8rem;
  font-weight: 900;
  color: white;
}

.logo-text {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -1px;
  background: linear-gradient(135deg, #ffffff, #c7d2fe);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Game Modes Section */
.modes-section {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.mode-card {
  background: rgba(8, 12, 20, 0.9);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
  padding: 24px;
  transition: all 0.3s ease;
  animation: slideUp 0.5s ease;
}

.mode-card:nth-child(2) {
  animation-delay: 0.1s;
}

.mode-card:hover {
  transform: translateY(-4px);
  border-color: rgba(99, 102, 241, 0.3);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.2);
}

.mode-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: linear-gradient(135deg, rgba(99, 102, 241, 0.2), rgba(168, 85, 247, 0.2));
  border: 1px solid rgba(99, 102, 241, 0.3);
  border-radius: var(--radius-lg);
  margin-bottom: 16px;
}

.mode-badge.unlimited {
  background: linear-gradient(135deg, rgba(236, 72, 153, 0.2), rgba(168, 85, 247, 0.2));
  border-color: rgba(236, 72, 153, 0.3);
}

.badge-icon {
  font-size: 1.1rem;
}

.badge-text {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text);
}

.mode-info {
  margin-bottom: 20px;
}

.mode-subtitle {
  font-size: 1.3rem;
  font-weight: 700;
  color: var(--text);
  margin-bottom: 6px;
}

.mode-description {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.play-button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px 24px;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1.15rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.play-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.play-button:hover::before {
  left: 100%;
}

.daily-button {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  color: white;
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.4);
}

.daily-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(99, 102, 241, 0.5);
}

.unlimited-button {
  background: linear-gradient(135deg, #ec4899, #a855f7);
  color: white;
  box-shadow: 0 8px 30px rgba(236, 72, 153, 0.4);
}

.unlimited-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(236, 72, 153, 0.5);
}

.play-button:active {
  transform: scale(0.97);
}

/* Completed Daily Mode */
.mode-card.completed {
  opacity: 0.85;
  border-color: rgba(34, 197, 94, 0.3);
}

.completed-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 18px 24px;
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.2), rgba(34, 197, 94, 0.1));
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: var(--radius-lg);
  color: #22c55e;
  font-size: 1.1rem;
  font-weight: 700;
}

.check-icon {
  width: 22px;
  height: 22px;
  fill: #22c55e;
}

.btn-text {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.play-icon {
  width: 20px;
  height: 20px;
}

/* How to Play Section */
.how-to-play {
  position: relative;
  z-index: 1;
  margin-top: 20px;
  flex-shrink: 0;
  background: rgba(8, 12, 20, 0.85);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  overflow: visible;
}

.section-header {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 18px 20px;
  cursor: pointer;
  transition: background 0.3s ease;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  background: transparent;
  border: none;
  outline: none;
  font-family: inherit;
}

.section-header:hover,
.section-header:active {
  background: rgba(255, 255, 255, 0.05);
}

.section-icon {
  font-size: 1.3rem;
}

.section-title {
  flex: 1;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
  text-align: left;
}

.chevron {
  width: 24px;
  height: 24px;
  color: var(--text-muted);
  transition: transform 0.3s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.rules-content {
  padding: 0 20px 20px;
  background: rgba(8, 12, 20, 0.85);
  border-radius: 0 0 var(--radius-lg) var(--radius-lg);
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.rule-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.rule-number {
  width: 28px;
  height: 28px;
  background: linear-gradient(135deg, var(--primary), #8b5cf6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.rule-item p {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

.pass-badge {
  display: inline-flex;
  padding: 3px 10px;
  background: linear-gradient(135deg, var(--warning), #fbbf24);
  border-radius: var(--radius-sm);
  font-size: 0.8rem;
  font-weight: 700;
  color: #1f2937;
}

/* Animations */
@keyframes orbFloat {
  0%, 100% {
    transform: translate(0, 0) scale(1);
  }
  50% {
    transform: translate(30px, -20px) scale(1.05);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes logoPulse {
  0%, 100% {
    box-shadow: 0 8px 30px rgba(99, 102, 241, 0.5);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 12px 40px rgba(99, 102, 241, 0.6);
    transform: scale(1.03);
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Transition for rules */
.rules-enter-active,
.rules-leave-active {
  transition: all 0.3s ease;
}

.rules-enter-from,
.rules-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

@media (max-width: 480px) {
  .logo-text {
    font-size: 2.2rem;
  }
  
  .logo-icon {
    width: 44px;
    height: 44px;
  }
  
  .logo-letter {
    font-size: 1.3rem;
  }
  
  .mode-card {
    padding: 18px;
    border-radius: var(--radius-lg);
  }
  
  .mode-subtitle {
    font-size: 1.1rem;
  }
  
  .mode-description {
    font-size: 0.85rem;
  }
  
  .play-button {
    padding: 14px 18px;
    font-size: 1rem;
    border-radius: var(--radius-md);
  }
  
  .section-header {
    padding: 14px 16px;
  }
  
  .section-title {
    font-size: 0.95rem;
  }
  
  .rules-content {
    padding: 0 16px 16px;
  }
  
  .rule-item {
    padding: 10px 0;
    font-size: 0.85rem;
  }
}

@media (max-width: 360px) {
  .logo-text {
    font-size: 1.9rem;
  }
  
  .logo-icon {
    width: 38px;
    height: 38px;
  }
  
  .logo-letter {
    font-size: 1.1rem;
  }
  
  .mode-subtitle {
    font-size: 1rem;
  }
  
  .play-button {
    padding: 12px 16px;
    font-size: 0.9rem;
  }
}
</style>
