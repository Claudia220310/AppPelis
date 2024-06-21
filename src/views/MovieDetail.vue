<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <GoHomeButton/>
        </ion-buttons>
        <ion-title>{{ movie ? movie.title : '' }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content v-if="movie">
      <div class="movie-detail">
        <img :src="`${baseImgUrl}${movie.poster_path}`" alt="movie poster" />
        <ion-card>
          <ion-card-header>
            <ion-card-title>{{ movie.title }}</ion-card-title>
            <ion-card-subtitle>{{ movie.release_date }}</ion-card-subtitle>
          </ion-card-header>
        </ion-card>
        <div class="buttons">
          <ion-button @click="setTab('summary')">Resumen</ion-button>
          <ion-button @click="setTab('genres')">Géneros</ion-button>
          <ion-button @click="setTab('production')">Producción</ion-button>
          <ion-button @click="setTab('trailer')">Trailer</ion-button>
        </div>
        <div v-if="tab === 'summary'" class="tab-content">
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
        <div v-if="tab === 'trailer'" class="tab-content">
          <iframe
            v-if="trailer"
            :src="`https://www.youtube.com/embed/${trailer.key}`"
            frameborder="0"
            allowfullscreen
          ></iframe>
          <p v-else>No hay trailer disponible</p>
        </div>
      </div>
    </ion-content>
    <ion-loading v-else />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import { IonButton, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/vue';
import GoHomeButton from '@/components/GoHomeButton.vue';

export default defineComponent({
  components: {
    IonPage,
    IonLoading,
    IonContent,
    IonHeader,
    IonToolbar,
    IonCard,
    IonTitle,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonButtons,
    GoHomeButton
  },
  setup() {
    const route = useRoute();
    const movie = ref<any>(null);
    const trailer = ref<any>(null);
    const tab = ref('summary');
    const baseImgUrl = api.baseImgUrl();

    const fetchMovieDetail = async () => {
      const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id; // Convertir a string si es necesario
      if (movieId) {
        try {
          movie.value = await api.getMovieDetail(movieId);
          const trailers = await api.getMovieTrailer(movieId);
          trailer.value = trailers.length > 0 ? trailers[0] : null;
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      } else {
        console.error('Movie ID is undefined or null:', movieId);
      }
    };

    const setTab = (newTab: string) => {
      tab.value = newTab;
    };

    onMounted(() => {
      fetchMovieDetail();
    });

    return {
      movie,
      trailer,
      tab,
      baseImgUrl,
      setTab,
    };
  }
});
</script>

<style scoped>
.movie-detail {
  padding: 1rem;
}
img {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
  margin: 0 auto;
}
.buttons {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}
.tab-content {
  margin-top: 1rem;
}
</style>
