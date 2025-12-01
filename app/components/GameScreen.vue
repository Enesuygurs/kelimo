<template>
  <div class="game-scene">
    <!-- Alphabet Strip -->
    <div class="alphabet-strip">
      <div class="alphabet-scroll" :style="carouselStyle">
        <div 
          v-for="(letter, index) in TURKISH_ALPHABET" 
          :key="letter"
          class="letter-box"
          :class="getLetterClass(index)"
          @click="handleLetterClick(index)"
        >
          {{ letter }}
        </div>
      </div>
    </div>

    <!-- Timer Bar (under alphabet) -->
    <div class="timer-bar">
      <div class="timer-pill" :class="timerClass">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="12" cy="12" r="9"/>
          <path d="M12 7v5l3 3"/>
        </svg>
        <span>{{ formattedTime }}</span>
      </div>
    </div>

    <!-- Question Area -->
    <div class="question-area">
      <div class="question-card" :key="currentLetterIndex">
        <p class="question-text">{{ currentMeaning }}</p>
      </div>
    </div>

    <!-- Answer Section -->
    <div class="answer-area">
      <div class="input-group" :class="{ 'shake': isShaking }">
        <input
          ref="inputRef"
          type="text"
          :value="userAnswer"
          @input="handleInput"
          @keypress.enter="handleSubmit"
          placeholder="Cevabını yaz..."
          autocomplete="off"
          autocapitalize="characters"
          spellcheck="false"
        />
        <button class="send-btn" @click="handleSubmit">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
      <div class="action-buttons">
        <button class="action-btn pass" @click="handlePass">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          <span>PAS</span>
        </button>
        <button class="action-btn finish" @click="handleFinish">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
          <span>BİTİR</span>
        </button>
      </div>
    </div>

    <!-- Notification -->
    <transition name="toast">
      <div v-if="notification" class="toast" :class="notification.type">
        {{ notification.message }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue';

const props = defineProps<{
  currentLetter: string;
  currentLetterIndex: number;
  currentMeaning: string;
  formattedTime: string;
  timerClass: string;
  userAnswer: string;
  isShaking: boolean;
  TURKISH_ALPHABET: string[];
  getLetterStatus: (index: number) => string;
  passedLetters: number[];
}>();

const emit = defineEmits<{
  submit: [];
  pass: [];
  skip: [];
  finish: [];
  goToLetter: [index: number];
  'update:userAnswer': [value: string];
}>();

const inputRef = ref<HTMLInputElement | null>(null);
const notification = ref<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

// Carousel pozisyonu hesapla - aktif harf ortada
const carouselStyle = computed(() => {
  // Mobil için küçük boyutlar
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 420;
  const isSmallMobile = typeof window !== 'undefined' && window.innerWidth <= 360;
  
  let itemWidth = 70;
  let selectedWidth = 94;
  let gap = 12;
  
  if (isSmallMobile) {
    itemWidth = 52;
    selectedWidth = 68;
    gap = 10;
  } else if (isMobile) {
    itemWidth = 60;
    selectedWidth = 80;
    gap = 10;
  }
  
  const totalWidth = itemWidth + gap;
  // Aktif harfi tam ortaya konumlandır
  const offset = -props.currentLetterIndex * totalWidth;
  return {
    transform: `translateX(calc(50% - ${selectedWidth / 2}px + ${offset}px))`,
    transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
  };
});

function getLetterClass(index: number) {
  const status = props.getLetterStatus(index);
  return {
    'selected': index === props.currentLetterIndex,
    'correct': status === 'correct',
    'wrong': status === 'wrong' || status === 'skipped',
    'passed': status === 'passed',
    'clickable': props.passedLetters.includes(index)
  };
}

function handleInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit('update:userAnswer', target.value.toUpperCase());
}

function handleSubmit() {
  emit('submit');
}

function handlePass() {
  emit('pass');
}

