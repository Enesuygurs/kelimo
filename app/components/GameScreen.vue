<template>
  <div class="game-scene">
    <!-- Background orbs -->
    <div class="game-orb orb-1"></div>
    <div class="game-orb orb-2"></div>
    
    <!-- Progress indicator -->
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      <div class="progress-glow"></div>
    </div>
    
    <!-- Alphabet Carousel -->
    <div class="alphabet-carousel">
      <div class="carousel-gradient left"></div>
      <div class="alphabet-inner" :style="carouselStyle">
        <div 
          v-for="(letter, index) in TURKISH_ALPHABET" 
          :key="letter"
          class="alphabet-item"
          :class="getLetterClass(index)"
          @click="handleLetterClick(index)"
        >
          <span class="letter-text">{{ letter }}</span>
          <div class="letter-glow"></div>
        </div>
      </div>
      <div class="carousel-gradient right"></div>
    </div>

    <!-- Countdown Timer -->
    <div class="countdown-container">
      <div class="countdown" :class="timerClass">
        <div class="countdown-border" :style="{ '--timer-percent': timerPercent + '%' }"></div>
        <div class="countdown-content">
          <svg class="countdown-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="9"/>
            <path d="M12 7v5l3 3"/>
          </svg>
          <span class="countdown-timer">{{ formattedTime }}</span>
        </div>
      </div>
    </div>

    <!-- Question Card -->
    <div class="question-card">
      <div class="question-text" :key="currentLetterIndex">
        {{ currentMeaning }}
      </div>
    </div>

    <!-- Answer Field -->
    <section class="answer-section">
      <div class="answer-field" :class="{ 'shake': isShaking }">
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
          class="answer-input"
        />
      </div>
      <div class="button-row">
        <button class="pass-button" @click="handlePass">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
          <span>PAS</span>
        </button>
        <button class="finish-button" @click="handleFinish">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="btn-icon">
            <path d="M9 12l2 2 4-4"/>
            <circle cx="12" cy="12" r="9"/>
          </svg>
          <span>BİTİR</span>
        </button>
      </div>
    </section>

    <!-- Notification -->
    <transition name="notification">
      <div v-if="notification" class="notification" :class="notification.type">
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

// Progress hesapla
const progressPercent = computed(() => {
  const answered = props.TURKISH_ALPHABET.length - props.passedLetters.length - 
    (props.currentLetterIndex < props.TURKISH_ALPHABET.length ? 1 : 0);
  return Math.min(100, (props.currentLetterIndex / props.TURKISH_ALPHABET.length) * 100);
});

// Timer yüzdesi (5 dakika = 300 saniye varsayımıyla)
const timerPercent = computed(() => {
  const [min, sec] = props.formattedTime.split(':').map(Number);
  const totalSeconds = min * 60 + sec;
  return Math.max(0, (totalSeconds / 300) * 100);
});

// Carousel pozisyonu hesapla - aktif harf ortada
const carouselStyle = computed(() => {
  const itemWidth = 52;
  const selectedWidth = 72;
  const gap = 20;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  background: var(--bg);
  position: relative;
  overflow: hidden;
}

/* Background orbs */
.game-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.4;
  pointer-events: none;
  z-index: 0;
}

.game-orb.orb-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent 70%);
  top: -100px;
  right: -100px;
  animation: orbMove 15s ease-in-out infinite;
}

.game-orb.orb-2 {
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(168, 85, 247, 0.3), transparent 70%);
  bottom: 20%;
  left: -80px;
  animation: orbMove 12s ease-in-out infinite reverse;
}

@keyframes orbMove {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 20px); }
}

/* Progress Bar */
.progress-bar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  z-index: 10;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), #8b5cf6, #a855f7);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.progress-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5));
  animation: progressGlow 1.5s ease-in-out infinite;
}

@keyframes progressGlow {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}

/* Alphabet Carousel */
.alphabet-carousel {
  position: relative;
  z-index: 1;
  width: 100%;
  overflow: hidden;
  padding: 48px 0 28px;
  background: linear-gradient(180deg, rgba(5, 8, 15, 0.95) 0%, transparent 100%);
}

.carousel-gradient {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 80px;
  z-index: 2;
  pointer-events: none;
}

.carousel-gradient.left {
  left: 0;
  background: linear-gradient(90deg, var(--bg), transparent);
}

