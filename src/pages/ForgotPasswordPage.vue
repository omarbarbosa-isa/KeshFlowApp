<template>
  <q-form ref="formRef" greedy class="column" @submit.prevent="handleReset">
    <p class="text-body2 text-teal-9 q-mb-md">
      Introduza o seu e-mail para receber as instruções de recuperação da
      palavra-passe.
    </p>

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

    <div class="column items-center q-mt-md q-gutter-y-sm">
      <AuthButton
        type="submit"
        label="Enviar E-mail"
        variant="primary"
        :loading="authStore.loading"
        :disable="authStore.loading"
      />

      <AuthButton
        label="Voltar ao Login"
        variant="secondary"
        :to="{ name: 'login' }"
        :disable="authStore.loading"
      />
    </div>
  </q-form>
</template>

<script setup>
import { ref } from 'vue'
import AuthButton from '@/components/AuthButton.vue'
import AuthInput from '@/components/AuthInput.vue'
import { useAuthStore } from '@/stores/authStore'
import { mapAuthError } from '@/utils/authErrors'

const authStore = useAuthStore()

const formRef = ref(null)
const email = ref('')
const errorMessage = ref('')
const successMessage = ref('')

const emailRules = [
  val => !!val?.trim() || 'Introduza o seu e-mail.',
  val =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()) ||
    'Introduza um e-mail válido.'
]

async function handleReset() {
  errorMessage.value = ''
  successMessage.value = ''

  const valid = await formRef.value?.validate()
  if (!valid || authStore.loading) return

  try {
    await authStore.sendPassResetEmail(email.value.trim())
    successMessage.value =
      'Se existir uma conta associada a este e-mail, receberá instruções para repor a palavra-passe.'
  } catch (error) {
    errorMessage.value = mapAuthError(error)
  }
}
</script>
