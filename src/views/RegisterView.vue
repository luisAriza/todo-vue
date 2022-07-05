<template lang="pug">
.register.grid.gap-10.mx-auto.w-96
	h2.register__title.text-xl Sign In
	Form(buttonName="Sign In")
</template>

<script>
import Form from '@/components/Form.vue'

export default {
	name: 'LoginView',
	components: {
		Form
	}
}
</script>