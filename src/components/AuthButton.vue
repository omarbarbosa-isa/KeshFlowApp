<template>
  <q-btn
    :type="to ? undefined : type"
    :to="to"
    :label="label"
    :loading="loading"
    :disable="disable"
    unelevated
    rounded
    no-caps
    class="kesh-auth-btn text-weight-bold q-px-xl"
    :class="
      variant === 'secondary'
        ? 'kesh-auth-btn--secondary'
        : 'kesh-auth-btn--primary'
    "
    @click="emit('click', $event)"
  />
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'button'
  },
  to: {
    type: [String, Object],
    default: undefined
  },
  variant: {
    type: String,
    default: 'primary',
    validator: val => ['primary', 'secondary'].includes(val)
  },
  loading: {
    type: Boolean,
    default: false
  },
  disable: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['click'])
</script>

<style scoped>
.kesh-auth-btn {
  color: #093030;
  min-width: 210px;
  min-height: 44px;
}

.kesh-auth-btn--primary {
  background-color: #00d09e;
}

.kesh-auth-btn--secondary {
  background-color: #dff7e2;
}
</style>
