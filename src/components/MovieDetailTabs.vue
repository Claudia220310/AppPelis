<template>
  <div>
    <div class="buttons">
      <ion-button @click="setTab('summary')">Resumen</ion-button>
      <ion-button @click="setTab('genres')">Géneros</ion-button>
      <ion-button @click="setTab('production')">Producción</ion-button>
      <ion-button @click="setTab('trailer')">Trailer</ion-button>
    </div>
    <div v-if="tab === 'summary'" class="tab-content" id="summary">
      <p>{{ movie.overview }}</p>
    </div>
    <div v-if="tab === 'genres'" class="tab-content">
      <ul>
        <li v-for="genre in movie.genres" :key="genre.id">{{ genre.name }}</li>
      </ul>
    </div>
    <div v-if="tab === 'production'" class="tab-content">
      <ul>
        <li v-for="company in movie.production_companies" :key="company.id">{{ company.name }} ({{ company.origin_country }})</li>
      </ul>
    </div>
    <div v-if="tab === 'trailer'" class="tab-content trailer-content">
      <iframe
        v-if="trailer"
        :src="`https://www.youtube.com/embed/${trailer.key}`"
        frameborder="0"
        allowfullscreen
      ></iframe>
      <p v-else>No hay trailer disponible</p>
    </div>
  </div>
</template>
  
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonButton } from '@ionic/vue';

export default defineComponent({
  components: {
    IonButton
  },
  props: {
    movie: {
      type: Object,
      required: true
    },
    trailer: {
      type: Object,
      required: false
    }
  },
  setup() {
    const tab = ref('summary');

    const setTab = (newTab: string) => {
      tab.value = newTab;
    };

    return {
      tab,
      setTab
    };
  }
});
</script>
  
<style scoped>
#summary {
  text-align: center;
}

.tab-content {
  width: 70%; /* Ajusta el ancho según tus necesidades */
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  border: 1px solid #000; /* Solo para visualizar el contenedor */
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 2rem; /* Aumenta el espacio entre los botones */
  margin: 1rem 1rem; /* Añade margen lateral para asegurarte de que los botones no toquen los bordes */
  flex-wrap: wrap; /* Permite que los botones se ajusten en varias líneas si es necesario */
}
.tab-content {
  margin-top: 1rem;
}
.trailer-content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
iframe {
  width: 80%;
  height: 315px; 
  max-width: 560px; 
  border: none;
}

@media (max-width: 600px) {
  .buttons {
    flex-direction: column; /* Cambia la dirección de los botones a columna en pantallas pequeñas */
    align-items: center; /* Centra los botones */
  }
}
</style>
