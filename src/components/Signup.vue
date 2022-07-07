<template lang="pug">
form.form__container(action name="signup" @submit.prevent="saveRecord()")
  label(for="name") Nickname
  input(id="name"
    type="name"
    placeholder="julio890"
    @blur="v$.user.$touch"
    v-model="user"
    required)
  p(v-if="v$.user.$error") minimum 4 characters
  label(for="email") Email
  input(id="email"
    type="email"
    placeholder="user@example.com"
    v-model="email"
    @blur="v$.email.$touch"
    required)
  label(for="psw") Password
  input(id="psw"
    type="password"
    placeholder="password"
    v-model="password"
    @blur="v$.password.$touch"
    required)
  p(v-if="v$.password.$error") Password field has an error, minimum 8 characters
  p(v-if="error" class="error") User or email existent
  input(class="submit-btn"
    type="submit"
    value="Sig Up")
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, minLength, email } from '@vuelidate/validators'

export default {
  name: "Signup",
  data() {
    return {
      user: "",
      email: "",
      password: "",
      error: false
    }
  },
  methods: {
    saveRecord() {
      let usersRecords = new Array();
      usersRecords = this.usersRecords;

      let userRepeat = (v) => v.user == this.user || v.email == this.email;

      if (usersRecords.some(userRepeat)) {
        this.error = true;
      } else {
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
  computed: {
    usersRecords() {
      let tasks = localStorage.getItem("users");

      return JSON.parse(tasks);
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
        minLength: minLength(4)
      },
      email: {
        email,
        required,
      },
      password: {
        required,
        minLength: minLength(8)
      }
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

