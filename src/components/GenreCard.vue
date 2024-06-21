<template>
  <ion-card @click="$emit('select-genre', genre.id)">
    <ion-card-content class="genre-content">{{ genre.name }}</ion-card-content>
  </ion-card>
</template>

<script lang="ts">
import { IonCard, IonCardContent } from '@ionic/vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    IonCard,
    IonCardContent
  },
  props: {
    genre: {
      type: Object,
      required: true
    }
  }
});
</script>

<style scoped>
ion-card {
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin: 0.5rem;
}

.genre-content {
  white-space: normal; /* Permite que el texto se divida en varias líneas si es necesario */
  text-align: center;
  font-size: 1rem; 
  word-wrap: break-word; 
}

@media (max-width: 600px) {
  ion-card {
    margin: 0.25rem; 
    padding: 0.5rem; 
  }
  
  .genre-content {
    font-size: 0.875rem; 
  }
}
</style>
