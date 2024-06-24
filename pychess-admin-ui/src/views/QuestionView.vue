<template>
  <div>
    <el-header class="table-header">
      <h2>
        Questions
      </h2>
      <div class="button-container">
        <el-button
          type="primary"
          @click="handleAddQuestion"
          :icon="ChatLineSquare"
        >
        Add Question
        </el-button>
        <el-button
          plain
          type="danger"
          :icon="Delete"
          :disabled="!multipleQuestionsSelected"
          @click="handleDeleteQuestion"
        >
        Delete Question
      </el-button>
      </div>
    </el-header>
    <el-main class="table-wrapper">
      <!-- Display Question Data -->
      <el-scrollbar height="750px">
        <el-table v-loading="loading" stripe :data="tableData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" />
          <el-table-column prop="text" label="Question" />
          <el-table-column prop="chessPiece" label="Chess Piece" width="150"/>
          <el-table-column prop="questionType" label="Type" width="100"/>
          <el-table-column prop="score" label="Score" width="80" />
          <el-table-column prop="answer1" label="Answer 1" />
          <el-table-column prop="answer2" label="Answer 2" />
          <el-table-column prop="answer3" label="Answer 3" />
          <el-table-column prop="answer4" label="Answer 4" />
          <!-- Buttons -->
          <el-table-column :label="'Actions'" #default="scope">
            <el-button
              type="text"
              size="small"
              :icon="Edit"
              @click="handleUpdateQuestion(scope.row)"
            >
              Edit
            </el-button>
            <el-button
              type="text"
              size="small"
              :icon="Delete"
              @click.prevent="handleDeleteQuestion(scope.row)"
            >
              Remove
            </el-button>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-main>

    <!-- Dialog for Adding New Question -->
    <el-dialog
      v-model="showQuestionDialog"
      :title="questionFormTitle"
      width="600"
      destroy-on-close
    >
      <el-form
      :model="questionForm"
      :rules="questionFormRules"
      ref="ruleFormRef"
      label-width="auto"
      label-position="left"
      size="default"
      status-icon
      >
        <el-row>
          <el-form-item style="width: 100%;" label="Question" prop="text">
            <el-input v-model="questionForm.text" type="textarea" placeholder="Please enter question"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item style="width: 100%;" label="Chess Piece" prop="chessPieceId">
            <el-select v-model="questionForm.chessPieceId" placeholder="Chess Piece" @change="handleChessPieceChange">
              <el-option v-for="piece in chessPieces" :key="piece.id" :label="piece.name" :value="piece.id"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item style="width: 100%;" label="Score" prop="score">
            <el-input v-model="questionForm.score" type="number" placeholder="Please enter score"/>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item style="width: 100%;" label="Question Type" prop="questionTypeId">
            <el-select v-model="questionForm.questionTypeId" placeholder="Question Type" disabled>
              <el-option v-for="qType in questionTypes" :key="qType.id" :label="qType.name" :value="qType.id"/>
            </el-select>
          </el-form-item>
        </el-row>
        <el-row v-if="questionForm.questionTypeId === 1">
          <el-form-item style="width: 100%;" label="Answer 1" prop="answer1">
            <el-input v-model="questionForm.answer1" placeholder="Please enter answer 1"/>
            <el-radio v-model="questionForm.correctAnswer" value='1'>Correct</el-radio>
          </el-form-item>
          <el-form-item style="width: 100%;" label="Answer 2" prop="answer2">
            <el-input v-model="questionForm.answer2" placeholder="Please enter answer 2"/>
            <el-radio v-model="questionForm.correctAnswer" value='2'>Correct</el-radio>
          </el-form-item>
          <el-form-item style="width: 100%;" label="Answer 3" prop="answer3">
            <el-input v-model="questionForm.answer3" placeholder="Please enter answer 3"/>
            <el-radio v-model="questionForm.correctAnswer" value='3'>Correct</el-radio>
          </el-form-item>
          <el-form-item style="width: 100%;" label="Answer 4" prop="answer4">
            <el-input v-model="questionForm.answer4" placeholder="Please enter answer 4"/>
            <el-radio v-model="questionForm.correctAnswer" value='4'>Correct</el-radio>
          </el-form-item>
        </el-row>
        <el-row v-else-if="questionForm.questionTypeId === 2">
          <el-form-item style="width: 100%;" label="Answer" prop="answer1">
            <el-input v-model="questionForm.answer1" placeholder="Please enter answer"/>
          </el-form-item>
        </el-row>
        <el-row v-else-if="questionForm.questionTypeId === 3">
          <el-form-item style="width: 100%;" label="Answer" prop="answer1">
            <el-select v-model="questionForm.answer1" placeholder="Please select answer">
              <el-option label="True" value="true" />
              <el-option label="False" value="false" />
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
  </div>
