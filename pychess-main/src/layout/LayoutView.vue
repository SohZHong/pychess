<template>
    <header class="navbar">
        <div class="navbar-wrapper">
            <div class="hero-left-container">
                <div class="hamburger-wrapper">
                    <button>Hello</button>
                </div>
                <div class="logo-container">
                    <a href="/">
                        <img class="logo" src="/images/logo-no-background.svg" />
                    </a>
                </div>
            </div>
            <div class="hero-right-container">
                <button>Log In</button>
                <button>Get Started Now</button>
            </div>
        </div>
    </header>
    <app-main />
</template>

<script lang="ts" setup>
import AppMain from './components/AppMain.vue'
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
    border-bottom: 1px solid var(--el-menu-border-color);
}
.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: var(--header-height);

    .logo {
        height: auto;
        width: 10em;
    }
}
</style>
