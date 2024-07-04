<template>
    <modal-box ref="modal">
        <qr-code-scanner
          @update:qr="handleDetect"
        />
        <form @submit.prevent="handleSelectWinner" class="result-container">
          <h3>Please Select Winner:</h3>
          <label>
              <input type="radio" v-model="matchForm.winner" :name="player1?.name" :value="player1?.id" required/>
              {{ player1?.name }}
          </label>
          <label>
              <input type="radio" v-model="matchForm.winner" :name="player2?.name" :value="player2?.id" required/>
              {{ player2?.name }}
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
const userAnswers = ref<Record<number, string>>({})
const router = useRouter()
const route = useRoute()
const player1 = ref<PlayerProps>()
const player2 = ref<PlayerProps>()
const matchForm = reactive<MatchForm>({
  winner: undefined,
  loser: undefined
})

const handleDetect = async (detectedString: { map: (arg0: (code: any) => any) => string }) => {
  try {
    // QR decoded as Array
    const question: QuestionProps = JSON.parse(detectedString.map((code) => code.rawValue))
    questions.value.push(question)
  } catch (error) {
    console.error('Error Parsing QR Code', error)
  }
}

// Determine Winner and Loser
const handleSelectWinner = async () => {
  if (matchForm.winner === player1.value?.id) {
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
    if (userAnswer === correctAnswer?.answer) {
      score += question.score
    }
  })

  try {
    const match: MatchProps = { winner: matchForm.winner as number, loser: matchForm.loser as number }
    const player1Score: ScoreProps = {
      userId: player1.value?.id as number,
      scoreAcquired: score
    }
    const player2Score: ScoreProps = {
      userId: player2.value?.id as number,
      scoreAcquired: 0
    }
    await saveMatch(match)
    await saveMatchScore(player1Score, player2Score)

    await store.dispatch('showAlert', {
      message: `Congratulations! Your Score is: ${score}`,
      header: 'Final Score',
      onClose: () => {
        router.push('/dashboard')
      }
    })
  } catch (error) {
    console.error('Error saving match details:', error)
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
