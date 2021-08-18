<template>
  <div class="city-list">
    <el-input placeholder="输入关键字进行过滤" v-model="filterText"> </el-input>
    <div class="city-list-tree">
      <el-tree
        class="filter-tree"
        :data="treeData"
        :props="defaultProps"
        default-expand-all
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree"
        @node-click="nodeClick"
      >
      </el-tree>
    </div>
  </div>
</template>

<script>
import { getAreaTree } from "@/api/common/index";
export default {
  data() {
    return {
      treeData: [],
      defaultProps: {
        children: "children",
        label: "name",
      },
      filterText: "",
    };
  },
  watch: {
    filterText(val) {
      console.log(val);
      this.$refs.tree.filter(val);
    },
  },
  mounted() {
    this.getAreaTree();
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      console.log(value);
      console.log(data);
      return data.name.indexOf(value) !== -1;
    },
    /**
     * @name: 树点击事件
     * @msg:
     * @param {*} data
     * @return {*}
     */
    nodeClick(data) {
      console.log(data);
      this.$emit("areaCode", data.code,data.areaLevel);
    },
    /**
     * @name: 获取树数据
     * @msg:
     * @param {*}
     * @return {*}
     */
    getAreaTree() {
      getAreaTree().then((res) => {
        this.treeData = res.data.data;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.city-list {
  height: 100%;
  .city-list-tree {
    height: calc(100% - 50px);
    margin-top: 10px;
    overflow-y: auto;
  }
}
</style>
