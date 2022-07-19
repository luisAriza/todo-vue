<template lang="pug">
form.form(name="login" @submit.prevent="login()")
  .form__field
    label(for="email") Email
    p(v-if="v$.email.$error") Enter your email
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
  p.form__error(v-if="error") Email or password incorrect
  button.form__submit-btn(type="submit") Log In
  p.form__info Don't have an account?
    router-link(to="/register").form__info--signup-link Sign Up
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
      error: false,
      task: {}
    }
  },
  computed: {
    usersRecords() {
      let users = localStorage.getItem("users");

      return JSON.parse(users);
    },
    tasksRecords() {
      let tasks = localStorage.getItem("tasks");

      return JSON.parse(tasks);
    },
  },
  methods: {
    login() {
      let usersRecords = this.usersRecords ? this.usersRecords : [];
      let tasksRecords = this.tasksRecords ? this.tasksRecords : [];

      let validation = (v) => v.email == this.email && v.psw == this.password;

      if (usersRecords.some(validation)) {
        let currentUser = usersRecords.filter(validation)[0];
        localStorage.setItem("user", currentUser.user);

        if (tasksRecords.some((v) => v.user == currentUser.user)) {
          console.log("Usuario antiguo")
        } else {
          tasksRecords.push({
            "user": currentUser.user,
            "tasks": new Array()
          })
          localStorage.setItem("tasks", JSON.stringify(tasksRecords));
        }
        this.$router.push("/home");
      } else {
        this.error = true;
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
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(8)
      },
    }
  }
}
</script>
