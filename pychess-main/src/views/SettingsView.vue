<template>
    <div class="settings-container">
        <form class="settings-form" @submit.prevent="handleSubmitForm">
            <h1 class="title">Settings</h1>
            <div class="input-container">
                <label for="username">Username</label>
                <input-field
                type="text"
                name="username"
                placeholder="Please enter username"
                v-model="settingsForm.username"
                icon="user"
                required
                :disabled="false"
                />
                <p v-if="usernameError" class="error">{{ usernameError }}</p>
            </div>
            <div class="input-container">
                <label for="password">Password</label>
                <input-field
                type="password"
                name="password"
                placeholder="Please enter password"
                v-model="settingsForm.password"
                icon="lock"
                :disabled="!changePassword"
                :required="changePassword"
                />
                <p v-if="passwordError && changePassword" class="error">{{ passwordError }}</p>
                <button class="change-button light-button" @click.prevent="handleEditPassword">{{ changePassword? 'Cancel Edit': 'Edit Password' }}</button>
            </div>
            <div class="input-container">
                <label for="email">Email</label>
                <input-field
                    type="email"
                    name="email"
                    placeholder="Please enter email"
                    v-model="settingsForm.email"
                    icon="envelope"
                    :disabled="false"
                    required
                />
            </div>
            <div class="button-container">
                <button class="light-button" type="submit" :disabled="formInvalid">Save Settings</button>
                <button class="light-button" @click.prevent="handleCancel">Cancel</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts" setup>
import { computed, reactive, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import InputField from '@/components/InputField.vue'
import { validatePassword, validateUsername } from '@/utils/auth'
import { getUserByUsername, updateUser, UserProps } from '@/api/user'

interface SettingsForm {
  username: string,
  password: string,
  email: string
}

const router = useRouter()
const store = useStore()
const user = ref<UserProps>()
const settingsForm = reactive<SettingsForm>({
  username: '',
  password: '',
  email: ''
})
const changePassword = ref<boolean>(false)
const usernameError = computed(() => validateUsername(settingsForm.username))
const passwordError = computed(() => validatePassword(settingsForm.password))

const formInvalid = computed(() => {
  return !!usernameError.value || (changePassword.value && !!passwordError.value)
})

const handleEditPassword = () => {
  changePassword.value = !changePassword.value
  if (!changePassword.value) {
    settingsForm.password = ''
  }
}

const handleSubmitForm = async () => {
  if (formInvalid.value) return
  const username = settingsForm.username
  const password = settingsForm.password
  const email = settingsForm.email

  const updateUserParams: UserProps = {
    id: user.value?.id,
    name: username,
    email,
    updateBy: store.state.user.name,
    updateTime: new Date()
  }

  // Only include password if it has been changed
  if (password && changePassword) {
    updateUserParams.password = password
  }

  await updateUser(updateUserParams)
    .then(async () => {
      // Navigate user to previous page
      await store.dispatch('showAlert', {
        header: 'Success',
        message: 'Edit Settings Successful',
        onClose: () => router.back()
      })
    }).catch(err => {
      console.error(err)
    })
}

const handleCancel = () => {
  router.back()
}

onMounted(async () => {
  // Obtain up-to-date current user's details
  try {
    const res = await getUserByUsername(store.state.user.name)
    const { data } = res.data
    if (data) {
      user.value = data
    } else {
      await store.dispatch('showAlert', {
        message: 'There is a problem retrieving your details, please relogin',
        onClose: router.push('/login')
      })
    }
  } catch (error) {
    await store.dispatch('showAlert', {
      message: 'Error retrieving user details',
      onClose: handleCancel()
    })
    console.error('Error retrieving user details', error)
  }
})
</script>

<style scoped>
.settings-container {
    padding: 2rem;
}

.settings-form .title {
    text-align: center;
    color: var(--primary-brand-color);
    font-size: 40px;
    font-weight: 900;
}

.settings-form .input-container {
    margin: 1.5rem 0;
    text-align: start;
}

.settings-form .input-container .change-button {
    margin-top: 1rem;
}

.settings-form .input-container > label {
    font-weight: bold;
    font-size: 14px;
}

.settings-form .button-container {
    display: flex;
    justify-content: end;
    gap: 2rem;
}

.settings-container .button-container > button {
    font-size: calc(var(--font-size) - 2px);
}

@media only screen and (max-width: 576px) {
    .settings-container .button-container {
        gap: .5rem;
    }
}
</style>
