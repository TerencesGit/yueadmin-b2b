<template>
	<section>
    <!-- 工具栏 -->
    <el-row class="toolbar">
      <el-button type="primary" @click="handleAdd">创建品类</el-button>
    </el-row>
    <!-- 品类树 -->
    <el-row :gutter="20">
      <el-col :span="12">
        <el-tree
          :data="kindList"
          :props="defaultProps"
          node-key="id"
          ref="tree"
          highlight-current
          @node-click="nodeClick"
          default-expand-all
          :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </el-col>
      <el-col :span="12">
        <div class="kind-detail">
          <h3>品类详情</h3>
          <div class="content">
            <p>品类ID: {{selectedKind.kindId}}</p>
            <p>品类名称：{{selectedKind.kindName}}</p>
            <p>品类介绍：{{selectedKind.kindDesc}}</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 编辑品类 -->
    <el-dialog title="编辑品类" v-model="editFormVisible">
      <el-form :model="editForm" ref="editForm" label-width="120px" style="padding: 30px" v-loading="editLoading">
        <el-form-item label="品类名称" prop="kindName">
          <el-input v-model="editForm.kindName" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品类描述" prop="kindDesc">
          <el-input type="textarea" v-model="editForm.kindDesc" placeholder="品类描述"></el-input>
        </el-form-item>
        <el-form-item label="同级序号" prop="sortId">
          <el-input v-model="editForm.sortId" placeholder="同级序号"></el-input>
        </el-form-item>
        <el-form-item label="品类模板" prop="templateId">
          <el-select v-model="editForm.templateId" placeholder="品类模板">
            <el-option label="模板一" value="2001"></el-option>
            <el-option label="模板二" value="2002"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="editSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增品类 -->
    <el-dialog title="新增品类" v-model="addFormVisible">
      <el-form :model="addForm" ref="addForm" :rules="rules" label-width="120px" style="padding: 30px" v-loading="addLoading">
        <el-form-item label="品类名称" prop="kindName">
          <el-input v-model="addForm.kindName" placeholder="品牌名称"></el-input>
        </el-form-item>
        <el-form-item label="品类描述" prop="kindDesc">
          <el-input type="textarea" v-model="addForm.kindDesc" placeholder="品类描述"></el-input>
        </el-form-item>
        <el-form-item label="同级序号" prop="sortId">
          <el-input v-model="addForm.sortId" placeholder="同级序号"></el-input>
        </el-form-item>
        <el-form-item label="品类模板" >
          <el-select v-model="addForm.templateId" placeholder="品类模板">
            <el-option label="模板一" :value="2001"></el-option>
            <el-option label="模板二" :value="2002"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="note">
          <el-input type="textarea" v-model="addForm.note" placeholder="备注"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
	</section>
</template>
<script>
  import { readWareKind, saveWareKind } from '@/api'
  export default {
    data() {
      return {
        kindList: [{
          kindId: 10001,
          kindName: '旅拍',
          kindDesc: '旅拍旅拍旅拍',
          parentId: 0,
          children: [{
            kindId: 10007,
            kindName: '婚纱',
            parentId: '10001',
            sortId: '2',
            templateId: '2001'
          }, {
            kindId: 10008,
            kindName: '旅游',
            parentId: '10001',
            sortId: '3',
            templateId: '2002'
          }]
        }],
        selectedKind: {},
        defaultProps: {
          children: 'children',
          label: 'kindName'
        },
        addFormVisible: false,
        editFormVisible: false,
        addLoading: false,
        editLoading: false,
        addForm: {
          kindId: '',
          kindName: '',
          kindDesc: '',
          sortId: '',
          templateId: '',
          note: ''
        },
        editForm: {},
        rules: {
          kindName: [
            { required: true, message: '请输入品类名称', trigger: 'blur'},
          ],
          kindDesc: [
            { required: true, message: '请输入品类描述', trigger: 'blur'},
          ],
          sortId: [
            { required: true, message: '请输入同级序号', trigger: 'blur'},
          ],
          templateId: [
            { required: true, message: '请选择品类模板', trigger: 'blur'},
          ],
          note: [
            { required: true, message: '请输入备注信息', trigger: 'blur'},
          ], 
        }
      }
    },
    methods: {
      // 品类列表
    	getWareKindList () {
        let params = {

        }
    		readWareKind(params).then(res => {
    			console.log(res)
          if (res.data.code === '0001') {
            this.$message.success(res.data.message)
          } else {
            this.$message.error(res.data.message)
          }
    		}).catch(err => {
          console.log(err)
        })
    	},
      // 节点详情
    	nodeClick (data) {
        if (this.selectedKind.kindId === data.kindId) return;
        this.selectedKind = Object.assign({}, data)
    	},
      // 品类新增
      handleAdd () {
        this.addForm.parentId = -1;
        this.addForm.kindId = '';
        this.addFormVisible = true;
      },
      // 品类编辑
      handleEdit (store, data) {
        console.log(store, data)
        console.log(Object.assign({}, data))
        this.addForm = Object.assign({}, data);
        console.log(Object.assign({}, this.addForm))
        this.addFormVisible = true;
      },
      // 添加子品类
      handleAppend (store, data) {
        console.log(data)
        this.addForm.kindId = data.kindId
        this.addFormVisible = true
        // store.append({ id: id++, label: 'testtest', children: [] }, data)
      },
      // 保存提交
      onSubmit () {
        console.log(Object.assign({}, this.addForm))
        this.$refs.addForm.validate((valid) => {
          if (valid) {
            console.log('success')
          } else {
            console.log('err submit')
          }
        })
        // addKind(this.addForm).then(res => {
        //   console.log(res)
        //   this.$refs.addForm.resetFields()
        //   this.addFormVisible = false
        // })
      },
      // 品类删除
      handleRemove (store, data) {
        // store.remove(data)
        console.log(data.kindId)
        this.$confirm('确定删除该品类', '提示', {type: 'warning'}).then(() => {
          delKind({kindId: data.kindId}).then(res => {

          })
        }).catch(err => {
          console.log(err)
          this.$message('已取消操作')
        })
      }, 
      // 操作按钮
      renderContent (h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.handleAppend(store, data) }>添加下级</el-button>
              <el-button size="mini" on-click={ () => this.handleEdit(store, data) }>编辑</el-button>
              <el-button size="mini" on-click={ () => this.handleRemove(store, data) }>删除</el-button>
            </span>
          </span>
        )
      }
    },
    mounted () {
    	this.getWareKindList()
    }
  }
</script>
<style scoped>
  .kind-detail {
    min-height: 200px;
    padding: 15px;
    background: #fff;
  }
  .kind-detail p {
    margin: 10px 0
  }
</style>