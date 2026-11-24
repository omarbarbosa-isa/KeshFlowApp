<template>
  <div class="q-mb-md">
    <label
      class="block text-subtitle2 text-weight-medium text-teal-10 q-mb-xs q-pl-sm"
    >
      {{ label }}
    </label>

    <q-input
      :model-value="modelValue"
      :type="computedType"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :rules="rules"
      :reactive-rules="reactiveRules"
      :disable="disable"
      lazy-rules
      borderless
      dense
      class="kesh-auth-input"
      @update:model-value="emit('update:modelValue', $event)"
    >
      <template v-if="isPassword" #append>
        <q-btn
          flat
          round
          dense
          size="sm"
          color="teal-9"
          :icon="showPassword ? 'visibility' : 'visibility_off'"
          :aria-label="
            showPassword ? 'Ocultar palavra-passe' : 'Mostrar palavra-passe'
          "
          :disable="disable"
          @click="showPassword = !showPassword"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  autocomplete: {
    type: String,
    default: 'off'
  },
  rules: {
    type: Array,
    default: () => []
  },
  reactiveRules: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  },
  isPassword: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)

const computedType = computed(() => {
  if (!props.isPassword) return props.type
  return showPassword.value ? 'text' : 'password'
})
</script>

<style scoped>
.kesh-auth-input :deep(.q-field__control) {
  background-color: #dff7e2;
  border-radius: 18px;
  padding: 4px 16px;
  min-height: 46px;
}

.kesh-auth-input :deep(.q-field__native) {
  color: #093030;
}
</style>
