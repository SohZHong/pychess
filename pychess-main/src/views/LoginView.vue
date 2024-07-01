<template>
    <div class="login-container">
        <form class="login-form" @submit.prevent="handleSubmitForm">
            <h1 class="title">Login</h1>
            <div class="input-container">
                <label for="username">Username</label>
                <input-field
                    type="text"
                    name="username"
                    placeholder="Please enter username"
                    v-model="loginForm.username"
                    icon="user"
                    required
                    :disabled="false"
                />
            </div>
            <div class="input-container">
                <label for="password">Password</label>
                <InputField
                    type="password"
                    name="password"
                    placeholder="Please enter password"
                    v-model="loginForm.password"
                    icon="lock"
                    required
                    :disabled="false"
                />
            </div>
            <button class="login-button" type="submit">Login</button>
        </form>
        <div class="register-redirect">
            <p>Don't have an account?</p>
            <router-link to="/register">Sign Up</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { login } from '@/api/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '@/components/InputField.vue'

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
      router.push('/dashboard')
    }).catch(err => {
      console.error(err)
    })
}
</script>

<style scoped>
.login-container {
    margin: 3rem auto 0 auto;
    width: 500px;
    border-radius: 10px;
    box-shadow: var(--border-light-drop-shadow);
}

.login-container .login-form {
    padding: 2rem;
}

.login-form .title {
    text-align: center;
    color: var(--primary-brand-color);
    font-size: 40px;
    font-weight: 900;
}

.login-form .input-container {
    margin: 1.5rem 0;
    text-align: start;
}

.login-form .input-container > label {
    font-weight: bold;
    font-size: 14px;
}

.login-form  .login-button {
    margin: 2rem 0 0 auto;
    font-family: "SF Pro Text";
    border: none;
    color: white;
    text-transform: uppercase;
    border-radius: 25px;
    font-size: var(--font-size);
    background: var(--primary-brand-gradient);
    padding: 1rem;
    font-weight: bold;
    width: 100%;
    cursor: pointer;
    transition: filter 0.2s ease-in-out;
}

.login-form .login-button:hover{
    filter: brightness(1.3);
}

.register-redirect {
    margin-top: 4rem;
    padding: 1rem;
}

.register-redirect > p {
    color: gray;
}

.register-redirect > a {
    font-size: var(--font-size);
}

@media only screen and (max-width: 576px) {
    .login-container {
        width: 90vw;
    }

    .login-form .title {
        font-size: 35px
    }
}
</style>
