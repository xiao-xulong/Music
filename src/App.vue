<template>
  <div id="app">
    <keep-alive include="recommended,hot_music">
      <router-view />
    </keep-alive>
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
