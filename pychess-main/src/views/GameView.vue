<template>
    <div class="button-container">
        <button class="light-button" @click.prevent="handleDownloadQR">Print QR</button>
        <button class="light-button">Start Match</button>
    </div>
    <div class="chess-section" ref="chessSection">
        <div class="chess-container">
            <h1 class="color">White</h1>
            <div class="qr-container">
                <div class="qr" v-for="question in whiteQuestions" :key="question.id">
                    <img :src="question.code" alt="Question QR Code"/>
                    <span>{{ question.name }}</span>
                </div>
            </div>
        </div>
        <div class="chess-container">
            <h1 class="color">Black</h1>
            <div class="qr-container">
                <div class="qr" v-for="question in blackQuestions" :key="question.id">
                    <img :src="question.code" alt="Question QR Code"/>
                    <span>{{ question.name }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { QuestionProps, getQuestions } from '@/api/match'
import { computed, onMounted, ref } from 'vue'
import { downloadScreenshot } from '@/utils/screenshot'

const questions = ref<QuestionProps[]>([])
// Divide questions to black and white
const whiteQuestions = computed(() => {
  return questions.value.slice(0, Math.ceil(questions.value.length / 2))
})

const blackQuestions = computed(() => {
  return questions.value.slice(Math.ceil(questions.value.length / 2))
})

// Reference to the chess section
const chessSection = ref<HTMLDivElement | null>(null)

// Download QR Code
const handleDownloadQR = async () => {
  if (!chessSection.value) return
  await downloadScreenshot(chessSection.value, 'image/png', 'qr-codes.png')
}

onMounted(async () => {
  try {
    const questionSession = sessionStorage.getItem('questions')
    if (questionSession) {
      // retrieve from session to reduce database read
      questions.value = JSON.parse(questionSession)
    } else {
      const res = await getQuestions()
      const { data } = res.data
      if (Array.isArray(data)) {
        questions.value = data
        // set session storage to prevent additional database retrieval
        sessionStorage.setItem('questions', JSON.stringify(data))
      } else {
        console.error('Unexpected response format:', res.data)
      }
    }
  } catch (error) {
    console.error('Error fetching questions:', error)
  }
})

</script>

<style scoped>
.button-container {
    padding: 1rem;
    display: flex;
    align-items: center;
    justify-content: end;
    gap: 1rem;
}

.button-container > button {
    font-size: var(--font-size);
    width: 200px;
}

.chess-section {
    padding: 1rem;
}

.chess-section .chess-container {
    display: flex;
    flex-direction: column;
    margin: 2rem 0;
}

.chess-section .chess-container .qr-container{
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: baseline;
    gap: 1rem;
}

.qr-container .qr {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: baseline;
}

.qr-container .qr > img{
    width: 150px;
    height: auto;
}

@media only screen and (max-width: 576px) {
  .qr-container {
    justify-content: center;
  }
}
</style>
