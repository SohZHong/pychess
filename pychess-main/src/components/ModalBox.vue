<template>
  <dialog
    ref="dialog"
    @close="visible = false"
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
