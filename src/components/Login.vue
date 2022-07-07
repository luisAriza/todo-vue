<template lang="pug">
form.form__container(action name="login" @submit.prevent="login()")
  label(for="email") Email
  input(id="email"
    type="email"
    placeholder="user@example.com"
    v-model="email"
    @blur="v$.email.$touch"
    required)
  p(v-if="v$.email.$error") Enter your email
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
  p.msg ¿No tienes cuenta?
    router-link(to="/register")  Sign Up
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
  methods: {
    login() {
      let usersRecords = this.usersRecords;
      let tasksRecords = this.tasksRecords ? this.tasksRecords : [];

      let validation = (v) => v.email == this.email && v.psw == this.password;

      if (usersRecords.some(validation)) {
        let currentUser = usersRecords.filter(validation)[0];
        localStorage.setItem("user", currentUser.user);

        if (tasksRecords.some((v) => v.user == currentUser.user)) {
          console.log("Ya este usuario ha ingresado")
        } else {
          tasksRecords.push({
            "user": currentUser.user,
            "tasks": new Array(),
            "completed": new Array()
          })
          localStorage.setItem("tasks", JSON.stringify(tasksRecords));
        }
        this.$router.push("/home");
      } else {
        this.error = true;
      }
    }
  },
  computed: {
    usersRecords() {
      let tasks = localStorage.getItem("users");

      return JSON.parse(tasks);
    },
    tasksRecords() {
      let tasks = localStorage.getItem("tasks");

      return JSON.parse(tasks);
    },
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

