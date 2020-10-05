<template>
  <div class="el-tree-div" :class="{'show-tree':showTree,'hide-tree':!showTree}">
    <div class="el-tree-top">
      <div class="el-tree-title">
        <span v-show="showTree">{{treeTitle}}</span>
        <el-link type="primary" :underline="false" class="inline-block refresh-tree" v-show="showTree&&refresh" @click="clickFresh">
          <svg-icon icon-class="refresh"/>刷新</el-link>
      </div>
      <svg-icon class="inline-block change-nav-i show-tree-icon" :icon-class="showTree?'put':'open'" @click.native="changeShowTree"/>
    </div>
    <div class="el-tree-content" v-show="showTree">
      <el-input placeholder="输入关键字进行过滤" v-model.trim="filterText" clearable size="small"></el-input>
      <div class="tree-body" :class="{'can-add-first-node':canAddFirstNode}">
        <el-tree
          :class="{'tree-no-data':!treeData}"
          ref="tree"
          :data="treeData"
          :show-checkbox="showCheck"
          :check-strictly="checkStrictly"
          :default-expand-all="defaultExpandAll"
          :expand-on-click-node="false"
          highlight-current
          @node-click="handleNodeClick"
          @check-change="handleCheckChange"
          node-key="id"
          :default-expanded-keys="[]"
          :default-checked-keys="[]"
          :filter-node-method="filterNode"
          :props="treeProps"
          :render-content="showRender?renderContent:''">
        </el-tree>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'el-tree-div',
  props:['treeData','treeTitle','showRender','refresh','delMsg','showCheck','checkStrictly','defaultExpandAll','showAllBtn','canAddFirstNode'],
  components: {},
  data() {
    return {
      showTree:true,
      filterText: '',
      treeProps: {
        children: 'children',
        label: 'label'
      },
    };
  },
  created() {

  },
  mounted() {
    this.filterText = '';
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // check点击
    handleCheckChange(data) {
      this.$emit("checkNode",data,this.$refs.tree.getCheckedNodes());
    },
    // 点击节点
    handleNodeClick(data) {
      this.$emit("clickNode",data);
    },
    // 返回选中节点数据
    getCheckedNodes() {
      this.$emit("getCheckedNodes",this.$refs.tree.getCheckedNodes());
    },
    // 返回选中节点key数组
    getCheckedKeys() {
      this.$emit("getCheckedKeys",this.$refs.tree.getCheckedKeys());
    },
    // 通过node节点渲染选中的元素
    setCheckedNodes(nodes) {
      this.$refs.tree.setCheckedNodes(nodes);
    },
    // 通过id数组渲染选中的元素
    setCheckedKeys(arr) {
      this.$refs.tree.setCheckedKeys(arr);
    },
    // 移除tree中选中的元素
    delTreeCheck(id){
      let getCheckedKeys = this.$refs.tree.getCheckedKeys();
      for(var i in getCheckedKeys){
        if(getCheckedKeys[i] == id){
          getCheckedKeys.splice(i,1);
        }
      }
      this.setCheckedKeys(getCheckedKeys);
    },
    // 折叠展开tree
    changeShowTree(){
      if(this.showTree){
        this.$emit("changeShowTree",false);
      }else{
        this.$emit("changeShowTree",true);
      }
      this.showTree = !this.showTree;
    },
    // 渲染树形图自定义插件
    renderContent: function(h, data) {
    	let _this = this;
    	return h('span', {}, [
    		h('span', data.data.label),
    		h("el-link", {
    			class: 'article-classify-add',
    			props: {
    				type: 'info'
    			},
    			title: '添加',
    			on: {
    				click: function(event) {
              event.stopPropagation();
              _this.$emit("getAdd",data.data);
    					// _this.articleClassifyAdd(event,data.data);
    				},
    			}
    		}, ''),
    		h("el-link", {
    			class: 'article-classify-edit',
    			props: {
    				type: 'primary'
    			},
    			title: '编辑',
    			on: {
    				click: function(event) {
              event.stopPropagation();
              _this.$emit("getEdit",data.data);
    					// _this.articleClassifyEdit(event,data.data);
    				},
    			}
    		}, ''),
    		h("el-link", {
    			class: data.data.parentId != "0" || this.showAllBtn ? 'article-classify-del' : '',
    			props: {
    				type: 'danger'
    			},
    			title: '删除',
    			on: {
    				click: function(event) {
              event.stopPropagation();
              if(data.data.parentId == "0" && !_this.showAllBtn){
                _this.$warning("主企业不能删除!");
                return;
              }
              if(!_this.delMsg){
                _this.delMsg = "删除后不可恢复,请确认后删除!";
              }
              _this.$confirm(_this.delMsg, '提示', {
              	confirmButtonText: '确定',
              	cancelButtonText: '取消',
              	type: 'warning'
              }).then(() => {
                _this.$emit("getDel",data.data);
              }).catch(() => {});
    					// _this.articleClassifyDel(event,data.data);
    				},
    			}
    		}, ''),
    	])
    },
    // 点击刷新按钮
    clickFresh(){
      this.filterText = '';
      this.$emit("clickFresh");
    },
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  }
};
</script>

<style scoped>
.el-tree-div{border: 1px solid #E4E4E4;background-color: white;height: auto;}
.el-tree-top{padding-left: 16px;line-height: 40px;height: 40px;border-bottom: 1px solid #E4E4E4;background-color: #E8F4FF;position: relative;}
.refresh-tree{margin-left:12px; line-height: 40px;}
.refresh-tree .svg-icon {vertical-align: -0.1em; margin-right:4px;}
.el-tree-title{font-size: 14px;font-weight: 700;}
.show-tree-icon{position: absolute;right: 8px; color: #54595c; top: 16px; width: 20px; height: 15px;margin: 0;font-size: 20px;cursor: pointer;}
.el-tree-content{padding: 10px;}
.tree-body{margin-top: 10px;height: auto;overflow: auto;padding-right: 20px;}
.tree-body .el-tree{width: fit-content;font-size: 12px;min-width: max-content;}
.tree-body /deep/ .el-tree__empty-block{width: 358px;}
.tree-no-data{width: 100%!important;}
.hide-tree .el-tree-top{height: 500px;}
.hide-tree .show-tree-icon{right: 5px;}
.tree-body /deep/ .article-classify-add {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  background-color: #409eff;
  margin-left: 20px;
  border-radius: 3px;
  background: url(../assets/img/add-icon.png) no-repeat center center;
  background-size: 100%;
}
.tree-body /deep/ .article-classify-edit {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  background-color: #409eff;
  margin-left: 5px;
  border-radius: 3px;
  background: url(../assets/img/edit-icon.png) no-repeat center center;
  background-size: 100%;
}
.tree-body /deep/ .article-classify-del {
  display: inline-block;
  width: 15px;
  height: 15px;
  vertical-align: middle;
  background-color: #f56c6c;
  margin-left: 5px;
  border-radius: 3px;
  background: url(../assets/img/del-icon.png) no-repeat center center;
  background-size: 100%;
}
.can-add-first-node /deep/ .el-tree-node:nth-last-child(2) .el-link{display: none;}
.can-add-first-node /deep/ .el-tree-node:nth-last-child(2)>div>span>span{display: inline-block;width: 200px;text-align: center;color: #0994DC;}

.el-tree-content /deep/ .el-link{opacity: 0;}
.el-tree-content /deep/ .el-link:last-child{margin-right: 60px;}
.el-tree-content /deep/ .el-tree-node__content:hover .el-link{opacity: 1;}

.el-tree--highlight-current{width: 100% !important;}





</style>
