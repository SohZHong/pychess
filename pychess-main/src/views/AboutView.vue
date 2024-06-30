<template>
  <div class="about">
    <h1>Welcome Back, {{ name }}</h1>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  setup () {
    const store = useStore()
    const name = computed(() => store.state.user.name)
    console.log(name)
    onMounted(async () => {
      try {
        await store.dispatch('getUserData')
      } catch (err) {
        console.error(err)
      }
    })
    return {
      name
    }
  }
})

</script>

<style scoped>

</style>
