<template>
	<section>
    <!-- 工具栏 -->
    <el-row class="toolbar">
      <el-button v-if="kindList.length === 0" type="primary" @click="handleAdd">创建品类</el-button>
    </el-row>
    <!-- 品类列表 -->
    <el-row>
      <el-tree
        :data="kindList"
        :props="defaultProps"
        node-key="id"
        ref="tree"
        highlight-current
        @node-click="nodeClick"
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
        v-loading="loading">
      </el-tree>
    </el-row>
    <!-- 品类表单 -->
    <el-dialog :title="kindFormTitle" :visible.sync="kindFormVisible">
      <el-row>
        <el-col :span="16" :offset="4">
          <el-form :model="kindForm" ref="kindForm" :rules="rules" label-width="120px">
            <el-form-item label="品类名称" prop="kindName">
              <el-input v-model="kindForm.kindName" placeholder="输入品牌名称"></el-input>
            </el-form-item>
            <el-form-item label="品类编号" prop="kindCode">
              <el-input v-model="kindForm.kindCode" placeholder="旅游以T开头，拍摄以P开头"></el-input>
            </el-form-item>
            <el-form-item label="品类描述" prop="kindDesc">
              <el-input type="textarea" v-model="kindForm.kindDesc" placeholder="品类描述"></el-input>
            </el-form-item>
            <el-form-item label="同级序号" prop="sortId">
              <el-input v-model.number="kindForm.sortId" placeholder="同级序号"></el-input>
            </el-form-item>
            <el-form-item label="品类模板" >
              <el-select v-model="kindForm.templetId" placeholder="品类模板" style="width: 100%">
                <el-option v-for="item in templateList" :key="item.templateId"  :label="item.templateName" :value="item.templateId"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="note">
              <el-input type="textarea" v-model="kindForm.note" placeholder="备注"></el-input>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="kindFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 模板列表 -->
    <!-- <el-dialog title="属性模板" :visible.sync="templateVisible">
      <el-row>
        <el-col :span="22" :offset="1">
          <el-table 
            border
            max-height="350"
            style="width: 100%"
            v-loading="loading" 
            :data="templateList">
            <el-table-column width="80" label="选择" align="center">
              <template scope="scope">
                <el-radio class="radio no-input" v-model="templateId" :label="scope.row.templateId">
                  <i v-if="scope.row.templateId === templateId" class="fa fa-check-square"></i>
                  <i v-else class="fa fa-square-o"></i>
                </el-radio>
              </template>
            </el-table-column>
            <el-table-column prop="templateName" label="模板名称"></el-table-column>
            <el-table-column prop="htmlName" label="对应页面"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
      <div slot="footer">
        <el-button @click="templateVisible = false">取消</el-button>
        <el-button type="primary" @click="bindTemplate">确定</el-button>
      </div>
    </el-dialog> -->
	</section>
