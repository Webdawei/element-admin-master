<template>
	<div class="navMenu">
		<div v-for="navMenu in navMenus">
			<!-- 最后一级菜单 -->
			<el-menu-item v-if="!navMenu.children && navMenu" :key="navMenu.id" :data="navMenu" :index="navMenu.name">
				<i :class="navMenu.icon"></i>
				<span slot="title">{{ navMenu.label }}</span>
			</el-menu-item>

			<!-- 此菜单下还有子菜单 -->
			<el-submenu v-if="navMenu.children && navMenu" :key="navMenu.id" :data="navMenu" :index="navMenu.name">
				<div slot="title">
					<i :class="navMenu.icon"></i>
					<span>{{ navMenu.label }}</span>
				</div>
				<!-- 递归 -->
				<NavMenu :navMenus="navMenu.children"></NavMenu>
			</el-submenu>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NavMenu',
	props: ['navMenus'],
	data() {
		return {
			
		};
	},
	mounted() {
		
	},
	methods: {}
};
</script>

<style scoped>

</style>
