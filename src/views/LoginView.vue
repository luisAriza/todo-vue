<template lang="pug">
.login
	login.text-xl(msg="Login")
</template>

<script>
	// @ is an alias to /src
	import login from '@/components/Login.vue'

	export default {
		components: {
			login
		}
	}
</script>

<style scoped>

</style>