.carousel-gradient.right {
  right: 0;
  background: linear-gradient(-90deg, var(--bg), transparent);
}

.alphabet-inner {
  display: flex;
  gap: 20px;
  will-change: transform;
}

.alphabet-item {
  position: relative;
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--text-muted);
  background: rgba(10, 15, 25, 0.9);
  border: 2px solid rgba(255, 255, 255, 0.06);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;
  overflow: hidden;
}

.letter-text {
  position: relative;
  z-index: 1;
}

.letter-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255,255,255,0.2), transparent 70%);
  transform: translate(-50%, -50%) scale(0);
  transition: transform 0.3s ease;
}

.alphabet-item:hover .letter-glow {
  transform: translate(-50%, -50%) scale(1.5);
}

.alphabet-item.selected {
  width: 72px;
  height: 72px;
  font-size: 2rem;
  color: white;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%);
  border: none;
  box-shadow: 
    0 12px 40px rgba(99, 102, 241, 0.6),
    0 0 30px rgba(139, 92, 246, 0.4),
    inset 0 2px 0 rgba(255, 255, 255, 0.3);
  transform: translateY(-10px) scale(1.1);
  animation: selectedPulse 2s ease-in-out infinite;
}

.alphabet-item.correct {
  background: linear-gradient(135deg, var(--success), #34d399);
  color: white;
  border: none;
  box-shadow: 0 6px 20px var(--glow-success);
}

.alphabet-item.wrong {
  background: linear-gradient(135deg, var(--danger), #f87171);
  color: white;
  border: none;
  box-shadow: 0 6px 20px var(--glow-danger);
}

.alphabet-item.passed {
  background: linear-gradient(135deg, var(--warning), #fbbf24);
  color: #1f2937;
  border: none;
  box-shadow: 0 6px 20px var(--glow-warning);
  animation: passedPulse 1.5s ease-in-out infinite;
}

@keyframes passedPulse {
  0%, 100% { box-shadow: 0 6px 20px var(--glow-warning); }
  50% { box-shadow: 0 6px 30px var(--glow-warning), 0 0 20px var(--glow-warning); }
}

.alphabet-item.clickable {
  cursor: pointer;
}

.alphabet-item.clickable:hover {
  transform: scale(1.15) translateY(-4px);
  box-shadow: 0 10px 30px var(--glow-warning);
}

/* Countdown */
.countdown-container {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.countdown {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border-radius: 50px;
}

.countdown-border {
  position: absolute;
  inset: 0;
  border-radius: 50px;
  background: conic-gradient(
    from 0deg,
    var(--primary) 0%,
    #8b5cf6 calc(var(--timer-percent) * 0.5),
    #a855f7 var(--timer-percent),
    rgba(255, 255, 255, 0.1) var(--timer-percent),
    rgba(255, 255, 255, 0.1) 100%
  );
  transition: all 1s linear;
  z-index: 0;
}

.countdown-content {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  background: rgba(5, 8, 15, 0.98);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 46px;
  color: var(--text);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.countdown-icon {
  width: 24px;
  height: 24px;
  opacity: 0.8;
}

.countdown-timer {
  font-size: 1.2rem;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;
}

.countdown.warning .countdown-content {
  color: var(--warning);
}

.countdown.warning .countdown-border {
  background: conic-gradient(
    from 0deg,
    var(--warning) 0%,
    #fbbf24 var(--timer-percent),
    rgba(255, 255, 255, 0.1) var(--timer-percent),
    rgba(255, 255, 255, 0.1) 100%
  );
}

.countdown.warning .countdown-timer {
  animation: pulse 1s infinite;
}

.countdown.danger .countdown-content {
  color: var(--danger);
}

.countdown.danger .countdown-border {
  background: conic-gradient(
    from 0deg,
    var(--danger) 0%,
    #f87171 var(--timer-percent),
    rgba(255, 255, 255, 0.1) var(--timer-percent),
    rgba(255, 255, 255, 0.1) 100%
  );
  animation: dangerPulse 0.5s infinite;
}

.countdown.danger .countdown-timer {
  animation: pulse 0.5s infinite;
}

@keyframes dangerPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Question Card */
.question-card {
  position: relative;
  z-index: 1;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px;
  margin: 0 16px;
}

.question-text {
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  line-height: 1.5;
  color: var(--text);
  text-transform: uppercase;
  max-width: 100%;
  animation: questionFadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  padding: 24px;
  background: rgba(10, 15, 25, 0.6);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}



/* Answer Section */
.answer-section {
  position: relative;
  z-index: 1;
  padding: 16px 20px 12px;
  background: linear-gradient(180deg, rgba(8, 12, 20, 0.95) 0%, rgba(5, 8, 15, 0.98) 100%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 28px 28px 0 0;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.answer-field {
  background: rgba(10, 15, 25, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 18px;
  padding: 6px;
  margin-bottom: 14px;
  transition: all 0.3s ease;
}

.answer-field:focus-within {
  border-color: var(--primary);
  box-shadow: 0 0 20px var(--glow-primary);
}

.answer-field.shake {
  animation: shake 0.4s ease;
}

.answer-input {
  width: 100%;
  background: transparent;
  border: none;
  padding: 10px 14px;
  font-size: 0.9rem;
  font-family: inherit;
  font-weight: 500;
  color: var(--text);
  outline: none;
  letter-spacing: 1px;
}

.answer-input::placeholder {
  color: var(--text-muted);
  font-weight: 400;
}

.button-row {
  display: flex;
  gap: 12px;
}

.pass-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 18px;
  background: linear-gradient(135deg, var(--warning), #fbbf24);
  color: #1f2937;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px var(--glow-warning);
  position: relative;
  overflow: hidden;
}

.pass-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.pass-button:hover::before {
  left: 100%;
}

.pass-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px var(--glow-warning);
}

.pass-button:active {
  transform: scale(0.97);
}

.btn-icon {
  width: 18px;
  height: 18px;
}

.finish-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 18px;
  background: linear-gradient(135deg, var(--danger), #f87171);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 0.9rem;
  font-weight: 700;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 6px 20px var(--glow-danger);
  position: relative;
  overflow: hidden;
}

.finish-button::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.5s ease;
}

.finish-button:hover::before {
  left: 100%;
}

.finish-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 30px var(--glow-danger);
}

.finish-button:active {
  transform: scale(0.97);
}

/* Notification */
.notification {
  position: fixed;
  bottom: 280px;
  left: 50%;
  transform: translateX(-50%);
  padding: 14px 28px;
  border-radius: 16px;
  font-weight: 600;
  font-size: 1rem;
  z-index: 1000;
  animation: notificationSlide 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.notification.success {
  background: rgba(34, 197, 94, 0.9);
  color: white;
  box-shadow: 0 8px 24px var(--glow-success);
}

.notification.error {
  background: rgba(239, 68, 68, 0.9);
  color: white;
  box-shadow: 0 8px 24px var(--glow-danger);
}

.notification.info {
  background: rgba(51, 65, 85, 0.9);
  color: var(--text);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
}

.notification-enter-active,
.notification-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-enter-from,
.notification-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(30px) scale(0.9);
}

/* Animations */
@keyframes questionFadeIn {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes selectedPulse {
  0%, 100% {
    box-shadow: 
      0 10px 30px rgba(99, 102, 241, 0.5),
      0 0 20px rgba(139, 92, 246, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
  50% {
    box-shadow: 
      0 10px 40px rgba(99, 102, 241, 0.6),
      0 0 40px rgba(139, 92, 246, 0.4),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
  }
}

@keyframes notificationSlide {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(30px) scale(0.9);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20% { transform: translateX(-8px); }
  40% { transform: translateX(8px); }
  60% { transform: translateX(-6px); }
  80% { transform: translateX(6px); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* Responsive */
@media (max-width: 480px) {
  .answer-section {
    padding: 20px 16px 32px;
  }
  
  .question-text {
    font-size: 1.35rem;
    padding: 20px;
  }
  
  .answer-input {
    padding: 16px 18px;
    font-size: 1.1rem;
  }
  
  .button-row {
    gap: 10px;
  }
  
  .pass-button,
  .finish-button {
    padding: 16px 16px;
    font-size: 0.95rem;
  }
}

@media (max-width: 360px) {
  .pass-button span,
  .finish-button span {
    display: none;
  }
  
  .pass-button,
  .finish-button {
    padding: 16px;
    justify-content: center;
  }
  
  .btn-icon {
    width: 24px;
    height: 24px;
  }
}
</style>
