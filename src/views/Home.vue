<template>
  <div class="home">
    <Learn/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Learn from '@/components/Learn.vue'; // @ is an alias to /src

@Component({
  components: {
    Learn,
  },
})
export default class Home extends Vue {}
</script>
