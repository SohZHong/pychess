<template>
    <div class="alert-box">
        <div class="backdrop" @click="handleCloseBox" v-if="isOpen"></div>
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
import { useStore } from 'vuex'
import { computed } from 'vue'

const store = useStore()
const alert = computed(() => store.state.alert)

const { isOpen, header, message } = alert.value

const handleCloseBox = () => {
  store.dispatch('hideAlert')
}

</script>

<style scoped>
.bottom-fade-enter-active, .bottom-fade-leave-active {
    transition: all 0.3s ease-in-out;
}
.bottom-fade-enter-from, .bottom-fade-leave-to {
    opacity: 0;
    transform: translateY(-50px);
}
.bottom-fade-enter-to, .bottom-fade-leave-from {
    opacity: 1;
    transform: translateY(0);
}

.alert-box .backdrop {
    width: 100vw; /* Cover whole screen */
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.alert-box .container {
    margin: 0 auto;
    border-radius: 10px;
    background-color: #ffffff;
    z-index: 999;
    max-width: 500px;
    position: fixed;
    padding: 1rem;
    box-shadow: var(--border-dark-drop-shadow);
}

.alert-box .container .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: var(--primary-brand-color);
}

</style>
