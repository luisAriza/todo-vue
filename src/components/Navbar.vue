<template>
	<nav>
		<router-link to="/home">Home</router-link>
		<div v-show="!userLogged" class="login-btn">
			<router-link to="/"> Log In</router-link> |
			<router-link to="/register">Sig Up</router-link>
		</div>
		<div v-show="userLogged" class="profile">
			<p>Welcome {{user}}</p>
			<button @click="Logout()" type="button">Log out</button>
		</div>
	</nav>
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
			localStorage.removeItem('tasks');

			this.$router.push("/");
		}
	}
}
</script>

<style scoped>
nav {
	display: flex;
	justify-content: space-between;
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
button {
	@apply bg-slate-700 text-green-400 px-2 py-1 rounded-lg font-bold
}
</style>