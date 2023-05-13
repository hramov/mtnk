<script setup lang="ts">
import TnkForm from "../../components/tnk/TnkForm.vue";

const props = defineProps(['dialog', 'tnk']);
const emit = defineEmits(['dialogClose']);
const close = () => emit('dialogClose');
</script>

<template>
    <v-dialog
        :model-value="props.dialog"
        fullscreen
        scrollable
        @update:modelValue="close"
        :scrim="false"
        transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar
            dark
            color="#d8e9f0"
        >
          <v-btn
              icon
              dark
              @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{ tnk.title }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn
                variant="text"
                @click="close"
            >
              Закрыть
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
<!--        <v-list-->
<!--            lines="two"-->
<!--            subheader-->
<!--        >-->
<!--          <v-list-subheader>User Controls</v-list-subheader>-->
<!--          <v-list-item title="Content filtering" subtitle="Set the content filtering level to restrict apps that can be downloaded"></v-list-item>-->
<!--          <v-list-item title="Password" subtitle="Require password for purchase or use password to restrict purchase"></v-list-item>-->
<!--        </v-list>-->
        <TnkForm />
      </v-card>
    </v-dialog>
</template>