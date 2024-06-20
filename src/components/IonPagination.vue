<template>
  <ion-footer>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button :disabled="currentPage <= 1" @click="changePage(currentPage - 1)">
          Anterior
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)">
          Siguiente
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent, PropType, watch } from 'vue';

export default defineComponent({
  props: {
    currentPage: {
      type: Number,
      required: true
    },
    totalPages: {
      type: Number,
      required: true
    }
  },
  emits: ['page-changed'],
  setup(props, { emit }) {
    const changePage = (page: number) => {
      emit('page-changed', page);
    };

    watch(() => props.currentPage, (newPage) => {
      if (newPage > props.totalPages) {
        emit('page-changed', props.totalPages);
      }
    });

    return {
      changePage
    };
  }
});
</script>

<style scoped>
ion-toolbar {
  display: flex;
  justify-content: space-between;
}
</style>
