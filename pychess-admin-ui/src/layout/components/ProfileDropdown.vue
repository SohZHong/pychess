<template>
    <el-dropdown split-button type="primary">
        <span>
            Profile name
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item>Profile</el-dropdown-item>
                <el-dropdown-item>Logout</el-dropdown-item>
            </el-dropdown-menu>
            </template>
    </el-dropdown>
</template>

<script lang="ts" setup>
</script>

<style scoped>
.el-dropdown-link {
    cursor: pointer;
    color: var(--primary-brand-font-color);
    display: flex;
    align-items: center;
}
</style>
