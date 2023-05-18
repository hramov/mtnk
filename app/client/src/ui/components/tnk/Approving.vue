<script setup lang="ts">
const props = defineProps(['tnk'])
</script>

<template>
  <div class="approving">

	  <div>
		  <h4>Согласование</h4>
		<table class="table table-hover">
		  <thead>
			  <tr>
				<th scope="col">Очередь</th>
				<th scope="col">Пользователь</th>
				<th scope="col">Результат</th>
				<th scope="col">Дата</th>
			  </tr>
		  </thead>
		  <tbody>
			  <tr v-for="a in tnk.approvalQueue" :key="a.id" style="cursor:pointer;">
				<td>{{ a.groupNum }}</td>
				<td>{{ a.userId }}</td>
				<td>{{ a.isApproved }}</td>
				<td>{{ a.isApproved !== null ? new Date(a.dateCreated).toLocaleString('ru-RU') : '' }}</td>
			  </tr>
		  </tbody>
		</table>
	  </div>

	  <div>
		  <h4>История изменений</h4>
	  <table class="table table-hover">
		  <thead>
		  <tr>
			  <th scope="col">Событие</th>
			  <th scope="col">Пользователь</th>
			  <th scope="col">IP</th>
			  <th scope="col">Дата</th>
		  </tr>
		  </thead>
		  <tbody>
		  <tr v-for="item in tnk.history" :key="item.title" style="cursor:pointer;">
			  <td>{{ item.title }}</td>
			  <td>{{ item.userId }}</td>
			  <td>{{ item.userIp }}</td>
			  <td>{{ new Date(item.dt).toLocaleString('ru-RU') }}</td>
		  </tr>
		  </tbody>
	  </table>
	  </div>
  </div>
</template>

<style scoped>
.approving {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.approving > div {
  width: 45%;
}
</style>