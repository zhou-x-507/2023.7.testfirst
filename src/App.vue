<template>
  <div>
    <router-link to="login">login</router-link>
    <router-link to="ceshi">ceshi</router-link>
    <router-view></router-view>
    <!-- <LoginView />
    <CeShi /> -->
  </div>
</template>

<script>
// import LoginView from "./components/LoginView";
// import CeShi from "./components/CeShi";

export default {
  name: "App",
  components: {
    // LoginView,
    // CeShi,
  },
};
</script>
<style scoped></style>
