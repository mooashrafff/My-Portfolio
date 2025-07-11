<template>
  <div class="preloader fixed-full flex flex-center bg-black">
    <q-spinner-dots
      color="white"
      size="40px"
    />
    <div class="meta-balls-container">
      <!-- Meta balls animation will be added here -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isLoading = ref(true)

onMounted(() => {
  setTimeout(() => {
    isLoading.value = false
  }, 4000)
})
</script>

<style lang="scss" scoped>
.preloader {
  z-index: 9999;
}

.meta-balls-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style> 