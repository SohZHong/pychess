<template>
    <header class="navbar">
        <side-bar-view v-if="loggedIn" :is-open="isSideBarOpen" :handle-close-side-bar="handleCloseSideBar">
            <ul class="sidebar-items">
                <li class="sidebar-item">
                    <router-link to="/dashboard">Home</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/leaderboard">Leaderboard</router-link>
                </li>
                <li class="sidebar-item">
                    <router-link to="/rules">Rules</router-link>
                </li>
            </ul>
        </side-bar-view>
        <div class="navbar-wrapper">
            <div class="hero-left-container">
                <hamburger-view v-if="loggedIn" :handle-hamburger-click="handleHamburgerClick"/>
                <div class="logo-container">
                    <a href="/">
                        <logo-icon class="logo"/>
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
                        <div @click="toggleDropdown" class="light-button dropdown-toggle">{{ username }}</div>
                        <div class="dropdown-menu" :class="{ none: !isDropdownOpen }">
                            <router-link to="settings">Settings</router-link>
                            <a @click.prevent="handleLogout">Logout</a>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </header>
    <main>
        <alert-box />
        <app-main />
    </main>
</template>

<script lang="ts" setup>
import AlertBox from '@/components/AlertBox.vue'
import { computed, ref } from 'vue'
import AppMain from './components/AppMain.vue'
import HamburgerView from './components/menu/HamburgerView.vue'
import SideBarView from './components/menu/SideBarView.vue'
import LogoIcon from '@/components/LogoIcon.vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const isSideBarOpen = ref<boolean>(false)
const isDropdownOpen = ref<boolean>(false)
const router = useRouter()
const store = useStore()
const username = computed(() => store.state.user.name)
const loggedIn = computed(() => username.value != null)

const handleHamburgerClick = () => {
  isSideBarOpen.value = !isSideBarOpen.value
}

const handleCloseSideBar = () => {
  isSideBarOpen.value = false
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
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

.navbar .sidebar-items .sidebar-item {
    font-size: var(--font-size);
    padding: 1rem;
    text-align: justify;
}

.navbar-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
    padding: 0 1rem;
}

.navbar-wrapper .hero-left-container, .hero-right-container{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}

.navbar-wrapper .hero-right-container > a {
    margin: 5px;
}

.navbar-wrapper .profile-dropdown {
    position: relative;
}

.navbar-wrapper .profile-dropdown .dropdown-toggle {
    width: 200px;
    overflow:hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    padding: 0.5em 1em;
}

.navbar-wrapper .profile-dropdown .dropdown-menu {
    position: absolute;
    width: 200px;
    top: 45px;
    background: white;
    overflow-y: auto;
    border-radius: 10px;
    padding: 0.5em 1em;
    box-shadow: var(--border-light-drop-shadow);
    display: flex;
    flex-direction: column;
    z-index: 2;
}

.navbar-wrapper .profile-dropdown .dropdown-menu > * {
    cursor: pointer;
    margin: 10px 0;
    color: var(--primary-brand-color);
    transition: font-weight .3 ease-in-out;
}

.navbar-wrapper .profile-dropdown .dropdown-menu > *:hover {
    font-weight: bold;
}

.navbar-wrapper .profile-dropdown .dropdown-menu.none {
    display: none;
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
