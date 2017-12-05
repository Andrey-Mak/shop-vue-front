<template>
	<div class="pagination container">
		<ul class="col-sm-12">
			<li v-for="(page, index) in pages" @click="gotoCurrentPage(index)" :class="{active: index == currentPage}">
				<a class="btn btn-default" href="#">{{index}}</a>
			</li>
		</ul>
	</div>
</template>

<script>

	export default {
		name: 'pagination',
		props: ["pages", "current"],
		data() {
			return {
				currentPage: this.current
			}
		},
		methods: {
			gotoCurrentPage(page){
				console.log( "page", page);
				this.currentPage = page;
				console.log( "this.current", this.currentPage);
				this.$emit("changePage", page)
			}
		}
	}
</script>

<style>
	.active .btn{
		background-color: #aaa;
	}
</style>