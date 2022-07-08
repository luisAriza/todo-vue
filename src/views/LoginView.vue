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
	@apply  grid gap-10 mx-auto w-80 py-8
}
.title {
	@apply text-xl font-bold
}
</style>