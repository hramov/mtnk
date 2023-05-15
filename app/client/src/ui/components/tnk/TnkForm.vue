<script setup lang="ts">
import Timeline from './../layout/Timeline.vue';
const props = defineProps(['tnk']);
</script>

<template>
  <div class="tnk-form" v-if="tnk">
    <form>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" placeholder="Название ТНК" v-model="tnk.title">
        <label for="floatingInput">Название</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" class="form-control" placeholder="Процесс" v-model="tnk.process">
        <label for="floatingPassword">Процесс</label>
      </div>

      <div class="form-floating mb-3">
        <input type="text" class="form-control" placeholder="Подпроцесс" v-model="tnk.subprocess">
        <label for="floatingPassword">Подпроцесс</label>
      </div>

    </form>

    <div>
      <Timeline :timelines="props.tnk.timeline"/>
    </div>
  </div>
</template>

<style scoped>
.tnk-form {
  display: flex;
  justify-content: space-between;
}

.tnk-form > form {
  width: 60%;
}
.tnk-form > div {
  width: 35%;
}
</style>