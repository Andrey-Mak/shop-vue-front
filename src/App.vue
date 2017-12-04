<template>
	<div class="container app">
		<header>
			<nav class="navbar navbar-fixed-top navbar-inverse">
				<div class="container">
					<div class="navbar-header col-xs-8 col-md-8">
						<h1 class="navbar-brand" href="#">Test Shop(Vue2 js)</h1>
					</div>

					<div class="left col-xs-4 col-md-2">
						<p class="current-email" @signInUser="user = $event" v-if="user.email">{{user.email}}</p>
						<router-link to="/sign" v-else>
							<a class="btn btn-default" href="#" role="button">Войти/Зарегистрироваться</a>
						</router-link>
					</div>
				</div>
			</nav>
		</header>
		<section id="main">
			<router-view></router-view>
		</section>
	</div>
</template>

<script>
	import ProductsList from "./components/Products-list"
	import Authorization from "./components/Authorization"
	import ProductInfo from "./components/Product-info"

	export default {
		name: 'main',
		components: {
			ProductsList,
			Authorization,
			ProductInfo
		},
		data() {
			return {
				user: {}
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

	li {
		display: inline-block;
		margin: 0 10px;
	}
</style>
