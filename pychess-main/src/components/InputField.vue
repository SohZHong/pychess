<template>
    <div class="input-field">
        <font-awesome-icon :icon="icon" />
        <input
        :type="type"
        :name="name"
        v-model="inputValue"
        :placeholder="placeholder"
        :required="required"
        @input="updateValue"
        autocomplete="off"
        />
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps, defineEmits, watch } from 'vue'

const props = defineProps<{
  modelValue: string
  type: string
  name: string
  placeholder: string
  icon: string
  required: boolean
}>()

const emits = defineEmits(['update:modelValue'])

const inputValue = ref(props.modelValue)

watch(inputValue, (newValue) => {
  emits('update:modelValue', newValue)
})

const updateValue = (event: Event) => {
  inputValue.value = (event.target as HTMLInputElement).value
}
</script>

<style scoped>
.input-field {
    display: flex;
    align-items: center;
    box-shadow: 0 5px 3px -3px rgba(99, 99, 99, 0.2);
    padding: 1rem;
}

.input-field svg {
    color: var(--primary-brand-color);
}

.input-field input {
    flex: 1;
    margin-left: 0.5rem;
    border: none;
    font-size: var(--font-size);
    font-family: "SF Pro Text", sans-serif;
    width: 100%;
}

.input-field input:focus {
    outline: none;
}

</style>
