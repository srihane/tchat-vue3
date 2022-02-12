<template>
  <Tchat />

</template>

<script>

//CSS
require('./css/style.css');

// Views
import Tchat from './views/Tchat.vue'

export default {
  name: 'App',
  components: {
    Tchat,
  }
}
</script>

<style>
/*
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
*/
</style>