function handleFinish() {
  emit('finish');
}

function handleLetterClick(index: number) {
  if (props.passedLetters.includes(index)) {
    emit('goToLetter', index);
  }
}

function showNotification(message: string, type: 'success' | 'error' | 'info' = 'info') {
  notification.value = { message, type };
  setTimeout(() => {
    notification.value = null;
  }, 2000);
}

onMounted(() => {
  nextTick(() => {
    inputRef.value?.focus();
  });
});

watch(() => props.currentLetterIndex, () => {
  nextTick(() => {
    inputRef.value?.focus();
  });
});

defineExpose({
  showNotification
});
</script>

<style scoped>
.game-scene {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--bg);
  overflow: hidden;
}

/* Timer Bar (under alphabet) */
.timer-bar {
  display: flex;
  justify-content: center;
  padding: 6px 20px 14px;
  background: var(--bg);
}

.timer-pill {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 16px;
  min-width: 90px;
  background: var(--bg-card);
  border-radius: var(--radius-full);
  box-shadow: var(--shadow-md);
}

.timer-pill svg {
  width: 18px;
  height: 18px;
  color: var(--text);
}

.timer-pill span {
  font-size: 0.9rem;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: var(--text);
  min-width: 42px;
  text-align: center;
}

.timer-pill.warning {
  background: linear-gradient(135deg, var(--warning), var(--warning-light));
}

.timer-pill.warning svg,
.timer-pill.warning span {
  color: white;
}

.timer-pill.danger {
  background: linear-gradient(135deg, var(--danger), var(--danger-light));
  animation: timerPulse 0.5s ease-in-out infinite;
}

.timer-pill.danger svg,
.timer-pill.danger span {
  color: white;
}

@keyframes timerPulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Alphabet Strip */
.alphabet-strip {
  width: 100%;
  overflow: hidden;
  padding: 20px 0;
  margin-top: 24px;
  background: linear-gradient(180deg, var(--bg) 0%, transparent 100%);
}

.alphabet-scroll {
  display: flex;
  gap: 12px;
  will-change: transform;
}

.letter-box {
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.7rem;
  font-weight: 700;
  color: var(--text-muted);
  background: var(--bg-card);
  border-radius: var(--radius-md);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
}

.letter-box.selected {
  width: 94px;
  height: 94px;
  font-size: 2.5rem;
  color: white;
  background: linear-gradient(135deg, #F7971E, #FFD200);
  transform: translateY(-12px);
  box-shadow: 0 8px 25px rgba(247, 151, 30, 0.5);
  animation: letterPop 0.3s ease;
}

.letter-box.correct {
  background: var(--success);
  color: white;
}

.letter-box.wrong {
  background: var(--danger);
  color: white;
}

.letter-box.passed {
  background: var(--warning);
  color: white;
  animation: passedGlow 1.5s ease-in-out infinite;
}

.letter-box.clickable {
  cursor: pointer;
}

.letter-box.clickable:active {
  transform: scale(0.9);
}

@keyframes letterPop {
  0% { transform: translateY(-8px) scale(0.8); }
  50% { transform: translateY(-12px) scale(1.1); }
  100% { transform: translateY(-8px) scale(1); }
}

@keyframes passedGlow {
  0%, 100% { box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4); }
  50% { box-shadow: 0 4px 25px rgba(243, 156, 18, 0.6); }
}

/* Question Area */
.question-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
  gap: 24px;
}

.current-letter {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #11998E, #38EF7D);
  border-radius: var(--radius-xl);
  box-shadow: 0 10px 40px rgba(17, 153, 142, 0.4);
  animation: letterFloat 3s ease-in-out infinite;
}

