<template lang="pug">
.login
	h2.title Log In
	Login
</template>

<script>
import Login from '@/components/Login.vue'

export default {
	name: 'LoginView',
	components: {
		Login
	}
}
</script>

<style scoped>
.login {
	@apply  grid gap-10 mx-auto w-96
}
.title {
	@apply text-xl
}
</style>