</template>

<script lang="ts">
import { listAllQuestion, insertQuestion, updateQuestion, deleteQuestion } from '@/api/question'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { Delete, Edit, ChatLineSquare } from '@element-plus/icons-vue'
import { InternalRuleItem } from 'async-validator'
import { useStore } from 'vuex'
import { listAllChessPiece, ChessProps } from '@/api/chess'

interface QuestionTableProps {
  id: number,
  chessPieceId: number,
  chessPiece: string,
  text: string,
  questionTypeId: number
  questionType: string,
  score: number
  answer1Id: number | undefined,
  answer2Id: number | undefined,
  answer3Id: number | undefined,
  answer4Id: number | undefined,
  answer1: string,
  answer2: string | null,
  answer3: string | null,
  answer4: string | null,
  isCorrect1: string | null,
  isCorrect2: string | null,
  isCorrect3: string | null,
  isCorrect4: string | null
}

interface QuestionRuleForm {
  id: number | undefined
  text: string,
  questionTypeId: number,
  chessPieceId: number,
  score: number,
  answer1Id: number | undefined,
  answer2Id: number | undefined,
  answer3Id: number | undefined,
  answer4Id: number | undefined,
  answer1: string,
  answer2: string | null,
  answer3: string | null,
  answer4: string | null,
  correctAnswer: string | null
}