.current-letter span {
  font-size: 2.5rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

@keyframes letterFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

.question-card {
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 24px 28px;
  width: 100%;
  max-width: 100%;
  box-shadow: var(--shadow-md);
  animation: cardSlide 0.4s ease;
}

.question-text {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  line-height: 1.4;
  color: var(--text);
  text-transform: uppercase;
  letter-spacing: 1px;
}

@keyframes cardSlide {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Answer Area */
.answer-area {
  padding: 20px;
  background: var(--bg-light);
  border-radius: var(--radius-xl) var(--radius-xl) 0 0;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 8px;
  background: var(--bg-card);
  border-radius: var(--radius-lg);
  padding: 6px;
  margin-bottom: 16px;
  transition: box-shadow 0.3s ease;
  overflow: hidden;
}

.input-group:focus-within {
  box-shadow: 0 0 0 2px var(--primary);
}

.input-group.shake {
  animation: inputShake 0.4s ease;
}

@keyframes inputShake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-10px); }
  40% { transform: translateX(10px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

.input-group input {
  flex: 1;
  min-width: 0;
  background: transparent;
  border: none;
  padding: 12px 14px;
  font-size: 1rem;
  font-family: inherit;
  font-weight: 500;
  color: var(--text);
  outline: none;
  letter-spacing: 0.5px;
}

.input-group input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

.send-btn {
  width: 44px;
  height: 44px;
  min-width: 44px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.send-btn svg {
  width: 22px;
  height: 22px;
  color: white;
}

.send-btn:active {
  transform: scale(0.9);
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px;
  border: none;
  border-radius: var(--radius-lg);
  font-size: 0.95rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.action-btn svg {
  width: 20px;
  height: 20px;
}

.action-btn.pass {
  background: linear-gradient(135deg, var(--warning), var(--warning-light));
  color: white;
  box-shadow: 0 4px 15px rgba(243, 156, 18, 0.4);
}

.action-btn.finish {
  background: linear-gradient(135deg, var(--danger), var(--danger-light));
  color: white;
  box-shadow: 0 4px 15px rgba(231, 76, 60, 0.4);
}

.action-btn:active {
  transform: scale(0.95);
}

/* Toast Notification */
.toast {
  position: fixed;
  bottom: 200px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 28px;
  border-radius: var(--radius-lg);
  font-weight: 600;
  font-size: 1rem;
  z-index: 1000;
  box-shadow: var(--shadow-lg);
}

.toast.success {
  background: var(--success);
  color: white;
}

.toast.error {
  background: var(--danger);
  color: white;
}

.toast.info {
  background: var(--bg-card);
  color: var(--text);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(20px);
}

/* Mobile Responsive */
@media (max-width: 420px) {
  .alphabet-scroll {
    gap: 10px;
  }
  
  .letter-box {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }
  
  .letter-box.selected {
    width: 80px;
    height: 80px;
    font-size: 2rem;
  }
  
  .current-letter {
    width: 70px;
    height: 70px;
  }
  
  .current-letter span {
    font-size: 2.2rem;
  }
  
  .question-card {
    padding: 20px;
  }
  
  .question-text {
    font-size: 1.1rem;
  }
  
  .answer-area {
    padding: 16px;
  }
  
  .input-group input {
    padding: 12px 14px;
    font-size: 0.95rem;
  }
  
  .send-btn {
    width: 44px;
    height: 44px;
  }
  
  .action-btn {
    padding: 14px;
    font-size: 0.9rem;
  }
}

@media (max-width: 360px) {
  .letter-box {
    width: 52px;
    height: 52px;
    font-size: 1.3rem;
  }
  
  .letter-box.selected {
    width: 68px;
    height: 68px;
    font-size: 1.8rem;
  }
  
  .current-letter {
    width: 60px;
    height: 60px;
  }
  
  .current-letter span {
    font-size: 1.8rem;
  }
  
  .question-text {
    font-size: 1rem;
  }
  
  .action-btn span {
    display: none;
  }
  
  .action-btn {
    padding: 14px 20px;
  }
  
  .action-btn svg {
    width: 24px;
    height: 24px;
  }
}
</style>
