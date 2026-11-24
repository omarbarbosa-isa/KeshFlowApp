<template>
  <div class="column items-center text-center">
    <svg
      width="88"
      height="88"
      viewBox="0 0 88 88"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M16 42C24 41 33 34 45 22L54 13"
        :stroke="iconColor"
        stroke-width="6"
        stroke-linecap="round"
      />
      <path
        d="M44 12H56V24"
        :stroke="iconColor"
        stroke-width="6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <rect x="20" y="54" width="10" height="20" rx="5" :fill="iconColor" />
      <rect x="38" y="42" width="10" height="32" rx="5" :fill="iconColor" />
      <rect x="56" y="30" width="10" height="44" rx="5" :fill="iconColor" />
    </svg>

    <div
      class="text-h4 text-weight-bold q-mt-sm"
      :class="variant === 'on-mint' ? 'text-white' : 'text-kesh-mint'"
    >
      KeshFlow
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'on-light',
    validator: val => ['on-mint', 'on-light'].includes(val)
  }
})

const iconColor = computed(() => (props.variant === 'on-mint' ? '#093030' : '#00D09E'))
</script>

<style scoped>
.text-kesh-mint {
  color: #00d09e;
}
</style>