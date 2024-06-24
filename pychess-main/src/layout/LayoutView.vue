<template>
    <header class="navbar">
        <side-bar-view :is-open="isSideBarOpen" :handle-close-side-bar="handleCloseSideBar">
            <ul>
                <li>
                    <router-link to="/">Home</router-link>
                </li>
                <li>
                    <router-link to="/leaderboard">Leaderboard</router-link>
                </li>
            </ul>
        </side-bar-view>
        <div class="navbar-wrapper">
            <div class="hero-left-container">
                <hamburger-view :handle-hamburger-click="handleHamburgerClick"/>
                <div class="logo-container">
                    <a href="/">
                        <img class="logo" src="@/assets/images/logo-no-background.svg" />
                    </a>
                </div>
            </div>
            <div class="hero-right-container">
                <button>Log In</button>
                <button>Get Started Now</button>
            </div>
        </div>
    </header>
    <main>
        <app-main />
    </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import AppMain from './components/AppMain.vue'
import HamburgerView from './components/menu/HamburgerView.vue'
import SideBarView from './components/menu/SideBarView.vue'

const isSideBarOpen = ref<boolean>(false)

const handleHamburgerClick = () => {
  isSideBarOpen.value = !isSideBarOpen.value
}

const handleCloseSideBar = () => {
  isSideBarOpen.value = false
}

</script>

<style scoped>
/* Cover the whole page */
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}

.navbar {
    position: 'sticky';
    width: 100%;
}

.navbar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
    /* border-bottom: 1px solid var(--el-menu-border-color); */
}
.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--header-height);
}

.logo-container .logo {
        height: auto;
        width: 10em;
}
</style>
