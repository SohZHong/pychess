<template>
    <header class="navbar">
        <side-bar-view v-if="loggedIn" :is-open="isSideBarOpen" :handle-close-side-bar="handleCloseSideBar">
            <ul class="sidebar-items">
                <li class="sidebar-item">
                    <router-link to="/">Home</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/leaderboard">Leaderboard</router-link>
                </li>
            </ul>
        </side-bar-view>
        <div class="navbar-wrapper">
            <div class="hero-left-container">
                <hamburger-view v-if="loggedIn" :handle-hamburger-click="handleHamburgerClick"/>
                <div class="logo-container">
                    <a href="/">
                        <img class="logo" src="@/assets/images/logo-no-background.svg" />
                    </a>
                </div>
            </div>
            <div class="hero-right-container">
                <template v-if="!loggedIn">
                    <router-link class="light-button" to="/login">Log In</router-link>
                    <router-link class="light-button" to="/register">Get Started Now</router-link>
                </template>
                <template v-else>
                    <router-link class="light-button" to="/play">Play Now</router-link>
                    <div class="profile-dropdown">
                        <button class="dropdown-toggle">{{ username }}</button>
                        <div class="dropdown-menu">
                            <router-link to="settings">Settings</router-link>
                            <a @click.prevent="handleLogout">Logout</a>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </header>
    <main>
        <app-main />
    </main>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import AppMain from './components/AppMain.vue'
import HamburgerView from './components/menu/HamburgerView.vue'
import SideBarView from './components/menu/SideBarView.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const isSideBarOpen = ref<boolean>(false)
const router = useRouter()
const store = useStore()
const username = store.state.user.name
const loggedIn = computed(() => username != null)

const handleHamburgerClick = () => {
  isSideBarOpen.value = !isSideBarOpen.value
}

const handleCloseSideBar = () => {
  isSideBarOpen.value = false
}

const handleLogout = async () => {
  await store.dispatch('Logout').then(() => {
    router.push('/login')
  }).catch(err => {
    console.error(err)
  })
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
    box-shadow: var(--border-light-drop-shadow);
    width: 100%;
}

.navbar .sidebar-items {
    margin: 0 auto;
}

.navbar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
    padding: 0 1rem;
    /* border-bottom: 1px solid var(--el-menu-border-color); */
}

.navbar-wrapper .hero-left-container {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.navbar-wrapper .hero-right-container > a {
    margin: 5px;
}

@media only screen and (max-width: 576px) {
  .navbar-wrapper .hero-right-container {
    display: none;
  }
}

.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--header-height);
}

.logo-container .logo {
    height: auto;
    width: 10.5rem;
}
</style>
