<template>
	<div id="layout">
		<AsideComp></AsideComp>
    <HeaderComp></HeaderComp>
    <keep-alive>
      <MainComp></MainComp>
    </keep-alive>
	</div>
</template>
<script>
import AsideComp from './Aside'
import HeaderComp from './Header'
import MainComp from './Main'
import { getCustomerUserInfo, getPermissionList } from '../api'
export default {
  name: 'layout',
  components: {
    AsideComp,
    HeaderComp,
    MainComp
  },
  methods: {
    getMenu () {
      getPermissionList().then(res => {
        let permissionList = res.data.permissionList
        this.$store.dispatch('saveUserPermission', permissionList)
      })
    },
    getUserInfo () {
      let data = {
        customerSessionId: localStorage.getItem('sessionId')
      }
      getCustomerUserInfo(data).then(res => {
        console.log(res)
        if(res.data.code === 999) {
          this.$message({
            message: res.data.message
          })
          return this.$router.push('/login')
        }
        if (res.data.code === 0) {
          this.$store.dispatch('saveUser', res.data.result)
        } else {
          this.$message({
            message: res.data.message
          })
        }
      })
      .catch(function (error) {
        console.log(error)
      })
    }
  },
  mounted () {
   // this.getUserInfo()
   // this.getMenu()
  }
}
</script>
