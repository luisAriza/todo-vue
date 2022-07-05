<template lang="pug">
from.form__container(name="form" id="form" v-on:submit.prevent="submitForm();")
  label(for="email") Email:
    input(type="email" id="email" placeholder="user@example.com" @blur="v$.form.email.$touch" v-model="form.email")
    div(v-if="v$.form.email.$error") Email field has an error
  label(for="password") Password:
    input(type="password" id="password" v-model="form.password" @blur="v$.form.password.$touch")
    div(v-if="v$.form.password.$error") Password field has an error, minimum 8 characters
  button(type="submit") {{ buttonName}}
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'

export default {
  name: "Form",
  props: {
    buttonName: String
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        confirmPassword: ""
      }
    }
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate()
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!isFormCorrect) return `This form is not correct.`
      // actually submit form
    }
  },
  validations() {
    return {
      form: {
        email: {
          email,
          required,
          minLength: minLength(3)
        },
        password: {
          required,
          minLength: minLength(8)
        },
        // confirmPassword: sameAs(this.password)
      }
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
button {
  @apply bg-slate-300 border rounded-md p-2 w-full justify-self-center
}
</style>

