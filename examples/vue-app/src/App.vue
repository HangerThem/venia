<script setup lang="ts">
import { VeniaProvider } from '@venia-consent/vue'
import '@venia-consent/theme/sunset.css'
import { veniaConfig } from './venia.config'
</script>

<template>
  <VeniaProvider :config="veniaConfig" mode="modal">
    <main>
      <h1>Welcome to Venia!</h1>
      <p>This is a sample Next.js application demonstrating the Venia consent management system.</p>
    </main>
  </VeniaProvider>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;
  padding: 6rem 0;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

p {
  margin-top: 1rem;
  font-size: 1.125rem;
}
</style>
