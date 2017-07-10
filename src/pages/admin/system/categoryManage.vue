<template>
	<section>
    <el-row class="m-b">
      <el-button type="primary" @click="newKind">新建品类</el-button>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-tree
          :data="data2"
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
        <div class="detail">品类详情</div>
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
        <el-form-item label="品类模板" >
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
      <el-form :model="addForm" ref="addForm" label-width="120px" style="padding: 30px" v-loading="addLoading">
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
            <el-option label="模板一" value="2001"></el-option>
            <el-option label="模板二" value="2002"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.native="addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click.native="addSubmit">确 定</el-button>
      </div>
    </el-dialog>
	</section>
</template>
<script>
import { getKindList, addKind, delKind } from '../../../api'
  let id = 1000;
  export default {
    data() {
      return {
        data2: [],
        editForm: {},
        defaultProps: {
          children: 'children',
          label: 'kindName'
        },
        editFormVisible: false,
        editLoading: false,

        addForm: {
          kindId: '',
          kindName: '',
          kindDesc: '',
          sortId: '',
          templateId: ''
        },
        addFormVisible: false,
        addLoading: false,
      }
    },
    methods: {
    	getWareLists () {
    		getKindList().then(res => {
    			console.log(res)
          this.data2 = res.data.KindList
    		})
    	},
    	nodeClick (e) {
        console.log('click')
    	},
      // 显示编辑
      edit (store, data) {
        this.editFormVisible = true
        this.editForm = data
        console.log(data)
      },
      // 显示新建
      newKind () {
        this.addFormVisible = true
        this.addForm.kindId = ''
      },
      // 添加品类
      addSubmit () {
        console.log(this.addForm)
        addKind(this.addForm).then(res => {
          console.log(res)
          this.$refs.addForm.resetFields()
          this.addFormVisible = false
        })
      },
      append(store, data) {
      	console.log(data)
        this.addForm.kindId = data.kindId
        this.addFormVisible = true
        // store.append({ id: id++, label: 'testtest', children: [] }, data)
      },

      remove(store, data) {
        store.remove(data)
        console.log(data.kindId)
        delKind({kindId: data.kindId}).then(res => {

        })
      }, 
      renderContent(h, { node, data, store }) {
        return (
          <span>
            <span>
              <span>{node.label}</span>
            </span>
            <span style="float: right; margin-right: 20px">
              <el-button size="mini" on-click={ () => this.append(store, data) }>添加下级</el-button>
              <el-button size="mini" on-click={ () => this.edit(store, data) }>编辑</el-button>
              <el-button size="mini" on-click={ () => this.remove(store, data) }>删除</el-button>
            </span>
          </span>
        )
      }
    },
    mounted () {
    	this.getWareLists()
    }
  }
</script>
<style scoped>
  .detail {
    min-height: 200px;
    padding: 15px;
    background: #fff;
  }
</style>