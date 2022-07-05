<template lang="pug">
from.form__container(action name="form" @submit.prevent="login()")
  label(for="email") Email:
    input(type="email" id="email" required placeholder="user@example.com" @blur="v$.email.$touch" v-model="email")
    p(v-if="v$.email.$error") Email field has an error
  label(for="password") Password:
    input(type="password" id="password" required v-model="password" @blur="v$.password.$touch")
    p(v-if="v$.password.$error") Password field has an error, minimum 8 characters
  p(v-if="error" class="error") Has introducido mal el email o la contraseña.
  input(class="submit" type="submit" value="log In")
  p.msg ¿No tienes cuenta?
    router-link(to="/register") Regístrate
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import auth from "@/utils/auth"

export default {
  name: "Login",
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      email: "",
      password: "",
      error: false
    }
  },
  methods: {
    async login() {
      try {
        await auth.login(this.email, this.password);
        this.$router.push("/");
      } catch (error) {
        this.error = true;
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
        minLength: minLength(8)
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
.submit {
  @apply bg-slate-300 border rounded-md p-2 w-full justify-self-center cursor-pointer
}
</style>

