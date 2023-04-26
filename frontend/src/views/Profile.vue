<template>
    <form @submit.prevent="updateUser">
        <div class="form-group">
            <label for="name">Name</label>
            <input name="name" type="text" class="form-control" v-model="this.account.name" />
            <ErrorMessage name="name" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="username">Username</label>
            <input name="username" type="username" class="form-control" v-model="this.account.username" />
            <ErrorMessage name="username" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input name="password" type="password" class="form-control" v-model="this.account.password" />
            <ErrorMessage name="password" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="phone">Phone</label>
            <input name="phone" type="tel" class="form-control" v-model="this.account.phone" />
            <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
            <router-link :to="{ name: 'contactbook' }">
                <button class="btn btn-primary">Save</button>
            </router-link>
        </div>
    </form>
</template>
<script>
import { useAccountStore } from '../stores/account';
export default {
    setup() {
        const useAccount = useAccountStore();
        return { useAccount };
    },
    data() {
        return {
            account: {},
        };
    },
    methods: {
        async updateUser() {
            try {
                await this.useAccount.update(
                    this.useAccount.account._id,
                    this.useAccount.account,
                );
                this.$forceUpdate();
            } catch (error) {
                console.error(error);
            }
        },
    },
    mounted() {
        this.account = this.useAccount.account;
    },
};
</script>
<style scoped>
@import "@/assets/form.css";
</style>
