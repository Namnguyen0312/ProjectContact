<template>
    <div class="page">
        <h4>Thêm Liên hệ</h4>
        <ContactForm :contact="contact" @submit:contact="createContact" />
        <p>{{ message }}</p>
    </div>
</template>
<script>
import ContactForm from "@/components/ContactForm.vue"; import ContactService from "@/services/contact.service";
import { useAccountStore } from "../stores/account";
export default {
    setup(){
        const AccountStore = useAccountStore();
        return {AccountStore};
    },
    components: {
        ContactForm,
    },
    data() {
        return {
            contact: {},
            id: [],
            message: "",
        };
    },
    methods: {
        async createContact(data){
            try {
                this.id = await ContactService.create(data);
                // await ContactService.get(this.id);
                // await this.AccountStore.addContact(this.contact._id);
                console.log(this.id._id);
                await this.AccountStore.addContact(this.id._id);
                alert('Thêm liên hệ thành công.');
                this.$router.push({name: 'contactbook'});
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>