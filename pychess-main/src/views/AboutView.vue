<template>
  <div class="about">
    <h1>Welcome Back, {{ username }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const username = store.state.username

    onMounted(async () => {
      try {
        await store.dispatch('getUserData')
      } catch (err) {
        console.error(err)
      }
    })
    return {
      username
    }
  }
})

</script>

<style scoped>

</style>
