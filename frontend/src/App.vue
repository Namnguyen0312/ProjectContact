<script>
import AppHeader from "@/components/AppHeader.vue";
import { useAccountStore } from './stores/account';
import Loading from 'vue-loading-overlay';

export default {
  setup() {
    const accountStore = useAccountStore();
    return { accountStore }
  },
  // data() {
  //   return {
  //     isLoading: true,
  //     fullPage: true,
  //     onCancel: false,
  //   };
  // },
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
    <!-- <loading v-model:active="isLoading" :can-cancel="false" backgroundColor="#170f23 !important" color="#c6bcd3"
      :opacity="1" loader="bars" :is-full-page="fullPage" /> -->
    <AppHeader v-if="accountStore.checkAccount()" />
    <div class="container mt-3">
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
