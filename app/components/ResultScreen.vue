<template>
  <div class="result-screen">
    <!-- Celebratory confetti -->
    <div class="confetti-wrap">
      <div class="confetti" v-for="n in 15" :key="n" :style="{ '--i': n }"></div>
    </div>
    
    <div class="result-content">
      <!-- Score Section -->
      <div class="score-section">
        <div class="score-circle">
          <span class="score-value">{{ correctCount }}</span>
          <span class="score-total">/29</span>
        </div>
        <p class="score-label">Doğru Cevap</p>
      </div>
      
      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-box correct">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <span class="stat-num">{{ correctCount }}</span>
          <span class="stat-text">Doğru</span>
        </div>
        <div class="stat-box wrong">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </div>
          <span class="stat-num">{{ wrongCount }}</span>
          <span class="stat-text">Yanlış</span>
        </div>
        <div class="stat-box passed">
          <div class="stat-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <span class="stat-num">{{ passedCount }}</span>
          <span class="stat-text">Pas</span>
        </div>
      </div>
      
      <!-- Results List -->
      <div class="results-panel">
        <div class="panel-header">
          <span>📋 Sonuçlar</span>
        </div>
        <div class="results-scroll">
          <div
            v-for="(result, index) in sortedResults"
            :key="result.letterIndex"
            class="result-row"
            :class="{ 
              correct: result.correct, 
              wrong: !result.correct && !result.passed,
              passed: result.passed && !result.correct
            }"
            :style="{ '--delay': index * 0.03 + 's' }"
          >
            <div class="row-letter">{{ result.letter }}</div>
            <div class="row-content">
              <div class="row-answer">
                <span v-if="result.correct" class="answer-text correct">{{ result.correctAnswer }}</span>
                <span v-else-if="result.skipped" class="answer-text skipped">{{ result.correctAnswer }}</span>
                <template v-else>
                  <span class="answer-text wrong">{{ result.userAnswer }}</span>
                  <span class="arrow">→</span>
                  <span class="answer-text correct">{{ result.correctAnswer }}</span>
                </template>
              </div>
              <p class="row-meaning">{{ result.correctMeaning }}</p>
            </div>
            <div class="row-status" :class="{ correct: result.correct }">
              <svg v-if="result.correct" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M20 6L9 17l-5-5"/>
              </svg>
              <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Play Again Button -->
      <button class="play-again-btn" @click="$emit('playAgain')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M23 4v6h-6M1 20v-6h6"/>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
        </svg>
        <span>Tekrar Oyna</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { GameResult } from '~/composables/useGame';

const props = defineProps<{
  title: string;
  correctCount: number;
  wrongCount: number;
  passedCount: number;
  results: GameResult[];
}>();

defineEmits<{
  playAgain: [];
}>();

const sortedResults = computed(() => {
  return [...props.results].sort((a, b) => a.letterIndex - b.letterIndex);
});
</script>

<style scoped>
.result-screen {
  height: 100%;
  padding: 20px;
  overflow-y: auto;
  position: relative;
}

/* Confetti */
.confetti-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  top: -20px;
  left: calc(var(--i) * 7%);
  animation: confettiFall 3s ease-out calc(var(--i) * 0.15s) infinite;
  border-radius: 2px;
}

.confetti:nth-child(odd) {
  background: var(--primary);
  width: 12px;
  height: 8px;
}

.confetti:nth-child(even) {
  background: var(--yellow);
  width: 8px;
  height: 10px;
}

.confetti:nth-child(3n) {
  background: var(--success);
  width: 10px;
  height: 10px;
}

.confetti:nth-child(5n) {
  background: var(--pink);
}

