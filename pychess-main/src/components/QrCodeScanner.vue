<template>
    <div class="qr-container">
      <select v-model="selectedConstraints">
        <option
          v-for="option in constraintSelection"
          :key="option.label"
          :value="option.constraints"
        >
          {{ option.label }}
        </option>
      </select>
      <div class="qr-scanner">
        <qrcode-stream
          v-if="selectedConstraints"
          :constraints="selectedConstraints"
          @detect="handleDetect"
          @camera-on="onCameraReady"
        />
      </div>
    </div>
</template>
<!-- https://gruhn.github.io/vue-qrcode-reader/demos/FullDemo.html -->
<script lang="ts" setup>
import { ref, defineEmits } from 'vue'
import { QrcodeStream } from 'vue-qrcode-reader'

interface CameraOptions {
  facingMode: string
}

interface VideoInputOptions {
  deviceId: string
}

interface CameraConstraints {
  label: string,
  constraints: CameraOptions | VideoInputOptions | null
}

const emits = defineEmits(['update:qr'])

const handleDetect = async (detectedCode: string) => {
  emits('update:qr', detectedCode)
}

// Camera options
const selectedConstraints = ref<CameraOptions>({ facingMode: 'environment' })
const constraintOptions: CameraConstraints[] = [
  { label: 'Off Camera', constraints: null },
  { label: 'Rear Camera', constraints: { facingMode: 'environment' } },
  { label: 'Front Camera', constraints: { facingMode: 'user' } }
]
const constraintSelection = ref<CameraConstraints[]>(constraintOptions)

const onCameraReady = async () => {
  // PS: Error occurs on IOS if user does not give permission
  // Get all available recording devices
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter(({ kind }) => kind === 'videoinput')

  // Add them into the available options
  constraintSelection.value = [
    ...constraintOptions,
    ...videoDevices.map(({ deviceId, label }) => ({
      label,
      constraints: { deviceId }
    }))
  ]
}
</script>

<style>
.qr-container {
  padding: 1rem;
}

.qr-container > *{
  margin: 10px;
}

.qr-container > select {
  font-family: "SF Pro Text";
  font-size: var(--font-size);
  color: var(--primary-brand-color);
  font-weight: bold;
  background-color: #fff;
  border: none;
  outline: none;
  padding: .5rem;
  border-radius: 10px;
  box-shadow: var(--button-light-drop-shadow);
}

.qr-container > select:focus {
  outline: none;
}

.qr-container .qr-scanner {
  width: inherit;
  height: inherit;
}

@media only screen and (max-width: 576px) {
  .qr-container > select  {
    font-size: calc(var(--font-size) - 2px);
  }
}
</style>
