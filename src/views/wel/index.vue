<template>
  <div></div>
  <!-- <city-index></city-index> -->
</template>

<script>
import { mapGetters } from "vuex";
import cityIndex from "../core/homePage/cityIndex.vue";

export default {
  components: { cityIndex },
  name: "wel",
  data() {
    return {
      activeNames: ["1", "2", "3", "5"],
      logActiveNames: ["22"],
    };
  },
  computed: {
    ...mapGetters(["userInfo"]),
  },
  methods: {
    handleChange(val) {
      window.console.log(val);
    },
  },
};
</script>

<style>
.el-font-size {
  font-size: 14px;
}
</style>

