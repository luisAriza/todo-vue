<template lang="pug">
Navbar
img(src="@/assets/logo.svg",
	alt="logo",
	width="52" height="52")
h2.title Log In
.login
	Login
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Login from '@/components/Login.vue'

export default {
	name: 'LoginView',
	components: {
		Navbar,
		Login
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