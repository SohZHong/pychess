<template>
  <div class="modal">
        <div class="backdrop" v-if="visible">
        </div>
        <div class="modal-container" v-if="visible">
          <slot></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'

const visible = ref(false)

const showModal = () => {
  visible.value = true
}

const closeModal = () => {
  visible.value = false
}

// Expose values for easier usage
defineExpose({
  show: showModal,
  close: closeModal
})
</script>

<style scoped>
.modal {
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.modal .backdrop {
    background-color: rgba(0,0,0,.20);
    width: 100vw; /* Cover whole screen */
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.modal .modal-container {
  border-radius: 10px;
  background-color: #ffffff;
  z-index: 999;
  padding: 1rem;
  box-shadow: var(--border-dark-drop-shadow);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 576px) {
  .modal-container {
    width: 350px;
    height: fit-content;
  }
}
</style>
