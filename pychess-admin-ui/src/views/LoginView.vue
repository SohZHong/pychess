<template>
    <div class="login">
        <el-form :model="loginForm" :rules="loginRules" ref="ruleFormRef" label-position="left" @submit.prevent="onSubmit" label-width="auto" status-icon>
            <el-form-item label="Username" prop="username">
                <el-input
                    v-model="loginForm.username"
                    placeholder="Username"
                    clearable
                />
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    show-password
                    placeholder="Password"
                />
            </el-form-item>
            <el-form-item>
                <el-button v-loading="loading" size="medium" type="primary" @click.prevent="onSubmit">
                    <!-- Show different text based on status -->
                    <span v-if="!loading">Login</span>
                    <span v-else>Logging in...</span>
                </el-button>
                <div style="float: right;">
                    Not a Member?<router-link class="linked-text" :to="'/register'">Register Now</router-link>
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

interface LoginRuleForm {
  username: string
  password: string
}

export default {
  setup() {
    const store = useStore()
    // loading status
    const loading = ref(false)
    const loginForm = reactive({
      username: '',
      password: ''
    })
    const ruleFormRef = ref<FormInstance>()
    const loginRules = reactive<FormRules<LoginRuleForm>>({
      username: [
        { required: true, trigger: "blur", message: "Please enter username" }
      ],
      password: [
        { required: true, trigger: "blur", message: "Please enter password" }
      ]
    })
    // Login
    const onSubmit = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      //  Validate all fields
      await formEl.validate(async (valid) => {
        if (valid) {
          const router = useRouter()
          loading.value = true
          await store.dispatch('Login', {
            username: loginForm.username,
            password: loginForm.password
          }).then(() => {
            // Navigate user to homepage
            router.push('/user')
          }).catch(err => {
            console.error(err)
          })
        } else {
          // Display error message
          ElMessage({
            type: 'warning',
            message: 'Invalid inputs'
          })
        }
      })
    }
    return {
      loading,
      loginForm,
      ruleFormRef,
      loginRules,
      onSubmit
    }
  }
}
</script>
