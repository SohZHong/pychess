<template>
    <el-dropdown split-button @command="handleCommand">
        <span>
            {{ username }}
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item command="profile">Profile</el-dropdown-item>
                <el-dropdown-item command="logout">Logout</el-dropdown-item>
            </el-dropdown-menu>
            </template>
    </el-dropdown>
</template>

<script lang="ts">
import { logout } from '@/api/login'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default defineComponent({
  name: 'ProfileDropdown',
  setup () {
    const store = useStore()
    console.log(store.state)
    const username = computed(() => store.state.name)
    const router = useRouter()
    // Handle logout button
    const handleLogout = async () => {
      await logout().then(() => {
        router.push('/login')
      })
    }
    const handleProfileClick = () => {
      router.push('/profile')
    }
    // Handle dropdown click
    const handleCommand = (command: string) => {
      if (command === 'logout') {
        handleLogout()
      } else if (command === 'profile') {
        handleProfileClick()
      }
    }
    return {
      username,
      handleCommand
    }
  }
})
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--primary-brand-font-color);
    display: flex;
    align-items: center;
}
</style>
