<script setup lang="ts">
const links: {img: string, link: string}[] = [
    { img: '/github.png', link: 'https://github.com/JoachimTislov'},
    { img: '/linkedin.png', link: 'https://www.linkedin.com/in/joachim-tisl%C3%B8v-7074642b1/'},
    { img: '/instagram.png', link: 'https://www.instagram.com/joachimtislov/'},  
    { img: '/facebook.png', link: 'https://www.facebook.com/profile.php?id=100011419305331'}
]
</script>

<template>
  <div class="d-flex flex-row">
    <a v-for="item in links" :key="item.img" :href="item.link"><img class="socialLink" :src="item.img" /></a>
  
    <a href="mailto:Joachim.tislov@gmail.com"><img class="gmail" src="/gmail.png" /></a>
  </div>
</template>

<style scoped>
.socialLink {
  width: 3vw;
}

.gmail {
  width: 3.4vw;
}

a {
  margin-left: 2%;
}

@media (min-width: 700px) {
  .socialLink {
    width: 2vw;
  }

  .gmail {
    width: 2.4vw;
  }
}
</style>
