<template>
<div>
    <el-header class="header">
      <h2>
        Settings
      </h2>
    </el-header>
    <el-main class="settings-wrapper">
        <div>
            <el-form
            :model="settingsForm"
            :rules="settingsRules"
            ref="ruleFormRef"
            label-position="left"
            @submit.prevent="handleSubmitForm(ruleFormRef)"
            label-width="auto"
            status-icon
            >
                <el-form-item label="Username" prop="username">
                    <el-input
                        v-model="settingsForm.username"
                        placeholder="Username"
                        clearable
                    />
                </el-form-item>
                <el-form-item label="Password" prop="password">
                    <el-input
                        v-model="settingsForm.password"
                        type="password"
                        show-password
                        placeholder="Password"
                    />
                </el-form-item>
                <el-form-item label="Email" prop="email">
                    <el-input
                        v-model="settingsForm.email"
                        type="email"
                        placeholder="Email"
                    />
                </el-form-item>
                <el-form-item>
                    <el-button v-loading="loading" size="large" type="primary" @click.prevent="handleSubmitForm(ruleFormRef)">
                        <!-- Show different text based on status -->
                        <span v-if="!loading">Save Changes</span>
                        <span v-else>Saving...</span>
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { getCurrentUser, updateUserSettings, UserProps } from '@/api/user'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'

interface SettingsRuleForm {
  username: string
  password: string
  email: string
}

// loading status
const loading = ref(false)
const store = useStore()
const user = ref<UserProps>({ name: '', password: '', email: '' })
const settingsForm = reactive<SettingsRuleForm>({
  username: '',
  password: 'Do not edit this if no intention to change password',
  email: ''
})
const ruleFormRef = ref<FormInstance>()
const settingsRules = reactive<FormRules<SettingsRuleForm>>({
  username: [
    { required: true, trigger: 'blur', message: 'Username cannot be empty!' }
  ],
  password: [
    { required: true, trigger: 'blur', message: 'Password cannot be empty!' }
  ],
  email: [
    { required: true, trigger: 'blur', message: 'Email cannot be empty!' }
  ]
})

const handleSubmitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  //  Validate all fields
  await formEl.validate(async (valid) => {
    if (valid) {
      try {
        // Update user entity
        user.value.name = settingsForm.username
        user.value.password = settingsForm.password === 'Do not edit this if no intention to change password' ? undefined : settingsForm.password
        user.value.email = settingsForm.email
        user.value.updateBy = settingsForm.username
        user.value.updateTime = new Date()
        // Update user in database
        await updateUserSettings(user.value as UserProps)
        // Refresh store values
        await store.dispatch('getUserData', true)
        ElMessage({
          type: 'success',
          message: 'Settings Updated'
        })
      } catch (err) {
        console.error('Error updating user settings', err)
      }
    } else {
      // Display error message
      ElMessage({
        type: 'warning',
        message: 'Invalid inputs'
      })
    }
  })
}
onMounted(async () => {
  try {
    const response = await getCurrentUser()
    const { code, message, data } = response.data
    if (code === 200) {
      user.value = data
    } else {
      throw new Error(message)
    }
  } catch (err) {
    console.error('Error retrieving settings', err)
  }
})
</script>
