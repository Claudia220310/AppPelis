<template>
  <ion-card @click="$emit('select-genre', genre.id)">
    <ion-card-content>{{ genre.name }}</ion-card-content>
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
}
</style>
