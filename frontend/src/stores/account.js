import { defineStore } from 'pinia';
import accountService from '../services/account.service';


export const useAccountStore = defineStore("accounts", {
    state: () => ({
        account: null,
    }),
    actions: {
        checkAccount() {
            console.log(this.account);
            if (this.account && Object.keys(this.account).length) return true;
            return false;
        },
        async getAccount() {
            const id = localStorage.getItem('id');
            this.account = {};
            if (!id) return;
            try {
                this.account = JSON.parse(
                    JSON.stringify(await accountService.get(id)),
                );
            } catch (err) {
                console.log(err);
            }
        },
        async Register(account) {
            await accountService.register(account);
        },
        async Login(account) {
            try {
                this.account = await accountService.login(account);
                if(this.account){
                    localStorage.setItem('id', this.account._id);
                }
            } catch (error) {
                console.log(error);
            }
            
        },
        async addContact(contactId){
            await accountService.addcontact(this.account._id,contactId);
        },
        async getById(id) {
            try {
                this.account = await accountService.get(id);
            } catch (error) {
                console.log(error);
            }
        },
        async update(id, data) {
            await accountService.updateUser(id, data);
        },
        async delete(id) {
            await accountService.deleteUser(id)
        },
        async refresh() {
            await this.getAccount();
        },
    }
});
