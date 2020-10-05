<!--  -->
<template>
	<div class="web-top" :class="{'web-top-close-nav':isCollapse}">
		<i class="open-close-nav" :class="{'el-icon-s-fold':!isCollapse,'el-icon-s-unfold':isCollapse}" @click="openCloseNav"></i>
	</div>
</template>

<script>
export default {
	props:{
		paramThis:{
			type:Object,
			default:null,
		},
	},
	name: 'web-top',
	components: {},
	data() {
		return {
			isCollapse:false,
		};
	},
	mounted() {},
	methods: {
		// 展开收起按钮
		openCloseNav(){
			this.isCollapse = !this.isCollapse;
			this.paramThis.isCollapse = this.isCollapse;
		},
	}
};
</script>

<style scoped>
.web-top{width: 100%;height: 60px;line-height: 60px;background-color: #fff;box-shadow: 0 0 10px #c1c1c1;position: fixed;top: 0;left: 0;z-index: 5;padding-left: 230px;display: block;}
.open-close-nav{font-size: 30px;cursor: pointer;vertical-align: middle;margin-left: 10px;}
.web-top-close-nav{padding-left: 70px!important;transition: width .001s ease-in-out;}
</style>
