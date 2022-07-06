<template lang="pug">
.login
	h2.title Log In
	Signup
</template>

<script>
import Signup from '@/components/Signup.vue'

export default {
	name: 'RegisterView',
	components: {
		Signup
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