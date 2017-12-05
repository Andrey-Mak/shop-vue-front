import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import ProductsList from "./components/Products-list"
import Authorization from "./components/Authorization"
import ProductInfo from "./components/Product-info"

const routes = [
	{ path: '/', component: Authorization },
	{ path: '/sign', name: "sign", component: Authorization },
	{ path: '/products', name: "products", component: ProductsList, props: true },
	{ path: '/product/:productId', name: "product", component: ProductInfo, props: true }
];
const router = new VueRouter({
	routes
});

Vue.use(VueRouter);

new Vue({
	el: '#app',
	router,
	render: h => h(App)
})
