<template>
  <div>
    <h3>当前最新的count值：{{ $store.state.count }}</h3>
    <button @click="addHandle">+1</button>
    <button @click="addRandomHandle">+Random</button>
    <button @click="addAsync">延时+1</button>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    addHandle() {
      this.$store.commit("add");
    },
    addRandomHandle() {
      // eslint-disable-next-line radix
      this.$store.commit("addRandom", parseInt(Math.random() * 10));
    },
    addAsync() {
      this.$store.dispatch("addAsync");
    }
  }
};
</script>
0