<template lang="pug">
Navbar
img(src="@/assets/logo.svg",
	alt="logo",
	width="52" height="52")
h2.title Sign Up
.signup
	Signup
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Signup from '@/components/Signup.vue'

export default {
	name: 'RegisterView',
	components: {
		Navbar,
		Signup
	}
}
</script>

<style scoped>
img {
	@apply mx-auto mt-8
}
.title {
	@apply mt-6 mb-4 text-xl font-normal
}
</style>