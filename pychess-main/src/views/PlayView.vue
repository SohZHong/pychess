<template>
    <div class="greeting-container">
      <h1>Enter Opponent Details</h1>
    </div>
    <div class="play-container">
      <form @submit="handleSubmitForm" class="player-form">
        <div class="input-wrapper">
          <div class="input-container">
            <label for="player1">Player 1</label>
            <input-field
                type="text"
                name="player1"
                v-model="playerForm.player1"
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
                v-model="playerForm.player2"
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
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import InputField from '@/components/InputField.vue'
import { encrypt } from '@/utils/crypto'
import router from '@/router'

interface PlayerForm {
  player1: string,
  player2: string
}

const store = useStore()
const name = computed(() => store.state.user.name)
const playerForm = reactive<PlayerForm>({
  player1: name.value,
  player2: ''
})

const handleCancel = () => {
  router.back()
}

const handleSubmitForm = async () => {
  const player1 = encrypt(playerForm.player1)
  const player2 = encrypt(playerForm.player2)
  router.push({ path: '/game', query: { player1, player2 } })
}
</script>

<style scoped>
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
