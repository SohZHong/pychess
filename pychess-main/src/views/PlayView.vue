<template>
    <modal-box ref="modal">
      <h2>Invite {{ playerForm.player2.name }}!</h2>
      <!-- Configure variable -->
       <div class="qr-code">
        <vue-qrcode
        :value="'http://localhost:8000/' + gameRoute"
        :options="{ width: 350 }"
        type="image/png"
        :color="{ dark: '#000000', light: '#ffffff'}"
        ></vue-qrcode>
       </div>
      <button @click="handleStartMatch" class="start-button light-button">Start Match!</button>
    </modal-box>
    <div class="greeting-container">
      <h1>Enter Opponent Details</h1>
    </div>
    <div class="play-container">
      <form @submit.prevent="handleSubmitForm" class="player-form">
        <div class="input-wrapper">
          <div class="input-container">
            <label for="player1">Player 1</label>
            <input-field
                type="text"
                name="player1"
                v-model="playerForm.player1.name"
                required
                disabled
              />
          </div>
          <h1 class="vs-text">VS</h1>
          <div class="input-container">
            <label for="player2">Player 2</label>
            <input-field
                type="text"
                name="player2"
                placeholder="Please enter Player 2"
                v-model="playerForm.player2.name"
                required
                :disabled="false"
              />
          </div>
        </div>
        <div class="button-container">
          <button type="submit" class="start-button light-button">
          Start
          </button>
          <button @click.prevent="handleCancel" class="cancel-button light-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import VueQrcode from 'vue-qrcode'
import { useStore } from 'vuex'
import InputField from '@/components/InputField.vue'
import { encrypt } from '@/utils/crypto' // Ensure the correct import path
import router from '@/router'
import { getUserByUsername } from '@/api/user'
import { PlayerProps } from '@/api/match'
import ModalBox from '@/components/ModalBox.vue'

interface PlayerForm {
  player1: PlayerProps,
  player2: PlayerProps
}

const store = useStore()
const user = computed(() => store.state.user)
const playerForm = reactive<PlayerForm>({
  player1: {
    id: user.value.id,
    name: user.value.name,
    score: user.value.score,
    side: 'white'
  },
  player2: {
    id: undefined,
    name: '',
    score: 0,
    side: 'black'
  }
})
const modal = ref<InstanceType<typeof ModalBox>>()
const gameRoute = computed(() => {
  if (playerForm.player2.id !== undefined) {
    const player1Qr = encodeURIComponent(encrypt(JSON.stringify(playerForm.player1)))
    const player2Qr = encodeURIComponent(encrypt(JSON.stringify(playerForm.player2)))
    return `/game?player1=${player1Qr}&player2=${player2Qr}`
  }
  return ''
})

const handleCancel = () => {
  router.back()
}

const handleSubmitForm = async () => {
  // Check if player 2 exists
  try {
    const res = await getUserByUsername(playerForm.player2.name)
    const { data } = res.data
    if (data != null) {
      // Complete the data
      playerForm.player2.id = data.id
      playerForm.player2.score = data.score
      // Show QR Code
      modal.value?.show()
    } else {
      await store.dispatch('showAlert', {
        message: 'Player 2 Does Not Exist!',
        header: 'Invalid Player 2'
      })
    }
  } catch (error) {
    console.error(error)
  }
}

const handleStartMatch = () => {
  router.push({ path: 'game', query: { player1: encrypt(JSON.stringify(playerForm.player1)), player2: encrypt(JSON.stringify(playerForm.player2)) } })
}

</script>

<style scoped>
.start-button {
  font-size: var(--font-size);
}

.greeting-container {
    margin: 2rem 0;
    font-size: calc(var(--font-size) + 6px);
}

.play-container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
}

.player-form .input-wrapper{
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 10vw;
}

.player-form .input-wrapper .input-container {
    margin: 1.5rem 0;
    text-align: start;
}

.player-form .input-wrapper .input-container > div > *{
    font-size: calc(var(--font-size) + 10px);
}

.player-form .input-container > label {
    font-weight: bold;
    font-size: calc(var(--font-size) + 4px);
}

.player-form .button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
}

.player-form .button-container > button {
  width: 300px;
  padding: .5rem;
  font-weight: bold;
  font-size: var(--font-size);
}

.player-form .button-container .cancel-button {
  color: var(--red);
}

@media only screen and (max-width: 768px) {
  .player-form .input-wrapper{
    flex-direction: column;
    gap: 2rem;
  }
}

@media only screen and (max-width: 576px) {
  .greeting-container {
      font-size: calc(var(--font-size) + 2px);
  }
}
</style>
