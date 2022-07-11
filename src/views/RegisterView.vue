<template lang="pug">
Navbar
.login
	h2.title SIGN UP
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

.login {
	@apply  grid gap-6 mx-auto max-w-sm pt-16 pb-8 px-5
}
.title {
	@apply text-xl font-bold
}
</style>