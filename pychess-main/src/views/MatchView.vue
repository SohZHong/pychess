<template>
    <modal-box ref="modal">
        <qr-code-scanner
          @update:qr="handleDetect"
        />
        <form class="result-container">
            <label>
                <input type="radio" @input="handleSelectWinner" :name="player1?.name" :value="player1?.id" required/>
            </label>
            <label>
                <input type="radio" @input="handleSelectWinner" :name="player2?.name" :value="player2?.id" v-model="matchForm.winner" required/>
            </label>
        </form>
    </modal-box>
    <button class="light-button" @click="handleSubmitAnswers">Submit Answers</button>
    <div class="question-section">
        <form @submit.prevent="handleSubmitAnswers">
        <div class="question-container" v-for="question in questions" :key="question.id">
            <div>{{ question.text }}</div>
            <div v-for="answer in question.answers" :key="answer.answer">
                <label>
                    <input
                    type="radio"
                    :name="'question-' + question.id"
                    :value="answer.answer"
                    v-model="userAnswers[question.id]"
                    />
                    {{ answer.answer }}
                </label>
            </div>
        </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import QrCodeScanner from '@/components/QrCodeScanner.vue'
import ModalBox from '@/components/ModalBox.vue'
import { MatchProps, PlayerProps, QuestionProps, saveMatch } from '@/api/match'
import { onMounted, onUnmounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { decrypt } from '@/utils/crypto'
import { ScoreProps, saveMatchScore } from '@/api/score'

interface MatchForm {
  winner: number | undefined,
  loser: number | undefined
}

const store = useStore()
const modal = ref<InstanceType<typeof ModalBox>>()
const questions = ref<QuestionProps[]>([])
const userAnswers = ref()
const router = useRouter()
const route = useRoute()
const player1 = ref<PlayerProps>()
const player2 = ref<PlayerProps>()
const matchForm = reactive<MatchForm>({
  winner: undefined,
  loser: undefined
})

const handleDetect = async (decodedString: string) => {
  try {
    const question = JSON.parse(decodedString)
    questions.value.push(question)
  } catch (error) {
    console.error('Error Parsing QR Code', error)
  }
}

// Determine Winner and Loser
const handleSelectWinner = (event: Event) => {
  if ((event.target as HTMLInputElement).value as unknown as number === player1.value?.id) {
    matchForm.loser = player2.value?.id
  } else {
    matchForm.loser = player1.value?.id
  }
}

const handleSubmitAnswers = async () => {
  let score = 0

  questions.value.forEach(question => {
    const userAnswer = userAnswers.value[question.id]
    const correctAnswer = question.answers.find(ans => ans.is_correct === '1')
    // Comparing answers
    if (userAnswer === correctAnswer?.answer) {
      score += question.score
    }
  })
  // Save Score
  try {
    const match: MatchProps = { winner: matchForm.winner as number, loser: matchForm.loser as number }
    const player1Score: ScoreProps = {
      userId: player1.value?.id as number,
      scoreAcquired: player1.value?.score as number
    }
    const player2Score: ScoreProps = {
      userId: player2.value?.id as number,
      scoreAcquired: player2.value?.score as number
    }
    await saveMatch(match)
    await saveMatchScore(player1Score, player2Score)

    // Display score
    await store.dispatch('showAlert', {
      message: `Congratulations! Your Score is: ${score}`,
      header: 'Final Score',
      onClose: () => {
        router.push('/dashboard')
      }
    })
  } catch (error) {
    console.error('Error saving match details')
  }
}

onMounted(async () => {
  // Display the modal on mount
  modal.value?.show()
  const encryptedPlayer1 = route.query.player1 as string
  const encryptedPlayer2 = route.query.player2 as string

  try {
    const decryptedPlayer1 = JSON.parse(decrypt(encryptedPlayer1))
    const decryptedPlayer2 = JSON.parse(decrypt(encryptedPlayer2))
    player1.value = decryptedPlayer1
    player2.value = decryptedPlayer2
  } catch (error) {
    console.error('Error decrypting player data:', error)
  }
})

onUnmounted(async () => {
  modal.value?.close()
})
</script>

<style scoped>

</style>
