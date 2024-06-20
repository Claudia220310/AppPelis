<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Películas</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div class="grid">
        <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" @click="goToDetail(movie.id)" />
      </div>
      <ion-pagination :pageCount="totalPages" :currentPage="currentPage" @pageChange="fetchMovies" />
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '@/services/api';
import MovieCard from '@/components/MovieCard.vue';

export default defineComponent({
  components: {
    MovieCard
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const movies = ref<any[]>([]);
    const totalPages = ref(0);
    const currentPage = ref(1);

    const fetchMovies = async (page: number = 1) => {
  try {
    const filter = route.query.filter;
    const id = route.query.id;

    let fetchedMovies = [];
    if (filter === 'genre') {
      fetchedMovies = await api.getMoviesFilteredByGenre(id, page);
    } else {
      const response = await api.getMoviesFilteredByCategory(filter as string, page);  // Cambio aquí: asegurar que filter sea string
      fetchedMovies = response.results;  // Cambio aquí: acceder a results en la respuesta
      totalPages.value = response.total_pages;  // Cambio aquí: acceder a total_pages en la respuesta
    }

    movies.value = fetchedMovies;
    currentPage.value = page;
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

    const goToDetail = async (movieId: number) => {
      try {
        router.push({ name: 'MovieDetail', params: { id: movieId.toString() } });
      } catch (error) {
        console.error('Error navigating to movie detail:', error);
      }
    };

    onMounted(() => {
      fetchMovies();
    });

    watch(route, () => {
      fetchMovies();
    });

    return {
      movies,
      totalPages,
      currentPage,
      fetchMovies,
      goToDetail
    };
  }
});
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  padding: 1rem;
}
</style>
