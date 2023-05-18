<script setup lang="ts">

</script>

<template>
	<div class="col-lg-8 mx-auto p-3 py-md-5">
		<main>
			<h1>Модуль технико-нормировочных карт</h1>
			<p class="fs-5 col-md-8">
				Quickly and easily get started with Bootstrap's compiled, production-ready files with this barebones example featuring some basic HTML and helpful links.
				Download all our examples to get started.
			</p>

			<div class="mb-5">
				<a href="#" class="btn btn-primary btn-lg px-4">Документация</a>
			</div>

			<hr class="col-3 col-md-2 mb-5">

			<div class="row g-5">
				<div class="col-md-6">
					<h2>Ответственные</h2>
					<ul class="icon-list">
						<li>Bootstrap npm starter</li>
						<li>Bootstrap Parcel starter (coming soon!)</li>
					</ul>
				</div>
			</div>
		</main>
		<footer class="pt-5 my-5 text-muted border-top">
			Разработано в Главном вычислительном центре ОАО "РЖД" &middot; &copy; 2021 - {{ new Date().getFullYear()}}
		</footer>
	</div>
</template>

<style scoped>
.icon-list {
	padding-left: 0;
	list-style: none;
}
.icon-list li {
	display: flex;
	align-items: flex-start;
	margin-bottom: .25rem;
}
.icon-list li::before {
	display: block;
	flex-shrink: 0;
	width: 1.5em;
	height: 1.5em;
	margin-right: .5rem;
	content: "";
	background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23212529' viewBox='0 0 16 16'%3E%3Cpath d='M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z'/%3E%3C/svg%3E") no-repeat center center / 100% auto;
}
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
</style>