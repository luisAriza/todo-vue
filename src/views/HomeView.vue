<template>
  <Navbar />
  <div class="home grid justify-center w-full">
    <h1 class="text-xl">Home Task Master</h1>
    <Last />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"
import Last from "@/components/Last.vue"

export default {
  name: 'HomeView',
  components: {
    Navbar,
    Last
  }
}
</script>