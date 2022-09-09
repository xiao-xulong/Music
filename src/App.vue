<template>
  <div id="app">

    <router-view />

  </div>
</template>

<style lang="less">
@import "assets/css/normalize.css";
@import "assets/css/base.css";

.van-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
