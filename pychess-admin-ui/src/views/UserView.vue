<template>
    <el-header class="table-header">
        <h2>
            Users
        </h2>
        <div class="button-container">
            <el-button
              type="primary"
              @click="handleAddUser"
              :icon="User"
            >
            Add User
            </el-button>
            <el-button
              plain
              type="danger"
              :icon="Delete"
              :disabled="!multipleUsersSelected"
              @click="handleDeleteUser"
            >
            Delete User
          </el-button>
        </div>
    </el-header>
    <el-main class="table-wrapper">
      <!-- Display User Data -->
        <el-scrollbar height="750px">
            <el-table v-loading="loading" stripe :data="tableData" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50"  />
              <el-table-column :prop="'name'" :label="'Name'"/>
              <el-table-column :prop="'email'" :label="'Email'"/>
              <el-table-column :prop="'status'" :label="'Status'"/>
              <el-table-column :prop="'score'" :label="'Score'"/>
              <!-- Buttons -->
              <el-table-column :label="'Actions'" #default="scope">
                <el-button
                  type="text"
                  size="small"
                  :icon="Edit"
                  @click="handleUpdateUser(scope.row)"
                >
                  Edit
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  :icon="Delete"
                  @click.prevent="handleDeleteUser(scope.row)"
                >
                  Remove
                </el-button>
              </el-table-column>
          </el-table>
        </el-scrollbar>
    </el-main>

    <!-- Dialog for Adding New User -->
    <el-dialog
      v-model="showUserDialog"
      :title="userFormTitle"
      width="600"
    >
      <el-form
      :model="userForm"
      :rules="userFormRules"
      ref="ruleFormRef"
      label-width="auto"
      label-position="left"
      size="default"
      status-icon
      >
        <el-row>
          <el-form-item style="width: 100%;" label="Username" prop="username">
            <el-input v-model="userForm.username" placeholder="Please enter username"/>
          </el-form-item>
        </el-row>
        <el-row v-if="userFormTitle !== 'Edit User'">
          <el-form-item style="width: 100%;" label="Password" prop="password">
            <el-input
            v-model="userForm.password"
            type="password"
            autocomplete="off"
            placeholder="Please enter password"
            />
          </el-form-item>
        </el-row>
        <el-row v-if="userFormTitle !== 'Edit User'">
          <el-form-item style="width: 100%;" label="Confirm Password" prop="confirmPassword">
            <el-input
            v-model="userForm.confirmPassword"
            type="password"
            autocomplete="off"
            />
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item style="width: 100%;" label="Email" prop="email">
            <el-input v-model="userForm.email" placeholder="Please enter email"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item v-if="userFormTitle === 'Edit User'" style="width: 100%;" label="Score" prop="score">
            <el-input-number v-model="userForm.score" :min="0"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="Status" prop="status">
            <el-radio-group v-model="userForm.status">
              <el-radio value="0">Active</el-radio>
              <el-radio value="1">Suspended</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item class="button-container" :class="mobile">
            <el-button type="primary" @click="handleSubmitForm(ruleFormRef)">Confirm</el-button>
            <el-button @click="handleResetForm(ruleFormRef)">Cancel</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
</template>

<script lang="ts">
import { listAllGameUser, insertGameUser, updateGameUser, softDeleteGameUser, GameUserProps } from '@/api/user'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { User, Delete, Edit } from '@element-plus/icons-vue'
import { InternalRuleItem } from 'async-validator'
import { useStore } from 'vuex'

interface UserRuleForm {
  id: number | undefined
  username: string
  password: string
  confirmPassword: string
  score: number
  email: string
  status: string
}

