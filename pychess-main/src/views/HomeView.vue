<template>
  <div class="greeting-container">
    <h1>Welcome Back! {{ user.name }}</h1>
  </div>
  <div class="play-container">
    <div class="board">
      <chess-board-icon />
    </div>
    <div class="control-container">
      <h2>
        Play Chess While Learning Python
      </h2>
      <h3>
        Score: <span class="score-display">{{ user.score }}</span>
      </h3>
      <router-link to="/play" class="light-button">
        Play Now!
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import ChessBoardIcon from '@/components/ChessBoardIcon.vue'
const store = useStore()
const user = computed(() => store.state.user)
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
