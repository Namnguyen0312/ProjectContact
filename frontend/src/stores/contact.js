import { defineStore } from 'pinia';
import contactService from '../services/contact.service';
import { useAccountStore } from './account';
import accountService from '../services/account.service';

export const useContactStore = defineStore("contacts", {
    state: () => ({
        mycontacts: [],
    }),
    actions: {
        async getmycontacts() {
            const accountStore = useAccountStore();

            const myAccount = JSON.parse(
                JSON.stringify(
                    await accountService.get(accountStore.account._id),
                ),
            );
            this.mycontacts = myAccount.mycontacts.map((contacts) => contacts);
            console.log(myAccount);
            console.log(myAccount.mycontacts);
        },
    }
});