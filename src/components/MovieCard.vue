<template>
  <ion-card @click="goToDetail">
    <img :src="`${baseImgUrl}${movie.poster_path}`" alt="movie poster" />
    <ion-card-header>
      <ion-card-title>{{ movie.title }}</ion-card-title>
      <ion-card-subtitle>{{ movie.release_date }}</ion-card-subtitle>
    </ion-card-header>
  </ion-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle } from '@ionic/vue';
import { useRouter } from 'vue-router';
import api from '@/services/api';

export default defineComponent({
  components: {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
  },
  props: {
    movie: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const baseImgUrl = api.baseImgUrl();

    const goToDetail = () => {
      router.push({ name: 'MovieDetail', params: { id: props.movie.id.toString() } });
    };

    return {
      baseImgUrl,
      goToDetail,
    };
  },
});
</script>

<style scoped>
img {
  width: 100%;
  height: auto;
}
</style>
