<template>
    <modal-box ref="modal">
        <qr-code-scanner
          @update:qr="handleDetect"
        />
        <form @submit.prevent="handleSelectWinner" class="result-container">
          <h3>Please Select Winner:</h3>
          <div class="result-selector">
            <label>
              <input type="radio" v-model="matchForm.winner" :name="player1?.name" :value="player1?.id" checked/>
              {{ player1?.name }}
            </label>
            <label>
                <input type="radio" v-model="matchForm.winner" :name="player2?.name" :value="player2?.id"/>
                {{ player2?.name }}
            </label>
          </div>
          <button type="submit" class="start-button light-button">
            Start Answering!
          </button>
        </form>
    </modal-box>
    <button class="light-button" @click="handleSubmitAnswers">Submit Answers</button>
    <div class="question-section">
    <form class="question-form" @submit.prevent="handleSubmitAnswers">
      <div class="question-container" v-for="question, index in questions" :key="question.id">
        <h4 class="question-number">{{ index + 1 }}.</h4>
        <h3>{{ question.text }}</h3>
        <div class="answer-container">
          <!-- MCQ -->
          <template v-if="question.question_type_id === 1">
            <template v-for="answer in question.answers" :key="answer.answer">
              <label>
                <input
                  type="radio"
                  :name="'question-' + question.id"
                  :value="answer.answer"
                  v-model="userAnswers[question.id]"
                />
                {{ answer.answer }}
              </label>
            </template>
          </template>
          <!-- Short Response -->
          <template v-else-if="question.question_type_id === 2">
            <textarea
              placeholder="Please enter your answer"
              :name="'question-' + question.id"
              v-model="userAnswers[question.id]"
            ></textarea>
          </template>
          <!-- True/False -->
          <template v-else-if="question.question_type_id === 3">
            <label>
              <input
                type="radio"
                :name="'question-' + question.id"
                value="true"
                v-model="userAnswers[question.id]"
              />
              True
            </label>
            <label>
              <input
                type="radio"
                :name="'question-' + question.id"
                value="false"
                v-model="userAnswers[question.id]"
              />
              False
            </label>
          </template>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import QrCodeScanner from '@/components/QrCodeScanner.vue'
import ModalBox from '@/components/ModalBox.vue'
import { MatchProps, PlayerProps, QuestionProps, saveMatch } from '@/api/match'
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
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
    console.log(question)
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
  modal.value?.close()
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
  const id = computed(() => store.state.user.id)
  try {
    const decryptedPlayer1: PlayerProps = JSON.parse(decrypt(encryptedPlayer1))
    const decryptedPlayer2: PlayerProps = JSON.parse(decrypt(encryptedPlayer2))
    if (id.value === decryptedPlayer1.id || id.value === decryptedPlayer2.id) {
      player1.value = decryptedPlayer1
      player2.value = decryptedPlayer2
    } else {
      await store.dispatch('showAlert', {
        message: 'You are not part of this game!',
        header: 'Invalid Session!',
        onClose: () => {
          router.back()
        }
      })
    }
  } catch (error) {
    console.error('Error decrypting player data:', error)
  }
})

onUnmounted(async () => {
  modal.value?.close()
})
</script>

<style scoped>
.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 1rem;
}

.result-container > h3 {
  color: var(--primary-brand-color);
}

.result-container .result-selector {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-around;
}

.result-container  .start-button {
  font-size: var(--font-size);
}

.question-section {
  padding: 1rem;
}

.question-section .question-form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: baseline;
  gap: 1rem;
}

.question-form .question-container {
  width: 350px;
  min-height: 200px;
  box-shadow: var(--border-light-drop-shadow);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.question-container .question-number {
  color: var(--primary-brand-color);
  margin-right: auto;
}

.question-container > h3 {
  font-size: calc(var(--font-size) + 1px);
  text-align: justify;
}

.question-container .answer-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: baseline;
  gap: 0.75rem;
}

/* For MCQ and True/False */
.answer-container > label {
  display: flex;
  align-items: center;
  justify-content: baseline;
  width: 100%;
  column-gap: 1rem;
}

/* For Short Response */
.answer-container > textarea {
  outline: none;
  box-shadow: var(--button-light-drop-shadow);
  border: none;
  font-family: "SF Pro Text", sans-serif;
  font-size: var(--font-size);
  padding: 1rem;
  width: 90%;
  resize: vertical;
}

.answer-container > textarea:focus {
  outline: none;
}

@media only screen and (max-width: 576px) {
  .question-form {
    justify-content: center;
  }
}
</style>
