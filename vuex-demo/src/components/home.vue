<template>
  <div>
    <h3>Vuex 基础演绎</h3>
    <my-addition></my-addition>
    <my-subtraction></my-subtraction>
  </div>
</template>

<script>
import Addition from "./addition.vue";
import Subtraction from "./subtraction.vue";

export default {
  components: {
    "my-addition": Addition,
    "my-subtraction": Subtraction
  }
};
</script>
