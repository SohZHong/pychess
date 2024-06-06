<template>
  <el-header class="table-header">
      <h2>
          Chess Piece
      </h2>
  </el-header>
  <el-main class="table-wrapper">
    <!-- Display Chess Data -->
      <el-scrollbar height="750px">
          <el-table v-loading="loading" stripe :data="tableData">
            <el-table-column prop="name" label="Name" />
            <el-table-column prop="questionType" label="Type" />
            <el-table-column prop="createTime" label="Create Time" />
            <!-- Buttons -->
            <el-table-column :label="'Action'" #default="scope">
              <el-button
                type="text"
                size="small"
                :icon="Edit"
                @click="handleUpdateChess(scope.row)"
              >
                Edit
              </el-button>
            </el-table-column>
        </el-table>
      </el-scrollbar>
  </el-main>
  <!-- Dialog for Editing Chess Piece -->
  <el-dialog
    v-model="showChessDialog"
    title="Edit Chess Piece"
    width="600"
    destroy-on-close
  >
    <el-form
    :model="chessForm"
    :rules="chessFormRules"
    ref="ruleFormRef"
    label-width="auto"
    label-position="left"
    size="default"
    status-icon
    >
      <el-row>
        <el-form-item style="width: 100%;" label="Name" prop="name">
          <el-input v-model="chessForm.name" type="text" placeholder="Please enter chess name"/>
        </el-form-item>
      </el-row>
      <el-row>
        <el-form-item style="width: 100%;" label="Question Type" prop="questionTypeId">
          <el-select v-model="chessForm.questionTypeId" placeholder="Question Type">
            <el-option v-for="qType in questionTypes" :key="qType.id" :label="qType.name" :value="qType.id"/>
          </el-select>
        </el-form-item>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-button-container">
        <el-button type="primary" @click="handleSubmitForm(ruleFormRef)">Confirm</el-button>
        <el-button @click="handleResetForm(ruleFormRef)">Cancel</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { Edit } from '@element-plus/icons-vue'
import { InternalRuleItem } from 'async-validator'
import { useStore } from 'vuex'
import { listAllChessPiece, updateChessPiece } from '@/api/chess'

interface ChessTableProps {
  id: number,
  name: string,
  questionTypeId: number
  questionType: string,
  createTime: Date
}

interface ChessRuleForm {
  id: number,
  name: string
  questionTypeId: number
}

export default defineComponent({
  name: 'ChessView',
  setup () {
    const tableData = ref<ChessTableProps[]>([])
    // Preset question types
    const questionTypes = ref<{ id: number, name: string }[]>([
      { id: 1, name: 'Multiple Choice' },
      { id: 2, name: 'Short Response' },
      { id: 3, name: 'True/False' }
    ])
    // loading status
    const loading = ref(true)
    // list of chess ids
    const ids = ref<number[]>([])
    // Question Dialog Show Status
    const showChessDialog = ref(false)
    // Chess Form
    const chessForm = reactive<ChessRuleForm>({
      id: 0,
      name: '',
      questionTypeId: 0
    })
    const ruleFormRef = ref<FormInstance>()
    const store = useStore()
    const mobile = store.state.app.device
    const user = store.state.user.name

    const validateQuestionType = (rule: InternalRuleItem, value: number, callback: (error?: string | Error | undefined) => void) => {
      if (value === 0) {
        callback(new Error('Please select question type'))
      } else if (value > 0 && value <= 3) {
        callback()
      } else {
        callback(new Error('Invalid selection'))
      }
    }

    // Chess Form Rules
    const chessFormRules = reactive<FormRules<ChessRuleForm>>({
      name: [
        { required: true, message: 'Please input chess name!', trigger: 'blur' }
      ],
      questionTypeId: [
        { required: true, message: 'Please select question type', trigger: 'change' },
        { validator: validateQuestionType, trigger: 'blur' }
      ]
    })

    // Get table data
    const getTableData = async () => {
      loading.value = true
      try {
        const res = await listAllChessPiece('')
        const { data } = res.data
        // Ensure data is an array before proceeding
        if (Array.isArray(data)) {
          tableData.value = data.map((item) => ({
            id: item.id,
            name: item.name,
            questionTypeId: item.question_type_id,
            questionType: item.question_type,
            createTime: item.create_time
          }))
          console.log('tableData:', tableData.value)
        } else {
          console.error('Expected array but received', data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    // Update button function
    const handleUpdateChess = (row: Record<string, unknown>) => {
      chessForm.id = row.id as number
      chessForm.name = row.name as string
      chessForm.questionTypeId = row.questionTypeId as number
      showChessDialog.value = true
    }
    // Form Submission Function
    const handleSubmitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      console.log(formEl)
      // Validate all fields against the rules
      await formEl.validate(async (valid) => {
        // Submit only if valid
        if (valid) {
          await updateChessPiece({
            id: chessForm.id,
            name: chessForm.name,
            questionTypeId: chessForm.questionTypeId,
            updateTime: new Date(),
            updateBy: user,
            createBy: null,
            createTime: null
          })
          // Display success message
          ElMessage({
            type: 'success',
            message: 'Edit Chess Piece Successful'
          })
          // Close dialog after successful submit
          showChessDialog.value = false
        } else {
          // Display error message
          ElMessage({
            type: 'warning',
            message: 'Invalid inputs'
          })
        }
      })
    }
    // Reset Form Fields
    const handleResetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
      showChessDialog.value = false
    }

    onMounted(async () => {
      getTableData()
    })

    return {
      tableData,
      questionTypes,
      loading,
      ids,
      chessForm,
      ruleFormRef,
      showChessDialog,
      chessFormRules,
      mobile,
      getTableData,
      handleUpdateChess,
      Edit,
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
</style>
