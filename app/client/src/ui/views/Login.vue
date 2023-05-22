<script setup lang="ts">
import { reactive, toRaw } from 'vue';
import { UserService } from '../../api/user';
import { useToast } from '../../helpers/toast.helper';

const userService = new UserService();

const user = reactive({
	username: '',
	plainPassword: '',
	isRemembered: false,
})
const signIn = async () => {
	const result = await userService.signIn(toRaw(user));
	if (result) {
		useToast('success', 'Успешно', 'Вы успешно вошли!')
	}
}
</script>

<template>
	<div class='body text-center align-middle'>
		<main class="form-signin">
			<form @submit.prevent='signIn'>
				<img class="mb-4" src="./../assets/img/logo.png" alt="" width="72">
				<h1 class="h3 mb-3 fw-normal">Пожалуйста, авторизуйтесь</h1>

				<div class="form-floating">
					<input type="text" class="form-control" id="floatingInput" v-model='user.username'>
					<label for="floatingInput">Имя пользователя</label>
				</div>
				<div class="form-floating">
					<input type="password" class="form-control" id="floatingPassword" v-model='user.plainPassword'>
					<label for="floatingPassword">Пароль</label>
				</div>

				<div class="checkbox mb-3">
					<label>
						<input type="checkbox" value="remember-me" v-model='user.isRemembered'> Запомнить меня
					</label>
				</div>
				<button class="w-100 btn btn-lg btn-primary" type="submit">Войти</button>
			</form>
		</main>
	</div>
</template>

<style scoped>

.bd-placeholder-img {
	font-size: 1.125rem;
	text-anchor: middle;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
}

@media (min-width: 768px) {
	.bd-placeholder-img-lg {
		font-size: 3.5rem;
	}
}

.body {
	height: 100%;
	display: flex;
	align-items: center;
	padding-top: 40px;
	padding-bottom: 40px;
}

.form-signin {
	width: 100%;
	max-width: 330px;
	padding: 15px;
	margin: auto;
	background-color: #f5f5f5;
}

.form-signin .checkbox {
	font-weight: 400;
}

.form-signin .form-floating:focus-within {
	z-index: 2;
}

.form-signin input[type="email"] {
	margin-bottom: -1px;
	border-bottom-right-radius: 0;
	border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
	margin-bottom: 10px;
	border-top-left-radius: 0;
	border-top-right-radius: 0;
}

</style>