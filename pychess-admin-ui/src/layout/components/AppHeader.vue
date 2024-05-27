<template>
    <div class="navbar-wrapper">
        <div class="logo-container">
            <a href="/">
                <img class="logo" src="/images/logo-no-background.svg" />
            </a>
        </div>
        <div class="content-container">
            <div class="profile-container">
                <profile-dropdown />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import ProfileDropdown from './ProfileDropdown.vue'

export default {
  name: 'AppHeader',
  components: {
    ProfileDropdown
  }
}

</script>

<style scoped>
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
