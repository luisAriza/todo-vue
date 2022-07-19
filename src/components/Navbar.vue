<template lang="pug">
nav.navbar
  .navbar__left
    img(v-show="user"
      src="@/assets/logo.svg",
      alt="logo",
      width="32" height="32")
    p To-Do Assist
  .navbar__right(v-if="user")
    p Welcome {{ user }}
    button.navbar__logout-btn(@click="Logout()") Log out
  .navbar__right(v-else)
    router-link(to="/") Log In
    span |
    router-link(to="/register") Sign Up
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      user: localStorage.getItem("user")
    }
  },
  methods: {
    Logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    }
  },
  mounted() {
    this.user ? this.$router.push("/home") : "";
  }
};
</script>

<style scoped>

</style>
