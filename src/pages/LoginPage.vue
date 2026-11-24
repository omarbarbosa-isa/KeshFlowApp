<template>
  <q-form ref="formRef" greedy class="column" @submit.prevent="handleLogin">
    <q-banner
      v-if="errorMessage"
      rounded
      dense
      class="bg-red-1 text-red-9 q-mb-md q-pa-sm"
    >
      <template #avatar>
        <q-icon name="error_outline" color="red-8" />
      </template>
      {{ errorMessage }}
    </q-banner>

    <AuthInput
      v-model="email"
      label="E-mail"
      type="email"
      placeholder="exemplo@dominio.com"
      autocomplete="email"
      :rules="emailRules"
      :disable="authStore.loading"
    />

    <AuthInput
      v-model="password"
      label="Palavra-passe"
      placeholder="••••••••"
      autocomplete="current-password"
      is-password
      :rules="passwordRules"
      :disable="authStore.loading"
    />

    <div class="column items-center q-mt-lg q-gutter-y-sm">
      <AuthButton
        type="submit"
        label="Entrar"
        variant="primary"
        :loading="authStore.loading"
        :disable="authStore.loading"
      />

      <router-link
        :to="{ name: 'forgot-password' }"
        class="text-caption text-weight-bold text-teal-10 q-my-xs"
        style="text-decoration: none"
      >
        Esqueceu-se da palavra-passe?
      </router-link>

      <AuthButton
        label="Criar Conta"
        variant="secondary"
        :to="{ name: 'register' }"
        :disable="authStore.loading"
      />
    </div>

    <div class="text-center q-mt-lg text-caption text-teal-10">
      Não tem uma conta?
      <router-link
        :to="{ name: 'register' }"
        class="text-weight-bold text-teal-8"
        style="text-decoration: none"
      >
        Registar-se
      </router-link>
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AuthButton from '@/components/AuthButton.vue'
import AuthInput from '@/components/AuthInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { mapAuthError } from '@/utils/authErrors'

const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const formRef = ref(null)
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const emailRules = [
  val => !!val?.trim() || 'Introduza o seu e-mail.',
  val =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ||
    'Introduza um e-mail válido.'
]

const passwordRules = [
  val => !!val || 'Introduza a sua palavra-passe.',
  val => val.length >= 6 || 'A palavra-passe deve ter pelo menos 6 caracteres.'
]

async function handleLogin() {
  errorMessage.value = ''

  const valid = await formRef.value?.validate()
  if (!valid || authStore.loading) return

  try {
    await authStore.login({
      email: email.value.trim(),
      password: password.value
    })

    const redirectPath =
      typeof route.query.redirect === 'string' &&
      route.query.redirect.startsWith('/')
        ? route.query.redirect
        : null

    await router.replace(redirectPath || { name: 'dashboard' })
  } catch (error) {
    errorMessage.value = mapAuthError(error)
  }
}
</script>
