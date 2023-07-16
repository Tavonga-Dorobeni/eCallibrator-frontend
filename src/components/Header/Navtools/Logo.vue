<template>
  <router-link :to="{ name: 'home' }">
    <img
      src="@/assets/images/logo/logo.png"
width="138" height="32"
      alt=""
      v-if="!this.$store.state.isDark"
    />

    <img
      src="@/assets/images/logo/logo-white.png"
      alt=""
      v-if="this.$store.state.isDark"
      style="width:138,height:32" 
    />
  </router-link>
</template>
<script></script>
