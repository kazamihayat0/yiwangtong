<template>
  <div class="village-dv">
    <div class="top-dv"></div>
    <div class="container-dv">
      <div class="left-dv">
        <div class="left1 change-border-box content-box"></div>
        <div class="left2 change-border-box content-box"></div>
        <div class="left3 change-border-box content-box"></div>
        <div class="left4 change-border-box content-box"></div>
        <div class="left5 change-border-box content-box"></div>
        <div class="left6 change-border-box content-box"></div>
        <div class="left7 change-border-box content-box"></div>
        <div class="left8 change-border-box content-box"></div>
      </div>
      <div class="middle-dv">
        <div class="middle1 change-border-box content-box"></div>
        <div class="middle2 change-border-box content-box"></div>
        <div class="middle3 change-border-box content-box"></div>
      </div>
      <div class="right-dv">
        <div class="right1 change-border-box content-box"></div>
        <div class="right2 change-border-box content-box"></div>
        <div class="right3 change-border-box content-box"></div>
      </div>
    </div>
    <div class="footer-dv"></div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.change-border-box {
  border: 1px solid;
  border-image: linear-gradient(to right, #ffffff, #87c4fc) 1 10;
}
.content-box {
  box-sizing: border-box;
  padding: 5px;
}
.village-dv {
  background: url("/img/dataV/city1.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  height: 100%;
}
.top-dv {
  height: 30px;
}
.footer-dv {
  height: 5px;
}
.container-dv {
  height: calc(100% - 35px);
}
.left-dv {
  height: 100%;
  width: 25%;
  display: inline-block;
  .left1 {
    height: 5%;
  }
  .left2 {
    height: 5%;
  }
  .left3 {
    height: 10%;
  }
  .left4 {
    height: 18%;
  }
  .left5 {
    height: 18%;
  }
  .left6 {
    height: 21%;
  }
  .left7 {
    height: 18%;
  }
  .left8 {
    height: 5%;
  }
}
.middle-dv {
  height: 100%;
  width: 50%;
  display: inline-block;
  .middle1 {
    height: 10%;
  }
  .middle2 {
    height: 85%;
  }
  .middle3 {
    height: 5%;
  }
}
.right-dv {
  height: 100%;
  width: 25%;
  display: inline-block;
  .right1 {
    height: 5%;
  }
  .right2 {
    height: 40%;
  }
  .right3 {
    height: 55%;
  }
}
</style>