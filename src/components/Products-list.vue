<template>
		<div class="products container">
			<div class="row row-offcanvas row-offcanvas-right">
				<div class="col-xs-12 col-sm-9">
					<div class="jumbotron" @click="showProducts()">
						<h1>Выберете телефон</h1>
					</div>
					<div class="row">
						<div class="col-xs-6 col-lg-4" v-for="(product, index) in products">
							<div v-html="product.image"></div>
							<h4>{{product.title}}</h4>
							<h5>{{product.price}} грн</h5>
							<p v-html="product.description"></p>

								<a class="btn btn-default" href="#" role="button" @click="showInfo(index)">View details</a>

						</div>
					</div>
				</div>
		</div>
	</div>
</template>

<script>
	import Products from "../assets/products"

	export default {
		name: 'products-list',
		data() {
			return {
				products: Products["goods"]
			}
		},
		methods: {
			showInfo(index){
				this.$router.push({ path: `products/${index}` })
			}
		}
	}
</script>

<style>

</style>
