<template lang="pug">
Navbar
h2.title LOG IN
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
.title {
	@apply mt-12 mb-4
	text-xl font-semibold
}
</style>