<template>
  <div class="filters-container">
    <ion-button @click="filterByCategory('now_playing')">Cartelera</ion-button>
    <ion-button @click="filterByCategory('top_rated')">Mejor Calificadas</ion-button>
    <ion-button @click="filterByCategory('popular')">Populares</ion-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { IonButton } from '@ionic/vue';

export default defineComponent({
  components: {
    IonButton
  },
  emits: ['filter-category'],
  methods: {
    filterByCategory(category: string) {
      this.$emit('filter-category', category);
    }
  }
});
</script>

<style scoped>
.filters-container {
  display: flex;
  justify-content: center; /* Centra los botones horizontalmente */
  padding: 1rem; 
  margin-top: 2rem; /* Margen superior */
}

ion-button {
  max-width: 150px; 
}
</style>
