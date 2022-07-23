<template lang="pug">
Navbar
.form__container
	figure
		img(src="@/assets/logo.svg",
			alt="logo",
			width="52" height="52")
	h2.title Sign Up
	.signup
		Signup
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Signup from "@/components/Signup.vue";

export default {
  name: "RegisterView",
  components: {
    Navbar,
    Signup,
  },
};
</script>
