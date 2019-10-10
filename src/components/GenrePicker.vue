<template>
  <b-menu>
    <b-menu-list label="Категории">
      <b-menu-item
        v-for="genre in genres"
        :key="genre.id"
        :label="genre.name"
        :active="genre.id === +selected"
        @click="$emit('click', genre)"
      ></b-menu-item>
    </b-menu-list>
  </b-menu>
</template>

<script>
import http from '@/http'
const tileCase = s => s.substr(0, 1).toUpperCase() + s.substr(1).toLowerCase()

export default {
  props: ['selected'],

  data: () => ({ genres: [] }),

  async created() {
    const { data } = await http.get('genre/movie/list')
    this.genres = data.genres.map(g => ({ ...g, name: tileCase(g.name) }))
  }
}
</script>
