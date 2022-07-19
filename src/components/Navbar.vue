<template lang="pug">
nav.navbar
  .navbar__left
    //- img(src="@/assets/logo.svg",
    //-   alt="logo",
    //-   width="32" height="32")
    //- p TO-DO
  .navbar__right
    //- p Welcome {{ user }}
    //- button.logout-btn(@click="Logout()") Log out
    router-link(to="/") Log In
    span  |
    router-link(to="/register")  Sign Up
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      user: this.$store.state.user,
    };
  },
  computed: {
    userLogged() {
      if (this.user != null) {
        this.$router.push("/home");
      }
      return this.user;
    },
  },
  methods: {
    Logout() {
      localStorage.removeItem("user");

      this.$router.push("/");
    },
  },
  // created: {

  // }
};
</script>

<style scoped>
.navbar {
  @apply flex justify-between items-center
  px-5 py-3
  bg-white shadow-sm
}
.navbar a {
  @apply font-semibold text-[#2c3e50]
}
.navbar a.router-link-exact-active {
  @apply border-b-2 border-[#42b983]
}
.navbar__left {
  @apply flex gap-2 items-center;
}
.navbar__left p {
  @apply hidden sm:block font-bold text-lg;
}
.navbar__right {
  @apply flex items-center gap-5;
}
.navbar__right p {
  @apply font-semibold capitalize;
}
.logout-btn {
  @apply px-2
  rounded-md
  text-[#42b983] font-semibold
  border-[#42b983];
}
</style>
