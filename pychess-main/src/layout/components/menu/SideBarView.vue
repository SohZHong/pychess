<template>
    <div class="sidebar">
        <div class="backdrop" @click="props.handleCloseSideBar" v-if="props.isOpen"></div>
        <Transition name="slide">
            <div v-if="props.isOpen" class="panel">
                <button class="close-button" @click="props.handleCloseSideBar">Close</button>
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
    transform: translateX(-400px); /* Start off-screen to the left */
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
    height: 100vh;
    width: 350px;
    padding: 1rem 30px;
    box-shadow: var(--border-dark-drop-shadow);
    display: flex;
    flex-direction: column;
}

.sidebar .panel .close-button {
    overflow: hidden;
    position: relative;
    margin-left: auto;
    border: none;
    padding: 0;
    width: 2em;
    height: 2em;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-brand-color);
    font: inherit;
    text-indent: 100%;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
}

.sidebar .panel .close-button:hover {
    color: var(--white-mode-bg);
    background-color: var(--primary-brand-color);
}

.close-button:before, .close-button:after {
    position: absolute;
    top: 15%;
    left: calc(50% - .0625em);
    width: .125em;
    height: 70%;
    border-radius: .125em;
    transform: rotate(45deg);
    background: currentcolor;
    content: ''
}

.close-button:after {
    transform: rotate(-45deg);
}
</style>
