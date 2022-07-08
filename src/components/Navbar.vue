<template lang="pug">
nav
	router-link(to="/home") Home
	.login-btn(v-show="!userLogged")
		router-link(to="/") Log In
		span  |
		router-link(to="/register")  Sig Up
	.profile(v-show="userLogged")
		p Welcome {{user}}
		button(@click="Logout()" type="button") Log out
</template>

<script>
export default {
	name: "Navbar",
	data() {
		return {
			user: localStorage.getItem('user'),
		}
	},
	computed: {
		userLogged() {
			if (this.user != null) {
				this.$router.push("/home");
			}
			return this.user;
		}
	},
	methods: {
		Logout() {
			localStorage.removeItem('user');

			this.$router.push("/");
		}
	}
}
</script>

<style scoped>

nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 30px;
}
nav a {
	font-weight: bold;
	color: #2c3e50;
}
nav a.router-link-exact-active {
	color: #42b983;
}
div {
	display: inline-block;
}
.profile {
	display: flex;
	align-items: center;
	gap: 12px;
}
.profile p {
	@apply font-semibold capitalize text-lg
}
button {
	@apply border-green-400 border text-green-400 px-2 py-1 rounded-lg font-bold
}
</style>