@keyframes confettiFall {
  0% {
    transform: translateY(-20px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(720deg);
    opacity: 0;
  }
}

.result-content {
  position: relative;
  z-index: 1;
  max-width: 500px;
  margin: 0 auto;
}

/* Score Section */
.score-section {
  text-align: center;
  padding: 30px 0;
  animation: scaleIn 0.5s ease;
}

.score-circle {
  width: 120px;
  height: 120px;
  margin: 0 auto 16px;
  background: linear-gradient(135deg, #11998E, #38EF7D);
  border-radius: var(--radius-full);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 40px rgba(17, 153, 142, 0.4);
  animation: scorePop 0.6s ease;
}

.score-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  line-height: 1;
}

.score-total {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
}

.score-label {
  font-size: 1.1rem;
  color: var(--text-muted);
  font-weight: 500;
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes scorePop {
  0% {
    transform: scale(0);
  }
  60% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

/* Stats Row */
.stats-row {
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
  animation: slideUp 0.5s ease 0.2s backwards;
}

.stat-box {
  flex: 1;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 16px 12px;
  text-align: center;
  box-shadow: var(--shadow-sm);
}

.stat-icon {
  width: 40px;
  height: 40px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.stat-icon svg {
  width: 22px;
  height: 22px;
}

.stat-box.correct .stat-icon {
  background: rgba(46, 204, 113, 0.2);
}
.stat-box.correct .stat-icon svg {
  color: var(--success);
}
.stat-box.correct .stat-num {
  color: var(--success);
}

.stat-box.wrong .stat-icon {
  background: rgba(231, 76, 60, 0.2);
}
.stat-box.wrong .stat-icon svg {
  color: var(--danger);
}
.stat-box.wrong .stat-num {
  color: var(--danger);
}

.stat-box.passed .stat-icon {
  background: rgba(243, 156, 18, 0.2);
}
.stat-box.passed .stat-icon svg {
  color: var(--warning);
}
.stat-box.passed .stat-num {
  color: var(--warning);
}

.stat-num {
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
}

.stat-text {
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* Results Panel */
.results-panel {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: 24px;
  animation: slideUp 0.5s ease 0.3s backwards;
}

.panel-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
}

.results-scroll {
  max-height: 300px;
  overflow-y: auto;
  padding: 12px;
}

.result-row {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: var(--radius-md);
  margin-bottom: 8px;
  background: var(--bg-light);
  animation: rowSlide 0.3s ease var(--delay) backwards;
  transition: transform 0.2s ease;
}

.result-row:last-child {
  margin-bottom: 0;
}

.result-row:active {
  transform: scale(0.98);
}

.result-row.correct {
  border-left: 4px solid var(--success);
}

.result-row.wrong {
  border-left: 4px solid var(--danger);
}

.result-row.passed {
  border-left: 4px solid var(--warning);
}

@keyframes rowSlide {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.row-letter {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
}

.result-row.correct .row-letter {
  background: linear-gradient(135deg, var(--success), var(--success-light));
}

.result-row.wrong .row-letter {
  background: linear-gradient(135deg, var(--danger), var(--danger-light));
}

.result-row.passed .row-letter {
  background: linear-gradient(135deg, var(--warning), var(--warning-light));
}

.row-content {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.row-answer {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 4px;
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}

.answer-text.correct {
  color: var(--success);
}

.answer-text.wrong {
  color: var(--danger);
  text-decoration: line-through;
  opacity: 0.7;
}

.answer-text.skipped {
  color: var(--text-muted);
}

.arrow {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.row-meaning {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.row-status {
  width: 32px;
  height: 32px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: var(--danger);
}

.row-status.correct {
  background: var(--success);
}

.row-status svg {
  width: 16px;
  height: 16px;
  color: white;
}

/* Play Again Button */
.play-again-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 18px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 1.1rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  box-shadow: 0 6px 25px rgba(17, 153, 142, 0.4);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  animation: slideUp 0.5s ease 0.4s backwards;
}

.play-again-btn svg {
  width: 24px;
  height: 24px;
}

.play-again-btn:active {
  transform: scale(0.95);
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

/* Mobile Responsive */
@media (max-width: 420px) {
  .score-circle {
    width: 100px;
    height: 100px;
  }
  
  .score-value {
    font-size: 2rem;
  }
  
  .stats-row {
    gap: 8px;
  }
  
  .stat-box {
    padding: 14px 8px;
  }
  
  .stat-icon {
    width: 36px;
    height: 36px;
  }
  
  .stat-num {
    font-size: 1.5rem;
  }
  
  .results-scroll {
    max-height: 250px;
  }
  
  .result-row {
    padding: 12px;
    gap: 10px;
  }
  
  .row-letter {
    width: 38px;
    height: 38px;
    font-size: 1rem;
  }
  
  .row-answer {
    font-size: 0.9rem;
  }
  
  .row-meaning {
    font-size: 0.75rem;
  }
  
  .row-status {
    width: 28px;
    height: 28px;
  }
  
  .row-status svg {
    width: 14px;
    height: 14px;
  }
  
  .play-again-btn {
    padding: 16px;
    font-size: 1rem;
  }
}

@media (max-width: 360px) {
  .score-circle {
    width: 90px;
    height: 90px;
  }
  
  .score-value {
    font-size: 1.8rem;
  }
  
  .stat-num {
    font-size: 1.3rem;
  }
  
  .stat-text {
    font-size: 0.75rem;
  }
  
  .results-scroll {
    max-height: 200px;
  }
}
</style>
