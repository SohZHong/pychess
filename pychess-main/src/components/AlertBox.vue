<template>
    <div class="alert-box">
        <div class="backdrop" @click="handleCloseBox" v-if="isOpen">
        </div>
        <Transition name="bottom-fade">
            <div class="container" v-if="isOpen">
                <div class="header">
                    <h1>{{ header }}</h1>
                    <font-awesome-icon class="close-button" @click="handleCloseBox" icon="fa-solid fa-xmark" />
                </div>
                <div class="body">
                    <slot>{{ message }}</slot>
                </div>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const alert = computed(() => store.state.alert)

const isOpen = computed(() => alert.value.alert.isOpen)
const header = computed(() => alert.value.alert.header)
const message = computed(() => alert.value.alert.message)

const handleCloseBox = async () => {
  await store.dispatch('closeAlert')
}

</script>

<style scoped>
.bottom-fade-enter-active, .bottom-fade-leave-active {
    transition: all 0.3s ease-in-out;
}
.bottom-fade-enter-from, .bottom-fade-leave-to {
    opacity: 0;
    transform: translateY(-50px) translate(-50%, -50%);
}
.bottom-fade-enter-to, .bottom-fade-leave-from {
    opacity: 1;
    transform: translateY(0) translate(-50%, -50%);
}
.alert-box {
    display: flex;
    align-items: center;
    justify-content: center;
}

.alert-box .backdrop {
    background-color: rgba(0,0,0,.20);
    width: 100vw; /* Cover whole screen */
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.alert-box .container {
    border-radius: 10px;
    background-color: #ffffff;
    z-index: 999;
    max-width: 500px;
    padding: 1rem;
    box-shadow: var(--border-dark-drop-shadow);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.alert-box .container .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--primary-brand-color);
}

.alert-box .container .header svg{
    font-size: 28px;
}

.alert-box .container .header > * {
    margin: 0 1rem;
}

.alert-box .container .body {
    text-align: justify;
    margin: 1rem;
}

</style>
