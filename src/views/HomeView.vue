<template lang="pug">
Navbar
.home.w-full.px-2
  .flex.items-center.justify-center.gap-4.pt-8
    img(src="../assets/project.svg" width="140" alt="logo")
    h1(class="sm:block hidden font-bold text-3xl uppercase") Estate Task
  TaskList
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import TaskList from "@/components/TaskList.vue"

export default {
  name: 'HomeView',
  components: {
    Navbar,
    TaskList
  }
}
</script>

<style scoped>

</style>