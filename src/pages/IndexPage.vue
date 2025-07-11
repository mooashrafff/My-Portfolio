<template>
  <q-page class="flex flex-center">
    <Preloader v-if="isLoading" />
    <template v-else>
      <HeroBackground :words="words" />
    </template>
  </q-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Preloader from '../components/Preloader.vue'
import HeroBackground from '../components/HeroBackground.vue'

const isLoading = ref(true)
const words = [
  'Mohamed Ashraf',
  'a Web Developer',
  'a Graphic Designer',
  'a Tech Nerd',
  'a Learner'
]

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 4000)
})
</script>

<style lang="scss" scoped>
.q-page {
  min-height: 100vh;
  background: #ffffff;
}
</style> 