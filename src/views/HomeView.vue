<template>
  <Navbar />
  <div class="home w-full">
    <h1 class="text-3xl">Estate Task</h1>
    <AddTask />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import AddTask from "@/components/AddTask.vue"

export default {
  name: 'HomeView',
  components: {
    Navbar,
    AddTask
  }
}
</script>

<style scoped>

</style>