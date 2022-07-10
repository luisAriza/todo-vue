<template lang="pug">
button(:type="type", :class="class") Test
</template>

<script>
export default {
	name: "Test",
	props: ["type", "class"]
}
</script>

<style scoped>

</style>