<template>
	<nav>
		<router-link to="/home">Home</router-link> |
		<router-link to="/">Log In</router-link> |
		<router-link to="/register">Sig Up</router-link>
	</nav>
</template>

<script>
export default {
	name: "Navbar"
}
</script>

<style scoped>
nav {
	padding: 30px;
}
nav a {
	font-weight: bold;
	color: #2c3e50;
}
nav a.router-link-exact-active {
	color: #42b983;
}
</style>