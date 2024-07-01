<template>
    <div class="greeting-container">
      <h1>Enter Opponent Details</h1>
    </div>
    <div class="play-container">
      <form @submit="handleSubmitForm" class="player-form">
        <div class="input-container">
            <label for="player1">Player 1</label>
            <input-field
                type="text"
                name="player1"
                placeholder="Please enter Player 1"
                v-model="playerForm.player1"
                icon="user"
                required
                disabled
            />
        </div>
        <div class="input-container">
            <label for="player2">Username</label>
            <input-field
                type="text"
                name="player2"
                placeholder="Please enter Player 2"
                v-model="playerForm.player2"
                icon="user"
                required
                :disabled="false"
            />
        </div>
        <button type="submit" class="start-button light-button">
          Start
        </button>
        <button type="reset" class="cancel-button light-button">
          Cancel
        </button>
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

.play-container .board > svg{
    height: auto;
    width: 25rem;
}

.play-container .control-container {
    font-size: calc(var(--font-size) + 4px);
    padding: 2rem;
}

.play-container .control-container > *{
    margin: 1rem 0;
}

.play-container .control-container .score-display{
    color: var(--primary-brand-color);
    font-size: calc(var(--font-size) + 10px);
}

@media only screen and (max-width: 576px) {
.greeting-container {
    font-size: calc(var(--font-size) + 2px);
}
}
</style>
