<template>
    <el-header class="table-header">
        <h2>
            Users
        </h2>
        <div class="button-container">
            <el-button plain @click="showAddUserDialog=true">Add User</el-button>
            <el-button
            plain
            type="danger"
            icon="el-icon-delete"
            :disabled="!multipleUsersSelected"
            @click="handleDeleteUser"
            >Delete User</el-button>
        </div>
    </el-header>
    <el-main class="table-wrapper">
      <!-- Display User Data -->
        <el-scrollbar height="600px">
            <el-table v-loading="loading" stripe :data="tableData" @selection-change="handleSelectionChange">
              <el-table-column fixed type="selection" width="50"  />
              <el-table-column :prop="'name'" :label="'Name'"/>
              <el-table-column :prop="'email'" :label="'Email'"/>
              <el-table-column :prop="'status'" :label="'Status'"/>
              <el-table-column :prop="'createTime'" :label="'Create Time'"/>
              <!-- Buttons -->
              <el-table-column fixed="right" :label="'Actions'" #default="scope:TableScope">
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-edit"
                  @click="handleDeleteUser(scope.row)"
                >
                  Edit
                </el-button>
                <el-button
                  type="text"
                  size="small"
                  icon="el-icon-delete"
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
      v-model="showAddUserDialog"
      title="Add User"
      width="600"
    >
      <el-form>
        <el-row>
          <el-form-item label="Username">
            <el-input placeholder="Please enter username" maxLength="30"/>
          </el-form-item>
        </el-row>
      </el-form>
    </el-dialog>
</template>

<script lang="ts">
import { listAllUser, deleteUser } from '@/api/user'
import { defineComponent, onMounted, ref } from 'vue'
import dayjs from 'dayjs'
import { ElMessage, ElMessageBox } from 'element-plus'

interface User {
  id: number;
  name: string;
  email: string;
  status: string;
  createTime: Date;
}

interface TableScope {
  row: Record<string, unknown>
  $index: number
}

export default defineComponent({
  name: 'UserView',
  setup () {
    const tableData = ref([])
    // loading status
    const loading = ref(true)
    // list of user ids
    const ids = ref<number[]>([])
    // Add User Dialog Show
    const showAddUserDialog = ref(false)
    // Multiple Rows Selected Status
    const multipleUsersSelected = ref(false)
    // Get table data
    const getData = async () => {
      const data = await listAllUser('')
      tableData.value = data.data
      loading.value = false
    }
    // Select checkbox function
    const handleSelectionChange = (selection: User[]) => {
      console.log(selection)
      ids.value = selection.map(user => user.id)
      multipleUsersSelected.value = (selection.length > 1)
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
        await deleteUser(userIds as number | number[])
        ElMessage({
          type: 'info',
          message: 'Operation Canceled'
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

    onMounted(async () => {
      getData()
    })

    return {
      tableData,
      loading,
      ids,
      multipleUsersSelected,
      showAddUserDialog,
      handleSelectionChange,
      getData,
      handleDeleteUser
    }
  }
})

</script>
<style scoped>
.table-header {
  text-align: left;
  height: fit-content;
}

.table-header h2 {
  color: var(--primary-brand-font-color);
}

.el-main {
  padding: 0;
}

.table-header .button-container {
  align-self: flex-end;
}

.table-wrapper .el-table {
  width: 100%;
}
</style>
