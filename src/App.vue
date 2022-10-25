<template>
  <div>
    <main-nav />
  </div>
  <router-view />
</template>

<script>
import MainNav from "@/components/navigation/MainNav.vue";

export default {
  name: "App",
  components: {
    MainNav,
  },
};
</script>
