<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Películas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="grid">
        <MovieCard
          v-for="movie in movies"
          :key="movie.id"
          :movie="movie"
          @click="goToMovieDetail(movie.id)"
        />
      </div>
      <ion-pagination
        :totalPages="totalPages"
        :currentPage="currentPage"
        @page-changed="handlePageChanged"
      />
      <div v-if="error">
        <p>{{ error }}</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import MovieCard from '@/components/MovieCard.vue';
import IonPagination from '@/components/IonPagination.vue';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';

export default defineComponent({
  components: {
    MovieCard,
    IonPagination,
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const movies = ref<any[]>([]);
    const totalPages = ref(5);
    const currentPage = ref(1);
    const error = ref<string | null>(null);

    const fetchMovies = async () => {
      try {
        const filter = route.query.filter as string;
        const id = route.query.id as string;

        if (!filter) {
          throw new Error('Falta el parámetro de filtro');
        }

        let fetchedMovies;
        if (filter === 'genre' && id) {
          fetchedMovies = await api.getMoviesFilteredByGenre(id, currentPage.value);
        } else {
          const response = await api.getMoviesByCategory(filter, currentPage.value);
          fetchedMovies = response.results;
          totalPages.value = response.total_pages;
        }

        movies.value = fetchedMovies;
        error.value = null;
      } catch (err) {
        console.error('Error fetching movies:', err);
        error.value = 'Error al obtener películas. Por favor, inténtelo de nuevo más tarde.';
      }
    };

    const goToMovieDetail = (movieId: number) => {
      router.push({ name: 'MovieDetail', params: { id: movieId.toString() } });
    };

    const handlePageChanged = (page: number) => {
      currentPage.value = page;
      fetchMovies();
    };

    onMounted(() => {
      if (route.query.filter) {
        fetchMovies();
      }
    });

    watch(
      () => [route.query.filter, route.query.id],
      () => {
        if (route.query.filter) {
          currentPage.value = 1; // Reset to first page when filters change
          fetchMovies();
        }
      },
      { immediate: true }
    );

    return {
      movies,
      totalPages,
      currentPage,
      error,
      goToMovieDetail,
      handlePageChanged
    };
  }
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  padding: 16px;
}
</style>
