<template>
    <div class="button-container">
        <button class="light-button">Print QR</button>
        <button class="light-button">Start Match</button>
    </div>
    <div class="chess-container">
        <h1 class="color">White</h1>
        <div class="qr-container">
            <div v-for="question in whiteQuestions" :key="question.id">
                <img :src="question.code" />
                <span>{{ question.name }}</span>
            </div>
        </div>
    </div>
    <div class="chess-container">
        <h1 class="color">Black</h1>
        <div class="qr-container">
            <div v-for="question in blackQuestions" :key="question.id">
                <img :src="question.code" />
                <span>{{ question.name }}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { QuestionProps, getQuestions } from '@/api/match'
import { computed, onMounted, ref } from 'vue'

const questions = ref<QuestionProps[]>([])
// Divide questions to black and white
const whiteQuestions = computed(() => {
  return questions.value.slice(0, Math.ceil(questions.value.length / 2))
})

const blackQuestions = computed(() => {
  return questions.value.slice(Math.ceil(questions.value.length / 2))
})

onMounted(async () => {
  try {
    const res = await getQuestions()
    const { data } = res.data
    if (Array.isArray(data)) {
      questions.value = data
    } else {
      console.error('Unexpected response format:', res.data)
    }
  } catch (error) {
    console.error('Error fetching questions:', error)
  }
})

</script>

<style scoped>
</style>
