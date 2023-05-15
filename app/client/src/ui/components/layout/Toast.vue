<script setup lang="ts"></script>

<template>
  <div class="toast-container position-fixed bottom-0 end-0 p-3">
    <div id="liveToast" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="toast-header">
        <strong class="me-auto" id="toast_title"></strong>
        <small>{{ new Date().toLocaleTimeString('ru-RU')}}</small>
        <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
      <div class="toast-body" id="toast_body"></div>
    </div>
  </div>
</template>

<style></style>