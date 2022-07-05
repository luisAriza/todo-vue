<template>
<div class="home grid justify-center">
  <h1 class="text-xl">Home Task Master</h1>
  <p v-if="!userLogged">User logged: {{userLogged}}</p>
  <Task/>
</div>
</template>

<script>
import Task from "@/components/Task.vue";
import auth from "@/utils/auth";

export default {
  name: 'HomeView',
  components: {
    Task
  },
  data() {
    return {
      userLogin: auth.getUserLogged()
    }
  },
  computed: {
    userLogged() {
      return this.userLogin;
    }
  }
}
</script>
