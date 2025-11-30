<template>
  <div class="result-screen">
    <!-- Decorative elements -->
    <div class="confetti-container">
      <div class="confetti" v-for="n in 20" :key="n" :style="{ '--delay': n * 0.1 + 's', '--rotation': Math.random() * 360 + 'deg' }"></div>
    </div>
    
    <div class="result-content">
      <div class="stats">
        <div class="stat correct-stat">
          <div class="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="stat-svg">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>
          <span class="stat-value">{{ correctCount }}</span>
          <span class="stat-label">Doğru</span>
        </div>
        <div class="stat wrong-stat">
          <div class="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="stat-svg">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </div>
          <span class="stat-value">{{ wrongCount }}</span>
          <span class="stat-label">Yanlış</span>
        </div>
        <div class="stat passed-stat">
          <div class="stat-icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="stat-svg">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
          <span class="stat-value">{{ passedCount }}</span>
          <span class="stat-label">Pas</span>
        </div>
      </div>
      
      <div class="word-results">
        <div class="results-header">
          <span class="results-title">📋 Sonuçlar</span>
        </div>
        <div class="results-list">
          <div
            v-for="(result, index) in sortedResults"
            :key="result.letterIndex"
            class="word-result-item"
            :class="{ 
              correct: result.correct, 
              wrong: !result.correct && !result.passed,
              passed: result.passed && !result.correct
            }"
            :style="{ '--index': index }"
          >
            <div class="result-letter">{{ result.letter }}</div>
            <div class="result-content-inner">
              <div class="result-word">
                <span v-if="result.correct" class="answer correct-text">{{ result.correctAnswer }}</span>
                <span v-else-if="result.skipped" class="answer skipped-text">
                  {{ result.correctAnswer }}
                </span>
                <template v-else>
                  <span class="answer wrong-text">{{ result.userAnswer }}</span>
                  <span class="correct-answer-hint">→ {{ result.correctAnswer }}</span>
                </template>
              </div>
              <div class="result-meaning">{{ result.correctMeaning }}</div>
            </div>
            <div class="result-status">
              <span v-if="result.correct" class="status-icon correct">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M20 6L9 17l-5-5"/>
                </svg>
              </span>
              <span v-else class="status-icon wrong">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                  <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <button class="btn primary play-again-btn" @click="$emit('playAgain')">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="refresh-icon">
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
.confetti-container {
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
  background: linear-gradient(135deg, var(--primary), #ec4899);
  top: -20px;
  left: calc(5% * var(--delay, 0));
  animation: confettiFall 4s ease-out var(--delay, 0s) infinite;
  transform: rotate(var(--rotation, 0deg));
  border-radius: var(--radius-sm);
}

.confetti:nth-child(odd) {
  background: linear-gradient(135deg, #fbbf24, #f59e0b);
  width: 8px;
  height: 8px;
}

.confetti:nth-child(3n) {
  background: linear-gradient(135deg, #22c55e, #4ade80);
  width: 12px;
  height: 12px;
}

.result-content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 500px;
  margin: 0 auto;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
  animation: slideInUp 0.5s ease 0.4s both;
}

.stat {
  background: rgba(10, 15, 25, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 18px 12px;
  transition: all 0.3s ease;
}

.stat:hover {
  transform: translateY(-4px);
}

.stat-icon-wrapper {
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 10px;
}

.correct-stat .stat-icon-wrapper {
  background: rgba(34, 197, 94, 0.2);
}

.wrong-stat .stat-icon-wrapper {
  background: rgba(239, 68, 68, 0.2);
}

.passed-stat .stat-icon-wrapper {
  background: rgba(245, 158, 11, 0.2);
}

.stat-svg {
  width: 20px;
  height: 20px;
}

.correct-stat .stat-svg {
  stroke: var(--success);
}

.wrong-stat .stat-svg {
  stroke: var(--danger);
}

.passed-stat .stat-svg {
  stroke: var(--warning);
}

.stat-value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
}

.correct-stat .stat-value {
  color: var(--success);
}

.wrong-stat .stat-value {
  color: var(--danger);
}

.passed-stat .stat-value {
  color: var(--warning);
}

.stat-label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.word-results {
  background: rgba(10, 15, 25, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-lg);
  padding: 16px;
  margin-bottom: 24px;
  animation: slideInUp 0.5s ease 0.5s both;
  text-align: left;
}

.results-header {
  text-align: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.results-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text);
}

.results-list {
  max-height: 320px;
  overflow-y: auto;
  padding-right: 4px;
}

.word-result-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  border-radius: var(--radius-md);
  margin-bottom: 10px;
  background: rgba(51, 65, 85, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
  animation: itemSlideIn 0.3s ease calc(var(--index) * 0.03s) both;
}

.word-result-item:last-child {
  margin-bottom: 0;
}

.word-result-item:hover {
  background: rgba(51, 65, 85, 0.6);
  transform: translateX(4px);
}

.word-result-item.correct {
  border-left: 4px solid var(--success);
}

.word-result-item.wrong {
  border-left: 4px solid var(--danger);
}

.word-result-item.passed {
  border-left: 4px solid var(--warning);
}

.result-letter {
  width: 44px;
  height: 44px;
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.2rem;
  flex-shrink: 0;
  background: rgba(51, 65, 85, 0.6);
  color: var(--text);
}

.word-result-item.correct .result-letter {
  background: linear-gradient(135deg, var(--success), #4ade80);
  color: white;
  box-shadow: 0 4px 12px var(--glow-success);
}

.word-result-item.wrong .result-letter {
  background: linear-gradient(135deg, var(--danger), #f87171);
  color: white;
  box-shadow: 0 4px 12px var(--glow-danger);
}

.word-result-item.passed .result-letter {
  background: linear-gradient(135deg, var(--warning), #fbbf24);
  color: #1f2937;
  box-shadow: 0 4px 12px var(--glow-warning);
}

.result-content-inner {
  flex: 1;
  min-width: 0;
}

.result-word {
  font-weight: 600;
  font-size: 1.05rem;
  margin-bottom: 4px;
}

.correct-text {
  color: var(--success);
}

.wrong-text {
  color: var(--danger);
}

.correct-answer-hint {
  color: var(--success);
  font-size: 0.85rem;
  font-weight: 600;
  margin-left: 8px;
  opacity: 0.9;
}

.skipped-text {
  color: var(--text-muted);
}

.result-meaning {
  font-size: 0.8rem;
  color: var(--text-muted);
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.result-status {
  flex-shrink: 0;
}

.status-icon {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.status-icon svg {
  width: 16px;
  height: 16px;
}

.status-icon.correct {
  background: linear-gradient(135deg, var(--success), #4ade80);
  color: white;
}

.status-icon.wrong {
  background: linear-gradient(135deg, var(--danger), #f87171);
  color: white;
}

.play-again-btn {
  width: 100%;
  padding: 20px;
  font-size: 1.15rem;
  animation: slideInUp 0.5s ease 0.6s both;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.refresh-icon {
  width: 24px;
  height: 24px;
}

/* Scrollbar */
.results-list::-webkit-scrollbar {
  width: 6px;
}

.results-list::-webkit-scrollbar-track {
  background: rgba(51, 65, 85, 0.3);
  border-radius: var(--radius-sm);
}

.results-list::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, var(--primary), #8b5cf6);
  border-radius: var(--radius-sm);
}

/* Animations */
@keyframes confettiFall {
  0% {
    transform: translateY(-20px) rotate(var(--rotation, 0deg));
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(calc(var(--rotation, 0deg) + 720deg));
    opacity: 0;
  }
}

@keyframes bounceIn {
  0% {
    opacity: 0;
    transform: scale(0.3);
  }
  50% {
    transform: scale(1.1);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
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

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@keyframes starPop {
  0% {
    opacity: 0;
    transform: scale(0) rotate(-180deg);
  }
  100% {
    opacity: 1;
    transform: scale(1) rotate(0deg);
  }
}

@keyframes itemSlideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 480px) {
  .result-header {
    padding: 16px 20px;
  }
  
  .result-title {
    font-size: 1.3rem;
  }
  
  .trophy-icon {
    font-size: 2.5rem;
  }
  
  .stats-container {
    padding: 16px;
    gap: 10px;
  }
  
  .stat-item {
    padding: 12px 8px;
  }
  
  .stat-value {
    font-size: 1.4rem;
  }
  
  .stat-label {
    font-size: 0.7rem;
  }
  
  .results-header {
    padding: 12px 16px;
    font-size: 0.85rem;
  }
  
  .results-list {
    padding: 8px 12px;
    max-height: 250px;
  }
  
  .result-item {
    padding: 10px;
    gap: 10px;
  }
  
  .result-letter {
    width: 36px;
    height: 36px;
    font-size: 0.9rem;
  }
  
  .result-word {
    font-size: 0.9rem;
  }
  
  .result-meaning {
    font-size: 0.7rem;
  }
  
  .status-icon {
    width: 26px;
    height: 26px;
  }
  
  .status-icon svg {
    width: 14px;
    height: 14px;
  }
  
  .play-again-btn {
    padding: 14px;
    font-size: 1rem;
  }
  
  .refresh-icon {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 360px) {
  .result-title {
    font-size: 1.1rem;
  }
  
  .trophy-icon {
    font-size: 2rem;
  }
  
  .stat-value {
    font-size: 1.2rem;
  }
  
  .results-list {
    max-height: 200px;
  }
  
  .result-letter {
    width: 32px;
    height: 32px;
    font-size: 0.85rem;
  }
  
  .result-word {
    font-size: 0.85rem;
  }
}
</style>