export default defineComponent({
  name: 'QuestionView',
  setup () {
    const tableData = ref<QuestionTableProps[]>([])
    // Preset question types
    const questionTypes = ref<{ id: number, name: string }[]>([
      { id: 1, name: 'Multiple Choice' },
      { id: 2, name: 'Short Response' },
      { id: 3, name: 'True/False' }
    ])
    // chess piece
    const chessPieces = ref<ChessProps[]>([])
    // loading status
    const loading = ref(true)
    // list of user ids
    const ids = ref<number[]>([])
    // Question Dialog Show Status
    const showQuestionDialog = ref(false)
    // Multiple Rows Selected Status
    const multipleQuestionsSelected = ref(false)
    // Insert User Form
    const questionForm = reactive<QuestionRuleForm>({
      id: undefined,
      text: '',
      questionTypeId: 0,
      chessPieceId: 0,
      score: 0,
      answer1Id: undefined,
      answer2Id: undefined,
      answer3Id: undefined,
      answer4Id: undefined,
      answer1: '',
      answer2: null,
      answer3: null,
      answer4: null,
      correctAnswer: '1'
    })
    const questionFormTitle = ref('')
    const ruleFormRef = ref<FormInstance>()
    const store = useStore()
    const mobile = store.state.app.device
    const user = store.state.user.name

    const validateChessPiece = (rule: InternalRuleItem, value: number, callback: (error?: string | Error | undefined) => void) => {
      if (value === 0) {
        callback(new Error('Please select chess piece'))
      } else {
        // Map through chess piece Id
        callback()
      }
    }

    const validateQuestionType = (rule: InternalRuleItem, value: number, callback: (error?: string | Error | undefined) => void) => {
      if (value === 0) {
        callback(new Error('Please select question type'))
      } else if (value > 0 && value <= 3) {
        callback()
      } else {
        callback(new Error('Invalid selection'))
      }
    }

    // Question Form Rules
    const questionFormRules = reactive<FormRules<QuestionRuleForm>>({
      text: [
        { required: true, message: 'Please input question!', trigger: 'blur' }
      ],
      chessPieceId: [
        { required: true, message: 'Please select chess piece', trigger: 'change' },
        { validator: validateChessPiece, trigger: 'blur' }
      ],
      questionTypeId: [
        { required: true, message: 'Please select question type', trigger: 'change' },
        { validator: validateQuestionType, trigger: 'blur' }
      ],
      score: [
        { required: true, message: 'Please ', trigger: 'blur' }
      ],
      answer1: [
        { required: true, message: 'Please input answer!', trigger: 'blur' }
      ],
      answer2: [
        { required: true, message: 'Please input answer!', trigger: 'blur' }
      ],
      answer3: [
        { required: true, message: 'Please input answer!', trigger: 'blur' }
      ],
      answer4: [
        { required: true, message: 'Please input answer!', trigger: 'blur' }
      ],
      correctAnswer: [
        { required: true, message: 'Please select the correct answer!', trigger: 'change' }
      ]
    })

    // Get table data
    const getTableData = async () => {
      loading.value = true
      try {
        const res = await listAllQuestion('')
        const { data } = res.data
        // Ensure data is an array before proceeding
        if (Array.isArray(data)) {
          tableData.value = data.map((item) => ({
            id: item.id,
            chessPieceId: item.chess_piece_id,
            chessPiece: item.chess_piece,
            text: item.question_text,
            questionTypeId: item.question_type_id,
            questionType: item.question_type,
            score: item.score,
            answer1Id: item.answers[0]?.id || undefined,
            answer2Id: item.answers[1]?.id || undefined,
            answer3Id: item.answers[2]?.id || undefined,
            answer4Id: item.answers[3]?.id || undefined,
            answer1: item.answers[0]?.answer || '',
            answer2: item.answers[1]?.answer || null,
            answer3: item.answers[2]?.answer || null,
            answer4: item.answers[3]?.answer || null,
            isCorrect1: item.answers[0]?.is_correct || null,
            isCorrect2: item.answers[1]?.is_correct || null,
            isCorrect3: item.answers[2]?.is_correct || null,
            isCorrect4: item.answers[3]?.is_correct || null
          }))
        } else {
          console.error('Expected array but received', data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    // Get chess data
    const getChessData = async () => {
      loading.value = true
      try {
        const res = await listAllChessPiece('')
        const { data } = res.data
        if (Array.isArray(data)) {
          chessPieces.value = data.map((item) => ({
            id: item.id,
            questionTypeId: item.question_type_id,
            name: item.name,
            createBy: item.create_by,
            createTime: item.create_time,
            updateBy: item.update_by,
            updateTime: item.update_time
          }))
        } else {
          console.error('Expected array but received', data)
        }
      } catch (err) {
        console.error(err)
      } finally {
        loading.value = false
      }
    }
    // Select checkbox function
    const handleSelectionChange = (selection: QuestionTableProps[]) => {
      ids.value = selection.map(question => question.id)
      multipleQuestionsSelected.value = (selection.length > 1)
    }
    // Add question button function
    const handleAddQuestion = () => {
      questionForm.id = undefined
      questionForm.text = ''
      questionForm.chessPieceId = 0
      questionForm.questionTypeId = 0
      questionForm.score = 0
      questionForm.answer1Id = undefined
      questionForm.answer2Id = undefined
      questionForm.answer3Id = undefined
      questionForm.answer4Id = undefined
      questionForm.answer1 = ''
      questionForm.answer2 = null
      questionForm.answer3 = null
      questionForm.answer4 = null
      questionForm.correctAnswer = '1'
      questionFormTitle.value = 'Add Question'
      showQuestionDialog.value = true
    }

    // Update button function
    const handleUpdateQuestion = (row: Record<string, unknown>) => {
      questionForm.id = row.id as number
      questionForm.text = row.text as string
      questionForm.score = row.score as number
      questionForm.chessPieceId = row.chessPieceId as number
      questionForm.questionTypeId = row.questionTypeId as number
      questionForm.answer1Id = row.answer1Id as number
      questionForm.answer2Id = row.answer2Id as number | undefined
      questionForm.answer3Id = row.answer3Id as number | undefined
      questionForm.answer4Id = row.answer4Id as number | undefined
      questionForm.answer1 = row.answer1 as string
      questionForm.answer2 = row.answer2 as string | null
      questionForm.answer3 = row.answer3 as string | null
      questionForm.answer4 = row.answer4 as string | null

      // Set correctAnswer based on the row data
      if (row.isCorrect1 === '1') questionForm.correctAnswer = '1'
      else if (row.isCorrect2 === '1') questionForm.correctAnswer = '2'
      else if (row.isCorrect3 === '1') questionForm.correctAnswer = '3'
      else if (row.isCorrect4 === '1') questionForm.correctAnswer = '4'
      else questionForm.correctAnswer = null

      questionFormTitle.value = 'Edit Question'
      showQuestionDialog.value = true
    }
    // Delete button function
    const handleDeleteQuestion = (row: Record<string, unknown>) => {
      // Contains one or multiple user ids
      const questionIds = row.id ? row.id : ids.value
      ElMessageBox.confirm(
        `Are you sure you want to delete question ${questionIds}`,
        'Deleting Question',
        {
          confirmButtonText: 'Yes',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(async () => {
        await deleteQuestion(questionIds as number | number[])
        ElMessage({
          type: 'success',
          message: 'Operation Successful'
        })
        // Refresh table data
        getTableData()
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: 'Operation Canceled'
        })
      })
    }
    // Change question type id according to chess piece
    const handleChessPieceChange = (value: number) => {
      const selectedPiece = chessPieces.value.find(piece => piece.id === value)
      if (selectedPiece) {
        questionForm.questionTypeId = selectedPiece.questionTypeId
      }
    }
    // Form Submission Function
    const handleSubmitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      // Validate all fields against the rules
      await formEl.validate(async (valid) => {
        // Submit only if valid
        if (valid) {
          // Prepare data for submission
          const submissionData = {
            ...questionForm,
            isCorrect1: questionForm.correctAnswer === '1' ? '1' : '0',
            isCorrect2: questionForm.correctAnswer === '2' ? '1' : '0',
            isCorrect3: questionForm.correctAnswer === '3' ? '1' : '0',
            isCorrect4: questionForm.correctAnswer === '4' ? '1' : '0'
          }
          // Filter out null answers
          const answers = [
            { id: submissionData.answer1Id, answer: submissionData.answer1, isCorrect: submissionData.isCorrect1 },
            { id: submissionData.answer2Id, answer: submissionData.answer2, isCorrect: submissionData.isCorrect2 },
            { id: submissionData.answer3Id, answer: submissionData.answer3, isCorrect: submissionData.isCorrect3 },
            { id: submissionData.answer4Id, answer: submissionData.answer4, isCorrect: submissionData.isCorrect4 }
          ].filter(answer => answer.answer !== null)
          // Determine if meant to insert or update user
          if (submissionData.id === undefined) {
            await insertQuestion({
              text: submissionData.text,
              score: submissionData.score,
              questionTypeId: submissionData.questionTypeId,
              chessPieceId: submissionData.chessPieceId,
              answers,
              createBy: user,
              updateBy: user,
              id: null,
              createTime: null,
              updateTime: null
            })
            // Display success message
            ElMessage({
              type: 'success',
              message: 'Add Question Successful'
            })
          } else {
            await updateQuestion({
              id: submissionData.id,
              text: submissionData.text,
              score: submissionData.score,
              answers,
              updateTime: new Date(),
              updateBy: user,
              createBy: null,
              createTime: null,
              questionTypeId: 0,
              chessPieceId: 0
            })
            // Display success message
            ElMessage({
              type: 'success',
              message: 'Edit Question Successful'
            })
          }
          // Close dialog after successful submit
          showQuestionDialog.value = false
          getTableData()
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
      showQuestionDialog.value = false
    }

    onMounted(async () => {
      getTableData()
      getChessData()
    })

    return {
      tableData,
      questionTypes,
      chessPieces,
      loading,
      ids,
      multipleQuestionsSelected,
      questionForm,
      questionFormTitle,
      ruleFormRef,
      showQuestionDialog,
      questionFormRules,
      mobile,
      handleSelectionChange,
      getTableData,
      handleAddQuestion,
      handleUpdateQuestion,
      handleDeleteQuestion,
      ChatLineSquare,
      Edit,
      Delete,
      handleChessPieceChange,
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
