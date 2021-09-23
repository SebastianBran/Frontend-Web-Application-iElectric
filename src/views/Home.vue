<template>
  <div id="nav">
    <router-link to="/client">Client</router-link> |
    <router-link to="/technician">Technician</router-link> |
    <router-link to="/administrator">Administrator</router-link>
  </div>
</template>

<script>

export default {
  name: 'Home',
  components: {

  }
}
</script>

<style scoped>
  #nav {
    padding: 30px;
  }

  a {
    font-weight: bold;
  }

  a:focus {
    color: greenyellow;
  }
</style>
