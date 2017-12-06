<template>
	<article class="pagination container">
		<ul class="col-sm-12">
			<li v-for="(index) in pages" :class="{active: index-1 == currentPage}">
				<a class="btn btn-default" href="#" @click.prevent="gotoCurrentPage(index-1)">{{index}}</a>
			</li>
		</ul>
	</article>
</template>

<script>

	export default {
		name: 'pagination',
		props: ["pages", "current"],
		data() {
			return {
				currentPage: this.current || 0
			}
		},
		watch: {
			'$route'(to, from) {
				this.currentPage = parseInt(to.query.page) || this.currentPage;
			}
		},
		methods: {
			gotoCurrentPage(page){
				this.currentPage = page;
				this.$router.push({ path: "/products", query: { page: page + "" }});
			}
		}
	}
</script>

<style>
	.active .btn{
		background-color: #aaa;
	}
</style>