<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style scoped="scoped">
  html,body{
    /*解决height100%无法生效问题  */
    height: 100%;
    margin:0;
    padding: 0;
  }
	#app{
		width: 100vw;
		height: 100vh;
		background-color: #f5f5f5;
	}
</style>
