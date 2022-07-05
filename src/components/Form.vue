<template lang="pug">
from.form__container
  label(for="email") Email:
    input(type="email" id="email" placeholder="user@example.com")
  label(for="password") Password:
    input(type="password" id="password")
  button(type="submit") {{ buttonName}}
</template>

<script>
export default {
    name: "Form",
    props: {
      buttonName: String
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

