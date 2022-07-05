<template lang="pug">
.hello
  h1 {{ msg }}
</template>

<script>
  export default {
    props: {
      msg: String
    }
  }
</script>

