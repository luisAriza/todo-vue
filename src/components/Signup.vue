<template lang="pug">
form.form__container(action name="signup" @submit.prevent="saveRecord()")
  .field
    label(for="name") Nickname
    p(v-if="v$.user.$error") Minimum 4 characters | Required
  input(id="name"
    type="name"
    placeholder="julio890"
    @blur="v$.user.$touch"
    v-model="user"
    required)
  .field
    label(for="email") Email
    p(v-if="v$.email.$error") Required
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
  p.error(v-if="error") User or email existent
  input(class="submit-btn"
    type="submit"
    value="Sign Up")
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
  computed: {
    usersRecords() {
      let users = localStorage.getItem("users");

      return JSON.parse(users);
    }
  },
  methods: {
    saveRecord() {
      let usersRecords = this.usersRecords ? this.usersRecords : [];

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
  @apply bg-green-400 border rounded-md p-2 w-full justify-self-center cursor-pointer text-white font-semibold text-lg
}
</style>
