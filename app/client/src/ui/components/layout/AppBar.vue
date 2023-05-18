<script setup lang="ts">
import { AppBarItems, getChildrenForDisplay} from "../../../config/config";
</script>

<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
		<div class="container-fluid">
			<img src='./../../assets/img/logo.png' width='40'/>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarColor01">
				<ul class="navbar-nav me-auto mb-2 mb-lg-0">
					<li class="nav-item dropdown" v-for="parent in AppBarItems" :key="parent.id">
						<a class="nav-link dropdown-toggle" href="#" :id="'appBarDropdown' + parent.id" data-bs-toggle="dropdown" aria-expanded="false">{{ parent.title }}</a>
						<ul class="dropdown-menu" :aria-labelledby="'appBarDropdown' + parent.id">
							<li v-for="child in getChildrenForDisplay(parent.children)" :key="child.id">
								<router-link class="dropdown-item" :to="child.url">{{ child.title}}</router-link>
								<hr class="dropdown-divider" v-if='child.divider'/>
							</li>
						</ul>
					</li>
				</ul>
				<ul class="navbar-nav ms-auto mb-2 mb-lg-0">
					<li class="nav-item dropdown">
						<a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" href="#">Храмов Сергей Иванович</a>
						<ul class="dropdown-menu">
							<li><router-link class="dropdown-item" to="/account">Аккаунт</router-link></li>
							<li><router-link class="dropdown-item" to="/logout">Выйти</router-link></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	</nav>
</template>