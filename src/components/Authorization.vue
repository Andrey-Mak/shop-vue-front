<template>
	<div class="authorization container">
		<div class="row row-offcanvas row-offcanvas-right">
			<div class="col-xs-12">
				<div class="jumbotron">
					<h1>Авторизируйтесь!</h1>
				</div>
				<form class="mt5" @submit.prevent="authorizationUser">
					<div class="form-group">
						<label for="inputEmail">Email address</label>
						<input type="email" class="form-control" id="inputEmail" placeholder="Email"
							   v-model="user.email" required>
					</div>
					<div class="form-group">
						<label for="inputPassword">Password</label>
						<input type="password" class="form-control" min="6" id="inputPassword" placeholder="Password"
							   v-model="user.pass" required>
					</div>
					<div class="form-group" v-if="signView === 'sign-up'">
						<label for="confirmPassword">Confirm Password</label>
						<input type="password" class="form-control" min="6" id="confirmPassword"
							   placeholder="Confirm Password" v-model="user.confim" required>
					</div>
					<div class="alert alert-danger" v-if="errorMessage">
						<p class="text-danger">{{errorMessage}}</p>
					</div>
					<div class="alert alert-success" v-else-if="successMessage">
						<p class="text-success">{{successMessage}}</p>
					</div>
					<button type="submit" class="btn btn-primary" v-if="signView === 'sign-in'">Войти</button>
					<button type="submit" class="btn btn-primary" v-else-if="signView === 'sign-up'">Зарегистрироваться</button>
				</form>
				<a href="#" @click="signView = 'sign-up'" v-if="signView === 'sign-in'">Или зарегистрируйтесь</a>
				<a href="#" @click="signView = 'sign-in'" v-else-if="signView === 'sign-up'">Или войдите</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'authorization',
		data() {
			return {
				errorMessage: "",
				successMessage: "",
				signView: 'sign-in',
				user: {
					email: "",
					pass: "",
					confim: ""
				}
			}
		},
		methods: {
			signIn(response){
				this.successMessage = `Вы вошли как ${response.email}`;
				this.$emit("signInUser", {email: response.email, userId: response.uid});
				this.$router.push({ path: 'products' })
			},
			authorizationUser(){
				if(this.signView === 'sign-in'){
					firebase.auth().signInWithEmailAndPassword(this.user.email, this.user.pass)
						.then((response) => {
							this.signIn(response);
						})
						.catch((error) => {
							this.errorMessage = `Произошла ошибка: (${error.code}) - ${error.message}`;
						});
				}else if(this.signView === 'sign-up'){
					if (this.user.pass !== this.user.confim) {
						this.errorMessage = "Пароли не совпадают!";
					} else if (this.user.pass.length < 6) {
						this.errorMessage = "Пароль должен содержать не меньше 6 символов";
					} else {
						firebase.auth().createUserWithEmailAndPassword(this.user.email, this.user.pass)
							.then((response) => {
								this.signIn(response);
							})
							.catch((error) => {
								this.errorMessage = `Произошла ошибка: (${error.code}) - ${error.message}`;
							});
					}
				}
			}
		}
	}
</script>

<style>

</style>