import { ref, computed } from 'vue';
import { TURKISH_ALPHABET, getTodaysWords, getRandomWords, normalizeWord, type WordData } from '~/utils/words';

export interface GameResult {
  letterIndex: number;
  letter: string;
  userAnswer: string;
  correctAnswer: string;
  correctMeaning: string;
  correct: boolean;
  skipped: boolean;
  passed: boolean;
  points: number;
}

export type GameScreen = 'start' | 'game' | 'result';
export type GameMode = 'daily' | 'unlimited';
export type LetterStatus = 'current' | 'correct' | 'wrong' | 'passed' | 'skipped' | '';

// Günlük oyun tamamlanma durumunu kontrol et
function getTodayKey(): string {
  const today = new Date();
  return `kelimo_daily_${today.getFullYear()}_${today.getMonth()}_${today.getDate()}`;
}

export function isDailyCompleted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(getTodayKey()) === 'completed';
}

function markDailyCompleted(): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(getTodayKey(), 'completed');
}

export function useGame() {
  const currentScreen = ref<GameScreen>('start');
  const gameMode = ref<GameMode>('daily');
  const todaysWords = ref<Record<string, WordData>>({});
  const currentLetterIndex = ref(0);
  const correctCount = ref(0);
  const wrongCount = ref(0);
  const passedCount = ref(0);
  const timeLeft = ref(300); // 5 dakika
  const results = ref<GameResult[]>([]);
  const userAnswer = ref('');
  const isShaking = ref(false);
  const passedLetters = ref<number[]>([]); // Pas geçilen harfler
  const completedLetters = ref<Set<number>>(new Set()); // Tamamlanan harfler
  
  let timer: ReturnType<typeof setInterval> | null = null;

  const currentLetter = computed(() => TURKISH_ALPHABET[currentLetterIndex.value] || 'A');
  
  const currentWord = computed(() => {
    const letter = currentLetter.value;
    return letter ? todaysWords.value[letter] : undefined;
  });

  const currentMeaning = computed(() => {
    return currentWord.value?.meaning || '';
  });
  
  const formattedTime = computed(() => {
    const minutes = Math.floor(timeLeft.value / 60);
    const seconds = timeLeft.value % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });
  
  const timerClass = computed(() => {
    if (timeLeft.value <= 30) return 'danger';
    if (timeLeft.value <= 60) return 'warning';
    return '';
  });
  
  const resultTitle = computed(() => {
    return 'Tebrikler!';
  });

  const allLettersCompleted = computed(() => {
    return completedLetters.value.size >= TURKISH_ALPHABET.length;
  });

  function initGame() {
    todaysWords.value = getTodaysWords();
  }

  function startGame(mode: GameMode = 'daily') {
    gameMode.value = mode;
    
    // Moda göre kelime setini seç
    if (mode === 'daily') {
      todaysWords.value = getTodaysWords();
    } else {
      todaysWords.value = getRandomWords();
    }
    
    currentScreen.value = 'game';
    startTimer();
  }

  function startTimer() {
    timer = setInterval(() => {
      timeLeft.value--;
      
      if (timeLeft.value <= 0) {
        endGame();
      }
    }, 1000);
  }

  function submitAnswer(): { success: boolean; message: string; correctAnswer?: string } {
    if (!currentWord.value) {
      moveToNextLetter();
      return { success: true, message: '' };
    }
    
    const normalizedUserAnswer = normalizeWord(userAnswer.value.trim());
    const normalizedCorrectAnswer = normalizeWord(currentWord.value.word);
    
    if (normalizedUserAnswer === '') {
      return { success: false, message: 'Bir cevap girin!' };
    }

    // PAS yazarsa pas geç
    if (normalizedUserAnswer === 'PAS') {
      return passLetter();
    }

    // BİTİR yazarsa oyunu bitir
    if (normalizedUserAnswer === 'BITIR' || normalizedUserAnswer === 'BİTİR') {
      finishGame();
      return { success: true, message: 'Oyun bitti!' };
    }
    
    // Cevap doğru harfle başlamalı
    const currentLetterNormalized = normalizeWord(currentLetter.value);
    const answerFirstLetter = normalizedUserAnswer.charAt(0);
    if (answerFirstLetter !== currentLetterNormalized) {
      userAnswer.value = '';
      return { success: false, message: `Cevap "${currentLetter.value}" harfi ile başlamalı!` };
    }
    
    if (normalizedUserAnswer === normalizedCorrectAnswer) {
      correctCount.value++;
      
      // Eğer bu harf daha önce pas geçilmişse, passed listesinden çıkar
      const passedIndex = passedLetters.value.indexOf(currentLetterIndex.value);
      if (passedIndex > -1) {
        passedLetters.value.splice(passedIndex, 1);
        passedCount.value--;
      }
      
      completedLetters.value.add(currentLetterIndex.value);
      
      results.value.push({
        letterIndex: currentLetterIndex.value,
        letter: currentLetter.value,
        userAnswer: userAnswer.value.toUpperCase(),
        correctAnswer: currentWord.value.word,
        correctMeaning: currentWord.value.meaning,
        correct: true,
        skipped: false,
        passed: false,
        points: 0
      });
      
      moveToNextLetter();
      return { success: true, message: 'Doğru' };
    } else {
      // Yanlış cevap - soruyu yanlış olarak işaretle
      wrongCount.value++;
      
      // Eğer bu harf daha önce pas geçilmişse, passed listesinden çıkar
      const passedIndex = passedLetters.value.indexOf(currentLetterIndex.value);
      if (passedIndex > -1) {
        passedLetters.value.splice(passedIndex, 1);
        passedCount.value--;
      }
      
      completedLetters.value.add(currentLetterIndex.value);
      
      const wrongAnswer = userAnswer.value.toUpperCase();
      const correctAnswer = currentWord.value.word;
      const correctMeaning = currentWord.value.meaning;
      
      results.value.push({
        letterIndex: currentLetterIndex.value,
        letter: currentLetter.value,
        userAnswer: wrongAnswer,
        correctAnswer: correctAnswer,
        correctMeaning: correctMeaning,
        correct: false,
        skipped: false,
        passed: false,
        points: 0
      });
      
      isShaking.value = true;
      setTimeout(() => isShaking.value = false, 300);
      
      moveToNextLetter();
      return { success: false, message: 'Yanlış' };
    }
  }

  function passLetter(): { success: boolean; message: string; correctAnswer?: string } {
    if (!passedLetters.value.includes(currentLetterIndex.value) && 
        !completedLetters.value.has(currentLetterIndex.value)) {
      passedLetters.value.push(currentLetterIndex.value);
      passedCount.value++;
    }
    
    userAnswer.value = '';
    moveToNextLetter();
    return { success: true, message: 'Pas geçildi! Daha sonra dönebilirsiniz.' };
  }

  function skipLetter(): { success: boolean; message: string; correctAnswer?: string } {
    const word = currentWord.value;
    wrongCount.value++;
    
    // Eğer bu harf daha önce pas geçilmişse, passed listesinden çıkar
    const passedIndex = passedLetters.value.indexOf(currentLetterIndex.value);
    if (passedIndex > -1) {
      passedLetters.value.splice(passedIndex, 1);
      passedCount.value--;
    }
    
    completedLetters.value.add(currentLetterIndex.value);
    
    results.value.push({
      letterIndex: currentLetterIndex.value,
      letter: currentLetter.value,
      userAnswer: '-',
      correctAnswer: word ? word.word : '-',
      correctMeaning: word ? word.meaning : '-',
      correct: false,
      skipped: true,
      passed: false,
      points: 0
    });
    
    const answer = word ? word.word : '-';
    moveToNextLetter();
    return { success: true, message: `Geçildi! Doğru cevap: ${answer}`, correctAnswer: answer };
  }

  function moveToNextLetter() {
    userAnswer.value = '';
    
    // Önce sıradaki tamamlanmamış harfi bul
    let nextIndex = currentLetterIndex.value + 1;
    
    while (nextIndex < TURKISH_ALPHABET.length && completedLetters.value.has(nextIndex)) {
      nextIndex++;
    }
    
    // Eğer tüm harfler tamamlandıysa veya sona ulaştıysak
    if (nextIndex >= TURKISH_ALPHABET.length) {
      // Pas geçilen harfler varsa onlara dön
      if (passedLetters.value.length > 0) {
        const firstPassed = passedLetters.value[0];
        if (firstPassed !== undefined) {
          currentLetterIndex.value = firstPassed;
          return;
        }
      }
      
      // Hiç pas geçilen harf yoksa ve tüm harfler tamamlandıysa oyunu bitir
      if (allLettersCompleted.value) {
        endGame();
        return;
      }
    }
    
    currentLetterIndex.value = nextIndex;
  }

  function goToLetter(index: number) {
    // Sadece pas geçilen harflere gidilebilir
    if (passedLetters.value.includes(index) || !completedLetters.value.has(index)) {
      currentLetterIndex.value = index;
      userAnswer.value = '';
    }
  }

  function endGame() {
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    
    // Kalan harfleri yanlış olarak işaretle
    for (let i = 0; i < TURKISH_ALPHABET.length; i++) {
      if (!completedLetters.value.has(i)) {
        const letter = TURKISH_ALPHABET[i];
        if (!letter) continue;
        const word = todaysWords.value[letter];
        
        wrongCount.value++;
        results.value.push({
          letterIndex: i,
          letter: letter || '-',
          userAnswer: '-',
          correctAnswer: word ? word.word : '-',
          correctMeaning: word ? word.meaning : '-',
          correct: false,
          skipped: true,
          passed: passedLetters.value.includes(i),
          points: 0
        });
        
        completedLetters.value.add(i);
      }
    }
    
    // Günlük mod ise tamamlandı olarak işaretle
    if (gameMode.value === 'daily') {
      markDailyCompleted();
    }
    
    currentScreen.value = 'result';
  }

  function finishGame() {
    // Kullanıcı manuel olarak oyunu bitirdi
    endGame();
  }

  function resetGame() {
    currentLetterIndex.value = 0;
    correctCount.value = 0;
    wrongCount.value = 0;
    passedCount.value = 0;
    timeLeft.value = 300;
    results.value = [];
    userAnswer.value = '';
    passedLetters.value = [];
    completedLetters.value = new Set();
    
    if (timer) {
      clearInterval(timer);
      timer = null;
    }
    
    currentScreen.value = 'start';
  }

  function getLetterStatus(index: number): LetterStatus {
    if (index === currentLetterIndex.value && currentScreen.value === 'game') {
      return 'current';
    }
    
    const result = results.value.find(r => r.letterIndex === index);
    if (result) {
      if (result.correct) return 'correct';
      if (result.passed) return 'passed';
      if (result.skipped) return 'skipped';
      return 'wrong';
    }
    
    if (passedLetters.value.includes(index)) {
      return 'passed';
    }
    
    return '';
  }

  return {
    // State
    currentScreen,
    currentLetterIndex,
    currentLetter,
    currentWord,
    currentMeaning,
    correctCount,
    wrongCount,
    passedCount,
    timeLeft,
    formattedTime,
    timerClass,
    results,
    userAnswer,
    resultTitle,
    isShaking,
    passedLetters,
    completedLetters,
    allLettersCompleted,
    
    // Methods
    initGame,
    startGame,
    submitAnswer,
    passLetter,
    skipLetter,
    goToLetter,
    finishGame,
    resetGame,
    getLetterStatus,
    
    // Constants
    TURKISH_ALPHABET
  };
}
