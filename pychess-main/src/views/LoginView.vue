<template>
    <div class="login-container">
        <form @submit.prevent="handleSubmitForm">
            <div class="input-field">
                <label for="username">Username</label>
                <input type="text" name="username" v-model="loginForm.username" placeholder="Username" required/>
            </div>
            <div class="input-field">
                <label for="password">Password</label>
                <input type="password" name="password" v-model="loginForm.password" placeholder="Password" required/>
            </div>
            <div class="button-container">
                <button type="submit">Login</button>
                <button >Reset</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { login } from '@/api/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

interface LoginForm {
  username: string,
  password: string
}

const router = useRouter()
const loginForm = reactive<LoginForm>({
  username: '',
  password: ''
})

const handleSubmitForm = async () => {
  const username = loginForm.username
  const password = loginForm.password
  await login({ username, password })
    .then(() => {
    // Navigate user to homepage
      router.push('/')
    }).catch(err => {
      console.error(err)
    })
}
</script>
