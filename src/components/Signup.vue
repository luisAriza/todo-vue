<template lang="pug">
from.form__container(action name="form" @submit.prevent="register()")
	label(for="email") Email:
		input(type="email"
			id="email"
			required
			placeholder="user@example.com"
			@blur="v$.email.$touch"
			v-model="email")
		p(v-if="v$.email.$error") Email field has an error
	label(for="password") Password:
		input(type="password"
			id="password"
			required
			v-model="password"
			@blur="v$.password.$touch")
		p(v-if="v$.password.$error") Password field has an error, minimum 8 characters
	label(for="password-repeat") Password:
		input(type="password"
			id="password-repeat"
			required
			v-model="passwordRepeat"
			@blur="v$.passwordRepeat.$touch")
		p(v-if="v$.passwordRepeat.$error") Password field has an error, minimum 8 characters
	input(class="button"
		type="submit"
		value="Sign Up")
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import auth from "@/utils/auth"

export default {
	name: "Signup",
	setup() {
		return {
			v$: useVuelidate()
		}
	},
	data() {
		return {
			email: "",
			password: "",
			passwordRepeat: "",
			error: false
		}
	},
	methods: {
		async register() {
			try {
				await auth.register(this.email, this.password);
				this.$router.push("/")
			} catch (error) {
				console.log(error);
			}
		}
	},
	validations() {
		return {
			email: {
				email,
				required,
				minLength: minLength(3)
			},
			password: {
				required,
				minLength: minLength(3)
			},
			passwordRepeat: {
				required,
				minLength: minLength(3)
			},
		}
	}
}
</script>

<style scoped>
.form__container {
	@apply grid gap-8 w-full justify-items-start
}

input {
	@apply ml-10 border px-2 rounded-md outline-none
}

.button {
	@apply bg-slate-300 p-2 w-full justify-self-center cursor-pointer m-0
}
</style>

