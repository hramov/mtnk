<script setup lang="ts">

</script>

<template>
	<div class="col-lg-8 mx-auto p-3 py-md-5">
		<header class="d-flex align-items-center pb-3 mb-5 border-bottom">
			<a href="/" class="d-flex align-items-center text-dark text-decoration-none">
				<span class="fs-4">Последние изменения</span>
			</a>
		</header>

		<div class="list-group">
			<a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
				<div class="d-flex gap-2 w-100 justify-content-between">
					<div>
						<h6 class="mb-0">List group item heading</h6>
						<p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
					</div>
					<small class="opacity-50 text-nowrap">{{ new Date().toLocaleDateString('ru-RU')}}</small>
				</div>
			</a>
			<a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
				<div class="d-flex gap-2 w-100 justify-content-between">
					<div>
						<h6 class="mb-0">Another title here</h6>
						<p class="mb-0 opacity-75">Some placeholder content in a paragraph that goes a little longer so it wraps to a new line.</p>
					</div>
					<small class="opacity-50 text-nowrap">{{ new Date().toLocaleDateString('ru-RU')}}</small>
				</div>
			</a>
			<a href="#" class="list-group-item list-group-item-action d-flex gap-3 py-3" aria-current="true">
				<div class="d-flex gap-2 w-100 justify-content-between">
					<div>
						<h6 class="mb-0">Third heading</h6>
						<p class="mb-0 opacity-75">Some placeholder content in a paragraph.</p>
					</div>
					<small class="opacity-50 text-nowrap">{{ new Date().toLocaleDateString('ru-RU')}}</small>
				</div>
			</a>
		</div>
	</div>
</template>

<style></style>