<script setup lang="ts">
import { onMounted, ref } from 'vue';
const emit = defineEmits(['chosen', 'typeahead']);
const props = defineProps(['placeholder', 'items', 'value']);

const text = ref<string>('')
const valuesShowing = ref<{id: number, title: string}[]>([]);
const visible = ref(false);
const selectedIndex = ref<number>(0);

const onInputHandler = (e: Event) => {
	const target = e.target as HTMLInputElement;
	emit('typeahead', target.value);
	valuesShowing.value = props.items;
	if (valuesShowing.value.length) {
		visible.value = true;
	} else {
		visible.value = false;
	}
}

const onClickHandler = (e: Event, val: number) => {
	visible.value = false;
	const target = e.target as HTMLInputElement;
	const chosenItem = valuesShowing.value.find((item: any) => item.id === val);
	if (chosenItem) {
		text.value = chosenItem.title;
		emit('chosen', chosenItem);
		target.blur();
	}
}

onMounted(() => {
	text.value = props.value;
})
</script>

<template>
	<div class="autocomplete-form">
		<div class="autocomplete-form-input-elements">
			<input id="autocomplete-form-input" class='form-control'
				   autocomplete="off"
				   @input="onInputHandler"
				   v-model="text"
				   type="text"
			>
		</div>
		<div class="list-group list-group-flush autocomplete-form-items" :class='{hide: !visible}'>
			<button v-for="(val,index) in valuesShowing"
					:key="index"
					class="list-group-item list-group-item-action"
					:class="{active:selectedIndex === val.id}"
					@click.prevent="onClickHandler($event, val.id)"
			>
				{{val.title}}
			</button>
		</div>
	</div>
</template>

<style scoped lang='scss'>
#root{
	display: flex;
	height: 100vh;
	width: 100vw;
	flex-flow: column nowrap;
	justify-content:center;
	align-items: center;

	.auto-input{
		width: 200px ;
	}
}

.autocomplete-form{

	&-input-elements {
		 display: flex;
		 flex-flow: column nowrap;
		 justify-content:center;
		 align-items: center;
	 }

	&-items {
		position: absolute;
		width: 93%;
		border: {
			width:1px;
			style:solid;
			color: lightgrey;
		}
	}

	.hide {
		display: none;
	}
}
</style>