<template>
    <div
        id="hamburger"
        @click.prevent="props.handleHamburgerClick"
    >
        <slot>
            <button type="button" class="hamburger-button" title="Menu">
                <span class="bar bar--1"></span>
                <span class="bar bar--2"></span>
                <span class="bar bar--3"></span>
            </button>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'

const props = defineProps<{
    handleHamburgerClick:(event: MouseEvent) => void
}>()

</script>
<!-- https://regenrek.com/posts/how-to-create-an-animated-vue-sidebar-menu-with-vue-observable/ -->
<style scoped>
#hamburger {
    border: 1px solid grey;
    position: relative;
    height: 35px;
    width: 35px;
    padding: 2px;
}

.hamburger-button {
    border: none;
    background-color: transparent;
    pointer-events: all;
}

.hamburger-button .bar {
    background-color: #130f40;
    position: absolute;
    top: 50%;
    right: 6px;
    left: 6px;
    height: 2px;
    width: auto;
    margin-top: -1px;
}

.bar.bar--1 {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
}

.bar.bar--2 {
    transform-origin: 100% 50%;
}

.bar.bar--3 {
    transform: translateY(6px);
}

</style>
