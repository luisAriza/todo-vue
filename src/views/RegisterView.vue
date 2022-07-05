<template lang="pug">
.register.grid.gap-10.mx-auto.w-96
	h2.register__title.text-xl Sign Up
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