<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <GoHomeButton/>
        </ion-buttons> 
      </ion-toolbar>
      <ion-title class="title">DETALLES</ion-title>
    </ion-header>
    <ion-content v-if="movie">
      <div class="movie-detail">
        <img :src="`${baseImgUrl}${movie.poster_path}`" alt="movie poster" />
        <div class="detail">
          <ion-card-title>{{ movie.title }}</ion-card-title>
          <ion-card-subtitle>{{ movie.release_date }}</ion-card-subtitle>
        </div>
        <MovieDetailTabs :movie="movie" :trailer="trailer" />
      </div>
    </ion-content>
    <ion-loading v-else />
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import api from '@/services/api';
import { IonCardSubtitle, IonCardTitle, IonContent, IonHeader, IonLoading, IonPage, IonTitle, IonToolbar, IonButtons } from '@ionic/vue';
import GoHomeButton from '@/components/GoHomeButton.vue';
import MovieDetailTabs from '@/components/MovieDetailTabs.vue';

export default defineComponent({
  components: {
    IonPage,
    IonLoading,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonCardTitle,
    IonCardSubtitle,
    IonButtons,
    GoHomeButton,
    MovieDetailTabs
  },
  setup() {
    const route = useRoute();
    const movie = ref<any>(null);
    const trailer = ref<any>(null);
    const baseImgUrl = api.baseImgUrl();

    const fetchMovieDetail = async () => {
      const movieId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id; // Convertir a string si es necesario
      if (movieId) {
        try {
          movie.value = await api.getMovieDetail(movieId);
          const trailers = await api.getMovieTrailer(movieId);
          trailer.value = trailers.length > 0 ? trailers[0] : null;
        } catch (error) {
          console.error('Error al recuperar los detalles de la película:', error);
        }
      } else {
        console.error('El ID de la película no está definido o es nulo:', movieId);
      }
    };

    onMounted(() => {
      fetchMovieDetail();
    });

    return {
      movie,
      trailer,
      baseImgUrl
    };
  }
});
</script>

<style scoped>
.title{
  text-align: center;
  background-color: rgb(31, 31, 31);
  padding-bottom: 8px;
}
.detail{
  text-align: center;
  margin-top: 15px;
}
.movie-detail {
  padding: 1rem;
}
img {
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  display: block;
}
</style>
