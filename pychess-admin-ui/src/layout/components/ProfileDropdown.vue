<template>
    <el-dropdown>
        <span>
            Profile name
            <el-icon class="el-icon--right">
                <ArrowDown />
            </el-icon>
        </span>
        <template #dropdown>
        <el-dropdown-menu>
            <el-dropdown-item>Profile</el-dropdown-item>
            <el-dropdown-item>Logout</el-dropdown-item>
        </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>
