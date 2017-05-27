<template>
	<header class="header transition" :class="{'spread': sidebarStatus}">
		<div class="container-fluid">
			<div class="pull-left">
				<el-button type="primary" class="btn-toggle" @click="toggleSidebar"><i class="fa fa-bars"></i></el-button>
			</div>
			<div class="pull-right">
				<div class="provider-name">
					<span>欢迎您：北京鸿基国际旅行社有限责任公司第一分公司</span>
				</div>
				<el-dropdown :hide-on-click="false" trigger="click" class="pull-right">
				  <span class="el-dropdown-link">
				  	<img src="../assets/img/logo.png" class="avatar"/>
				    <span class="username ellipsis">{{ user.mobile }}</span>
				    <i class="el-icon-caret-bottom el-icon--right"></i>
				  </span>
				  <el-dropdown-menu slot="dropdown">
				    <el-dropdown-item @click.native="" disabled>公告</el-dropdown-item>
				    <el-dropdown-item @click.native="" disabled>修改密码</el-dropdown-item>
				    <el-dropdown-item @click.native="" disabled>咨询及通知</el-dropdown-item>
				    <el-dropdown-item @click.native=""><router-link :to="home">主页</router-link></el-dropdown-item>
						<el-dropdown-item divided><a @click="logout">退出</a></el-dropdown-item>
				  </el-dropdown-menu>
				</el-dropdown>
			</div>
		</div>
	</header>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import { requestExit } from '../api'
import utils from '@/assets/js/utils'
export default {
	data () {
		return {
			home: '/account/home',
		}
	},
  methods: {
  	...mapActions([
  		'toggleSidebar'
  	]),
    logout () {
    	this.$confirm('确定退出系统?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      	let data = {
      		customerSessionId: localStorage.getItem('sessionId')
      	}
      	requestExit(data).then(res => {
      		console.log(res)
      		this.$router.push('/login')
      		if(res.data.code === 0) {
      			this.$message({
		          type: 'success',
		          message: '已退出'
		        })
      		} else {
      			this.$message({
		          type: 'error',
		          message: res.data.message
		        })
      		}
      	})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });          
      })
    }
  },
  computed: {
	  ...mapGetters([
  		'sidebarStatus',
  		'user'
  	])
  },
  mounted () {
  }
}
</script>
<style scoped lang="scss">
	.header {
		position: fixed;
		top: 0;
		left: 240px;
		right: 0;
		z-index: 999;
		background: #fff;
		box-shadow: 0 0 1px rgba(0,0,0,0.25);
		&.spread {
			left: 0;
		}
	}
	.el-menu {
		border-radius: 0;
		background-color: rgba(255,255,255,.95);
	}
	.provider-name {
		float: left;
		height: 60px;
		padding: 0 15px;
		line-height: 60px;
		font-size: 16px;
		font-weight: bold;
		color: #1380E2
	}
	.avatar {
		width: 20px;
		height: 20px;
		vertical-align: middle
	}
	.el-dropdown {
		min-width: 150px;
		height: 60px;
		line-height: 60px;
		overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	}
	.el-dropdown-link {
		padding: 10px;
		border-radius: 4px;
    border: 1px solid #f0f0f8;
	}
	.el-dropdown-menu {
		width: 150px;
		a {
			display: block
		}
	}
	.btn-toggle {
		margin: 12px 5px;
	}
</style>
