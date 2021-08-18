<template>
  <div>
    <van-field
      required
      readonly
      clickable
      :value="value"
      :label="label"
      :placeholder="placeholder"
      @click="showPicker = true"
    />

    <van-popup
      v-model="showPicker"
      position="bottom"
      @close="closeSchoolPicker"
    >
      <van-picker
        value-key="className"
        show-toolbar
        :columns="columns1"
        @confirm="onConfirm"
        @cancel="showPicker = false"
        :default-index="1"
      />
    </van-popup>
  </div>
</template>

<script>
import { getMeetingList } from "@/api/dailyOffice/partyMeeting";

export default {
  props: {
    label: {
      type: String,
    },
    placeholder: {
      type: String,
    },
  },
  data() {
    return {
      showPicker: false,
      value: "",
      strSearch: "",
      columns1: [],
      columns2: [],
      remoteColumns: [],
    };
  },
  mounted() {
    getMeetingList().then((res) => {
      this.remoteColumns = res.data.data;
      this.remoteColumns.forEach((el) => {
        this.columns1.push(el.meetTitle + "-" + el.startTime);
        this.columns2.push(el.id);
      });
    });
  },

  methods: {
    closeSchoolPicker() {
      console.log("关闭");
      this.strSearch = "";
    },
    getData() {
      this.$emit("inputChange", this.strSearch);
    },

    onConfirm(value, index) {
      this.value = value;
      this.$emit("onConfirm", this.remoteColumns[index]);
      this.showPicker = false;
    },
  },
};
</script>

<style scoped>
</style>
