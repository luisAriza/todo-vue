<template lang="pug">
.login
	h2.title Sign Up
	Form(buttonName="login")
</template>

<script>
// @ is an alias to /src
import Form from '@/components/Form.vue'

export default {
	name: 'LoginView',
	components: {
		Form
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