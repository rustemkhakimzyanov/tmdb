<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <div class="back-wrap">
        <b-button type="is-link" @click="goBack">
          ❮ Вернуться к списку фильмов
        </b-button>
      </div>
    </div>
    <div v-if="movie" class="column">
      <div>
        <div class="is-size-5 has-text-weight-medium">Название</div>
        <div>{{ movie.title }}</div>
      </div>
      <div class="spacer" />
      <div>
        <div>
          <div class="is-size-5 has-text-weight-medium">Жанр</div>
          <div>{{ movie.genres.map(g => g.name).join(', ') }}</div>
        </div>
      </div>
      <div class="spacer" />
      <div v-if="movie.overview">
        <div class="is-size-5 has-text-weight-medium">Описание</div>
        <div>{{ movie.overview }}</div>
      </div>
      <div class="spacer" />
      <div v-if="movie.videos.results.length">
        <div class="is-size-5 has-text-weight-medium">Трейлеры</div>
        <div>
          <div v-for="video in movie.videos.results" :key="video.id">
            <iframe
              v-if="video.site === 'YouTube'"
              :src="`http://www.youtube.com/embed/${video.key}?autoplay=0`"
              type="text/html"
              frameborder="0"
            />
          </div>
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active="loading" />
  </div>
</template>

<script>
import http from '@/http'
const params = { append_to_response: 'videos' }

export default {
  props: ['id', 'genre'],

  data: () => ({ movie: null, loading: false }),

  async activated() {
    this.movie = null
    this.loading = true

    try {
      const { data } = await http.get(`movie/${this.id}`, { params })
      this.movie = data
    } catch (e) {
      throw e
    } finally {
      this.loading = false
    }
  },

  methods: {
    goBack() {
      if (history.length <= 2) {
        this.$router.push({
          name: 'movies',
          id: this.genre
        })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>

<style scoped>
iframe {
  width: 640px;
  height: 360px;
}
.spacer {
  height: 24px;
}
.back-wrap {
  top: 24px;
  position: sticky;
}
</style>
