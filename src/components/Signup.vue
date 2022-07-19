<template lang="pug">
form.form(name="signup" @submit.prevent="saveRecord()")
  .form__field
    label(for="name") Name
    p(v-if="v$.user.$error") Required name
  input.form__input(
    id="name"
    type="name"
    placeholder="Luis Ariza"
    @blur="v$.user.$touch"
    v-model="user"
    required)
  .form__field
    label(for="email") Email
    p.error(v-if="error") Email existent
  input.form__input(
    id="email"
    type="email"
    placeholder="user@domain.com"
    v-model="email"
    @blur="v$.email.$touch"
    required)
  .form__field
    label(for="psw") Password
    p(v-if="v$.password.$error") Minimum 8 characters
  input.form__input(
    id="psw"
    type="password"
    placeholder="••••••••"
    v-model="password"
    @blur="v$.password.$touch"
    required)
  .form__field
    label(for="rePsw") Repeat Password
    p(v-show="v$.confirmPassword.$error") Password not same
  input.form__input(
    id="rePsw"
    type="password"
    placeholder="••••••••"
    v-model="confirmPassword"
    @keypress.enter="v$.confirmPassword.$touch"
    required)
  button.form__submit-btn(type="submit") Sign Up
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, email, sameAs } from '@vuelidate/validators'

export default {
  name: "Signup",
  data() {
    return {
      user: "",
      email: "",
      password: "",
      confirmPassword: "",
      error: false
    }
  },
  computed: {
    usersRecords() {
      let users = localStorage.getItem("users");

      return JSON.parse(users);
    }
  },
  methods: {
    saveRecord() {
      let usersRecords = this.usersRecords ? this.usersRecords : [];

      let emailRepeat = usersRecords.some((v) => v.email == this.email);
      let passwordSame = this.password == this.confirmPassword;

      if (emailRepeat) {
        this.error = true;
      } else if (!passwordSame) {
        console.log("Confirm password")
      } else if (this.user && !emailRepeat && passwordSame) {
        usersRecords.push({
          "user": this.user,
          "email": this.email,
          "psw": this.password,
        })
        localStorage.setItem("users", JSON.stringify(usersRecords));
        this.$router.push("/");
      }
    }
  },
  setup() {
    return {
      v$: useVuelidate()
    }
  },
  validations() {
    return {
      user: {
        required,
      },
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        confirmPassword: sameAs(this.password)
      }
    }
  }
}
</script>
