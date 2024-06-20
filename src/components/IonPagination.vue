<template>
  <ion-footer>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-button :disabled="currentPage <= 1" @click="changePage(currentPage - 1)" class="previous-button">
          Anterior
        </ion-button>
      </ion-buttons>
      <ion-buttons class="number-buttons">
        <ion-button
          v-for="pageNumber in Math.min(totalPages, 10)"
          :key="pageNumber"
          :class="{ 'active': pageNumber === currentPage }"
          @click="changePage(pageNumber)"
          fill="clear"
          size="small"
          class="number-button"
        >
          <span>{{ pageNumber }}</span>
        </ion-button>
      </ion-buttons>
      <ion-buttons slot="end">
        <ion-button :disabled="currentPage >= totalPages" @click="changePage(currentPage + 1)" class="next-button">
          Siguiente
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

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
  align-items: center;
}

.number-buttons {
  flex: 1;
  display: flex;
  justify-content: center;
}

.number-buttons ion-button {
  --background: transparent;
  --border-color: transparent;
  --box-shadow: none;
  text-align: center;
  min-width: 30px;
}

.number-buttons ion-button span {
  width: 100%;
  display: inline-block;
  text-align: center;
}

.number-buttons ion-button.active {
  font-weight: bold;
}

.previous-button {
  margin-right: auto;
}

.next-button {
  margin-left: auto;
}
.number-buttons ion-button.active {
  color: green; /* Cambia el color activo a verde */
}
</style>
