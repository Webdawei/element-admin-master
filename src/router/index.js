import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			component: resolve => require(['@/view/index/index'], resolve),
			meta: {
				title: '首页'
			},
			redirect: to => {
			  return '/organizationManage'
			},
			children:[
				{
					path: '/organizationManage',
					component: resolve => require(['@/view/organization_manage/index'], resolve),
					meta: {
						title: '组织管理'
					},
				},
				{
					path: '/staffManage',
					component: resolve => require(['@/view/staff_manage/index'], resolve),
					meta: {
						title: '员工管理'
					},
				},
			],
		},
	]
})
