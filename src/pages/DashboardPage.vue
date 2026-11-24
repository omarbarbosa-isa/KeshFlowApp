<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-page class="column items-center justify-center q-pa-lg bg-green-1">
        <q-card
          flat
          bordered
          class="q-pa-lg full-width"
          style="max-width: 420px; border-radius: 24px"
        >
          <q-card-section class="text-center">
            <q-icon name="account_balance_wallet" size="48px" color="teal-6" />
            <div class="text-h6 text-weight-bold text-teal-10 q-mt-sm">
              KeshFlowApp — Dashboard
            </div>
            <div class="text-body2 text-grey-8 q-mt-xs">
              Sessão iniciada como:
              <span class="text-weight-bold text-teal-10">{{
                authStore.user?.email
              }}</span>
            </div>
          </q-card-section>

          <q-card-actions align="center" class="q-pt-md">
            <q-btn
              label="Terminar Sessão"
              color="negative"
              unelevated
              rounded
              no-caps
              :loading="authStore.loading"
              @click="handleLogout"
            />
          </q-card-actions>
        </q-card>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const authStore = useAuthStore()
const router = useRouter()

async function handleLogout() {
  if (authStore.loading) return
  await authStore.logout()
  await router.replace({ name: 'launch' })
}
</script>
