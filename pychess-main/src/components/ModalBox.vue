<template>
  <dialog
    ref="dialog"
    @close="visible = false"
    class="modal"
  >
    <div
    v-if="visible"
    :class="props.class"
    >
      <slot></slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue'

const dialog = ref<HTMLDialogElement>()
const props = defineProps({
  class: {
    type: String,
    default: ''
  }
})

const visible = ref(false)

const showModal = () => {
  dialog.value?.showModal()
  visible.value = true
}
// Expose values for easier usage
defineExpose({
  show: showModal,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible
})
</script>

<style scoped>
.modal {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  outline: none;
  box-shadow: var(--border-light-drop-shadow);
  padding: 1rem;
}

@media only screen and (max-width: 576px) {
  .modal {
    width: 350px;
    height: fit-content;
  }
}
</style>
