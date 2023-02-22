<template>
    <div>
        <el-form :inline="true">
            <el-form-item>
                <el-input
                        placeholder="名称"
                        clearable
                >
                </el-input>
            </el-form-item>

            <el-form-item>
                <el-button @click="">搜索</el-button>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="dialogVisible = true">新增</el-button>
            </el-form-item>

            <el-form-item>
                <template>
                    <el-popconfirm
                            title="确定批量删除吗？" @confirm="">
                        <el-button slot="reference" type="danger" :disabled="delBtlStatue">批量删除</el-button>
                    </el-popconfirm>
                </template>
            </el-form-item>
        </el-form>

        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                border
                stripe
                style="width: 100%">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="名称"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="code"
                    label="唯一编码"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="描述"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="icon"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text">分配权限</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text" @click="editHandle(scope.row.name)">编辑</el-button>
                    <el-divider direction="vertical"></el-divider>

                    <template>
                        <el-popconfirm
                                title="这是一段内容确定删除吗？" @confirm="delHandle(scope.row.id)">
                            <el-button type="text" slot="reference" >删除</el-button>
                        </el-popconfirm>
                    </template>

                </template>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        name: "Roles",
        searchForm: {},
        data(){
            return {
                delBtlStatue: true,
                tableData: [{
                    name:'普通用户',
                    code:'normal',
                    remark:'只有基本查看功能',
                    statue: 1
                },{
                    name:'超级用户',
                    code:'admin',
                    remark:'系统默认最高权限，不可以编辑和任意修改',
                    statue: 1
                },]
            }
        }


    }
</script>

<style scoped>

</style>