export default defineComponent({
  name: 'UserView',
  setup () {
    const tableData = ref([])
    // loading status
    const loading = ref(true)
    // list of user ids
    const ids = ref<number[]>([])
    // User Dialog Show Status
    const showUserDialog = ref(false)
    // Multiple Rows Selected Status
    const multipleUsersSelected = ref(false)
    // Insert User Form
    const userForm = reactive<UserRuleForm>({
      id: undefined,
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      score: 0,
      status: '0'
    })
    const userFormTitle = ref('')
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/
    const ruleFormRef = ref<FormInstance>()
    const store = useStore()
    const mobile = computed(() => store.state.app.device)
    const user = computed(() => store.state.user.name)

    const validatePass = (rule: InternalRuleItem, value: string, callback: (error?: string | Error | undefined) => void) => {
      if (value === '') {
        callback(new Error('Please input the password'))
      } else if (!value.match(passwordRegex)) {
        callback(new Error('Password must have a minimum of 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'))
      } else {
        if (userForm.confirmPassword !== '') {
          if (!ruleFormRef.value) return
          ruleFormRef.value.validateField('confirmPassword')
        }
        callback()
      }
    }
    // Check if two password matches
    const confirmPassMatch = (rule: InternalRuleItem, value: string, callback: (error?: string | Error | undefined) => void) => {
      if (value === '') {
        callback(new Error('Please input the password again'))
      } else if (value !== userForm.password) {
        callback(new Error('Password does not match!'))
      } else {
        callback()
      }
    }
    // User Form Rules
    const userFormRules = reactive<FormRules<UserRuleForm>>({
      username: [
        { required: true, message: 'Please input username!', trigger: 'blur' },
        { min: 5, max: 20, message: 'Username length should be 5-20', trigger: 'blur' }
      ],
      password: [
        { required: true, message: 'Please input password!', trigger: 'blur' },
        { validator: validatePass, trigger: 'blur' }
      ],
      confirmPassword: [
        { required: true, message: 'Please input password!', trigger: 'blur' },
        { validator: confirmPassMatch, trigger: 'blur' }
      ],
      email: [
        { required: true, message: 'Please input email!', trigger: 'blur' },
        { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change'] }
      ]
    })
    // Get table data
    const getData = async () => {
      try {
        const response = await listAllGameUser('')
        const { data } = response.data
        tableData.value = data
        loading.value = false
      } catch (error) {
        console.error(error)
      }
    }
    // Select checkbox function
    const handleSelectionChange = (selection: GameUserProps[]) => {
      // Filter out undefined values to ensure numbers only
      ids.value = selection.map(user => user.id).filter((id): id is number => id !== undefined)
      multipleUsersSelected.value = (selection.length > 1)
    }
    // Add User button function
    const handleAddUser = () => {
      userForm.id = undefined
      userForm.username = ''
      userForm.password = ''
      userForm.confirmPassword = ''
      userForm.status = '0'
      userForm.email = ''
      userForm.score = 0
      userFormTitle.value = 'Add User'
      showUserDialog.value = true
    }
    // Update button function
    const handleUpdateUser = (row: Record<string, unknown>) => {
      userForm.id = row.id as number
      userForm.username = row.name as string
      userForm.password = row.password as string
      userForm.confirmPassword = row.password as string
      userForm.status = row.status as string
      userForm.email = row.email as string
      userForm.score = row.score as number
      userFormTitle.value = 'Edit User'
      showUserDialog.value = true
    }
    // Delete button function
    const handleDeleteUser = (row: Record<string, unknown>) => {
      // Contains one or multiple user ids
      const userIds = row.id ? row.id : ids.value
      ElMessageBox.confirm(
        `Are you sure you want to delete user ${userIds}`,
        'Deleting User',
        {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
        await softDeleteGameUser(userIds as number | number[])
        ElMessage({
          type: 'success',
          message: 'Operation Successful'
        })
        // Refresh table data
        getData()
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: 'Operation Canceled'
        })
      })
    }
    // Form Submission Function
    const handleSubmitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      // Validate all fields against the rules
      await formEl.validate(async (valid) => {
        // Submit only if valid
        if (valid) {
          // Determine if meant to insert or update user
          if (userForm.id === undefined) {
            await insertGameUser({
              name: userForm.username,
              password: userForm.password,
              email: userForm.email,
              status: userForm.status,
              createBy: user.value,
              updateBy: user.value
            })
            // Display success message
            ElMessage({
              type: 'success',
              message: 'Add User Successful'
            })
          } else {
            await updateGameUser({
              id: userForm.id,
              name: userForm.username,
              password: userForm.password,
              email: userForm.email,
              status: userForm.status,
              score: userForm.score,
              updateTime: new Date(),
              updateBy: user.value
            })
            // Display success message
            ElMessage({
              type: 'success',
              message: 'Edit User Successful'
            })
          }
          // Close dialog after successful submit
          showUserDialog.value = false
        } else {
          // Display error message
          ElMessage({
            type: 'warning',
            message: 'Invalid inputs'
          })
        }
        getData()
      })
    }
    // Reset Form Fields
    const handleResetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
      showUserDialog.value = false
    }

    onMounted(async () => {
      getData()
    })

    return {
      tableData,
      loading,
      ids,
      multipleUsersSelected,
      userForm,
      userFormTitle,
      ruleFormRef,
      showUserDialog,
      userFormRules,
      mobile,
      handleSelectionChange,
      getData,
      handleAddUser,
      handleUpdateUser,
      handleDeleteUser,
      User,
      Edit,
      Delete,
      handleSubmitForm,
      handleResetForm
    }
  }
})

</script>
<style scoped>
.table-header {
  text-align: left;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 10px;
}

.table-header h2 {
  color: var(--primary-brand-font-color);
}

.el-main {
  padding: 0;
}

.table-wrapper .el-table {
  width: 100%;
}

.button-container.mobile {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
