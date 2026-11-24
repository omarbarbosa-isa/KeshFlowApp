<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="kesh-auth-page column no-wrap">
        <header
          class="row items-center justify-center relative-position q-px-lg q-pt-xl q-pb-lg"
        >
          <q-btn
            flat
            round
            dense
            icon="arrow_back"
            color="teal-10"
            class="absolute-left q-ml-md q-mt-md"
            aria-label="Voltar ao início"
            :to="{ name: 'launch' }"
          />

          <h1
            class="text-h4 text-weight-bold text-teal-10 q-ma-none text-center"
          >
            {{ pageTitle }}
          </h1>
        </header>

        <main
          class="kesh-auth-sheet col column items-center q-px-lg q-pt-xl q-pb-lg"
        >
          <div class="kesh-auth-container full-width q-my-auto">
            <router-view />
          </div>
        </main>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const pageTitle = computed(() => route.meta?.title || 'KeshFlowApp')
</script>

<style scoped>
.kesh-auth-page {
  background-color: #00d09e;
  min-height: 100vh;
}

.kesh-auth-sheet {
  background-color: #f1fff3;
  border-top-left-radius: 44px;
  border-top-right-radius: 44px;
}

.kesh-auth-container {
  max-width: 420px;
}
</style>
