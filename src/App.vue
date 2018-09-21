<template>
  <div id="app">
    <div class="container-fluid">
      <Search title="iTunes Music Search" button="Go!" />
    </div>
  </div>
</template>

<script>
import Search from './components/Search.vue'

export default {
  components: {
    Search
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
  margin-top: 60px;
}
h1 {
  font-size: 3em;
  text-align: center;
  font-weight: 800;
  color: #015249;
}
</style>
