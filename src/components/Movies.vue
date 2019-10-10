<template>
  <div class="columns">
    <div class="column is-one-quarter">
      <div class="genre-picker-wrap">
        <genre-picker :selected="+$route.params.id" @click="changeGenre" />
      </div>
    </div>
    <div class="column">
      <div v-if="!$route.params.id">
        <h1 class="is-size-3 has-text-weight-medium">
          Популярное на этой неделе
        </h1>
        <br />
      </div>
      <div class="columns is-multiline">
        <div
          class="column is-one-third"
          v-for="movie in movies"
          :key="movie.id"
        >
          <movie-card :movie="movie" @click="showMovieDetails" />
        </div>
      </div>
    </div>
    <b-loading :is-full-page="true" :active="loading" />
  </div>
</template>

<script>
import http from '@/http'
import MovieCard from '@/components/MovieCard'
import GenrePicker from '@/components/GenrePicker'

export default {
  props: ['id'],

  components: { MovieCard, GenrePicker },

  data: () => ({ movies: [], loading: false }),

  beforeRouteUpdate(to, from, next) {
    const { id } = to.params
    this.fetchMovies(id)
    next()
  },

  created() {
    this.fetchMovies(this.id)
  },

  methods: {
    async fetchMovies(id) {
      this.loading = true

      try {
        await this[id ? 'fetchByGenres' : 'fetchTrending'](id)
      } catch (e) {
        throw e
      } finally {
        this.loading = false
      }
    },

    async fetchByGenres(genreId) {
      const { data } = await http.get(`genre/${genreId}/movies`)
      this.movies = data.results
    },

    async fetchTrending() {
      const { data } = await http.get('trending/movie/week')
      this.movies = data.results
    },

    changeGenre({ id }) {
      this.$router.push({
        name: 'movies',
        params: { id }
      })
    },

    showMovieDetails({ id }) {
      this.$router.push({
        name: 'movie',
        params: {
          id,
          genre: this.id || 0
        }
      })
    }
  }
}
</script>

<style scoped>
.genre-picker-wrap {
  top: 24px;
  position: sticky;
}
</style>