</template>
<script>
  import { readTemplateList, readWareKind, saveWareKind, deleteWareKind } from '@/api'
  export default {
    data() {
      return {
        kindList: [{
          kindId: 10001,
          kindName: '一级 1',
          templetId: 10001,
          children: [{
            kindId: 20001,
            kindName: '二级 1-1',
            templetId: 10002,
            children: [{
              kindId: 30001,
              kindName: '三级 1-1-1',
              templetId: 10003,
            }]
          }]
        }],
        templateList: [
          {
            templateId: 10001,
            templateName: '模板1',
            htmlName: '模板页面1',
            createTime: new Date(),
            status: 1,
            attributeList: []
          },
          {
            templateId: 10002,
            templateName: '模板2',
            htmlName: '模板页面1',
            createTime: new Date(),
            status: 1,
            attributeList: []
          },
          {
            templateId: 10003,
            templateName: '模板3',
            htmlName: '模板页面1',
            createTime: new Date(),
            status: 1,
            attributeList: []
          },
          {
            templateId: 10004,
            templateName: '模板4',
            htmlName: '模板页面1',
            createTime: new Date(),
            status: 1,
            attributeList: []
          },
        ],
        defaultProps: {
          children: 'children',
          label: 'kindName'
        },
        kindFormVisible: false,
        kindFormTitle: '新增品类',
        kindForm: {
          kindId: 0,
          parentId: 0,
          kindName: '',
          kindCode: '',
          kindDesc: '',
          sortId: 1,
          templetId: '',
          note: ''
        },
        rules: {
          kindName: [
            { required: true, message: '请输入品类名称', trigger: 'blur'},
          ],
          kindCode: [
            { required: true, message: '请输入品类编号', trigger: 'blur'},
          ],
          kindDesc: [
            { required: true, message: '请输入品类描述', trigger: 'blur'},
          ],
          sortId: [
            { type: 'number', required: true, message: '请输入同级序号', trigger: 'blur'},
          ],
          templateId: [
            { required: true, message: '请选择品类模板', trigger: 'blur'},
          ],
          note: [
            { required: true, message: '请输入备注信息', trigger: 'blur'},
          ], 
        },
        loading: false,
        templateVisible: false,
        templateId: '',
        selectedKindId: '',
      }
    },
    methods: {
      // 品类列表
    	getWareKindList () {
        this.loading = true
        let params = {}
    		readWareKind(params).then(res => {
    			console.log(res)
          if (res.data.code === '0001') {
            this.$message.success(res.data.message)
            this.kindList = res.data.result.wareKindList;
          } else {
            this.$message.error(res.data.message)
          }
          this.loading = false
    		}).catch(err => {
          this.loading = false
          console.log(err)
          this.$catchError(err)
        })
    	},
      // 获取属性模板列表
      getTemplateList() {
        let params = {}
        readTemplateList(params).then(res => {
          console.log(res)
          if(res.data.code === '0001') {
            this.templateList = res.data.result.templateList;
          } else {
            this.$message.error(res.data.message)
          }
        }).catch(err => {
          console.log(err)
          this.$catchError(err)
        })
      },
      // 节点详情
    	nodeClick (data) {
        console.log(data)
    	},
      // 品类新增
      handleAdd () {
        this.kindFormTitle = '品类创建';
        this.kindForm.parentId = 0;
        this.kindForm.kindId = 0;
        this.kindFormVisible = true;
      },
      // 品类编辑
      handleEdit (store, data) {
        this.kindFormTitle = '品类编辑';
        this.kindForm = {
          kindId: data.kindId,
          kindName: data.kindName,
          kindCode: data.kindCode,
          kindDesc: data.kindDesc,
          sortId: data.sortId,
          templetId: data.templetId,
          note: data.note
        }
        console.log(this.kindForm)
        this.kindFormVisible = true;
      },
      // 添加子品类
      handleAppend (store, data) {
        this.kindFormTitle = '新增下级品类';
        this.kindForm = {
          parentId: data.kindId,
          kindId: 0,
          kindName: '',
          kindCode: '',
          kindDesc: '',
          sortId: 1,
          templetId: '',
          note: ''
        }
        this.kindFormVisible = true;
        // store.append({ id: id++, label: 'testtest', children: [] }, data)
      },
      // 保存提交
      onSubmit () {
        let data = Object.assign({}, this.kindForm)
        console.log(data)
        this.$refs.kindForm.validate((valid) => {
          if (valid) {
            saveWareKind(data).then(res => {
              console.log(res)
              if(res.data.code === '0001') {
                this.$message.success(res.data.message)
                this.getWareKindList()
              } else {
                this.$message.error(res.data.message)
              }
            }).catch(err => {
              console.log(err)
              this.$catchError(err)
            })
            this.kindFormVisible = false
          } else {
            console.log('err submit')
          }
        })
      },
      templateSet(store, data) {
        console.log(store, data)
        this.selectedKindId = data.kindId;
        this.templateVisible = true
      },
      bindTemplate() {
        if(!this.templateId) {
          this.$notify({
            title: '提示',
            type: 'warning',
            message: '请选择属性模板'
          })
        } else {
          let data = {
            kindId: this.selectedKindId,
            templateId: this.templateId
          }
          console.log(data)
        }
      },
      // 品类删除
      handleRemove (store, data) {
        console.log(data)
        if(data.children.length !== 0) {
          this.$notify({
            type: 'warning',
            title: '提示',
            message: '有下级品类，不可删除'
          })
          return;
        }
        let wareKindId = data.kindId;
        this.$confirm('确定删除该品类', '提示', {type: 'warning'}).then(() => {
          let data = {
            wareKindId: wareKindId
          }
          deleteWareKind(data).then(res => {
            console.log(res)
            if(res.data.code === '0001') {
              this.$message.success(res.data.message)
              this.getWareKindList();
            } else {
              this.$message.error(res.data.message)
            }
          }).catch(err => {
            console.log(err)
            this.$catchError(err)
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
              <el-button size="mini" type="success" on-click={ () => this.handleAppend(store, data) }>添加下级</el-button>
              <el-button size="mini" type="warning" on-click={ () => this.handleEdit(store, data) }>编辑</el-button>
              <el-button size="mini" type="danger" on-click={ () => this.handleRemove(store, data) }>删除</el-button>
            </span>
          </span>
        )
      }
    },
    mounted () {
    	this.getWareKindList()
      this.getTemplateList()
    }
  }
</script>
<style scoped lang="scss">
  .radio.no-input {
    .el-radio__input {
      display: none
    }
  }
  .kind-detail {
    min-height: 200px;
    padding: 15px;
    background: #fff;
    p {
      margin: 10px 0
    }
  }
  .el-radio {
    span {
      display: none
    }
  }
  .radio .fa {
    font-size: 20px;
    color: #ddd;
  }
  .radio .fa-check-square {
    color: #20a0ff
  }
</style>