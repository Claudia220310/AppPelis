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
  gap: 1rem; /* Espacio entre los botones */
  padding: 1rem; /* Ajusta el padding para separar del borde */
  margin-top: 2rem; 
  flex-wrap: wrap; /* Permite que los botones se envuelvan cuando no caben en una sola línea */
}

ion-button {
  max-width: 150px; 
  flex: 1 1 auto; /* Flex-grow, flex-shrink, flex-basis */
  margin: 0.5rem; /* Margen entre los botones */
}
</style>