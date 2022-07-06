<template lang="pug">
form.form__container(action name="login" @submit.prevent="login()")
  label(for="email") Email
  input(id="email"
    type="email"
    placeholder="user@example.com"
    v-model="email"
    @blur="v$.email.$touch"
    required)
  p(v-if="v$.email.$error") minimum 4 characters
  label(for="psw") Password
  input(id="psw"
    type="password"
    placeholder="password"
    v-model="password"
    @blur="v$.password.$touch"
    required)
  p(v-if="v$.password.$error") Password field has an error, minimum 8 characters
  p(v-if="error" class="error") Email or password incorrect.
  input(class="submit-btn"
    type="submit"
    value="Log In")
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

// if (name != '') {
  // alert('Please visit profile');
  // window.location.href = "profile.html";
// }

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
    }
  },
  methods: {
    login() {
      let user_records = new Array();
      user_records = JSON.parse(localStorage.getItem("users")) ? JSON.parse(localStorage.getItem("users")) : [];

      if (user_records.some((v) => v.email == this.email && v.psw == this.password )) {
        let current_user = user_records.filter((v) => v.email == this.email && v.psw == this.password)[0];
        localStorage.setItem('user', current_user.user);
        localStorage.setItem('email', current_user.email);
        this.$router.push("/home");
      } else {
        this.error = true;
      }
      console.log(`Email: ${this.email}, Contraseña: ${this.password}`)
    }
  },
  setup() {
    return {
      v$: useVuelidate()
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
        minLength: minLength(8)
      },
    }
  }
}
</script>

<style scoped>
.form__container {
  @apply grid gap-4 w-full justify-items-center
}
input {
  @apply border px-2 rounded-md outline-none w-full p-1
}
.submit-btn {
  @apply bg-green-400 border rounded-md p-2 w-full justify-self-center cursor-pointer
}
</style>

