<template>
  <h1>Hello World</h1>
  <button @click="add">{{ count }}</button>
</template>

<script>
import { ref } from "vue";
export default {
  setup() {
    const count = ref(6)
    function add() {
      count.value++
    }
    return { count, add }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
