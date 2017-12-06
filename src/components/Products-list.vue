<template>
	<article class="products container">
		<section class="row row-offcanvas row-offcanvas-right">
			<div class="col-xs-12 col-sm-9">
				<h1>Выберите телефон</h1>
				<select v-model="sortBy">
					<option disabled value="">Отсортировать по</option>
					<option value="priceUp">Цене по возрастанию</option>
					<option value="priceDown">Цене по убыванию</option>
				</select>
				<div class="row">
					<div class="product-block col-xs-6 col-lg-4" v-for="product in currentPageArr">
						<div v-html="product.image"></div>
						<h4>{{product.title}}</h4>
						<h5>{{product.price}} грн</h5>
						<a class="btn btn-default" @click="showInfoProduct(product)">View details</a>
					</div>
				</div>
				<pagination :pages="totalPages" :current="currentPage"></pagination>
			</div>
		</section>
		<section class="popup" v-if="showInfo">
			<product-info :productId="showProductId"></product-info>
		</section>
		<section class="viewed-products" v-if="viewedProducts.length > 0">
			<h5>Вы уже смотрели: </h5>
			<ul>
				<li v-for="product in viewedProducts" @click="showInfoProduct(product)">
					<div v-html="product.image"></div>
					<h5>{{product.title}}</h5>
					<h5>{{product.price}} грн</h5>
				</li>
			</ul>
		</section>
	</article>

</template>

<script>
	const database = firebase.database();
	import ProductInfo from "../components/Product-info"
	import Pagination from "../components/Pagination"
	import list from "../assets/products"

	export default {
		name: 'products-list',
		props: ["currentUser"],
		components: {
			Pagination,
			ProductInfo
		},
		data() {
			return {
				list,
				userId: "",
				products: [],
				viewedProducts: [],
				sortBy: '',
				totalPages: 0,
				productsOnPage: 6,
				currentPage: 0,
				showInfo: false,
				showProductId: ""
			}
		},
		methods:{
			orderedProducts(){
				console.log(this.sortBy);
				if(this.sortBy){
					if(this.sortBy === "priceUp"){
						return this.products.sort((a, b)=>{
							return a.price - b.price
						});
					}
					if(this.sortBy === "priceDown"){
						return this.products.sort((a, b)=>{
							return b.price - a.price
						});
					}
				}else{
					return this.products;
				}
			},
			showInfoProduct(product){
				this.showInfo = true;
				this.showProductId = product.id;
				this.addToShowed(product);
				this.$router.push({ path: "/products", query: { product: this.showProductId }});
			},
			addToShowed(product){
				this.viewedProducts.splice(4);
				this.viewedProducts.forEach((item, index)=>{
					if(item.id === product.id){
						this.viewedProducts.splice(index, 1);
					}
				});
				this.viewedProducts.splice(0, 0, product);
			}
		},
		computed: {
			currentPageArr(){
				return this.orderedProducts().slice(this.currentPage * this.productsOnPage, (this.currentPage * this.productsOnPage + this.productsOnPage));
			}
		},
		watch: {
			'$route'(to, from) {
				this.currentPage = parseInt(to.query.page || this.currentPage);
				this.showInfo = (to.query.product >= 0 && to.query.product < this.products.length);
			}
		},
		created() {
/*				this.list.goods.forEach((item) => {
					item.description = `<b>${item.title} :</b>  ${item.description}`
				});
			console.log(this.list.goods);
			database.ref("products-list").set(this.list.goods);*/
			if(this.currentUser || this.userId){
				this.userId = this.currentUser.userId || this.userId;

				this.currentPage = +this.$route.query.page || this.currentPage;
				const productsList = database.ref("products-list");
				productsList.on('value', (snapshot) => {
					this.products = snapshot.val();
					this.totalPages = Math.ceil(this.products.length/this.productsOnPage);
					this.showInfo = (this.$route.query.product >= 0 && this.$route.query.product < this.products.length);
				});
			}else{
				this.$router.push({ path: "/sign" });
			}
		}
	}
</script>

<style>
	.product-block{
		margin: 10px 0;
	}
.popup{
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	width: 1000px;
	height: 600px;
	margin: auto;
	border: 1px solid #666;
	border-radius: 20px;
	box-shadow: 2px 2px 5px rgba(0,0,0,0.7);
	background-color: #fff;
}
.viewed-products{
	overflow-y: hidden;
	overflow-x: auto;
}
.viewed-products li{
	width: 10%;
	display: inline-block;
	cursor: pointer;
}
</style>
