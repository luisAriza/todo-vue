<template lang="pug">
Navbar
h2.title SIGN UP
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
.title {
	@apply mt-12 mb-4
	text-xl font-semibold
}
</style>