<template lang="pug">
Navbar
.login
	h2.title LOG IN
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

.login {
	@apply  grid gap-6 mx-auto max-w-sm pt-16 pb-8 px-5
}
.title {
	@apply text-xl font-bold
}
</style>