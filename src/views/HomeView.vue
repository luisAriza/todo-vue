<template>
  <Navbar />
  <div class="home grid justify-center">
    <h1 class="text-xl">Home Task Master</h1>
    <CreateTask />
    <TaskList />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import CreateTask from "@/components/CreateTask.vue"
import TaskList from "@/components/TaskList.vue"

export default {
  name: 'HomeView',
  components: {
    Navbar,
    CreateTask,
    TaskList
  }
}
</script>