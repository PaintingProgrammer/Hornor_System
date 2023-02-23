<template>
  <div>
    <el-form :inline="true">
      <el-form-item>
        <el-input v-model="searchForm.username" placeholder="名称" clearable>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getRoleList">搜索</el-button>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="dialogVisible = true">新增</el-button>
      </el-form-item>

      <el-form-item>
        <template>
          <el-popconfirm title="确定批量删除吗？" @confirm="delHandle(null)">
            <el-button slot="reference" type="danger" :disabled="delBtlStatue"
              >批量删除</el-button
            >
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
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="name" label="名称" width="120"> </el-table-column>
      <el-table-column prop="code" label="唯一编码" width="120">
      </el-table-column>
      <el-table-column prop="remark" label="描述" width="400">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="150">
      </el-table-column>
      <el-table-column prop="icon" label="操作">
        <template slot-scope="scope">
          <el-button type="text">分配权限</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="text" @click="editHandle(scope.row.name)"
            >编辑</el-button
          >
          <el-divider direction="vertical"></el-divider>

          <template>
            <el-popconfirm
              title="这是一段内容确定删除吗？"
              @confirm="delHandle(scope.row.id)"
            >
              <el-button type="text" slot="reference">删除</el-button>
            </el-popconfirm>
          </template>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      layout="total, sizes, prev, pager, next, jumper"
      :page-sizes="[10, 20, 50, 100]"
      :current-page="current"
      :page-size="size"
      :total="total"
    >
    </el-pagination>

    <!--新增对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="600px"
      :before-close="handleClose"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editForm"
        label-width="100px"
        class="demo-editForm"
      >
        <el-form-item label="用户名" prop="name" label-width="100px">
          <el-input v-model="editForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="唯一编码" prop="code" label-width="100px">
          <el-input v-model="editForm.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop="remark" label-width="100px">
          <el-input v-model="editForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="statu" label-width="100px">
          <el-radio-group v-model="editForm.statu">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">正常</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="resetForm('editForm')">取 消</el-button>
        <el-button type="primary" @click="submitEditForm('editForm')"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Roles",
  searchForm: {
    username: "",
  },
  data() {
    return {
      delBtlStatue: true,
      dialogVisible: false,
      searchForm: {
        name: "",
      },
      size: 10,
      total: 0,
      current: 1,
      editForm: {},
      tableData: [],
      editFormRules: {
        name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
        code: [{ required: true, message: "请输入唯一编码", trigger: "blur" }],
        remark: [{ required: false, message: "请输入描述", trigger: "blur" }],
        statu: [{ required: true, message: "请选择状态", trigger: "blur" }],
      },
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
      this.delBtlStatue = val.length == 0;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.dialogVisible = false;
      this.editForm = {};
    },
    handleClose() {
      this.resetForm("editForm");
    },
    submitEditForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post(
              "/sys/role" + (this.editForm.id ? "update" : "save"),
              this.editForm
            )
            .then((res) => {
              this.$message({
                showClose: true,
                message: "恭喜你，操作成功！",
                type: "success",
                onClose: () => {
                  this.getRoleList();
                },
              });

              this.dialogVisible = false;
            });
          this.resetForm(formName);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    delHandle(id) {
      var ids = [];
      if(id) {
        ids.push(id)
      } else {
        this.multipleSelection.forEach(row => {
            ids.push(row.id)
        })
      }
      console.log(ids)
      this.$axios.post("/sys/role/delete/" + id).then((res) => {
        this.$message({
          showClose: true,
          message: "恭喜你，操作成功！",
          type: "success",
          onClose: () => {
            this.getRoleList();
          },
        });
      });
    },
    getRoleList() {
      this.$axios
        .get("/sys/role/list", {
          params: {
            name: this.searchForm.username,
            current: this.current,
            size: this.size,
          },
        })
        .then((res) => {
          this.tableData = res.data.data.records;
          this.current = res.data.data.current;
          this.size = res.data.data.size;
          this.total = res.data.data.total;
          console.log(this.tableData);
        });
    },
    editHandle(id) {
      this.$axios.get("/sys/role/info/" + id).then((res) => {
        this.editForm = res.data.data;

        this.dialogVisible = true;
      });
    },
  },
  created() {
    //为了在创建时调用
    this.getRoleList();
  },
};
</script>

<style scoped>
.el-pagination {
  float: right;
  margin-top: 22px;
}
</style>