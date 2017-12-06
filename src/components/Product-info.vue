<template>
	<article class="product">
		<div class="row">
			<a class="close-btn" href="#" @click.prevent="closeInfoPopup">X</a>
			<div>
				<div v-html="product.image"></div>
				<h1>{{product.title}}</h1>
				<h3>Описание: </h3>
				<p v-html="product.description"></p>
				<h2>Цена: {{product.price}} грн</h2>
				<a class="btn btn-default" href="#" role="button" @click="addToBasket">Добавить в корзину</a>
			</div>
		</div>
	</article>
</template>

<script>
	export default {
		name: 'product-info',
		props: ["productId"],
		data() {
			return {
				product: '',
				basket: []
			}
		},
		methods: {
			addToBasket(){
				this.basket.push(this.product);
			},
			closeInfoPopup(){
				this.$router.push({ path: "/products" });
			},
			fetchData(id) {
				const productsList = firebase.database().ref("products-list");
				productsList.on('value', (snapshot) => {
					snapshot.val().forEach((item)=>{
						if(item.id == id){
							this.product = item;
						}
					});
				});
			}
		},
		watch: {
			productId: function (newVal, oldVal) {
				this.fetchData(newVal);
			},
			'$route'(to, from) {
				let id = parseInt(to.query.product) || this.productId;
				this.fetchData(id);
			}
		},
		created() {
			let productId = +this.$route.query.product || this.productId;
			this.fetchData(productId);
		}
	}
</script>

<style>
	.product{
		position: relative;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 5%;
	}
	.product img{
		width: 100px;
		height: 200px;
	}
	.close-btn{
		position: absolute;
		top: 20px;
		right: 20px;
		width: 30px;
		height: 30px;
		color: #555;
		text-align: center;
		font-size: 2rem;
		background-color: #fff;
		border: 2px solid #555;
		border-radius: 50%;
		cursor: pointer;
		z-index: 10;
	}
</style>