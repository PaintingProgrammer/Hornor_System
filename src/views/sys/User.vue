<template>
    <div>
        <el-form :inline="true">
            <el-form-item>
                <el-input
                        v-model="searchForm.name"
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
                    label="用户名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="role_name"
                    label="角色名称"
                    width="120">
                <template slot-scope="scope" >
                    <el-tag size="small" v-if="scope.row.role_name === 0" effect="light">超级管理员</el-tag>
                    <el-tag size="small" v-if="scope.row.role_name === 1" type="success" effect="light">普通用户</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    prop="email"
                    label="邮箱"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="150">
                <template slot-scope="scope" >
                    <el-tag size="small" v-if="scope.row.status === 0" type="danger" effect="light">禁止</el-tag>
                    <el-tag size="small" v-if="scope.row.status === 1" type="success" effect="light">正常</el-tag>
                </template>
            </el-table-column>
            <el-table-column
                    label="日期"
                    width="150">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                    prop="icon"
                    label="操作">
                <template slot-scope="scope">
                    <el-button type="text">分配角色</el-button>
                    <el-divider direction="vertical"></el-divider>
                    <el-button type="text">重置密码</el-button>
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

        <!--新增对话框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="600px"
                :before-close="handleClose">
            <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px" class="demo-editForm">
                <el-form-item label="用户名" prop="name" label-width="100px">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色名称" prop="role_name" label-width="100px">
                    <el-input v-model="editForm.role_name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" label-width="100px">
                    <el-input v-model="editForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="状态" prop="status" label-width="100px">
                    <el-input v-model="editForm.status" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="日期" prop="date" label-width="100px">
                    <el-input v-model="editForm.date" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('editForm')">取 消</el-button>
                <el-button type="primary" @click="submitEditForm('editForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "User",
        data(){
            return {
                searchForm: {},
                tableData: [],
                multipleSelection: [],
                delBtlStatue: false,
                dialogVisible: false,
                editFormRules: {
                    name: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    role_name: [
                        {required: true, message: '请选择角色名称', trigger: 'blur'}
                    ],
                    email: [
                        {required: true, message: '请输入邮箱', trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, message: '请输入手机号', trigger: 'blur'}
                    ],
                    status: [
                        {required: true, message: '请选择状态', trigger: 'blur'}
                    ],
                    date: [
                        {required: true, message: '请输入创建时间', trigger: 'blur'}
                    ],

                },
                editForm: {

                }
            }
        },
        methods: {
            getUserList(){
                this.$axios.get("/sys/user/list").then(res =>{
                    this.tableData = res.data.data
                })
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
                this.dialogVisible = false
                this.editForm = {}
            },
            handleClose(){
                this.resetForm('editForm')
            },
            editHandle(name) {
                this.$axios.get('/sys/user/info/' + name).then(res => {
                    this.editForm = res.data.data

                    this.dialogVisible = true
                })
            },
            submitEditForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$axios.post('/sys/user'+ (this.editForm.id ? "update" : "save"), this.editForm).then(res => {
                            this.$message({
                                showClose: true,
                                message: '恭喜你，操作成功！',
                                type: 'success',
                                onClose: () => {
                                    this.getUserList()
                                }
                            });

                            this.dialogVisible = false
                        })
                        this.resetForm(formName)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                })
            }
        },
        created(){ //为了在创建时调用
            this.getUserList()
        },
    }
</script>

<style scoped>

</style>