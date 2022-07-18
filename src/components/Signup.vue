<template lang="pug">
form.form__container(action name="signup" @submit.prevent="saveRecord()")
  .field
    label(for="name") Name
    p(v-if="v$.user.$error") Required name
  input(id="name"
    type="name"
    placeholder="Julio Perez"
    @blur="v$.user.$touch"
    v-model="user"
    required)
  .field
    label(for="email") Email
    p.error(v-if="error") Email existent
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
  .field
    p
    p(v-show="v$.confirmPassword.$error") Password not same
  input(type="password"
    placeholder="Confirm password"
    v-model="confirmPassword"
    @blur="v$.confirmPassword.$touch"
    required)
  input(class="submit-btn"
    type="submit"
    value="Sign Up")
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
  @apply border px-2 rounded-md outline-none w-full p-2 mb-5 shadow-md font-normal
}
.submit-btn {
  @apply bg-green-600 border rounded-md p-2 w-full justify-self-center cursor-pointer text-white font-semibold text-lg
}
</style>
