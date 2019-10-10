<template>
  <div @click="$emit('click', movie)" class="card">
    <div class="card-image">
      <figure v-if="movie.poster_path" class="image is-2by3">
        <img
          :src="$config.posterServiceURL + 'w342' + movie.poster_path"
          :alt="movie.title"
        />
      </figure>
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content">
          <p class="title is-4">{{ movie.title }}</p>
        </div>
      </div>
      <div class="content">
        <div class="ellipsis is-ellipsis-2">
          {{ movie.overview }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.ellipsis {
  display: block;
  display: -webkit-box;
  margin: 0 auto;
  line-height: 1.4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 4;
}
.card {
  height: 100%;
  cursor: pointer;
}
</style>
