<template>
  <div>
    <LoginView />
    <CeShi />
  </div>
</template>

<script>
import LoginView from "./components/LoginView";
import CeShi from "./components/CeShi";

export default {
  name: "App",
  components: {
    LoginView,
    CeShi,
  },
};
</script>
<style scoped></style>
