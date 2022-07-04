<template>
  <div class="home">
    <login msg="Welcome to Your Vue.js App" class="text-xl"/>
  </div>
</template>

<script>
  // @ is an alias to /src
  import login from '@/components/Login.vue'

  export default {
    name: 'HomeView',
    components: {
      login
    }
  }
</script>
