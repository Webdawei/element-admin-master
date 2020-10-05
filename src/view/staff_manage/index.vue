<!-- 员工管理 -->
<template>
	<div class="container-body organization-manage">
		<div class="breadcrumb-div">
			<el-breadcrumb separator="/">
				<el-breadcrumb-item :to="{ path: '/' }">系统管理</el-breadcrumb-item>
				<el-breadcrumb-item>员工管理</el-breadcrumb-item>
			</el-breadcrumb>
		</div>
		<div class="page-container">
			<div class="search-form-div">
				<el-form :inline="true" :model="searchForm" class="demo-form-inline" size="small">
					<el-form-item label="">
						<el-input v-model="searchForm.name" placeholder="审批人"></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="onSubmit" size="small">查询</el-button>
						<el-button type="primary" @click="onSubmit" size="small">新增员工</el-button>
					</el-form-item>
				</el-form>
			</div>
			<div class="page-container-body">
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
					/>
				</div>
				<div class="tree-right-detail">
					<div class="card-div">
						<p>{{ cardTitle }}</p>
						<div class="card-content">
							<el-table :data="tableData" stripe style="width: 100%" size="small">
								<el-table-column type="index" :index="indexMethod" width="80" align="center" fixed="left"></el-table-column>
								<el-table-column prop="id" label="工号" width="100" align="left"></el-table-column>
								<el-table-column prop="name" label="姓名" width="180" align="left"></el-table-column>
								<el-table-column prop="gender" label="性别" align="left"></el-table-column>
								<el-table-column prop="phone" label="联系电话" align="left"></el-table-column>
								<el-table-column prop="entryTime" label="入职时间" align="left"></el-table-column>
								<el-table-column prop="state" label="员工状态" align="center">
									<template slot-scope="scope">
										<span>{{ scope.row.state == "Y" ? "有效" : "无效”" }}</span>
									</template>
								</el-table-column>
								<el-table-column label="操作" align="center" width="200" fixed="right">
									<template slot-scope="scope">
										<el-button @click="toogleExpand(scope.row,'look')" type="text" size="mini">修改密码</el-button>
										<el-button @click="toogleExpand(scope.row,'look')" type="text" size="mini">重置密码</el-button>
										<el-button @click="toogleExpand(scope.row,'look')" type="text" size="mini">设置权限</el-button>
									</template>
								</el-table-column>
							</el-table>
							<el-pagination
							  @size-change="handleSizeChange"
							  @current-change="handleCurrentChange"
							  :current-page="currentPage"
							  :page-sizes="[10, 20, 30, 40]"
							  :page-size="showCount"
							  layout="total, sizes, prev, pager, next, jumper"
							  :total="totalResult"
							  align="right">
							</el-pagination>
						</div>
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
			
			searchForm:{
				name:'',
			},
			currentPage:1,
			showCount:10,
			totalResult:10,
			tableData: [{
				id: "0001",
				name: "阿斯顿",
				gender: "女",
				phone: "13502010211",
				entryTime: "20170509",
				state: "Y"
			},{
				id: "0001",
				name: "阿斯顿",
				gender: "女",
				phone: "13502010211",
				entryTime: "20170509",
				state: "Y"
			},{
				id: "0001",
				name: "阿斯顿",
				gender: "女",
				phone: "13502010211",
				entryTime: "20170509",
				state: "Y"
			},{
				id: "0001",
				name: "阿斯顿",
				gender: "女",
				phone: "13502010211",
				entryTime: "20170509",
				state: "Y"
			},]
		};
	},
	mounted() {},
	methods: {
		// 表格索引
		indexMethod(index) {
			return index + (this.currentPage - 1) * this.showCount + 1;
		},
		// 切换showCount
		handleSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		// 切换currentPage
		handleCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
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
		
	}
};
</script>

<style scoped></style>
