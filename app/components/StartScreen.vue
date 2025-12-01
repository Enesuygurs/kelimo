<template>
  <div class="start-screen">
    <!-- Logo Section -->
    <div class="logo-section">
      <div class="logo-icon">
        <span class="logo-letter">K</span>
      </div>
      <h1 class="logo-text">kelimo</h1>
      <p class="logo-tagline">Kelime Oyunu</p>
    </div>
    
    <!-- Game Modes Section -->
    <div class="modes-section">
      <!-- Daily Mode Card -->
      <div class="mode-card" :class="{ completed: dailyCompleted }">
        <div class="mode-icon daily">
          <span>📅</span>
        </div>
        <div class="mode-content">
          <div class="mode-header">
            <span class="mode-title">Günlük</span>
            <span class="mode-badge daily">YENİ</span>
          </div>
          <p class="mode-desc">{{ dailyCompleted ? 'Bugün tamamlandı!' : 'Her gün yeni sorular' }}</p>
        </div>
        <button v-if="!dailyCompleted" class="play-btn daily" @click="$emit('startDaily')">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
        <div v-else class="done-check">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
          </svg>
        </div>
      </div>
      
      <!-- Unlimited Mode Card -->
      <div class="mode-card">
        <div class="mode-icon unlimited">
          <span>♾️</span>
        </div>
        <div class="mode-content">
          <div class="mode-header">
            <span class="mode-title">Limitsiz</span>
            <span class="mode-badge unlimited">∞</span>
          </div>
          <p class="mode-desc">İstediğin kadar oyna</p>
        </div>
        <button class="play-btn unlimited" @click="$emit('startUnlimited')">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </button>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <p>v1.0 • Kelimo</p>
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

const dailyCompleted = ref(false);

onMounted(() => {
  dailyCompleted.value = isDailyCompleted();
});
</script>

<style scoped>
.start-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 24px 20px;
  padding-bottom: 40px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* Logo Section */
.logo-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 40px 0 30px;
  animation: fadeInDown 0.6s ease;
}

.logo-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #11998E, #38EF7D);
  border-radius: var(--radius-xl);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;
}

.logo-letter {
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.logo-text {
  font-size: 3rem;
  font-weight: 900;
  color: white;
  letter-spacing: -1px;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.logo-tagline {
  font-size: 1rem;
  color: var(--text-muted);
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
}

/* Game Modes Section */
.modes-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
}

.mode-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 20px;
  box-shadow: var(--shadow-md);
  animation: slideInUp 0.5s ease;
  animation-fill-mode: backwards;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.mode-card:nth-child(1) { animation-delay: 0.1s; }
.mode-card:nth-child(2) { animation-delay: 0.2s; }

.mode-card:active {
  transform: scale(0.98);
}

.mode-card.completed {
  opacity: 0.7;
}

.mode-icon {
  width: 56px;
  height: 56px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  flex-shrink: 0;
}

.mode-icon.daily {
  background: linear-gradient(135deg, #11998E, #38EF7D);
}

.mode-icon.unlimited {
  background: linear-gradient(135deg, var(--pink), var(--orange));
}

.mode-content {
  flex: 1;
  min-width: 0;
}

.mode-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.mode-title {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--text);
}

.mode-badge {
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.mode-badge.daily {
  background: var(--success);
  color: white;
}

.mode-badge.unlimited {
  background: var(--pink);
  color: white;
}

.mode-desc {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.play-btn {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.play-btn svg {
  width: 22px;
  height: 22px;
  color: white;
  margin-left: 3px;
}

.play-btn.daily {
  background: linear-gradient(135deg, #11998E, #38EF7D);
  box-shadow: 0 4px 15px rgba(17, 153, 142, 0.4);
}

.play-btn.unlimited {
  background: linear-gradient(135deg, var(--pink), var(--orange));
  box-shadow: 0 4px 15px rgba(255, 64, 129, 0.4);
}

.play-btn:active {
  transform: scale(0.9);
}

.done-check {
  width: 52px;
  height: 52px;
  border-radius: var(--radius-full);
  background: var(--success);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.done-check svg {
  width: 28px;
  height: 28px;
  color: white;
}

/* How to Play */
.how-to-play {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-top: 20px;
  animation: slideInUp 0.5s ease 0.3s backwards;
  cursor: pointer;
}

.how-to-header {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 20px;
  background: transparent;
  pointer-events: none;
}

.how-to-play:active .how-to-header {
  opacity: 0.8;
}

.how-to-left {
  display: flex;
  align-items: center;
  gap: 12px;
  pointer-events: none;
}

.how-icon {
  font-size: 1.4rem;
}

.how-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
}

.chevron {
  width: 22px;
  height: 22px;
  color: var(--text-muted);
  transition: transform 0.3s ease;
}

.chevron.open {
  transform: rotate(180deg);
}

.rules-content {
  padding: 0 20px 20px;
  pointer-events: none;
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.rule-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.rule-num {
  width: 28px;
  height: 28px;
  background: var(--primary);
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.rule-item p {
  font-size: 0.95rem;
  color: var(--text-muted);
  line-height: 1.5;
}

.pass-tag {
  display: inline-block;
  padding: 2px 8px;
  background: var(--warning);
  border-radius: var(--radius-sm);
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
}

/* Footer */
.footer {
  text-align: center;
  padding: 20px 0;
  margin-top: auto;
}

.footer p {
  font-size: 0.8rem;
  color: var(--text-dark);
}

/* Animations */
@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsive */
@media (max-width: 420px) {
  .logo-icon {
    width: 70px;
    height: 70px;
  }
  
  .logo-letter {
    font-size: 2.2rem;
  }
  
  .logo-text {
    font-size: 2.5rem;
  }
  
  .mode-card {
    padding: 16px;
  }
  
  .mode-icon {
    width: 48px;
    height: 48px;
    font-size: 1.5rem;
  }
  
  .play-btn {
    width: 46px;
    height: 46px;
  }
}

@media (max-width: 360px) {
  .logo-icon {
    width: 60px;
    height: 60px;
  }
  
  .logo-letter {
    font-size: 1.8rem;
  }
  
  .logo-text {
    font-size: 2.2rem;
  }
  
  .mode-title {
    font-size: 1.1rem;
  }
  
  .mode-desc {
    font-size: 0.85rem;
  }
}
</style>
