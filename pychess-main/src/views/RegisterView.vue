<template>
    <div class="register-container">
        <form class="register-form" @submit.prevent="handleSubmitForm">
            <h1 class="title">Register</h1>
            <div class="input-container">
                <label for="username">Username</label>
                <input-field
                    type="text"
                    name="username"
                    placeholder="Please enter username"
                    v-model="registerForm.username"
                    icon="user"
                    required
                />
            </div>
            <div class="input-container">
                <label for="password">Password</label>
                <InputField
                    type="password"
                    name="password"
                    placeholder="Please enter password"
                    v-model="registerForm.password"
                    icon="lock"
                    required
                />
            </div>
            <div class="input-container">
                <label for="email">Email</label>
                <InputField
                    type="email"
                    name="email"
                    placeholder="Please enter email"
                    v-model="registerForm.email"
                    icon="envelope"
                    required
                />
            </div>
            <button class="register-button" type="submit">Sign Up</button>
        </form>
        <div class="register-redirect">
            <p>Already have an account?</p>
            <router-link to="/login">Sign In</router-link>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { register } from '@/api/auth'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import InputField from '@/components/InputField.vue'

interface RegisterForm {
  username: string,
  password: string,
  email: string
}

const router = useRouter()
const registerForm = reactive<RegisterForm>({
  username: '',
  password: '',
  email: ''
})

const handleSubmitForm = async () => {
  const username = registerForm.username
  const password = registerForm.password
  const email = registerForm.email
  await register({ username, password, email })
    .then(() => {
    // Navigate user to login page
      router.push('/login')
    }).catch(err => {
      console.error(err)
    })
}
</script>

<style scoped>
.register-container {
    margin: 3rem auto 0 auto;
    width: 500px;
    border-radius: 10px;
    box-shadow: var(--border-light-drop-shadow);
}

.register-container .register-form {
    padding: 2rem;
}

.register-form .title {
    text-align: center;
    color: var(--primary-brand-color);
    font-size: 40px;
    font-weight: 900;
}

.register-form .input-container {
    margin: 1.5rem 0;
    text-align: start;
}

.register-form .input-container > label {
    font-weight: bold;
    font-size: 14px;
}

.register-form  .register-button {
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

.register-form .register-button:hover{
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
    .register-container {
        width: 90vw;
    }

    .register-form .title {
        font-size: 35px
    }
}
</style>
