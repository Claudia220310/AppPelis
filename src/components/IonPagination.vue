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
          v-for="pageNumber in visiblePages"
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
import { IonButton, IonButtons, IonFooter, IonToolbar } from '@ionic/vue';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  components: {
    IonFooter,
    IonToolbar,
    IonButtons,
    IonButton,
  },
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

    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 5; // Ajusta este valor para mostrar más o menos botones
      let start = Math.max(1, props.currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(props.totalPages, start + maxVisible - 1);
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    });

    return {
      changePage,
      visiblePages
    };
  }
});
</script>

<style scoped>
ion-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap; 
}

.number-buttons {
  flex: 1;
  display: flex;
  justify-content: center;
  flex-wrap: wrap; 
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
  color: green; 
}

.previous-button,
.next-button {
  margin: 0 5px; 
}

@media (max-width: 600px) {
  .number-buttons ion-button {
    min-width: 25px; 
    padding: 0 5px;  
  }
}
</style>
