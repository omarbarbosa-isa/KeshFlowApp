<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page
        v-if="showSplash"
        class="kesh-splash column items-center justify-center q-pa-lg cursor-pointer"
        @click="dismissSplash"
      >
        <AppLogo variant="on-mint" />
      </q-page>

      <q-page
        v-else
        class="kesh-launch column items-center justify-center q-pa-lg"
      >
        <div class="kesh-launch-box column items-center full-width text-center">
          <AppLogo variant="on-light" />

          <p
            class="text-body2 text-teal-9 q-mt-md q-mb-xl kesh-launch-subtitle"
          >
            Organize as suas receitas, despesas e objectivos financeiros num só
            lugar.
          </p>

          <div class="column items-center q-gutter-y-sm full-width">
            <AuthButton
              label="Entrar"
              variant="primary"
              :to="{ name: 'login' }"
            />

            <AuthButton
              label="Criar Conta"
              variant="secondary"
              :to="{ name: 'register' }"
            />
          </div>

          <router-link
            :to="{ name: 'forgot-password' }"
            class="text-caption text-weight-bold text-teal-10 q-mt-lg"
            style="text-decoration: none"
          >
            Esqueceu-se da palavra-passe?
          </router-link>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppLogo from '@/components/AppLogo.vue'
import AuthButton from '@/components/AuthButton.vue'

const SPLASH_KEY = 'kesh_splash_seen'
const showSplash = ref(false)
let splashTimer = null

function dismissSplash() {
  showSplash.value = false
  if (splashTimer) {
    clearTimeout(splashTimer)
    splashTimer = null
  }
  try {
    sessionStorage.setItem(SPLASH_KEY, '1')
  } catch {
    // Ignorar caso sessionStorage não esteja disponível
  }
}

onMounted(() => {
  let alreadySeen = false
  try {
    alreadySeen = sessionStorage.getItem(SPLASH_KEY) === '1'
  } catch {
    alreadySeen = true
  }

  if (!alreadySeen) {
    showSplash.value = true
    splashTimer = setTimeout(dismissSplash, 1100)
  }
})

onBeforeUnmount(() => {
  if (splashTimer) {
    clearTimeout(splashTimer)
  }
})
</script>

<style scoped>
.kesh-splash {
  background-color: #00d09e;
  min-height: 100vh;
}

.kesh-launch {
  background-color: #f1fff3;
  min-height: 100vh;
}

.kesh-launch-box {
  max-width: 360px;
}

.kesh-launch-subtitle {
  max-width: 280px;
}
</style>
