<template>
<div class="home">
  <h1 class="text-xl">Home Task Master</h1>
  <p v-if="!userLogged">User logged: {{ userLogged }}</p>
</div>
</template>

<script>
import auth from "@/utils/auth";

export default {
  name: 'HomeView',
  computed: {
    userLogged() {
      return auth.getUserLogged();
    }
  }
}
</script>
