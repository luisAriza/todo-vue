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
      user: localStorage.getItem("user"),
    };
  },
  methods: {
    Logout() {
      localStorage.removeItem("user");
      this.$router.push("/");
    },
  },
  mounted() {
    this.user ? this.$router.push("/home") : "";
  },
};
</script>

<style scoped lang="postcss">
.navbar {
  @apply flex items-center justify-between px-5 py-3 shadow-sm bg-white;

  & a {
    @apply text-[#2c3e50] font-semibold;
  }

  & a.router-link-exact-active {
    @apply border-b-2 border-[#42b983];
  }

  &__left {
    @apply flex items-center gap-1;
  }

  &__left p {
    @apply hidden sm:block text-lg font-medium;
  }

  &__right {
    @apply flex items-center gap-4;
  }

  &__right p {
    @apply font-medium capitalize;
  }

  &__logout-btn {
    @apply text-[#42b983] font-semibold border-[#42b983];
  }
}
</style>
