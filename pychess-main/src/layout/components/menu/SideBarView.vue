<template>
    <div class="sidebar">
        <div class="backdrop" @click="handleCloseSideBar" v-if="props.isOpen"></div>
        <Transition name="slide">
            <div v-if="isOpen" class="panel">
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
    isOpen: boolean,
    handleCloseSideBar:(event: MouseEvent) => void
}>()

</script>

<style scoped>
.slide-enter-active, .slide-leave-active {
    transition: transform 0.3s ease-in-out;
}
.slide-enter-from, .slide-leave-to {
    transform: translateX(-250px); /* Start off-screen to the left */
}
.slide-enter-to, .slide-leave-from {
    transform: translateX(0); /* End at the final position */
}

.sidebar .backdrop {
    background-color: rgba(0,0,0,.20);
    width: 100vw; /* Cover whole screen */
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
}

.sidebar .panel {
    border-radius: 10px;
    background-color: #ffffff;
    overflow-y: auto; /* Provide scrolling */
    z-index: 999;
    position: fixed;
    height: 90vh;
    width: 250px;
    padding: 3rem 30px;
    box-shadow: var(--border-drop-shadow);
}
</style>
