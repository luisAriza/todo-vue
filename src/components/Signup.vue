<template lang="pug">
form.form__container(action name="form-register" @submit.prevent="register()")
	label(for="email") Email:
		input(type="email"
			id="email"
			placeholder="user@example.com"
			v-model="email"
			@blur="v$.email.$touch"
			required)
		p(v-if="v$.email.$error") Email field has an error
	label(for="password") Password:
		input(type="password"
			id="password"
			v-model="password"
			@blur="v$.password.$touch"
			required)
		p(v-if="v$.password.$error") minimum 8 characters
	label(for="password-repeat") Password:
		input(type="password"
			id="password-repeat"
			v-model="passwordRepeat"
			@blur="v$.passwordRepeat.$touch"
			required)
		p(v-if="v$.passwordRepeat.$error") Repeat password
	input(class="button"
		type="submit"
		value="Sign Up")
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
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
				const user = {
					email: this.email,
				};
				auth.setUserLogged(user);
				this.$router.push("/");
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
				minLength: minLength(4)
			},
			password: {
				required,
				minLength: minLength(4)
			},
			passwordRepeat: {
				required,
				minLength: minLength(4),
				sameAsPassword: sameAs(this.password)
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

