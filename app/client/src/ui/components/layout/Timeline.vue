<script setup lang="ts">
import Alert from "./Alert.vue";
import { AlertTypes} from "../../../config/config";

type TimelineProps = {
  timelines: Array<{
    title: string;
    color: string;
    date: string;
    message?: string
  }>;
}
const props = defineProps<TimelineProps>();

</script>

<template>
  <section>
    <ul class="timeline" v-if="props.timelines">
      <li class="timeline-item mb-5" v-for="tl in props.timelines" :key="tl.title">
        <h6>{{ tl.title }}</h6>
        <p class="text-muted mb-2 fw-bold">{{ new Date(tl.date) ? new Date(tl.date).toLocaleDateString('ru-RU') : 'Нет даты'}}</p>
        <p class="text-muted">
          {{ tl.message}}
        </p>
      </li>
    </ul>
    <Alert v-else :type="AlertTypes.Warning" message="Жизненный цикл не определен" />
  </section>
</template>

<style scoped>
.timeline {
  border-left: 1px solid hsl(0, 0%, 90%);
  position: relative;
  list-style: none;
}

.timeline .timeline-item {
  position: relative;
}

.timeline .timeline-item:after {
  position: absolute;
  display: block;
  top: 0;
}

.timeline .timeline-item:after {
  background-color: hsl(0, 0%, 90%);
  left: -38px;
  border-radius: 50%;
  height: 11px;
  width: 11px;
  content: "";
}
</style>