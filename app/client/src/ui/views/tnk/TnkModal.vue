<script setup lang="ts">
import TnkForm from "../../components/tnk/TnkForm.vue";
import ExternalLinks from "../../components/tnk/ExternalLinks.vue";
import LiveCycle from "../../components/tnk/LiveCycle.vue";
import Approving from "../../components/tnk/Approving.vue";
import {ref} from "vue";

const props = defineProps(['dialog', 'tnk']);
const emit = defineEmits(['dialogClose']);
const close = () => emit('dialogClose');

const tab = ref('')
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

        <div class="modal-content">
          <v-card>
            <v-tabs
                v-model="tab"
                bg-color="primary"
                align-tabs="center"
            >
              <v-tab value="one">ТНК</v-tab>
              <v-tab value="two">Согласование</v-tab>
              <v-tab value="three">История</v-tab>
            </v-tabs>

            <v-card-text>
              <v-window>
                <v-window-item value="one">
                  <div style="display: flex; justify-content: space-between">
                    <TnkForm />
                    <ExternalLinks />
                  </div>
                </v-window-item>

                <v-window-item value="two">
                  <Approving />
                </v-window-item>

                <v-window-item value="three">
                  <LiveCycle />
                </v-window-item>
              </v-window>
            </v-card-text>
          </v-card>
        </div>

        <div class="actions-container">
          <div class="actions">
            <v-btn
                color="success"
                class="mt-4"
                block
            >
              Сохранить
            </v-btn>

            <v-btn
                color="blue"
                class="mt-4"
                block
            >
              На согласование
            </v-btn>

            <v-btn
                color="success"
                class="mt-4"
                block
            >
              Согласовать
            </v-btn>

            <v-btn
                color="warning"
                class="mt-4"
                block
            >
              На утверждение
            </v-btn>

            <v-btn
                color="error"
                class="mt-4"
                block
            >
              Отклонить
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-dialog>
</template>