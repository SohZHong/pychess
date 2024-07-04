<template>
  <dialog
    ref="dialog"
    @close="visible = false"
    class="modal-dialog"
  >
    <div
    v-if="visible"
    :class="{[props.classes]: props.classes}"
    >
      <slot></slot>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, defineProps, defineExpose } from 'vue'

const dialog = ref<HTMLDialogElement>()
const props = defineProps({
  classes: {
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
.modal-dialog {
  width: 550px;
  height: 550px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 10px;
  outline: none;
  box-shadow: var(--border-light-drop-shadow);
}

@media only screen and (max-width: 576px) {
  .modal-dialog {
    width: 350px;
    height: 450px;
  }
}
</style>
