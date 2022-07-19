<template lang="pug">
form.form__container(action name="signup" @submit.prevent="saveRecord()")
  .field
    label(for="name") Name
    p(v-if="v$.user.$error") Required name
  input(id="name"
    type="name"
    placeholder="Luis Ariza"
    @blur="v$.user.$touch"
    v-model="user"
    required)
  .field
    label(for="email") Email
    p.error(v-if="error") Email existent
  input(id="email"
    type="email"
    placeholder="user@domain.com"
    v-model="email"
    @blur="v$.email.$touch"
    required)
  .field
    label(for="psw") Password
    p(v-if="v$.password.$error") Minimum 8 characters
  input(id="psw"
    type="password"
    placeholder="••••••••"
    v-model="password"
    @blur="v$.password.$touch"
    required)
  .field
    p
    p(v-show="v$.confirmPassword.$error") Password not same
  input(type="password"
    placeholder="••••••••"
    v-model="confirmPassword"
    @blur="v$.confirmPassword.$touch"
    required)
  button.submit-btn(type="submit") Sign Up
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
      let notSamePassword = this.password != this.confirmPassword;

      if (emailRepeat) {
        this.error = true;
      } else if (notSamePassword) {
        console.log("Confirm password")
      } else if (!emailRepeat && !notSamePassword && this.user) {
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

<style scoped>

</style>
