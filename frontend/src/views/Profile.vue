<template>
    <form @submit.prevent="updateUser">
        <div class="form-group">
            <label for="name">Name</label>
            <input name="name" type="text" class="form-control" v-model="this.useAccount.account.name" />
        </div>
        <div class="form-group">
            <label for="username">Username</label>
            <input name="username" type="username" class="form-control" v-model="this.useAccount.account.username" />
        </div>
        <div class="form-group">
            <label for="password">Password</label>
            <input name="password" type="password" class="form-control" v-model="this.useAccount.account.password" />
        </div>
        <div class="form-group">
            <label for="phone">Phone</label>
            <input name="phone" type="tel" class="form-control" v-model="this.useAccount.account.phone" />
        </div>
        <div class="form-group">
            <button class="btn btn-primary">Save</button>
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
                // console.log(this.useAccount.account);
                this.account = await this.useAccount.Update(
                    this.useAccount.account._id,
                    this.account,
                );
                await this.$router.push({name: 'contactbook'})
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
