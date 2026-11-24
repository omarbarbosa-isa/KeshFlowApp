<template>
  <q-form ref="formRef" greedy class="column" @submit.prevent="handleRegister">
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

    <q-banner
      v-if="successMessage"
      rounded
      dense
      class="bg-green-1 text-teal-10 q-mb-md q-pa-sm"
    >
      <template #avatar>
        <q-icon name="check_circle_outline" color="teal-8" />
      </template>
      {{ successMessage }}
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
      autocomplete="new-password"
      is-password
      :rules="passwordRules"
      :disable="authStore.loading"
    />

    <AuthInput
      v-model="confirmPassword"
      label="Confirmar Palavra-passe"
      placeholder="••••••••"
      autocomplete="new-password"
      is-password
      reactive-rules
      :rules="confirmPasswordRules"
      :disable="authStore.loading"
    />

    <p class="text-center text-caption text-teal-9 q-mt-sm q-mb-md">
      Ao continuar, concorda com os
      <span class="text-weight-bold">Termos de Utilização</span> e
      <span class="text-weight-bold">Política de Privacidade</span>.
    </p>

    <div class="column items-center">
      <AuthButton
        type="submit"
        label="Criar Conta"
        variant="primary"
        :loading="authStore.loading"
        :disable="authStore.loading"
      />
    </div>

    <div class="text-center q-mt-lg text-caption text-teal-10">
      Já tem uma conta?
      <router-link
        :to="{ name: 'login' }"
        class="text-weight-bold text-teal-8"
        style="text-decoration: none"
      >
        Iniciar sessão
      </router-link>
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AuthButton from '@/components/AuthButton.vue'
import AuthInput from '@/components/AuthInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { mapAuthError } from '@/utils/authErrors'

const authStore = useAuthStore()
const router = useRouter()

const formRef = ref(null)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const emailRules = [
  val => !!val?.trim() || 'Introduza o seu e-mail.',
  val =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ||
    'Introduza um e-mail válido.'
]

const passwordRules = [
  val => !!val || 'Introduza uma palavra-passe.',
  val => val.length >= 6 || 'A palavra-passe deve ter pelo menos 6 caracteres.'
]

const confirmPasswordRules = [
  val => !!val || 'Confirme a sua palavra-passe.',
  val => val === password.value || 'As palavras-passe não coincidem.'
]

async function handleRegister() {
  errorMessage.value = ''
  successMessage.value = ''

  const valid = await formRef.value?.validate()
  if (!valid || authStore.loading) return

  try {
    const data = await authStore.register({
      email: email.value.trim(),
      password: password.value
    })

    if (data?.session) {
      await router.replace({ name: 'dashboard' })
      return
    }

    successMessage.value =
      'Conta criada com sucesso! Verifique o seu e-mail para confirmar o registo antes de iniciar sessão.'
    password.value = ''
    confirmPassword.value = ''
  } catch (error) {
    errorMessage.value = mapAuthError(error)
  }
}
</script>
