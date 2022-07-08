<template lang="pug">
form.form__container(action name="login" @submit.prevent="login()")
  .field
    label(for="email") Email
    p(v-if="v$.email.$error") Enter your email
  input(id="email"
    type="email"
    placeholder="user@example.com"
    v-model="email"
    @blur="v$.email.$touch"
    required)
  .field
    label(for="psw") Password
    p(v-if="v$.password.$error") Minimum 8 characters
  input(id="psw"
    type="password"
    placeholder="password"
    v-model="password"
    @blur="v$.password.$touch"
    required)
  p.error(v-if="error") Email or password incorrect
  input(class="submit-btn"
    type="submit"
    value="Log In")
  p.msg.text-sm.justify-self-center Don't have an account?
    router-link(to="/register" class="signup") Sign Up
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
      let tasks = localStorage.getItem("users");

      return JSON.parse(tasks);
    },
    tasksRecords() {
      let tasks = localStorage.getItem("tasks");

      return JSON.parse(tasks);
    },
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
  @apply grid justify-items-start gap-1 w-full
}
label {
  @apply pl-2 font-semibold text-sm
}
.field {
  @apply w-full flex items-end justify-between
}
.field p {
  @apply text-xs text-red-600 pr-2
}
.error {
  @apply text-xs text-red-600 justify-self-center
}
input {
  @apply border px-2 rounded-md outline-none w-full p-1 mb-6
}
.submit-btn {
  @apply bg-green-400 border rounded-md p-2 w-full justify-self-center cursor-pointer text-white font-bold text-lg mb-1
}
.signup {
  @apply text-green-400 font-semibold ml-1
}
</style>

