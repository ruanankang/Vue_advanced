<template>
  <div id="app">
    <a-menu v-model="current" mode="horizontal">
      <a-menu-item key="mail">
        <a-icon type="mail" />
        <router-link to="/" style="float: right">Home</router-link>
      </a-menu-item>
      <a-menu-item key="app">
        <a-icon type="appstore" />
        <router-link to="/todos" style="float: right">Todos</router-link>
      </a-menu-item>
    </a-menu>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    return {
      current: ["mail"]
    };
  }
};
</script>
