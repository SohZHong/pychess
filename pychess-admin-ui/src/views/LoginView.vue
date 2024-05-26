<template>
    <div class="login">
        <el-form :model="loginForm" label-position="left" label-width="auto">
            <el-form-item label="Username">
                <el-input
                    v-model="loginForm.username"
                    placeholder="Username"
                    clearable
                />
            </el-form-item>
            <el-form-item label="Password">
                <el-input
                    v-model="loginForm.password"
                    type="password"
                    show-password
                    placeholder="Password"
                />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">
                    Login
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

const loginForm = reactive({
  username: '',
  password: ''
})

const onSubmit = () => {
  console.log(loginForm.username, loginForm.password)
}
</script>
