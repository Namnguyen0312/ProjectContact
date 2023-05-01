<script>
import AppHeader from "@/components/AppHeader.vue";
import { useAccountStore } from './stores/account';
import Loading from 'vue-loading-overlay';

export default {
  setup() {
    const accountStore = useAccountStore();
    return { accountStore }
  },
  components: {
    AppHeader,
    Loading,
  },
  async mounted() {
    const userID = localStorage.getItem("id");
    await this.accountStore.getById(userID);
  },
};
</script>
<template>
  <div id="app">
    <AppHeader v-if="accountStore.checkAccount()" />
    <div class="container mt-3 app">
      <router-view />
    </div>
  </div>
</template>
<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
