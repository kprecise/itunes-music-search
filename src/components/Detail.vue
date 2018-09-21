<template>
  <div class="main">
    <h1>Music Catalogue</h1>
    <p>Choose an artist to search:</p>
    <form>
      <label for="search">Search</label>
      <input type="text" name="search" />
    </form>
  </div>
</template>

<script>
export default {
  name: 'Search',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
