<template>
  <div>
    <h1>Hello world</h1>
    <my-addition></my-addition>
    <my-subtraction></my-subtraction>
  </div>
</template>

<script>
import Addition from "./components/addition.vue";
import Subtraction from "./components/subtraction.vue";

export default {
  components: {
    "my-addition": Addition,
    "my-subtraction": Subtraction
  }
};
</script>
