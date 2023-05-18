<script setup lang="ts">
import Filters from "../../components/layout/Filters.vue";
import TnkTable from "../../components/tnk/TnkTable.vue";
import Pagination from "../../components/layout/Pagination.vue";
import {TnkService} from "../../../api/tnk";
import {onMounted, ref} from "vue";
import { Tnk } from '../../../../../shared/tnk';
import TnkModal from '../../components/tnk/TnkModal.vue';
import { openModal } from '../../../helpers/modal.helper';
import { useToast } from '../../../helpers/toast.helper';

const tnkService = new TnkService();
const filters = ref({});

const rowsPerPage = 25;
const pages = ref(1);

const tnkList = ref<Array<Tnk>>([])

const createTnk = () => {
	openModal('tnkModal');
}

const applyFilters = async (filters: Filters) => {
  tnkList.value = await tnkService.getTnkList(filters);
}

const pageChange = (page: number) => {
  console.log(page)
}

onMounted(() => {
  tnkService.getTnkList({}).then(data => tnkList.value = data)
});
</script>

<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3">
    <h1 class="h2">Список ТНК</h1>
    <div class="btn-toolbar mb-2 mb-md-0">
      <div class="btn-group me-2">
        <button type="button" class="btn btn-sm btn-success">Excel</button>
      </div>
      <button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle" data-bs-toggle="modal" data-bs-target="#filtersModal">
        <span data-feather="calendar"></span>
        Фильтры
      </button>
		<button type="button" class="btn btn-sm btn-primary" style='margin-left: 8px' @click='createTnk'>
			Создать
		</button>
    </div>
  </div>
  <TnkTable :tnk="tnkList"/>
	<TnkModal />
  <Pagination :pages="pages" @page_change="pageChange"/>
  <Filters @filters="applyFilters"/>
</template>

<style>

</style>