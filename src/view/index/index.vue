<!-- 首页 -->
<template>
	<div class="index">
		<webTop ref="webTopRef" :paramThis="currentThis"/>
		<div class="left-nav" :class="{'close-nav':isCollapse}">
			<div class="logo-div" v-show="!isCollapse">
				LOGO
			</div>
			<div class="logo-div" :class="{'close-nav':isCollapse}" v-show="isCollapse">
				<div class="close-nav-logo"></div>
			</div>
			<div class="nav" :class="{'close-nav':isCollapse}">
				<el-menu
					@select="handleSelect"
					class="el-menu-vertical-demo"
					:class="{'close-nav':isCollapse}"
					style="width: 100%;height: calc(100vh - 60px);overflow-y: auto;"
					background-color="#24292e"
					text-color="#fff"
					active-text-color="#19c6ff"
					:default-active="activeIndex"
					router
					:collapse="isCollapse"
				>
					<NavMenu :navMenus="menuData"></NavMenu>
				</el-menu>
			</div>
		</div>
		<div class="web-container" :class="{'web-container-closed':isCollapse}">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import webTop from '@/components/webTop.vue';
import NavMenu from '@/components/NavMenu.vue';
export default {
	path: 'Index',
	components: {
		webTop,NavMenu,
	},
	data() {
		return {
			currentThis:this,
			isCollapse:true,
			text: '',
			activeIndex: '/organizationManage',
			sendData: [],
		};
	},
	created() {
		
	},
	mounted() {
		this.getNavMenus();
		this.activeIndex = this.$route.path;
	},
	methods: {
		handleSelect(key, keyPath) {
			console.log(key);
			console.log(keyPath);
		},
		getNavMenus(){
			this.isCollapse = false;
			this.menuData = [{
				"id": 1,
				"name": "/organizationManage",
				"label": "组织管理",
				"icon": "el-icon-message",
				"parentId": 0,
				"children": [{
					"id": 2,
					"name": "/organizationManage",
					"label": "组织管理",
					"icon": "el-icon-loading",
					"parentId": 1
				}, {
					"id": 3,
					"name": "/staffManage",
					"label": "员工管理",
					"icon": "el-icon-bell",
					"parentId": 1
				}, {
					"id": 4,
					"name": "/rolesManage",
					"label": "权限管理",
					"icon": "el-icon-edit",
					"parentId": 1
				}]
			}, {
				"id": 5,
				"name": "/customerCenter",
				"label": "用户中心",
				"icon": "el-icon-message",
				"parentId": 0,
				"children": [{
					"id": 6,
					"name": "/customerList",
					"label": "用户列表",
					"icon": "el-icon-loading",
					"parentId": 5
				}]
			}];
			// let _this = this;
			// _this.$ajax('post','/base/接口链接',{
				
			// })
			// .then(data => {
			// 	if (data.code == 200) {
			// 		this.menuData = data.data;
			// 		this.isCollapse = false;
			// 	}
			// }, err => {})
		},
	}
};
</script>

<style scoped>
.left-nav {width: 230px;height: calc(100vh);position: fixed;left: 0;top: 0;z-index: 10;}
.logo-div {width: 230px;height: 60px;text-align: center;background-color: #24292e;cursor: pointer;color: white;font-size: 30px;font-weight: bold;line-height: 60px;}
.logo-div img {height: 100%;}
.close-nav{width: 70px!important;transition: width .001s ease-in-out;}
.close-nav>>>.el-submenu__title .el-submenu__icon-arrow,.close-nav>>>.el-submenu__title span{display: none;}
.close-nav-logo{width: 100%;height: 100%;background: url('../../assets/img/small_logo_menu.jpg') no-repeat center center;background-size: 60%;}
.close-nav-logo:hover{background-color: rgb(0, 61, 82);}
.el-menu-vertical-demo:not(.el-menu--collapse) {width: 200px;min-height: 400px;}
.left-nav .nav .el-menu::-webkit-scrollbar{width: 10px;background-color: #24292e;position: relative;}
.left-nav .nav .el-menu::-webkit-scrollbar-thumb{border-radius: 10px;background-color: #969689;}
.web-container{position: absolute;top: 0;left: 0;width: 100%;height: 100%;padding-left: 230px;padding-top: 60px;background-color: #f1f1f1;}
.web-container-closed{padding-left: 70px;}
</style>
