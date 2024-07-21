<script setup lang="ts">
import githubLogo from '@/assets/images/github.png'
import linkendIn from '@/assets/images/linkedin.png'
import instagram from '@/assets/images/instagram.png'
import facebook from '@/assets/images/facebook.png'

const links: {img: string, link: string}[] = [
    { img: githubLogo, link: 'https://github.com/JoachimTislov'},
    { img: linkendIn, link: 'https://www.linkedin.com/in/joachim-tisl%C3%B8v-7074642b1/'},
    { img: instagram, link: 'https://www.instagram.com/joachimtislov/'},  
    { img: facebook, link: 'https://www.facebook.com/profile.php?id=100011419305331'}
]
</script>

<template>
  <div class="d-flex flex-row">
    <a v-for="item in links" :key="item.img" :href="item.link"><img class="socialLink" :src="item.img" /></a>
  </div>
</template>

<style scoped>
.socialLink {
  width: 3vw;
}

.gmail {
  margin-top: -0.3em;
  width: 3.4vw;
}

a {
  margin-left: 2%;
}

@media (min-width: 1000px) {
  .socialLink {
    width: 2vw;
  }
}

@media (min-width: 700px) and (max-width: 1000px) {
  .socialLink {
    width: 3vw;
  }
}

@media (max-width: 600px) {
  .socialLink {
    width: 5vw;
  }
}
</style>
