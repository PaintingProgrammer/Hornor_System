<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
  export default {
    name: "App",
    watch :{
      $route(to,from){
        if(to.path != '/login') {
          let obj = {
            name: to.name,
            title: to.meta.title
          }
          this.$store.commit("addTab",obj)
        }
      }
    }
  }
</script>

<style>
html,body,#app{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
  height:100%;
  font-size: 15px;
  box-sizing: border-box;
}
</style>
