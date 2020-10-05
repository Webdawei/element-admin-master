<!-- 组织管理 -->
<template>
	<div class="container-body organization-manage">
		<div class="breadcrumb-div">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>组织管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-container">
			<div class="tree-div">
				<Trees
				  :treeData="treeData"
				  :treeTitle="treeTitle"
				  :refresh="refresh"
				  :showCheck="showCheck"
				  :delMsg="delMsg"
				  :showRender="showRender"
				  :defaultExpandAll="true"
				  :showAllBtn="false"
				  @changeShowTree="changeShowTree"
				  @clickNode="clickNode"
				  @getAdd="getAdd"
				  @getEdit="getEdit"
				  @getDel="getDel"
				/>
			</div>
			<div class="tree-right-detail">
				<div class="card-div">
					<p>{{ cardTitle }}</p>
					<div class="card-content">
						<el-form :model="formData" :rules="rules" ref="formDataRef" label-width="150px" class="demo-ruleForm" size="small">
							<el-form-item label="上级部门：">
								<span></span>
							</el-form-item>
							<el-form-item label="组织部门名称：" prop="name">
								<el-input v-model="formData.name" clearable></el-input>
							</el-form-item>
							<el-form-item label="组织描述：" prop="desc">
								<el-input type="textarea" v-model="formData.desc" rows="5"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary" @click="saveDepartment('ruleForm')" size="small">保存</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Trees from '@/components/elTree';
export default {
	name: 'organization-manage',
	components: {Trees,},
	data() {
		return {
			treeTitle: "组织架构",
			treeData: null,
			showTree: true,
			showCheck: false,
			showRender: true,
			refresh: false,
			
			cardTitle:'操作面板',
			formData:{
				name: '',
			},
			rules: {
				name: [
					{ required: true, message: '请输入活动名称', trigger: 'blur' },
					{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
				],
			}
		};
	},
	mounted() {},
	methods: {
		// 折叠tree宽度
		changeShowTree(type) {
		  this.showTree = type;
		},
		// 点击tree节点
		clickNode(data) {
		  this.currentPage = 1;
		  this.dptIds = data.id;
		  this.getPage();
		},
		// 获取当前层级添加
		getAdd(data) {
		  let _this = this;
		  _this.dialogId = data.id;
		  _this.dialogVisible = true;
		  _this.dialogTpye = "zjjg";
		  _this.zjjgLabel = "";
		  _this.dialogTitle = "组织架构 - " + data.label + " - 新增";
		  _this.zjjgOperate = "add";
		},
		// 获取当前层级编辑
		getEdit(data) {
		  let _this = this;
		  _this.dialogId = data.id;
		  _this.dialogVisible = true;
		  _this.dialogTpye = "zjjg";
		  _this.dialogTitle = "组织架构 - " + data.label + " - 编辑";
		  _this.zjjgOperate = "edit";
		},
		// 获取当前层级删除
		getDel(data) {
		  let _this = this;
		  _this.zjjgOperate = "";
		},
	}
};
</script>

<style scoped></style>
