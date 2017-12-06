<template>
	<div class="container app">
		<header>
			<nav class="navbar navbar-fixed-top navbar-inverse">
				<div class="container">
					<div class="navbar-header col-xs-8 col-md-8">
						<router-link :to="{ name: 'products'}">
							<h1 class="navbar-brand" href="#">Test Shop(Vue2 js)</h1>
						</router-link>
					</div>

					<div class="left col-xs-4 col-md-2">
						<p class="current-email" v-if="userEmail">Вы вошли как {{userEmail}}</p>
						<router-link to="/sign" v-else>
							<a class="btn btn-default" href="#">Войти/Зарегистрироваться</a>
						</router-link>
					</div>
				</div>
			</nav>
		</header>
		<article id="main">
			<router-view></router-view>
		</article>
	</div>
</template>

<script>
	import ProductsList from "./components/Products-list"
	import Authorization from "./components/Authorization"

	export default {
		name: 'main',
		components: {
			ProductsList,
			Authorization
		},
		data() {
			return {
				userId: '',
				userEmail: ""
			}
		},
		watch: {
			'$route'(to, from) {
				if(this.$route.params.currentUser){
					this.userEmail = this.$route.params.currentUser.userEmail;
					this.userId = this.$route.params.currentUser.userId;
				}
			}
		}

	}
</script>

<style>
	.app {
		position: relative;
		font-family: Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		padding-top: 70px;
	}

	.navbar {
		height: 70px;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}
	.current-email{
		color: #fff;
		text-decoration: underline;
	}
	li {
		display: inline-block;
		margin: 0 10px;
	}
</style>
