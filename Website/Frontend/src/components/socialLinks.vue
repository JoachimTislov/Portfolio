<script setup lang="ts">
const relativePath = 'src/components/icons/'
const links: {icon: string, link: string} = [
    { icon: `${relativePath}github.png`, link: 'https://github.com/JoachimTislov'},
    { icon: `${relativePath}/linkedin.png`, link: 'https://www.linkedin.com/in/joachim-tisl%C3%B8v-7074642b1/'},
    { icon: `${relativePath}/instagram.png`, link: 'https://www.instagram.com/joachimtislov/'},  
    { icon: `${relativePath}/facebook.png`, link: 'https://www.facebook.com/profile.php?id=100011419305331'}
]
</script>

<template>
  <div class="mb-1">
      <a class="m-1" v-for="item in links" :key="item" :href="item.link"><img :src="item.icon" /></a>
  </div>
</template>

<style scoped>

img {
  width: 4vh;
  height: auto;
}

</style>
