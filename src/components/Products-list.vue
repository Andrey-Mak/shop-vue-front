<template>
	<div class="products container">
		<div class="row row-offcanvas row-offcanvas-right">
			<div class="col-xs-12 col-sm-9">
				<div class="jumbotron">
					<h1>Выберете телефон</h1>
				</div>
				<div class="row">
					<div class="col-xs-6 col-lg-4" v-for="product in currentPageArr" :key="product.id">
						<div v-html="product.image"></div>
						<h4>{{product.title}}</h4>
						<h5>{{product.price}} грн</h5>
						<router-link :to="{ name: 'product', params: {productId: product.id, product: product} }">
							<a class="btn btn-default" href="#">View details</a>
						</router-link>
					</div>
				</div>
				<pagination :pages="totalPages" :current="currentPage" @changePage="showCurrentPage($event)"></pagination>
			</div>
		</div>
	</div>
</template>

<script>
	const database = firebase.database();

	import Pagination from "../components/Pagination"

	export default {
		name: 'products-list',
		components: {
			Pagination
		},
		data() {
			return {
				products: [],
				totalPages: 0,
				productsOnPage: 6,
				currentPage: 0,
				currentPageArr: []
			}
		},
		methods:{
			showCurrentPage(page){
				this.currentPageArr = this.products.slice(page * this.productsOnPage, (page * this.productsOnPage + this.productsOnPage));
			}
		},
		created() {
			const productsList = database.ref("products-list");
			productsList.on('value', (snapshot) => {
				this.products = snapshot.val();
				console.log(this.products);
				this.totalPages = Math.ceil(this.products.length/this.productsOnPage);
				console.log(this.products.slice(this.currentPage * this.productsOnPage, (this.currentPage * this.productsOnPage + this.productsOnPage)));
				this.showCurrentPage(this.currentPage);
			});

		}
	}
</script>

<style>

</style>
