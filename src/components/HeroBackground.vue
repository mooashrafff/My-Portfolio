<template>
  <div class="hero-background">
    <div class="background-lines flex flex-center column q-px-md">
      <h2 class="text-h2 text-center text-weight-bold q-my-md">
        Hello World, <br />I am
        <span class="flip-words">
          <transition-group name="flip">
            <span v-for="(word, index) in words" :key="word" v-show="currentWordIndex === index">
              {{ word }}
            </span>
          </transition-group>
        </span>
      </h2>
      
      <p class="text-body1 text-center q-mb-lg max-width">
        Front-end Web Developer with 2 years of experience in building beautiful and modern frameworks. 
        Passionate about design, exploring new techniques, and contributing to open-source projects.
      </p>

      <q-btn
        color="primary"
        label="Check My Resume"
        rounded
        size="lg"
        class="q-mt-lg"
        @click="openResume"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const props = defineProps<{
  words: string[]
}>()

const currentWordIndex = ref(0)

const openResume = () => {
  window.open('https://drive.google.com/file/d/15ileE0FDjYUejypGhISUlmTw8a5DZ38Q/view?usp=sharing', '_blank')
}

onMounted(() => {
  setInterval(() => {
    currentWordIndex.value = (currentWordIndex.value + 1) % props.words.length
  }, 2000)
})
</script>

<style lang="scss" scoped>
.hero-background {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.background-lines {
  position: relative;
  z-index: 2;
}

.max-width {
  max-width: 600px;
  margin: 0 auto;
}

.flip-words {
  display: inline-block;
  min-width: 200px;
  text-align: left;
}

.flip-enter-active,
.flip-leave-active {
  transition: all 0.5s ease;
}

.flip-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.flip-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}
</style> 