<template>
  <Navbar />
  <div class="home w-full px-2">
    <h1 class="text-3xl">Estate Task</h1>
    <TaskList />
  </div>
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