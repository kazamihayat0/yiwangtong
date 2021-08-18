<template>
  <div style="height: 100%">
    <div class="top-title">
      <span>村干部信息</span>
      <!-- <div class="radio-box">
        <el-radio-group v-model="type" @change="radioChange">
          <el-radio :label="1" class="radio-border">党组织</el-radio>
          <el-radio :label="2">村委会</el-radio>
        </el-radio-group>
      </div> -->
    </div>
    <div class="content-img">
      <div class="block" v-for="item in cadreInfo" :key="item.id">
        <router-link
          :to="{ path: '/village/editUser', query: { id: item.id } }"
        >
          <el-image
            style="height: calc(100% - 53px); width: 80%"
            :src="item.avatar"
            fit="contain"
            :preview-src-list="[item.avatar]"
          >
            <div slot="error" class="image-slot" style="height: 100%">
              <img
                src="/img/暂无照片.png"
                alt=""
                height="100%"
                style="object-fit: contain"
              />
            </div>
          </el-image>
          <div class="demonstration">
            <span>{{ item.postStr }}</span>
            <span>{{ item.name }}</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="footer-pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="total"
        page-size="9"
        :current-page="current"
        @current-change="currentChange"
        @prev-click="currentChange"
        @next-click="currentChange"
        small
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cadreInfoArray: {
      type: Object,
    },
  },
  data() {
    return {
      cadreInfo: [],
      current: 1,
      total: 0,
      type: 0,
    };
  },
  watch: {
    cadreInfoArray: function (newVal) {
      if (newVal !== null) {
        this.cadreInfo = newVal.records;
        this.current = newVal.current;
        this.total = newVal.total;
      }
    },
  },
  methods: {
    currentChange(current) {
      this.current = current;
      this.paramsChange();
    },
    radioChange() {
      this.paramsChange();
    },
    paramsChange() {
      this.$emit("cadreParamsChange", {
        current: this.current,
        type: this.type,
      });
    },
  },
};
</script>
<style lang="scss">
.radio-box {
  float: right;
  .el-radio__input {
    display: none;
  }
  .el-radio {
    margin-right: 0px;
  }
  .el-radio__label {
    padding: 0px 3px;
    color: #fff;
  }
  .radio-border {
    border-right: 1px solid #fff;
  }
}
</style>

<style lang="scss" scoped>
.content-img {
  height: calc(100% - 64px);
}
.img-box {
  width: 100%;
  height: calc(100% - 48px);
  padding: 5px;
}
.block {
  text-align: center;
  display: inline-block;
  width: 33.33%;
  height: 33.33%;
  box-sizing: border-box;
  vertical-align: top;
}
.demonstration {
  color: #87c4fc;
  font-size: 12px;
  margin: 0px auto;
  margin-bottom: 5px;
  span {
    display: block;
  }
}
.footer-pagination {
  text-align: center;
  height: 30px;
}
</style>