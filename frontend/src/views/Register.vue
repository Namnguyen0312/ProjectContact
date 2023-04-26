<template>
    <div class="container_form d-flex align-items-center justify-content-center">
      <div class="card">
        <h4 class="form-title">Register</h4>
        <section class="card-body">
            <Form @submit="submitFormRegister" :validation-schema="schema" v-slot="{ errors, isSubmitting }">
                <section class="form-group">
                    <label>Name</label>
                    <Field name="name" type="text" v-model="user.name" class="form-control" :class="{ 'is-invalid': errors.name }" />
                    <section class="invalid-feedback">{{ errors.name }}</section>
                </section>
                <section class="form-group">
                    <label>Username</label>
                    <Field name="username" type="text" v-model="user.username" class="form-control" :class="{ 'is-invalid': errors.username }" />
                    <section class="invalid-feedback">{{ errors.username }}</section>
                </section>
                <section class="form-group">
                    <label>Password</label>
                    <Field name="password" type="password" v-model="user.password" class="form-control" :class="{ 'is-invalid': errors.password }" />
                    <section class="invalid-feedback">{{ errors.password }}</section>
                </section>
                <section class="form-group">
                    <label>Phone</label>
                    <Field name="phone" type="tel" v-model="user.phone" class="form-control" :class="{ 'is-invalid': errors.phone }" />
                    <section class="invalid-feedback">{{ errors.phone }}</section>
                </section>
                <section class="form-group">
                    <button class="btn btn-primary" :disabled="isSubmitting">
                        <span v-show="isSubmitting" class="spinner-border spinner-border-sm mr-1"></span>
                        Register
                    </button>
                    <router-link to="login" class="btn btn-link">Cancel</router-link>
                </section>
            </Form>
        </section>
    </div>
    </div>
  </template>
  
  <script>
  import * as Yup from "yup";
  import { Form, Field} from "vee-validate";
  import {useAccountStore} from "../stores/account";
    export default {
      setup(){
        const AccountStore = useAccountStore();
        return {AccountStore}
      },
      components: {
        Form,
        Field,
      },
      data() {
        const schema = Yup.object().shape({
          name: Yup 
            .string()
            .required(),
          username: Yup
            .string()
            .required(),
          password: Yup
            .string()
            .required(),
          phone: Yup
            .string()
            .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ.",
            )
            .required()
        });
        return {
            schema,
            user: {
              "name" : "",
              "username" : "",
              "password" : "",             
              "phone" : "",
            }
        };
      },
      methods: {
         async submitFormRegister(){
            try {
              await this.AccountStore.Register({
                    name : this.user.name,
                    username : this.user.username,
                    password : this.user.password,
                    phone : this.user.phone,
              })
              await this.$router.push({name: 'login'})
              alert('Registered successfully')
            } catch (error) {
                console.log(error)
            }  
         }
      },
    }
  
  
  </script>
  <!-- <style scoped>
  .container_form{
      width: 100%;
      height: 100vh;
      margin: 0;
      background: url(@/assets/arcane_br.png)  bottom;
      animation: changebackground 12s linear infinite backwards;
  }
  
  
  @keyframes changebackground{
    0%{
      background: url(@/assets/arcane_br.png)  bottom;
    }
    50%{
      background: url(@/assets/arcane_br2.png)  bottom;
    }
    75%{
      background: url(@/assets/arcane_br3.jpg)  center ;
    }
    100%{
      background: url(@/assets/arcane_br.png)  bottom;
    }
  
  }
  
  .card{
    border: 2px solid #0088a9;
    width: 450px;
    color: #fff;
    background: transparent !important;
    opacity: 0.8;
    backdrop-filter: blur(20px);
  }
  
  .card{
    border: 2px solid #0088a9;
    width: 450px;
    color: #fff;
  }
  .card-header{
    text-align: center;
    margin-bottom: 24px;
    background-color: #24252A;
    border-bottom: 1px solid #0088a9;
  }
  .btn {
    margin-top: 24px;
    text-decoration: none;
    font-size: 18px;
  }
  .form-title{
    text-align: center;
    font-size: 36px;
    font-weight: 600;
  }
  .error-feedback {
    color: red;
    margin: auto;
  }
  </style> -->