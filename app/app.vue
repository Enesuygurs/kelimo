<template>
  <div class="app-wrapper">
    <!-- Loading Screen -->
    <Transition name="fade">
      <div v-if="isLoading" class="loading-screen">
        <div class="loading-content">
          <div class="loading-logo">
            <div class="logo-icon-large">
              <span>K</span>
            </div>
            <h1 class="loading-title">kelimo</h1>
          </div>
          <div class="loading-spinner">
            <div class="spinner"></div>
          </div>
          <p class="loading-text">Yükleniyor...</p>
        </div>
      </div>
    </Transition>

    <!-- Main Content -->
    <div class="container">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const isLoading = ref(true);

onMounted(async () => {
  // Minimum loading time for smooth UX
  await new Promise(resolve => setTimeout(resolve, 800));
  isLoading.value = false;
  
  // Hide native splash screen if available
  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide();
  } catch (e) {
    // Not running in Capacitor, ignore
  }
});
</script>

<style scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
}

/* Loading Screen */
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--bg);
  background-image: 
    radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
    radial-gradient(ellipse 60% 40% at 100% 100%, rgba(168, 85, 247, 0.2) 0%, transparent 50%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.loading-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.logo-icon-large {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #11998E, #38EF7D, #00D4AA);
  border-radius: var(--radius-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(17, 153, 142, 0.5);
  animation: logoPulse 2s ease-in-out infinite;
}

.logo-icon-large span {
  font-size: 2.5rem;
  font-weight: 800;
  color: white;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.loading-title {
  font-size: 2.5rem;
  font-weight: 800;
  background: linear-gradient(135deg, #11998E, #38EF7D, #00D4AA);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
}

.loading-spinner {
  margin-top: 8px;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(99, 102, 241, 0.2);
  border-top-color: var(--primary);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

.loading-text {
  color: var(--text-muted);
  font-size: 0.95rem;
  font-weight: 500;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes logoPulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 8px 32px rgba(99, 102, 241, 0.5);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 12px 48px rgba(99, 102, 241, 0.7);
  }
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>