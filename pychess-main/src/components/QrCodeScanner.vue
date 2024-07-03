<template>
    <div class="qr-scanner">
      <select v-model="selectedConstraints">
        <option
          v-for="option in constraintSelection"
          :key="option.label"
          :value="option.constraints"
        >
          {{ option.label }}
        </option>
      </select>
        <qrcode-stream
          :constraints="selectedConstraints"
          @detect="handleDetect"
          @camera-on="onCameraReady"
        />
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

</style>
