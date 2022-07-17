<template lang="pug">
nav
	.navbar(v-if="userLogged")
		router-link(to="/home").left
			img(src="../assets/logo.svg" width="36" height="36" alt="logo")
			p To-do Assist
		.right
			p Welcome {{user}}
			button(@click="Logout()") Log out
	.navbar(v-else)
		figure.left
			img(src="../assets/logo.svg" width="36" height="36" alt="logo")
			p To-do Assist
		.login
			router-link(to="/") Log In
			span  |
			router-link(to="/register")  Sig Up
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      user: localStorage.getItem("user"),
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
};
</script>

<style scoped>
nav {
  @apply bg-white shadow-sm px-5 py-2;
}
nav a {
  font-weight: 600;
  color: #2c3e50;
}
.login a.router-link-exact-active {
  color: #42b983;
}
div {
  display: inline-block;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.left {
  @apply flex gap-2 items-center font-semibold text-xl;
}
.left p {
  @apply hidden sm:block;
}
.right {
  @apply flex items-center gap-5;
}
.right p {
  @apply font-semibold capitalize;
}
button {
  @apply border-green-600 border text-green-600 px-2 rounded-md font-semibold;
}
</style>
