<template>
	<div class="product container">
		<div class="row">
			<router-link class="col-xs-1 col-sm-1" :to="{ name: 'products'}">
				<h1 class="navbar-brand" href="#">Назад</h1>
			</router-link>
			<div class="col-xs-11 col-sm-11">
				<div class="jumbotron">
					<div v-html="product.image"></div>
					<h4>{{product.title}}</h4>
					<h5>{{product.price}} грн</h5>
					<p v-html="product.description"></p>
					<a class="btn btn-default" href="#" role="button" @click="addToBasket">Добавить в корзину</a>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'product-info',
		props: ["productId", "product"],
		data() {
			return {
				basket: []
			}
		},
		methods: {
			addToBasket(){
				this.basket.push(product);
			}
		}
	}
</script>

