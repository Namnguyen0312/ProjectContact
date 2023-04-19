<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="/" class="navbar-brand">Ứng dụng Quản lý danh bạ</a>
    <div class="mr-auto navbar-nav">
      <li class="nav-item">
        <router-link :to="{ name: 'contactbook' }" class="nav-link">
          Danh bạ
          <i class="fas fa-address-book"></i>
        </router-link>
      </li>
    </div>
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="true">
        <span class="d-none d-lg-inline m-0">My Account</span>
      </button>
      <ul class="dropdown-menu">
        <router-link :to="{ name: 'login' }">
          <li @click="removeAccount()" class="dropdown-item">
            Log out
          </li>
        </router-link>
      </ul>
    </div>
  </nav>
</template>


<script>
import { useAccountStore } from '../stores/account';
export default {
  setup() {
    const accountStore = useAccountStore();
    return { accountStore };
  },
  data() {
  },
  components: {},
  methods: {
    removeAccount() {
      this.accountStore.account = {};
      localStorage.removeItem('id');
    },
  },
   mounted() { },
};
</script>