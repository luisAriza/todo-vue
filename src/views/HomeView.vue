<template>
<div class="home grid justify-center">
  <h1 class="text-xl">Home Task Master</h1>
  <Task/>
</div>
</template>

<script>
import Task from "@/components/Task.vue";

export default {
  name: 'HomeView',
  components: {
    Task
  },
  data() {
    return {
    }
  },
}
</script>
