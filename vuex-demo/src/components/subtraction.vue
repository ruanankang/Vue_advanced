<template>
  <div>
    <h3>当前最新的count值：{{ count }}</h3>
    <button @click="subHandle">-1</button>
    <button @click="subAsyncHandle">延时-1</button>
  </div>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState(["count"])
  },
  methods: {
    ...mapMutations(["sub"]),
    ...mapActions(["subAsync"]),
    subHandle() {
      this.sub();
    },
    subAsyncHandle() {
      this.subAsync();
    }
  }
};
</script>
