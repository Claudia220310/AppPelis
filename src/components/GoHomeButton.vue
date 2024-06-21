<template>
    <ion-card>
      <ion-button @click="goHome" color="primary">IR AL INICIO</ion-button>
    </ion-card>
  </template>
  
  <script lang="ts">
  import { IonButton, IonCard } from '@ionic/vue';
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  
  export default defineComponent({
    components: {
      IonButton,
      IonCard,
    },
    setup() {
      const router = useRouter();
  
      const goHome = () => {
        router.push({ name: 'HomePage' });
      };
  
      return {
        goHome,
      };
    },
  });
  </script>
  
  <style scoped>
  /* Estilos adicionales para el botón si son necesarios */
  ion-button {
    font-size: 1; 
  }
  </style>
  